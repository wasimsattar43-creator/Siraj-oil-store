import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, OrderItem } from '../types/store.ts';

export interface CartItem extends OrderItem {
  maxStock: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, isCarton?: boolean) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  couponCode: string;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('siraj_cart_items_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState<string>(() => {
    try {
      return localStorage.getItem('siraj_coupon') || '';
    } catch {
      return '';
    }
  });

  const [selectedCity, setSelectedCity] = useState<string>('Lahore');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('siraj_cart_items_v2', JSON.stringify(items));
    } catch (e) {
      console.warn('Could not persist cart:', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('siraj_coupon', couponCode);
    } catch (e) {
      console.warn('Could not persist coupon:', e);
    }
  }, [couponCode]);

  const addToCart = (product: Product, quantity: number = 1, isCarton: boolean = false) => {
    if (product.stock <= 0) return;

    const cartItemId = isCarton ? `cart-${product.id}-carton` : `cart-${product.id}-single`;
    const price = isCarton ? (product.cartonPricePKR || 5000) : product.pricePKR;
    const name = isCarton
      ? `${product.name} (Full Carton - All Pieces Pack)`
      : product.name;
    const packSize = isCarton ? ('1 Full Carton (All Pieces Pack)' as any) : product.packSize;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        const newQty = existing.quantity + quantity;
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQty } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          productName: name,
          brandName: 'Siraj Oil Store',
          viscosity: product.viscosity,
          packSize,
          pricePKR: price,
          quantity,
          image: product.image,
          isCarton,
          maxStock: isCarton ? 50 : product.stock,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId && item.productId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId || item.productId === cartItemId) {
          const clamped = Math.max(1, quantity);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.pricePKR * item.quantity, 0);

  // Discount calculation
  let discount = 0;
  if (couponCode.toUpperCase() === 'SIRAJ10') {
    discount = Math.round(subtotal * 0.1); // 10%
  } else if (couponCode.toUpperCase() === 'GENUINE500' && subtotal >= 5000) {
    discount = 500;
  }

  // Shipping fee
  let shippingFee = 350;
  if (subtotal >= 7000 || items.length === 0) {
    shippingFee = 0;
  } else if (selectedCity.toLowerCase().includes('lahore')) {
    shippingFee = 200;
  } else if (
    selectedCity.toLowerCase().includes('karachi') ||
    selectedCity.toLowerCase().includes('islamabad') ||
    selectedCity.toLowerCase().includes('rawalpindi')
  ) {
    shippingFee = 300;
  }

  const total = Math.max(0, subtotal - discount + shippingFee);

  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'SIRAJ10') {
      setCouponCode('SIRAJ10');
      return { success: true, message: 'Promo code applied: 10% discount on your order!' };
    }
    if (formatted === 'GENUINE500') {
      if (subtotal < 5000) {
        return { success: false, message: 'Coupon GENUINE500 requires minimum order of Rs. 5,000.' };
      }
      setCouponCode('GENUINE500');
      return { success: true, message: 'Promo code applied: Rs. 500 instant discount!' };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try SIRAJ10 or GENUINE500.' };
  };

  const removeCoupon = () => {
    setCouponCode('');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        shippingFee,
        total,
        couponCode,
        applyCoupon,
        removeCoupon,
        selectedCity,
        setSelectedCity,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

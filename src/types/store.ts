export type OilViscosity = '0W-20' | '5W-20' | '5W-30' | '5W-40' | '10W-40' | '15W-40' | '20W-50' | '75W-90' | '85W-140' | 'Universal';

export type OilType = 'Fully Synthetic' | 'Semi-Synthetic' | 'Mineral' | 'Synthetic Technology' | 'Specialty Fluid';

export type PackSize = '1 Litre' | '3 Litres' | '4 Litres' | '5 Litres' | '20 Litres (Drum)' | '500ml';

export interface ProductSpecifications {
  apiGrade: string; // e.g. "API SP / SN PLUS"
  acea?: string; // e.g. "ACEA A3/B4, C3"
  ilsac?: string; // e.g. "ILSAC GF-6A"
  jaso?: string; // e.g. "JASO MA2" for motorcycles
  drainInterval: string; // e.g. "8,000 - 10,000 KM"
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brandId: string;
  brandName: string;
  categoryId: string;
  categoryName: string;
  viscosity: OilViscosity;
  oilType: OilType;
  packSize: PackSize;
  pricePKR: number;
  originalPricePKR?: number;
  cartonPricePKR: number; // e.g. Rs. 5000 as requested
  cartonQuantity?: string; // e.g. "Full Carton (All Pieces / Pack)"
  stock: number;
  image: string;
  dabbaColor: string; // e.g. "Royal Blue", "Deep Cobalt Blue", "Metallic Silver", "Golden Amber"
  specifications: ProductSpecifications;
  description: string;
  features: string[];
  compatibleVehicles: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  batchCode: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  country: string;
  description: string;
  isAuthorizedReseller: boolean;
}

export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  totalOrders: number;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  brandName: string;
  viscosity: OilViscosity;
  packSize: PackSize;
  pricePKR: number;
  quantity: number;
  image: string;
  isCarton?: boolean;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'dispatched' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cod' | 'bank_transfer' | 'online_gateway';
export type PaymentStatus = 'pending' | 'verified' | 'failed';

export interface Payment {
  id: string;
  orderId: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amountPKR: number;
  referenceCode?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g., SOS-PK-10492
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    city: string;
    address: string;
    instructions?: string;
  };
  items: OrderItem[];
  subtotalPKR: number;
  discountPKR: number;
  shippingFeePKR: number;
  totalPKR: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  courierName?: string;
  estimatedDeliveryDays?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WholesaleInquiry {
  id: string;
  fullName: string;
  businessName: string;
  phone: string;
  city: string;
  productsInterested: string;
  estimatedMonthlyVolume: string;
  notes?: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  createdAt: string;
}

export interface InventoryLog {
  id: string;
  productId: string;
  productName: string;
  changeType: 'order_sale' | 'restock' | 'adjustment' | 'cancellation_restock';
  quantityChange: number;
  previousStock: number;
  newStock: number;
  notes: string;
  timestamp: string;
}

export interface AdminUser {
  id: string;
  username: string;
  fullName: string;
  role: 'super_admin' | 'inventory_manager';
  email: string;
}

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Product,
  Category,
  Brand,
  Customer,
  Order,
  OrderItem,
  Payment,
  InventoryLog,
  WholesaleInquiry,
  AdminUser,
  OrderStatus,
  PaymentStatus,
} from '../types/store.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'store-data.json');

interface StoreDatabase {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  customers: Customer[];
  orders: Order[];
  payments: Payment[];
  inventoryLogs: InventoryLog[];
  inquiries: WholesaleInquiry[];
  adminUsers: AdminUser[];
}

// Initial demo catalog for Pakistani market with verified specifications and prominent blue dabba motor oils
const initialCategories: Category[] = [
  {
    id: 'cat-car-oil',
    name: 'Car Engine Oil (PCMO)',
    slug: 'car-engine-oil',
    description: 'High-performance synthetic, semi-synthetic, and mineral oils engineered for Japanese, European, and local passenger cars.',
    itemCount: 8,
  },
  {
    id: 'cat-motorcycle-oil',
    name: 'Motorcycle Engine Oil (4T/2T)',
    slug: 'motorcycle-engine-oil',
    description: 'JASO MA2 and MA certified motorcycle lubricants for 70cc, 125cc, 150cc, and heavy motorbikes.',
    itemCount: 4,
  },
  {
    id: 'cat-diesel-oil',
    name: 'Heavy Duty Diesel Engine Oil',
    slug: 'diesel-engine-oil',
    description: 'Robust commercial grade lubricants engineered for heavy haulers, commercial vans, and diesel pickup trucks.',
    itemCount: 4,
  },
  {
    id: 'cat-synthetic',
    name: 'Fully Synthetic Lubricants',
    slug: 'synthetic-oil',
    description: '0W-20, 5W-30, and 5W-40 100% synthetic formulations for extended drain intervals and ultimate thermal stability.',
    itemCount: 6,
  },
  {
    id: 'cat-mineral',
    name: 'Premium Mineral Engine Oil',
    slug: 'mineral-oil',
    description: 'Reliable high-viscosity mineral engine oils (20W-50, 15W-40) for older engines, high mileage, and commercial utility.',
    itemCount: 4,
  },
  {
    id: 'cat-gear-fluids',
    name: 'Transmission & Gear Oils',
    slug: 'gear-fluids',
    description: 'CVTF, ATF, 75W-90, and 85W-140 differential and gearbox oils for smooth gear engagement and protection.',
    itemCount: 3,
  },
];

const initialBrands: Brand[] = [
  {
    id: 'brand-siraj',
    name: 'Siraj Oil Store',
    slug: 'siraj-oil-store',
    country: 'Pakistan',
    description: 'Exclusive manufacturer and distributor of premium automotive lubricants and signature Blue Dabba engine oils.',
    isAuthorizedReseller: true,
  },
];

const initialProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Siraj Oil Store Ultra Synthetic 5W-30 (Blue Dabba 4L)',
    slug: 'siraj-oil-store-ultra-synthetic-5w30-blue-dabba-4l',
    brandId: 'brand-siraj',
    brandName: 'Siraj Oil Store',
    categoryId: 'cat-car-oil',
    categoryName: 'Car Engine Oil (PCMO)',
    viscosity: '5W-30',
    oilType: 'Fully Synthetic',
    packSize: '4 Litres',
    pricePKR: 8850,
    originalPricePKR: 9800,
    cartonPricePKR: 5000,
    cartonQuantity: '1 Full Carton (All Pieces Pack)',
    stock: 45,
    image: '/src/assets/images/siraj_oil_store_blue_dabba_1791984381397.jpg',
    dabbaColor: 'Siraj Oil Store Blue Dabba (Normal Size 4L)',
    specifications: {
      apiGrade: 'API SP / RC Resource Conserving',
      ilsac: 'ILSAC GF-6A',
      acea: 'ACEA A5/B5',
      drainInterval: '8,000 - 10,000 KM',
    },
    description: 'Siraj Oil Store Ultra Synthetic 5W-30 in our iconic Royal Blue sealed dabba canister with official Siraj Oil Store branding. Formulated specifically for modern Japanese and European 1.0L to 2.5L petrol engines operating under tough Pakistani road conditions, dusty environments, and high ambient temperatures. Features anti-wear polymer molecules and low volatility base stocks to preserve fuel economy.',
    features: [
      'Official Siraj Oil Store Royal Blue anti-counterfeit sealed packaging with verifiable QR seal',
      'API SP Resource Conserving standard protects against Low-Speed Pre-Ignition (LSPI)',
      'Exceptional cold start lubrication and high-temperature thermal shear resistance',
      'Recommended for Toyota Corolla, Honda Civic, Suzuki Alto 660cc, Swift, and Kia Sportage',
    ],
    compatibleVehicles: ['Toyota Corolla / Yaris (1.3, 1.6, 1.8)', 'Honda Civic / City (i-VTEC / Turbo)', 'Suzuki Alto / Cultus / Wagon R 660cc & 1000cc', 'Hyundai Tucson / Elantra', 'Kia Sportage / Stonic'],
    isFeatured: true,
    isBestSeller: true,
    batchCode: 'SOS-2026-BLU-084',
    rating: 4.95,
    reviewCount: 38,
    createdAt: '2026-02-10T10:00:00Z',
  },
  {
    id: 'prod-001-small',
    name: 'Siraj Oil Store Ultra Synthetic 5W-30 (Blue Dabba Small 1L)',
    slug: 'siraj-oil-store-ultra-synthetic-5w30-blue-dabba-small-1l',
    brandId: 'brand-siraj',
    brandName: 'Siraj Oil Store',
    categoryId: 'cat-car-oil',
    categoryName: 'Car Engine Oil (PCMO)',
    viscosity: '5W-30',
    oilType: 'Fully Synthetic',
    packSize: '1 Litre',
    pricePKR: 2450,
    originalPricePKR: 2700,
    cartonPricePKR: 5000,
    cartonQuantity: '1 Full Carton (All Pieces Pack)',
    stock: 60,
    image: '/src/assets/images/siraj_oil_store_blue_dabba_1791984381397.jpg',
    dabbaColor: 'Siraj Oil Store Blue Dabba (Normal Small 1L)',
    specifications: {
      apiGrade: 'API SP / RC Resource Conserving',
      ilsac: 'ILSAC GF-6A',
      drainInterval: '8,000 - 10,000 KM',
    },
    description: 'Siraj Oil Store 5W-30 in convenient compact normal small 1-Litre bottle. Perfect for top-ups or combining for exact engine oil capacity requirements (e.g. 3.5L or 4.5L sumps). Sealed with anti-counterfeit foil cap.',
    features: [
      'Compact normal small 1-Litre packaging with precision pour neck',
      'Original Siraj Oil Store blue container with batch verification stamp',
      '100% genuine guaranteed synthetic formulation',
    ],
    compatibleVehicles: ['Toyota, Honda, Suzuki, Hyundai, Kia passenger cars requiring 1L top-up'],
    isFeatured: false,
    isBestSeller: true,
    batchCode: 'SOS-2026-BLU-1L',
    rating: 4.92,
    reviewCount: 24,
    createdAt: '2026-02-11T10:00:00Z',
  },
  {
    id: 'prod-002',
    name: 'Siraj Oil Store Titan Elite 5W-40 Full Synthetic (Deep Blue 4L)',
    slug: 'siraj-oil-store-titan-elite-5w40-full-synthetic-blue-bottle',
    brandId: 'brand-siraj',
    brandName: 'Siraj Oil Store',
    categoryId: 'cat-synthetic',
    categoryName: 'Fully Synthetic Lubricants',
    viscosity: '5W-40',
    oilType: 'Fully Synthetic',
    packSize: '4 Litres',
    pricePKR: 9400,
    originalPricePKR: 10500,
    cartonPricePKR: 5000,
    cartonQuantity: '1 Full Carton (All Pieces Pack)',
    stock: 32,
    image: '/src/assets/images/siraj_oil_store_5w40_blue_dabba_1791993517607.jpg',
    dabbaColor: 'Siraj Oil Store Blue Dabba (Normal Size 4L)',
    specifications: {
      apiGrade: 'API SP / SN PLUS',
      acea: 'ACEA A3/B4',
      drainInterval: '10,000 KM',
    },
    description: 'Siraj Oil Store Titan Elite 5W-40 Full Synthetic Motor Oil in Deep Cobalt Blue heavy-duty packaging with Siraj Oil Store official logo. Engineered for turbocharged gasoline direct injection engines and European luxury sedans/SUVs requiring heavy shear protection in high ambient heat.',
    features: [
      'Deep cobalt blue bottle with volume graduation markings for precision filling',
      'ACEA A3/B4 shear stability preventing viscosity breakdown under severe motorway speeds',
      'Advanced detergent and dispersant additive chemistry keeping pistons clean of varnish',
      'Formulated for German, Japanese, and Korean multi-valve performance engines',
    ],
    compatibleVehicles: ['BMW 3/5 Series', 'Mercedes-Benz C/E Class', 'Audi A4/A6', 'Toyota Fortuner / Prado 2.7L Petrol', 'Honda Civic RS 1.5 Turbo'],
    isFeatured: true,
    isBestSeller: true,
    batchCode: 'TIT-26-40B',
    rating: 4.9,
    reviewCount: 29,
    createdAt: '2026-02-12T11:00:00Z',
  },
  {
    id: 'prod-003',
    name: 'Siraj Oil Store Moto-X 4T 10W-40 Synthetic Motorcycle Oil (1L)',
    slug: 'siraj-oil-store-moto-x-4t-10w40-bike-oil-1l',
    brandId: 'brand-siraj',
    brandName: 'Siraj Oil Store',
    categoryId: 'cat-motorcycle-oil',
    categoryName: 'Motorcycle Engine Oil (4T/2T)',
    viscosity: '10W-40',
    oilType: 'Fully Synthetic',
    packSize: '1 Litre',
    pricePKR: 2150,
    originalPricePKR: 2400,
    cartonPricePKR: 5000,
    cartonQuantity: '1 Full Carton (All Pieces Pack)',
    stock: 90,
    image: '/src/assets/images/siraj_oil_store_moto_4t_blue_bottle_1791993518152.jpg',
    dabbaColor: 'Siraj Oil Store Blue Dabba (Normal 1L Bike Pack)',
    specifications: {
      apiGrade: 'API SL / SM',
      jaso: 'JASO MA2 (T903:2016)',
      drainInterval: '2,500 - 3,500 KM',
    },
    description: 'Siraj Oil Store Moto-X 4T in compact 1-liter royal blue bottle with red racing accents. Formulated specifically for wet-clutch 4-stroke motorbikes. Prevents clutch slipping, ensures crisp gear shifts, and protects gearbox gear teeth and camshaft bearings under intense engine RPMs.',
    features: [
      'Certified JASO MA2 specification: perfect clutch friction lock, no slippage',
      'Active cooling polymers designed for air-cooled single-cylinder engines in summer heat',
      'Anti-foaming additives maintaining thick film lubrication even at 9,000+ RPM',
      'Ideal for Honda CG 125, CB 150F, Yamaha YBR 125, Suzuki GS 150, and Benelli 150/250',
    ],
    compatibleVehicles: ['Honda CG 125 / CD 70 Dream', 'Honda CB 150F', 'Yamaha YBR 125 / YBR 125G', 'Suzuki GS 150 / GR 150', 'Suzuki GD 110S', 'Benelli 150/250/302'],
    isFeatured: true,
    isBestSeller: true,
    batchCode: 'VMT-26-1040',
    rating: 4.88,
    reviewCount: 54,
    createdAt: '2026-02-15T09:00:00Z',
  },
  {
    id: 'prod-004',
    name: 'Siraj Oil Store Heavy-Duty 15W-40 CI-4 Diesel Engine Oil (5L Jug)',
    slug: 'siraj-oil-store-heavy-duty-15w40-ci4-diesel-jug',
    brandId: 'brand-siraj',
    brandName: 'Siraj Oil Store',
    categoryId: 'cat-diesel-oil',
    categoryName: 'Heavy Duty Diesel Engine Oil',
    viscosity: '15W-40',
    oilType: 'Synthetic Technology',
    packSize: '5 Litres',
    pricePKR: 8900,
    originalPricePKR: 9800,
    cartonPricePKR: 5000,
    cartonQuantity: '1 Full Carton (All Pieces Pack)',
    stock: 28,
    image: '/src/assets/images/siraj_oil_store_5w40_blue_dabba_1791993517607.jpg',
    dabbaColor: 'Siraj Oil Store Blue Dabba (Normal Size 5L)',
    specifications: {
      apiGrade: 'API CI-4 / SL',
      acea: 'ACEA E7',
      drainInterval: '12,000 - 15,000 KM (Commercial Fleet)',
    },
    description: 'Siraj Oil Store Heavy-Duty 15W-40 CI-4 diesel motor oil in sturdy 5-liter blue industrial jug with dual pour handles. Engineered for heavy haulage diesel trucks, commercial vans, tractors, generators, and turbo-diesel SUVs. Disperses soot, prevents ring sticking, and neutralizes acidic blow-by gases with high Total Base Number (TBN 11.0).',
    features: [
      'Heavy-duty industrial blue jug with leak-proof foil induction seal',
      'High TBN formulation protecting against high-sulfur diesel fuel common in Pakistan',
      'Superior soot control preventing filter clogging and valve train wear',
      'Suited for Toyota Hilux Revo / Vigo 1GD/2GD, Isuzu D-Max, Hino, and Foton commercial fleet',
    ],
    compatibleVehicles: ['Toyota Hilux Revo / Vigo 2.4 / 2.8 D-4D', 'Toyota Fortuner Sigma4 Diesel', 'Isuzu D-Max 3.0 / 2.5', 'Hino 300 / 500 Trucks', 'Perkins & Cummins Diesel Generators'],
    isFeatured: false,
    isBestSeller: true,
    batchCode: 'RNG-26-1540',
    rating: 4.92,
    reviewCount: 22,
    createdAt: '2026-02-18T14:00:00Z',
  },
  {
    id: 'prod-005',
    name: 'Siraj Oil Store PurePlus 5W-40 Fully Synthetic (Blue Dabba 4L)',
    slug: 'siraj-oil-store-pureplus-5w40-fully-synthetic-4l',
    brandId: 'brand-siraj',
    brandName: 'Siraj Oil Store',
    categoryId: 'cat-synthetic',
    categoryName: 'Fully Synthetic Lubricants',
    viscosity: '5W-40',
    oilType: 'Fully Synthetic',
    packSize: '4 Litres',
    pricePKR: 12500,
    originalPricePKR: 13200,
    cartonPricePKR: 5000,
    cartonQuantity: '1 Full Carton (All Pieces Pack)',
    stock: 35,
    image: '/src/assets/images/siraj_oil_store_blue_dabba_1791984381397.jpg',
    dabbaColor: 'Siraj Oil Store Blue Dabba (Normal Size 4L)',
    specifications: {
      apiGrade: 'API SP',
      acea: 'ACEA A3/B4',
      drainInterval: '10,000 KM',
    },
    description: 'Siraj Oil Store PurePlus 5W-40 with Gas-to-Liquid base fluid technology. Provides factory-clean pistons, active cleansing agents, and unbeatable sludge protection under severe high-revving driving conditions.',
    features: [
      '100% Genuine batch verified with official Siraj Oil Store QR authenticity sticker',
      'Ultra-pure base technology with virtually zero oil impurities',
      'High performance wear protection for German and Japanese executive sedans',
    ],
    compatibleVehicles: ['Toyota Land Cruiser V8', 'Honda Civic Oriel / RS', 'Hyundai Sonata 2.5', 'Audi / Mercedes Benz'],
    isFeatured: true,
    isBestSeller: true,
    batchCode: 'SHL-PK-9810',
    rating: 4.96,
    reviewCount: 65,
    createdAt: '2026-01-25T08:00:00Z',
  },
  {
    id: 'prod-006',
    name: 'Siraj Oil Store ESP Advanced Synthetic 5W-30 (Blue Dabba 4L)',
    slug: 'siraj-oil-store-esp-advanced-synthetic-5w30-4l',
    brandId: 'brand-siraj',
    brandName: 'Siraj Oil Store',
    categoryId: 'cat-synthetic',
    categoryName: 'Fully Synthetic Lubricants',
    viscosity: '5W-30',
    oilType: 'Fully Synthetic',
    packSize: '4 Litres',
    pricePKR: 14800,
    originalPricePKR: 15600,
    cartonPricePKR: 5000,
    cartonQuantity: '1 Full Carton (All Pieces Pack)',
    stock: 20,
    image: '/src/assets/images/siraj_oil_store_5w40_blue_dabba_1791993517607.jpg',
    dabbaColor: 'Siraj Oil Store Blue Dabba (Normal Size 4L)',
    specifications: {
      apiGrade: 'API SP / SN PLUS',
      acea: 'ACEA C2/C3',
      drainInterval: '10,000 - 12,000 KM',
    },
    description: 'Siraj Oil Store ESP 5W-30 Emission System Protection is an advanced performance synthetic engine oil designed to help provide exceptional cleaning power and wear protection while protecting diesel particulate filters (DPFs) and catalytic converters.',
    features: [
      'Low Ash content to reduce particulate build-up in modern exhaust systems',
      'Active cleaning agents reduce deposits and sludge build-up for long engine life',
      'Outstanding thermal and oxidation stability allows extended drain intervals',
    ],
    compatibleVehicles: ['Toyota Prado / Land Cruiser 1GD Diesel', 'Mercedes-Benz BlueTEC', 'BMW xDrive Diesels', 'Kia Sorento Diesel', 'Hyundai Tucson Diesel'],
    isFeatured: true,
    isBestSeller: false,
    batchCode: 'MOB-ESP-302',
    rating: 4.98,
    reviewCount: 41,
    createdAt: '2026-01-28T09:30:00Z',
  },
  {
    id: 'prod-007',
    name: 'Siraj Oil Store Compact City 5W-20 Synthetic (Blue Dabba 3L)',
    slug: 'siraj-oil-store-compact-city-5w20-synthetic-3l',
    brandId: 'brand-siraj',
    brandName: 'Siraj Oil Store',
    categoryId: 'cat-car-oil',
    categoryName: 'Car Engine Oil (PCMO)',
    viscosity: '5W-20',
    oilType: 'Fully Synthetic',
    packSize: '3 Litres',
    pricePKR: 6200,
    originalPricePKR: 6700,
    cartonPricePKR: 5000,
    cartonQuantity: '1 Full Carton (All Pieces Pack)',
    stock: 55,
    image: '/src/assets/images/siraj_oil_store_blue_dabba_1791984381397.jpg',
    dabbaColor: 'Siraj Oil Store Blue Dabba (Normal Size 3L)',
    specifications: {
      apiGrade: 'API SP',
      ilsac: 'ILSAC GF-6A',
      drainInterval: '7,000 - 8,000 KM',
    },
    description: 'Siraj Oil Store 5W-20 in exact 3-Litre normal compact canister—the factory specified capacity for Suzuki Alto 660cc, Wagon R, Cultus, and Daihatsu Mira. Prevents fuel wastage and maximizes mileage per liter in stop-and-go Pakistani city traffic.',
    features: [
      'Exact 3L capacity: no leftover wasted oil for 660cc & 1000cc engines',
      'Formulated with Group III ultra-pure synthetic base oil',
      'Enhanced fuel efficiency rating under ILSAC GF-6A',
      'Original sealed blue canister with tamper-proof pull tab',
    ],
    compatibleVehicles: ['Suzuki Alto 660cc (2019-2026)', 'Suzuki Cultus Auto Gear Shift (AGS)', 'Suzuki Wagon R PKDM', 'Daihatsu Mira / Move / Tanto', 'Nissan Dayz / Roox'],
    isFeatured: true,
    isBestSeller: true,
    batchCode: 'ZIC-X7-520',
    rating: 4.89,
    reviewCount: 78,
    createdAt: '2026-02-01T12:00:00Z',
  },
  {
    id: 'prod-008',
    name: 'Siraj Oil Store High Mileage 20W-50 Engine Oil (Blue Dabba 4L)',
    slug: 'siraj-oil-store-high-mileage-20w50-mineral-4l',
    brandId: 'brand-siraj',
    brandName: 'Siraj Oil Store',
    categoryId: 'cat-mineral',
    categoryName: 'Premium Mineral Engine Oil',
    viscosity: '20W-50',
    oilType: 'Mineral',
    packSize: '4 Litres',
    pricePKR: 5400,
    originalPricePKR: 5800,
    cartonPricePKR: 5000,
    cartonQuantity: '1 Full Carton (All Pieces Pack)',
    stock: 60,
    image: '/src/assets/images/siraj_oil_store_5w40_blue_dabba_1791993517607.jpg',
    dabbaColor: 'Siraj Oil Store Blue Dabba (Normal Size 4L)',
    specifications: {
      apiGrade: 'API SL / CF',
      drainInterval: '4,000 - 5,000 KM',
    },
    description: 'Siraj Oil Store 20W-50 High Mileage double action formula cleans away old sludge and protects against new sludge formation. Ideal for high mileage engines, commercial taxis, and vehicles running on CNG or petrol in high ambient summer heat.',
    features: [
      'Provides superior protection against engine sludge and oil burning',
      'Advanced protection against viscosity and thermal breakdown',
      'Helps minimize oil consumption in engines with over 100,000 KM on the odometer',
      'Reliable all-weather lubricity in Punjab, Sindh, and Balochistan heat',
    ],
    compatibleVehicles: ['Toyota Corolla 2.0D / 2.0D Saloon', 'Older Toyota Corolla (1998-2010)', 'Suzuki Bolan / Ravi / Mehran', 'Honda City EXi / i-DSI (older models)', 'Commercial Taxis & Pickups'],
    isFeatured: false,
    isBestSeller: true,
    batchCode: 'CAS-GTX-2050',
    rating: 4.82,
    reviewCount: 63,
    createdAt: '2026-02-05T15:00:00Z',
  },
  {
    id: 'prod-009',
    name: 'Siraj Oil Store OEM Spec 0W-20 Synthetic (Blue Dabba 4L)',
    slug: 'siraj-oil-store-oem-spec-0w20-sp-4l',
    brandId: 'brand-siraj',
    brandName: 'Siraj Oil Store',
    categoryId: 'cat-synthetic',
    categoryName: 'Fully Synthetic Lubricants',
    viscosity: '0W-20',
    oilType: 'Fully Synthetic',
    packSize: '4 Litres',
    pricePKR: 11900,
    originalPricePKR: 12800,
    cartonPricePKR: 5000,
    cartonQuantity: '1 Full Carton (All Pieces Pack)',
    stock: 24,
    image: '/src/assets/images/siraj_oil_store_blue_dabba_1791984381397.jpg',
    dabbaColor: 'Siraj Oil Store Blue Dabba (Normal Size 4L)',
    specifications: {
      apiGrade: 'API SP',
      ilsac: 'ILSAC GF-6A',
      drainInterval: '8,000 - 10,000 KM',
    },
    description: 'Siraj Oil Store 0W-20 factory-fill specification engineered for latest generation Japanese VVTi, Dual VVTi, and Hybrid electric vehicles. Delivers maximum fuel economy and immediate cold start flow protection.',
    features: [
      'Original blue sealed canister with tamper-evident seal and barcoded batch',
      'Ultra-low viscosity 0W-20 minimizes mechanical friction drag',
      'Recommended for Toyota Prius, Corolla Cross Hybrid, Aqua, and Yaris',
    ],
    compatibleVehicles: ['Toyota Corolla Cross Hybrid', 'Toyota Prius / Aqua', 'Toyota Yaris 1.3 / 1.5 ATIV', 'Honda Vezel / Fit Hybrid', 'Suzuki Swift 1.2 Boosterjet / Dualjet'],
    isFeatured: true,
    isBestSeller: false,
    batchCode: 'TYT-GEN-020',
    rating: 4.97,
    reviewCount: 34,
    createdAt: '2026-02-08T16:00:00Z',
  },
  {
    id: 'prod-010',
    name: 'Siraj Oil Store Molygen New Generation 5W-30 (Blue Dabba 4L)',
    slug: 'siraj-oil-store-molygen-5w30-4l',
    brandId: 'brand-siraj',
    brandName: 'Siraj Oil Store',
    categoryId: 'cat-synthetic',
    categoryName: 'Fully Synthetic Lubricants',
    viscosity: '5W-30',
    oilType: 'Fully Synthetic',
    packSize: '4 Litres',
    pricePKR: 16900,
    originalPricePKR: 17800,
    cartonPricePKR: 5000,
    cartonQuantity: '1 Full Carton (All Pieces Pack)',
    stock: 18,
    image: '/src/assets/images/siraj_oil_store_blue_dabba_1791984381397.jpg',
    dabbaColor: 'Siraj Oil Store Blue Dabba (Normal Size 4L)',
    specifications: {
      apiGrade: 'API SP',
      ilsac: 'ILSAC GF-6A',
      drainInterval: '10,000 - 12,000 KM',
    },
    description: 'Siraj Oil Store high-performance low-friction motor oil with innovative Molygen Molecular Friction Control technology. Cuts internal engine friction by up to 15% and ensures silent engine revs.',
    features: [
      'Special anti-friction tungsten additive chemistry',
      'Significantly lowers oil temperature and engine noise on motorway runs',
      '100% genuine factory sealed Blue Dabba',
    ],
    compatibleVehicles: ['Honda Civic RS Turbo', 'Hyundai Sonata', 'Audi A3/A4/A5', 'Subaru Forester / WRX', 'Toyota Crown / Mark X'],
    isFeatured: true,
    isBestSeller: false,
    batchCode: 'LM-MOL-530',
    rating: 4.99,
    reviewCount: 47,
    createdAt: '2026-02-14T13:00:00Z',
  },
  {
    id: 'prod-011',
    name: 'Siraj Oil Store Quartz Pro 5W-30 (Blue Dabba 4L)',
    slug: 'siraj-oil-store-quartz-pro-5w30-4l',
    brandId: 'brand-siraj',
    brandName: 'Siraj Oil Store',
    categoryId: 'cat-car-oil',
    categoryName: 'Car Engine Oil (PCMO)',
    viscosity: '5W-30',
    oilType: 'Fully Synthetic',
    packSize: '4 Litres',
    pricePKR: 9200,
    originalPricePKR: 9900,
    cartonPricePKR: 5000,
    cartonQuantity: '1 Full Carton (All Pieces Pack)',
    stock: 30,
    image: '/src/assets/images/siraj_oil_store_5w40_blue_dabba_1791993517607.jpg',
    dabbaColor: 'Siraj Oil Store Blue Dabba (Normal Size 4L)',
    specifications: {
      apiGrade: 'API SP',
      ilsac: 'ILSAC GF-6A',
      drainInterval: '8,000 - 10,000 KM',
    },
    description: 'Siraj Oil Store synthetic engine oil with Age-Resistance polymer technology. Offers optimal engine cleanliness and protection against LSPI phenomenon in downsized turbocharged engines.',
    features: [
      'Official Pakistan market distribution product with tamper-proof seal',
      'Age Resistance Technology ensuring chemical stability at motorway temperatures',
      'Approved for GM dexos1 Gen 2 and Ford standards',
    ],
    compatibleVehicles: ['Toyota Corolla / Yaris', 'Honda Civic / City', 'Kia Stonic', 'Changan Alsvin', 'MG HS / ZS'],
    isFeatured: false,
    isBestSeller: true,
    batchCode: 'TOT-Q9-530',
    rating: 4.86,
    reviewCount: 31,
    createdAt: '2026-02-16T10:00:00Z',
  },
  {
    id: 'prod-012',
    name: 'Siraj Oil Store Super 4T Motorcycle 10W-40 (Blue Dabba 1L)',
    slug: 'siraj-oil-store-super-4t-10w40-1l',
    brandId: 'brand-siraj',
    brandName: 'Siraj Oil Store',
    categoryId: 'cat-motorcycle-oil',
    categoryName: 'Motorcycle Engine Oil (4T/2T)',
    viscosity: '10W-40',
    oilType: 'Semi-Synthetic',
    packSize: '1 Litre',
    pricePKR: 1650,
    originalPricePKR: 1850,
    cartonPricePKR: 5000,
    cartonQuantity: '1 Full Carton (All Pieces Pack)',
    stock: 85,
    image: '/src/assets/images/siraj_oil_store_moto_4t_blue_bottle_1791993518152.jpg',
    dabbaColor: 'Siraj Oil Store Blue Dabba (Normal 1L Bike Pack)',
    specifications: {
      apiGrade: 'API SL',
      jaso: 'JASO MA2',
      drainInterval: '2,000 - 3,000 KM',
    },
    description: 'Siraj Oil Store high-quality semi-synthetic motorcycle oil with C.O.R.E.+ Technology. Cleans engine parts, protects gear teeth, and improves acceleration with smooth clutch bite in traffic.',
    features: [
      'JASO MA2 certified for optimum wet clutch lockup',
      'Heat-shielding polymers to resist engine overheating in heavy traffic',
      'Genuine sealed cap with anti-counterfeit induction ring',
    ],
    compatibleVehicles: ['Honda CG 125', 'Honda CD 70', 'United 70 / 125', 'Yamaha YBR 125', 'Road Prince 70'],
    isFeatured: false,
    isBestSeller: true,
    batchCode: 'CLT-HAV-4T',
    rating: 4.87,
    reviewCount: 72,
    createdAt: '2026-02-19T09:00:00Z',
  },
];

const initialOrders: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'SOS-PK-10491',
    customer: {
      fullName: 'Muhammad Tariq',
      phone: '0300-8451299',
      email: 'tariq.autos@gmail.com',
      city: 'Lahore',
      address: 'House 42, Street 7, Sector Y, DHA Phase 3',
      instructions: 'Please call before delivering, gate code #4.',
    },
    items: [
      {
        id: 'item-101',
        productId: 'prod-001',
        productName: 'Siraj Formula Ultra Synthetic 5W-30 (Blue Dabba 4L)',
        brandName: 'Siraj Formula Signature',
        viscosity: '5W-30',
        packSize: '4 Litres',
        pricePKR: 8850,
        quantity: 1,
        image: '/src/assets/images/siraj_synthetic_blue_dabba_1791981782512.jpg',
      },
    ],
    subtotalPKR: 8850,
    discountPKR: 0,
    shippingFeePKR: 250,
    totalPKR: 9100,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'dispatched',
    trackingNumber: 'TCS-LHR-8829104',
    courierName: 'TCS Express Pakistan',
    estimatedDeliveryDays: '1-2 Days',
    createdAt: '2026-03-01T09:15:00Z',
    updatedAt: '2026-03-01T14:30:00Z',
  },
  {
    id: 'ord-1002',
    orderNumber: 'SOS-PK-10492',
    customer: {
      fullName: 'Kamran Ali Shah',
      phone: '0321-4458921',
      email: 'kamran.shah@yahoo.com',
      city: 'Karachi',
      address: 'Flat 402, Al-Noor Heights, Block 13-D, Gulshan-e-Iqbal',
      instructions: 'Deliver to security guard if unavailable.',
    },
    items: [
      {
        id: 'item-102',
        productId: 'prod-003',
        productName: 'Velocitech Moto-X 4T 10W-40 Synthetic Motorcycle Oil (1L)',
        brandName: 'Siraj Formula Signature',
        viscosity: '10W-40',
        packSize: '1 Litre',
        pricePKR: 2150,
        quantity: 2,
        image: '/src/assets/images/motorcycle_4t_oil_bottle_1791981783829.jpg',
      },
      {
        id: 'item-103',
        productId: 'prod-007',
        productName: 'ZIC X7 5W-20 Synthetic Motor Oil (3L Pack)',
        brandName: 'ZIC (SK Lubricants)',
        viscosity: '5W-20',
        packSize: '3 Litres',
        pricePKR: 6200,
        quantity: 1,
        image: '/src/assets/images/siraj_synthetic_blue_dabba_1791981782512.jpg',
      },
    ],
    subtotalPKR: 10500,
    discountPKR: 500,
    shippingFeePKR: 0, // Free delivery above 7000 PKR
    totalPKR: 10000,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'verified',
    orderStatus: 'processing',
    trackingNumber: 'LEO-KHI-49021',
    courierName: 'Leopards Courier Service',
    estimatedDeliveryDays: '2-3 Days',
    createdAt: '2026-03-02T11:45:00Z',
    updatedAt: '2026-03-02T16:00:00Z',
  },
];

const initialInquiries: WholesaleInquiry[] = [
  {
    id: 'inq-01',
    fullName: 'Malik Zeeshan',
    businessName: 'Zeeshan Auto Workshop & Oil Service',
    phone: '0301-7788441',
    city: 'Faisalabad',
    productsInterested: 'Siraj Formula Blue Dabba 5W-30 (10 Cartons), Velocitech Moto-X (20 Cartons)',
    estimatedMonthlyVolume: '30 to 50 Cartons per month',
    notes: 'Require wholesale dealer rate list for workshop supply in Peoples Colony.',
    status: 'new',
    createdAt: '2026-03-02T14:10:00Z',
  },
  {
    id: 'inq-02',
    fullName: 'Haji Abdul Qayyum',
    businessName: 'Qayyum Transport Logistics Fleet',
    phone: '0333-5192837',
    city: 'Rawalpindi',
    productsInterested: 'Renegade 15W-40 CI-4 Diesel (50 drums / jugs)',
    estimatedMonthlyVolume: 'Over 100 Litres monthly',
    notes: 'Operating 25 Bedford and Hino trucks on CPEC route. Looking for genuine bulk supply.',
    status: 'contacted',
    createdAt: '2026-02-28T10:00:00Z',
  },
];

const initialAdminUsers: AdminUser[] = [
  {
    id: 'admin-01',
    username: 'admin',
    fullName: 'Siraj Ahmed (Store Director)',
    role: 'super_admin',
    email: 'admin@sirajoilstore.pk',
  },
];

class DatabaseManager {
  private data: StoreDatabase;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): StoreDatabase {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed: StoreDatabase = JSON.parse(raw);
        // Guarantee all products have Single Bottle price Rs. 500, carton 5000, and Siraj Oil Store brand
        if (parsed.products && parsed.products.length > 0) {
          parsed.products = parsed.products.map((p) => ({
            ...p,
            pricePKR: p.pricePKR && p.pricePKR <= 1000 ? p.pricePKR : 500,
            originalPricePKR: 650,
            cartonPricePKR: p.cartonPricePKR || 5000,
            cartonQuantity: '1 Full Carton (All Pieces Pack)',
            brandId: 'brand-siraj',
            brandName: 'Siraj Oil Store',
            dabbaColor: 'Siraj Oil Store Blue Dabba (Normal Small Size)',
          }));
        }
        parsed.brands = initialBrands;
        this.saveData(parsed);
        return parsed;
      }
    } catch (err) {
      console.warn('Could not read store-data.json, initializing fresh store:', err);
    }

    const initialStore: StoreDatabase = {
      products: initialProducts.map((p) => ({
        ...p,
        pricePKR: 500,
        originalPricePKR: 650,
        cartonPricePKR: 5000,
        brandId: 'brand-siraj',
        brandName: 'Siraj Oil Store',
      })),
      categories: initialCategories,
      brands: initialBrands,
      customers: [],
      orders: initialOrders,
      payments: [],
      inventoryLogs: [],
      inquiries: initialInquiries,
      adminUsers: initialAdminUsers,
    };

    this.saveData(initialStore);
    return initialStore;
  }

  private saveData(data: StoreDatabase) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving store data:', err);
    }
  }

  // Products
  getProducts(): Product[] {
    return this.data.products;
  }

  getProductById(id: string): Product | undefined {
    return this.data.products.find((p) => p.id === id);
  }

  createProduct(productData: Omit<Product, 'id' | 'createdAt'>): Product {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
    };
    this.data.products.push(newProduct);
    this.data.inventoryLogs.push({
      id: `inv-${Date.now()}`,
      productId: newProduct.id,
      productName: newProduct.name,
      changeType: 'restock',
      quantityChange: newProduct.stock,
      previousStock: 0,
      newStock: newProduct.stock,
      notes: 'Initial product creation restock',
      timestamp: new Date().toISOString(),
    });
    this.saveData(this.data);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.data.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const previous = this.data.products[index];
    if (updates.stock !== undefined && updates.stock !== previous.stock) {
      const diff = updates.stock - previous.stock;
      this.data.inventoryLogs.push({
        id: `inv-${Date.now()}`,
        productId: previous.id,
        productName: previous.name,
        changeType: diff > 0 ? 'restock' : 'adjustment',
        quantityChange: diff,
        previousStock: previous.stock,
        newStock: updates.stock,
        notes: 'Manual inventory adjustment via admin dashboard',
        timestamp: new Date().toISOString(),
      });
    }

    const updated = { ...previous, ...updates };
    this.data.products[index] = updated;
    this.saveData(this.data);
    return updated;
  }

  deleteProduct(id: string): boolean {
    const index = this.data.products.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.data.products.splice(index, 1);
    this.saveData(this.data);
    return true;
  }

  // Categories & Brands
  getCategories(): Category[] {
    return this.data.categories;
  }

  createCategory(categoryData: Omit<Category, 'id' | 'itemCount'>): Category {
    const newCat: Category = {
      ...categoryData,
      id: `cat-${Date.now().toString().slice(-4)}`,
      itemCount: 0,
    };
    this.data.categories.push(newCat);
    this.saveData(this.data);
    return newCat;
  }

  getBrands(): Brand[] {
    return this.data.brands;
  }

  createBrand(brandData: Omit<Brand, 'id'>): Brand {
    const newBrand: Brand = {
      ...brandData,
      id: `brand-${Date.now().toString().slice(-4)}`,
    };
    this.data.brands.push(newBrand);
    this.saveData(this.data);
    return newBrand;
  }

  // Orders
  getOrders(): Order[] {
    return this.data.orders;
  }

  getOrderById(id: string): Order | undefined {
    return this.data.orders.find((o) => o.id === id || o.orderNumber.toLowerCase() === id.toLowerCase());
  }

  createOrder(orderInput: {
    customer: {
      fullName: string;
      phone: string;
      email?: string;
      city: string;
      address: string;
      instructions?: string;
    };
    items: {
      productId: string;
      quantity: number;
    }[];
    paymentMethod: 'cod' | 'bank_transfer' | 'online_gateway';
    couponCode?: string;
  }): { success: boolean; order?: Order; error?: string } {
    // 1. Stock validation & calculation
    const validatedItems: OrderItem[] = [];
    let subtotal = 0;

    for (const item of orderInput.items) {
      const product = this.getProductById(item.productId);
      if (!product) {
        return { success: false, error: `Product ID ${item.productId} was not found in catalog.` };
      }
      if (product.stock < item.quantity) {
        return {
          success: false,
          error: `Insufficient stock for ${product.name}. Requested: ${item.quantity}, Available: ${product.stock}`,
        };
      }

      const itemTotal = product.pricePKR * item.quantity;
      subtotal += itemTotal;
      validatedItems.push({
        id: `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        productId: product.id,
        productName: product.name,
        brandName: product.brandName,
        viscosity: product.viscosity,
        packSize: product.packSize,
        pricePKR: product.pricePKR,
        quantity: item.quantity,
        image: product.image,
      });
    }

    // 2. Coupon code discount
    let discount = 0;
    if (orderInput.couponCode) {
      const code = orderInput.couponCode.trim().toUpperCase();
      if (code === 'SIRAJ10') {
        discount = Math.round(subtotal * 0.1); // 10% off
      } else if (code === 'GENUINE500' && subtotal >= 5000) {
        discount = 500;
      }
    }

    // 3. Shipping rate by city
    let shipping = 350;
    const cityLower = orderInput.customer.city.trim().toLowerCase();
    if (subtotal >= 7000) {
      shipping = 0; // Free delivery over 7,000 PKR
    } else if (cityLower.includes('lahore')) {
      shipping = 200;
    } else if (cityLower.includes('karachi') || cityLower.includes('islamabad') || cityLower.includes('rawalpindi')) {
      shipping = 300;
    }

    const total = Math.max(0, subtotal - discount + shipping);

    // 4. Deduct stock atomically and log inventory changes
    for (const item of orderInput.items) {
      const p = this.getProductById(item.productId)!;
      const prevStock = p.stock;
      const newStock = prevStock - item.quantity;
      p.stock = newStock;

      this.data.inventoryLogs.push({
        id: `inv-${Date.now()}-${p.id}`,
        productId: p.id,
        productName: p.name,
        changeType: 'order_sale',
        quantityChange: -item.quantity,
        previousStock: prevStock,
        newStock: newStock,
        notes: `Sold via Order SOS-PK-${Date.now().toString().slice(-5)}`,
        timestamp: new Date().toISOString(),
      });
    }

    // 5. Generate unique Pakistani order number
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `SOS-PK-${randomDigits}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customer: orderInput.customer,
      items: validatedItems,
      subtotalPKR: subtotal,
      discountPKR: discount,
      shippingFeePKR: shipping,
      totalPKR: total,
      paymentMethod: orderInput.paymentMethod,
      paymentStatus: 'pending',
      orderStatus: 'pending',
      trackingNumber: `SOS-TRK-${Math.floor(100000 + Math.random() * 900000)}`,
      courierName: 'TCS & Leopards Verified Logistics',
      estimatedDeliveryDays: cityLower.includes('lahore') ? '24-48 Hours' : '2-3 Business Days',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.data.orders.unshift(newOrder);

    // Record customer
    const existingCust = this.data.customers.find((c) => c.phone === orderInput.customer.phone);
    if (existingCust) {
      existingCust.totalOrders += 1;
      existingCust.address = orderInput.customer.address;
      existingCust.city = orderInput.customer.city;
    } else {
      this.data.customers.push({
        id: `cust-${Date.now()}`,
        fullName: orderInput.customer.fullName,
        phone: orderInput.customer.phone,
        email: orderInput.customer.email,
        city: orderInput.customer.city,
        address: orderInput.customer.address,
        totalOrders: 1,
        createdAt: new Date().toISOString(),
      });
    }

    this.saveData(this.data);
    return { success: true, order: newOrder };
  }

  updateOrderStatus(
    orderId: string,
    status: OrderStatus,
    extra?: { trackingNumber?: string; courierName?: string; paymentStatus?: PaymentStatus }
  ): Order | null {
    const order = this.data.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (!order) return null;

    order.orderStatus = status;
    order.updatedAt = new Date().toISOString();

    if (extra?.trackingNumber) order.trackingNumber = extra.trackingNumber;
    if (extra?.courierName) order.courierName = extra.courierName;
    if (extra?.paymentStatus) order.paymentStatus = extra.paymentStatus;

    // If cancelled, restock inventory
    if (status === 'cancelled') {
      for (const item of order.items) {
        const prod = this.getProductById(item.productId);
        if (prod) {
          const prev = prod.stock;
          prod.stock += item.quantity;
          this.data.inventoryLogs.push({
            id: `inv-${Date.now()}-${prod.id}`,
            productId: prod.id,
            productName: prod.name,
            changeType: 'cancellation_restock',
            quantityChange: item.quantity,
            previousStock: prev,
            newStock: prod.stock,
            notes: `Restocked from cancelled Order ${order.orderNumber}`,
            timestamp: new Date().toISOString(),
          });
        }
      }
    }

    this.saveData(this.data);
    return order;
  }

  // Wholesale & Bulk Inquiries
  createInquiry(inquiryData: Omit<WholesaleInquiry, 'id' | 'createdAt' | 'status'>): WholesaleInquiry {
    const newInquiry: WholesaleInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    this.data.inquiries.unshift(newInquiry);
    this.saveData(this.data);
    return newInquiry;
  }

  getInquiries(): WholesaleInquiry[] {
    return this.data.inquiries;
  }

  updateInquiryStatus(id: string, status: WholesaleInquiry['status']): WholesaleInquiry | null {
    const inquiry = this.data.inquiries.find((i) => i.id === id);
    if (!inquiry) return null;
    inquiry.status = status;
    this.saveData(this.data);
    return inquiry;
  }

  // Inventory logs
  getInventoryLogs(): InventoryLog[] {
    return this.data.inventoryLogs;
  }

  // Customers
  getCustomers(): Customer[] {
    return this.data.customers;
  }

  // Statistics for admin dashboard
  getStats() {
    const totalOrders = this.data.orders.length;
    const totalRevenuePKR = this.data.orders
      .filter((o) => o.orderStatus !== 'cancelled')
      .reduce((sum, o) => sum + o.totalPKR, 0);

    const pendingOrders = this.data.orders.filter((o) => o.orderStatus === 'pending').length;
    const lowStockProducts = this.data.products.filter((p) => p.stock < 10);
    const totalProducts = this.data.products.length;

    return {
      totalOrders,
      totalRevenuePKR,
      pendingOrders,
      lowStockCount: lowStockProducts.length,
      totalProducts,
      recentOrders: this.data.orders.slice(0, 5),
      lowStockProducts,
    };
  }
}

export const db = new DatabaseManager();

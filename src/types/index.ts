export type CategoryId = 
  | 'all'
  | 'namkeen'
  | 'sweets'
  | 'cookies'
  | 'chips-savories'
  | 'frozen'
  | 'gift-boxes';

export interface ProductVariant {
  id: string;
  weight: string;
  price: number; // in INR
  originalPrice?: number;
  inStock: boolean;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  tagline: string;
  category: CategoryId;
  categoryName: string;
  flavorProfile: 'spicy' | 'sweet' | 'crunchy' | 'savory';
  price: number; // base price in INR
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  longDescription: string;
  ingredients: string[];
  nutrition: {
    calories: string;
    fat: string;
    carbs: string;
    protein: string;
    sodium: string;
  };
  spiceLevel: 1 | 2 | 3 | 4 | 5; // 1 = mild, 5 = fiery
  crunchIndex: number; // 0-100%
  isBestseller?: boolean;
  isNew?: boolean;
  dietary: ('Vegetarian' | 'Gluten-Free' | 'Jain-Friendly' | 'Vegan')[];
  variants: ProductVariant[];
  imageKey: string;
  bgTheme: string;
  accentColor: string;
}

export interface CartItem {
  id: string; // product_id + variant_id
  productId: string;
  variantId: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode?: string;
}

export interface OrderAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'confirmed' | 'roasted_packed' | 'dispatched' | 'out_for_delivery' | 'delivered';
  items: {
    productName: string;
    variantWeight: string;
    price: number;
    quantity: number;
    imageKey: string;
  }[];
  shippingAddress: OrderAddress;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  savedAddresses?: OrderAddress[];
}

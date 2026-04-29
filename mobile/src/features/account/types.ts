export type AuthSession = {
  userId: string;
  email: string | null;
  accessToken: string;
  refreshToken: string;
  expiresAt: number | null;
};

export type ProfileRecord = {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  defaultAddress: string;
  defaultLat: number | null;
  defaultLng: number | null;
  locale: 'ar' | 'en';
  createdAt: string;
  updatedAt: string;
};

export type OrderLine = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  image?: string;
};

export type OrderSummary = {
  id: string;
  userId: string;
  paymentReference: string;
  source: 'mobile_app';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  customerNotes: string;
  customerLat: number | null;
  customerLng: number | null;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  finalTotal: number;
  locale: 'ar' | 'en';
  paymentStatus: 'paid';
  createdAt: string;
  items: OrderLine[];
};

export type SaveProfileInput = {
  userId: string;
  email: string;
  fullName: string;
  phone: string;
  defaultAddress: string;
  defaultLat?: number;
  defaultLng?: number;
  locale: 'ar' | 'en';
};

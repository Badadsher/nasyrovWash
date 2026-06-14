export type ServiceType = 'standard' | 'deep' | 'renovation' | 'windows' | 'office';

export interface ExtraService {
  id: string;
  name: string;
  price: number;
  icon: string;
  unit: string;
  quantity: number;
  maxQuantity?: number;
}

export interface Cleaner {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  ordersCount: number;
  experience: string;
  specialty: string[];
}

export interface Booking {
  id: string;
  serviceType: ServiceType;
  area: number;
  rooms: number;
  bathrooms: number;
  extras: { id: string; name: string; quantity: number; price: number }[];
  totalPrice: number;
  date: string;
  time: string;
  address: string;
  contactName: string;
  contactPhone: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  serviceType: string;
  date: string;
  isVerified: boolean;
}

export type DeliveryStatus = 
  | 'pending'
  | 'assigned'
  | 'picked-up'
  | 'in-transit'
  | 'delivered'
  | 'issue'
  | 'confirmed'
  | 'denied';

export interface DeliveryTask {
  id: string;
  orderNumber: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  deliveryTime: string;
  assignedAt: string;
  status: DeliveryStatus;
  specialInstructions?: string;
  items: {
    name: string;
    quantity: number;
  }[];
  earnings: number;
  distance: string;
  estimatedTime: string;
  storeAddress: string;
  storeName: string;
  paymentMethod: 'cod' | 'online';
}

export interface DeliverySummary {
  totalDeliveries: number;
  totalEarnings: number;
  todayEarnings: number;
  weeklyEarnings: number;
  ratings: number;
  activeHours: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'task' | 'system' | 'earnings' | 'issue';
}

export interface DeliveryPartner {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'online' | 'offline' | 'on-delivery';
  joinedDate: string;
  totalDeliveries: number;
  rating: number;
}

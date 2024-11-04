import { Service } from "./service";
import { UserProfile } from "./profile";
import { Dispute } from "./dispute";

export interface Order {
  id: string;
  totalAmount: number;
  currency: string;
  status: OrderStatus;
  description: string;
  paymentMethod: PaymentMethodType;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  buyerId: string;
  sellerId: string;
  serviceId?: string;
  projectId?: string;
  disputeid?: string;

  // Relations
  service?: Service;
  buyer?: UserProfile;
  seller?: UserProfile;
  dispute?: Dispute;
}

export type OrderStatus =
  | "PENDING"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "IN_REVISION"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentMethodType = "WALLET" | "EXTERNAL";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

import type { Order } from "./order";
import type { Service } from "./service";
import type { UserProfile } from "./profile";

export type DisputeStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export interface Dispute {
  id: string;
  serviceId?: string;
  projectId?: string;
  initiatorSellerId?: string;
  initiatorBuyerId?: string;
  description: string;
  status: DisputeStatus;
  createdAt: string;
  updatedAt: string;

  // Relations
  service?: Service;
  initiatorSeller?: UserProfile;
  initiatorBuyer?: UserProfile;
  participants?: DisputeParticipant[];
  messages?: DisputeMessage[];
  orders?: Order[];
}

export interface DisputeParticipant {
  id: string;
  disputeId: string;
  participantSellerId?: string;
  participantBuyerId?: string;
  role: string;
  joinedAt: string;

  // Relations
  dispute?: Dispute;
  participantSeller?: UserProfile;
  participantBuyer?: UserProfile;
}

export interface DisputeMessage {
  id: string;
  disputeId: string;
  senderSellerId?: string;
  senderBuyerId?: string;
  content: string;
  createdAt: string;
  isRead: boolean;

  // Relations
  dispute?: Dispute;
  senderSeller?: UserProfile;
  senderBuyer?: UserProfile;
}

export interface Message {
  id: string;
  chatRoomId: string;
  senderId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  sender?: {
    id: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    profilePic?: string;
  };
}

export interface ChatRoom {
  id: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
  participants: ChatRoomParticipant[];
  lastMessage?: Message;
}

export interface ChatRoomParticipant {
  id: string;
  chatRoomId: string;
  participantId: string;
  role: string;
  createdAt: string;
  profile: {
    id: string;
    firstName?: string;
    lastName?: string;
    profilePic?: string;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  username: string;
  role: "USER" | "ADMIN";
  profile: {
    firstName: string | null;
    lastName: string | null;
    profilePic: string | null;
    title: string | null;
    phoneNumber: string | null;
    address: string | null;
    bio: string | null;
  };
  preferences: {
    theme: "LIGHT" | "DARK" | "SYSTEM";
    view: "Seller" | "Buyer";
    notifications: boolean;
    language: string;
    showOnlineStatus: boolean;
    notificationFrequency: "INSTANT" | "DAILY" | "WEEKLY";
  };
  stats: {
    averageRating: number;
    totalReviews: number;
    activeOrders: number;
    completedOrders: number;
  };
}

export interface ProfileUpdateInput {
  name?: string;
  username?: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    profilePic?: string;
    title?: string;
    phoneNumber?: string;
    address?: string;
    bio?: string;
  };
  preferences?: {
    theme?: "LIGHT" | "DARK" | "SYSTEM";
    view?: "Seller" | "Buyer";
    notifications?: boolean;
    language?: string;
    showOnlineStatus?: boolean;
    notificationFrequency?: "INSTANT" | "DAILY" | "WEEKLY";
  };
}

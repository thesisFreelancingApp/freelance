export interface Package {
  id: string;
  name: string;
  description: string;
  price: string;
  deliveryTime: number;
  revisions: number;
  features: string[];
  serviceId: string;
}

interface Rating {
  id: string;
  rating: number;
  review: string | null;
  createdAt: Date;
  rater: {
    firstName: string | null;
    lastName: string | null;
    profilePic: string | null;
  };
}

interface Creator {
  id: string;
  name: string;
  profilePic: string | null;
  profile: {
    firstName: string | null;
    lastName: string | null;
    profilePic: string | null;
  };
  sellerRating: number | null;
  totalEarnings: number;
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  creator: Creator;
  ratings: Rating[];
  packages: Package[];
  rating: number; // Average rating calculated from ratings array
}

export interface ServiceMedia {
  images?: string[];
  videos?: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  medias: ServiceMedia | null;
  tags: string[];
  creator: {
    id: string;
    profile: {
      firstName: string | null;
      lastName: string | null;
      profilePic: string | null;
    };
  };
  packages: {
    id: string;
    name: string | null;
    description: string | null;
    deliveryTime: number | null;
    price: string | null;
    revisions: number | null;
    features: string[];
  }[];
  ratings: {
    id: string;
    rating: number;
    review: string | null;
    createdAt: string;
    rater: {
      firstName: string | null;
      lastName: string | null;
      profilePic: string | null;
    };
  }[];
}

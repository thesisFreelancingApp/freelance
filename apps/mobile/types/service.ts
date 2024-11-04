export interface ServiceMedia {
  images?: string[];
  videos?: string[];
}

export interface ServiceCreationInput {
  name: string;
  description: string;
  images: string[];
  tags: string[];
  categoryId: number;
  packages: ServicePackageInput[];
}

export interface ServicePackageInput {
  name: string;
  description?: string;
  deliveryTime: number;
  price: number;
  revisions?: number;
  features: string[];
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  medias?: {
    images?: string[];
  };
  isPublic: boolean;
  tags: string[];
  creatorId: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  packages: ServicePackage[];
  ratings?: Rating[];
  creator?: {
    id: string;
    profile?: {
      firstName?: string;
      lastName?: string;
      profilePic?: string;
      title?: string;
    };
  };
}

export interface ServicePackage {
  id: string;
  serviceId: string;
  name?: string;
  description?: string;
  deliveryTime?: number;
  price?: number;
  revisions?: number;
  features: string[];
}

export interface Rating {
  id: string;
  rating: number;
  review: string | null;
  createdAt: string;
  rater: {
    firstName: string | null;
    lastName: string | null;
    profilePic: string | null;
  };
}

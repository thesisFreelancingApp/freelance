export interface Package {
  price: string;
  description?: string;
}

export interface Service {
  id: number;
  name: string;
  description: string | null;
  ratings: Rating[];
  category: Category;
  images: string[];
  packages: Package[];
}

interface Rating {
  id: number;
  rating: number;
  review: string | null;
  createdAt: Date;
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  level: number;
  parentId: number | null;
}

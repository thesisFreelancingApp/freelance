import { Prisma } from "@prisma/client";

export interface MediaItem {
  url: string;
  type: string;
}

export interface ServiceData {
  images: any;
  name: string;
  description: string;
  tags: string[];
  medias: MediaItem[]; // Utilisé pour le frontend
}

export interface Packages {
  name: string;
  description: string;
  price: Prisma.Decimal;
  deliveryTime: number;
  revisions: number;
  features: string[];
}

export interface Category {
  name: string;
  children: SubCategory[];
  id: number;
}

export interface SubCategory {
  name: string;
  id: number;
  children?: SubCategory[];
}

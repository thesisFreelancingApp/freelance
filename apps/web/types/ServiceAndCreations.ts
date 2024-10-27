import { Prisma } from "@prisma/client";

export interface ServiceData {
  name: string;
  description?: string;
  tags: string[];
  images: string[];
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

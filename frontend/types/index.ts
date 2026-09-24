export interface Property {
  id: number;
  title: string;
  description: string | null;
  price: string;
  type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  areaSqm: number | null;
  location: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  minPrice?: string;
  maxPrice?: string;
  type?: string;
  location?: string;
  bedrooms?: string;
}
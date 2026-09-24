import { Property, PropertyFilters } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProperties(filters: PropertyFilters = {}): Promise<Property[]> {
  const params = new URLSearchParams();

  if (filters.minPrice) params.append('minPrice', filters.minPrice);
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
  if (filters.type) params.append('type', filters.type);
  if (filters.location) params.append('location', filters.location);
  if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);

  const fullUrl = `${API_URL}/properties?${params.toString()}`;

  const response = await fetch(fullUrl, {
    cache: 'no-store',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error('Error al obtener los inmuebles');
  }

  return data;
}

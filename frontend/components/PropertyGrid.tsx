import { Property } from '@/types';
import PropertyCard from './PropertyCard';

interface Props {
  properties: Property[];
}

export default function PropertyGrid({ properties }: Props) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No se encontraron inmuebles con estos criterios.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
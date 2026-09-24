import { Property } from '@/types';

interface Props {
  property: Property;
}

export default function PropertyCard({ property }: Props) {
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(Number(property.price));

  const placeholderImg = `https://picsum.photos/seed/${property.id}/500/350`;

  return (
    <div className="bg-cream rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-beige-dark">
      <div className="relative h-56">
        <img
          src={placeholderImg}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-terracota text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
          {property.type}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg text-charcoal truncate">{property.title}</h3>
        <p className="text-charcoal/60 text-sm mb-2">📍 {property.location}</p>
        <p className="text-terracota font-bold text-xl mb-3">{formattedPrice}</p>
        <div className="flex gap-4 text-sm text-charcoal/70 border-t border-beige-dark pt-3">
          {property.bedrooms !== null && <span>🛏️ {property.bedrooms}</span>}
          {property.bathrooms !== null && <span>🚿 {property.bathrooms}</span>}
          {property.areaSqm !== null && <span>📐 {property.areaSqm} m²</span>}
        </div>
      </div>
    </div>
  );
}
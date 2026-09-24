import { getProperties } from '@/lib/api';
import PropertyGrid from '@/components/PropertyGrid';
import FilterPanel from '@/components/FilterPanel';
import Hero from '@/components/Hero';

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const properties = await getProperties({
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    type: params.type,
    location: params.location,
    bedrooms: params.bedrooms,
  });

  return (
    <main className="bg-cream min-h-screen">
      <Hero />
      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-[1]">
        <FilterPanel />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <PropertyGrid properties={properties} />
      </div>
    </main>
  );
}
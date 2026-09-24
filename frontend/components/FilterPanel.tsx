'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function FilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || '');

  function handleSearch() {
    const params = new URLSearchParams();

    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (type) params.set('type', type);
    if (location) params.set('location', location);
    if (bedrooms) params.set('bedrooms', bedrooms);

    router.push(`/?${params.toString()}`);
  }

  function handleClear() {
    setMinPrice('');
    setMaxPrice('');
    setType('');
    setLocation('');
    setBedrooms('');
    router.push('/');
  }

  return (
    <div className="bg-gray-50 border rounded-lg p-4 mb-6 flex flex-wrap gap-3 items-end">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Precio mínimo</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border rounded px-3 py-2 w-36"
          placeholder="0"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Precio máximo</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded px-3 py-2 w-36"
          placeholder="Sin límite"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Tipo</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded px-3 py-2 w-40"
        >
          <option value="">Todos</option>
          <option value="apartment">Apartamento</option>
          <option value="house">Casa</option>
          <option value="commercial">Local comercial</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Zona</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded px-3 py-2 w-40"
          placeholder="Ej: Poblado"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Habitaciones</label>
        <input
          type="number"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="border rounded px-3 py-2 w-28"
          placeholder="Cualquiera"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Buscar
      </button>

      <button
        onClick={handleClear}
        className="border px-5 py-2 rounded hover:bg-gray-100"
      >
        Limpiar
      </button>
    </div>
  );
}
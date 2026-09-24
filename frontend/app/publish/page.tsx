'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createProperty } from '@/lib/api';

export default function PublishPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    type: 'apartment',
    bedrooms: '',
    bathrooms: '',
    areaSqm: '',
    location: '',
  });

  useEffect(() => {
    const savedToken = localStorage.getItem('domusgo_token');
    if (!savedToken) {
      router.push('/login');
    } else {
      setToken(savedToken);
    }
  }, [router]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!token) return;

    try {
      await createProperty(
        {
          ...form,
          price: Number(form.price),
          bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
          bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
          areaSqm: form.areaSqm ? Number(form.areaSqm) : null,
        },
        token
      );
      router.push('/');
    } catch (err) {
      setError('No se pudo publicar el inmueble. Verifica los datos.');
    }
  }

  if (!token) return null; // evita parpadeo mientras redirige a /login

  return (
    <main className="min-h-screen bg-beige px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-cream rounded-xl shadow-sm border border-beige-dark p-8 max-w-xl mx-auto"
      >
        <h1 className="text-2xl font-bold text-charcoal mb-6">Publicar inmueble</h1>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <label className="block text-sm text-charcoal/70 mb-1">Título</label>
        <input name="title" value={form.title} onChange={handleChange} className="border rounded px-3 py-2 w-full mb-4" required />

        <label className="block text-sm text-charcoal/70 mb-1">Descripción</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="border rounded px-3 py-2 w-full mb-4" rows={3} />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-charcoal/70 mb-1">Precio</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} className="border rounded px-3 py-2 w-full" required />
          </div>
          <div>
            <label className="block text-sm text-charcoal/70 mb-1">Tipo</label>
            <select name="type" value={form.type} onChange={handleChange} className="border rounded px-3 py-2 w-full">
              <option value="apartment">Apartamento</option>
              <option value="house">Casa</option>
              <option value="commercial">Local comercial</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm text-charcoal/70 mb-1">Habitaciones</label>
            <input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block text-sm text-charcoal/70 mb-1">Baños</label>
            <input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block text-sm text-charcoal/70 mb-1">Área (m²)</label>
            <input name="areaSqm" type="number" value={form.areaSqm} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
          </div>
        </div>

        <label className="block text-sm text-charcoal/70 mb-1">Ubicación</label>
        <input name="location" value={form.location} onChange={handleChange} className="border rounded px-3 py-2 w-full mb-6" required />

        <button type="submit" className="bg-terracota text-white w-full py-2 rounded hover:bg-terracota-dark transition-colors">
          Publicar
        </button>
      </form>
    </main>
  );
}
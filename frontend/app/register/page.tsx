'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    try {
      await register(fullName, email, password);
      router.push('/login');
    } catch (err) {
      setError('No se pudo completar el registro. Intenta con otro correo.');
    }
  }

  return (
    <main className="min-h-screen bg-beige flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-cream rounded-xl shadow-sm border border-beige-dark p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-charcoal mb-6 text-center">Crear cuenta</h1>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <label className="block text-sm text-charcoal/70 mb-1">Nombre completo</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-4"
          required
        />

        <label className="block text-sm text-charcoal/70 mb-1">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-4"
          required
        />

        <label className="block text-sm text-charcoal/70 mb-1">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-6"
          required
        />

        <button
          type="submit"
          className="bg-terracota text-white w-full py-2 rounded hover:bg-terracota-dark transition-colors"
        >
          Registrarme
        </button>

        <p className="text-sm text-center text-charcoal/60 mt-4">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="text-terracota font-medium">
            Inicia sesión
          </a>
        </p>
      </form>
    </main>
  );
}
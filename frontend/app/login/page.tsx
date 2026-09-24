'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    try {
      const { token } = await login(email, password);
      localStorage.setItem('domusgo_token', token);
      router.push('/');
    } catch (err) {
      setError('Correo o contraseña incorrectos');
    }
  }

  return (
    <main className="min-h-screen bg-beige flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-cream rounded-xl shadow-sm border border-beige-dark p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-charcoal mb-6 text-center">Iniciar sesión</h1>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

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
          Ingresar
        </button>

        <p className="text-sm text-center text-charcoal/60 mt-4">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="text-terracota font-medium">
            Regístrate
          </a>
        </p>
      </form>
    </main>
  );
}
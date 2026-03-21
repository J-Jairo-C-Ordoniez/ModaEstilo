"use client";

import { useState } from 'react';
import { Search, User } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Credenciales inválidas');
    } else {
      router.push('/'); // Redirigir al home tras login exitoso
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-stone-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 sticky top-0 bg-white">
        <div className="flex space-x-8 text-sm font-medium tracking-widest text-[#9e9e9e]">
          <a href="#" className="hover:text-black transition-colors">MUJER</a>
          <a href="#" className="hover:text-black transition-colors">HOMBRE</a>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-xl font-bold tracking-widest uppercase">Moda y Estilo</h1>
        </div>

        <div className="flex space-x-4 text-[#9e9e9e]">
          <Search className="w-5 h-5 cursor-pointer hover:text-black transition-colors" />
          <User className="w-5 h-5 cursor-pointer hover:text-black transition-colors" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="grow flex items-center justify-center -mt-10">
        <div className="w-full max-w-md px-6">
          <h2 className="text-center font-bold tracking-widest uppercase mb-10 text-[15px] border-b pb-4">
            Bienvenido de vuelta
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded text-sm text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="block text-sm font-bold ml-1">
                Correo Electrónico
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@gmail.com"
                className="w-full border border-gray-300 p-3 rounded-sm placeholder:text-gray-400 focus:outline-none focus:border-stone-800 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold ml-1">
                Contraseña
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="@EJ123456789"
                className="w-full border border-gray-300 p-3 rounded-sm placeholder:text-gray-400 focus:outline-none focus:border-stone-800 transition-colors"
                required
              />
            </div>

            <div className="pt-2">
              <a href="#" className="text-sm text-gray-500 hover:text-stone-800 transition-colors">
                ¿Olvidó su contraseña?
              </a>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="bg-[#1c1c1c] text-white px-8 py-3 rounded-sm hover:bg-black transition-colors font-medium text-sm tracking-wide"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-auto mx-8">
        <div className="flex justify-center space-x-16 text-sm font-bold text-gray-400">
          <a href="#" className="hover:text-stone-800 transition-colors">Nosotros</a>
          <a href="#" className="hover:text-stone-800 transition-colors">Políticas y Privacidad</a>
          <a href="#" className="hover:text-stone-800 transition-colors">Contacto</a>
        </div>
      </footer>
    </div>
  );
}
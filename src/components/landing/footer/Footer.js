import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-[#f4f4f4] py-16 mt-16 text-center text-xs tracking-widest text-gray-500 font-semibold uppercase">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-24">
        <Link href="/nosotros" className="hover:text-black transition-colors">
          Nosotros
        </Link>
        <Link href="/politicas" className="hover:text-black transition-colors">
          Políticas y Privacidad
        </Link>
        <Link href="/contacto" className="hover:text-black transition-colors">
          Contacto
        </Link>
      </div>
    </footer>
  );
}

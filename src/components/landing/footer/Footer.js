import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-background py-20 text-center text-xs tracking-widest text-secondary font-semibold uppercase border-t border-secondary/10">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <Link href="/nosotros" className="hover:text-primary transition-colors">
          Nosotros
        </Link>
        <Link href="/politicas" className="hover:text-primary transition-colors">
          Políticas y Privacidad
        </Link>
        <Link href="/contacto" className="hover:text-primary transition-colors">
          Contacto
        </Link>
      </div>
    </footer>
  );
}

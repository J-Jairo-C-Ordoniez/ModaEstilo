import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-background mt-6 py-20 border-t border-secondary/10">
      <div className="text-secondary tracking-wider container mx-auto p-4 md:p-8 flex justify-between">
        <Link href="/aboutUs" className="hover:text-primary transition-colors">
          Nosotros
        </Link>
        <Link href="/policies" className="hover:text-primary transition-colors">
          Políticas y Privacidad
        </Link>
        <Link href="/contact" className="hover:text-primary transition-colors">
          Contacto
        </Link>
      </div>
    </footer>
  );
}

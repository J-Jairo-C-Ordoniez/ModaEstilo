import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background font-sans h-fit">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-center">
        <Link href="/dashboard" className="text-md font-semibold tracking-widest text-primary">
          MODA Y ESTILO
        </Link>
      </div>
    </header>
  );
}

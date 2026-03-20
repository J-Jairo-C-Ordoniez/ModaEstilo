'use client';

import Link from 'next/link';
import useBreadcrumbsStore from '../../store/breadcrumbs';
import { Search, User } from 'lucide-react';

export function Header() {
  const { breadcrumbs, setBreadcrumbsRoute } = useBreadcrumbsStore();

  return (
    <header className="sticky top-0 z-50 w-full bg-background font-sans">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        <nav className="flex items-center gap-6 text-xs font-semibold tracking-wider text-gray-500">
          <button
            onClick={() => setBreadcrumbsRoute("mujer")}
            className={breadcrumbs[1].label.toUpperCase() === "MUJER" ? "text-primary transition-colors cursor-pointer" : "text-secondary/90 hover:text-primary transition-colors cursor-pointer"}>
            MUJER
          </button>
          <button
            onClick={() => setBreadcrumbsRoute("hombre")}
            className={breadcrumbs[1].label.toUpperCase() === "HOMBRE" ? "text-primary transition-colors cursor-pointer" : "text-secondary/90 hover:text-primary transition-colors cursor-pointer"}>
            HOMBRE
          </button>
        </nav>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="text-md font-semibold tracking-widest text-primary">
            MODA Y ESTILO
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            onClick={() => setBreadcrumbsRoute("búscar")}
            className="text-secondary/90 hover:text-primary transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </button>

          <Link
            href="/login"
            onClick={() => setBreadcrumbsRoute("iniciar sesión")}
            aria-label="User Account"
            className="text-secondary/90 hover:text-primary transition-colors"
          >
            <User className="w-5 h-5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}

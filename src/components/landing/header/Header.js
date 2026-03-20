'use client';

import useBreadcrumbsStore from '../../../store/breadcrumbs';
import Link from 'next/link';
import NavLeft from './ui/NavLeft';
import NavRight from './ui/NavRight';

export default function Header() {
  const { breadcrumbs, setBreadcrumbsRoute } = useBreadcrumbsStore();

  return (
    <header className="sticky top-0 z-50 w-full bg-background font-sans">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        <NavLeft
          breadcrumbs={breadcrumbs}
          setBreadcrumbsRoute={setBreadcrumbsRoute}
        />

        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="text-md font-semibold tracking-widest text-primary">
            MODA Y ESTILO
          </Link>
        </div>

        <NavRight
          setBreadcrumbsRoute={setBreadcrumbsRoute}
        />
      </div>
    </header>
  );
}

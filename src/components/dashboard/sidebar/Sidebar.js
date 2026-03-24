'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Tags, Package, Boxes, TrendingUp, Settings } from 'lucide-react';

const navItems = [
  { name: 'Métricas', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Categorías', href: '/dashboard/categories', icon: Tags },
  { name: 'Catálogo', href: '/dashboard/catalog', icon: Package },
  { name: 'Inventario', href: '/dashboard/inventory', icon: Boxes },
  { name: 'Ventas', href: '/dashboard/sales', icon: TrendingUp },
  { name: 'Ajustes', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full w-1/6 flex flex-col pt-4 transition-all duration-300 border-r border-secondary/10">
      <div className='container mx-auto px-1 md:px-2 flex flex-col h-full'>
        <article className="space-y-2 py-5 px-3 overflow-y-auto">
          <h3 className="text-primary/90 text-xs tracking-wider font-semibold uppercase mb-4">
            Navegación
          </h3>

          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 tracking-wider ${isActive ? 'bg-secondary/10 text-primary/90' : 'text-secondary/90 hover:text-primary/90'}`}
              >
                <item.icon width={18} height={18} />
                {item.name}
                {isActive &&
                  <span className="ml-auto h-2 w-2 rounded-full bg-primary/90"></span>
                }
              </Link>
            );
          })}
        </article>

        <div className="py-4 mt-auto border-t border-secondary/10">
          <Link
            href="/"
            className="border border-secondary/10 w-full block text-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 tracking-wider text-secondary/90 hover:text-primary/90 hover:bg-secondary/10"
          >
            Ir a Tienda
          </Link>
        </div>
      </div>
    </aside>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Tags, 
  Package, 
  Boxes, 
  TrendingUp, 
  Settings,
  Sparkles
} from 'lucide-react';

const navItems = [
  { name: 'Métricas', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Categorías', href: '/dashboard/categories', icon: Tags },
  { name: 'Catálogo', href: '/dashboard/catalog', icon: Package },
  { name: 'Inventario', href: '/dashboard/inventory', icon: Boxes },
  { name: 'Ventas', href: '/dashboard/sales', icon: TrendingUp },
  { name: 'Ajustes', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside 
      className="dash-sidebar fixed left-0 top-0 h-screen w-64 flex flex-col pt-16 z-20 transition-all duration-300"
      style={{ backgroundColor: 'var(--dash-bg-sidebar)', borderRight: '1px solid var(--dash-border)' }}
    >
      {/* Brand mark */}
      <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--dash-border)' }}>
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm tracking-tight" style={{ color: 'var(--dash-text-strong)' }}>Moda y Estilo</span>
        </div>
      </div>
      
      <div className="flex flex-col py-5 px-3 gap-1 flex-1 overflow-y-auto">
        <p className="text-[10px] font-semibold uppercase mb-2 tracking-widest px-2" style={{ color: 'var(--dash-text-muted)' }}>
          Navegación
        </p>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="dash-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
              style={isActive ? {
                backgroundColor: 'var(--dash-primary-subtle)',
                color: 'var(--dash-primary)',
              } : {
                color: 'var(--dash-text-muted)',
              }}
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" style={{ width: '1.1rem', height: '1.1rem' }} />
              {item.name}
              {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--dash-primary)' }}></span>}
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 mt-auto" style={{ borderTop: '1px solid var(--dash-border)' }}>
         <Link 
           href="/" 
           className="flex items-center justify-center py-2 px-4 rounded-lg text-sm font-medium transition-colors"
           style={{ 
             border: '1px solid var(--dash-border)', 
             color: 'var(--dash-text-muted)',
           }}
         >
            ← Ir a Tienda
         </Link>
      </div>
    </aside>
  );
}

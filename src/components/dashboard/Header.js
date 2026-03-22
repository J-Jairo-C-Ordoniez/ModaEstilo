'use client';

import { Bell, Search, User } from 'lucide-react';

export function Header() {
  return (
    <header 
      className="dash-header fixed top-0 right-0 left-0 h-16 z-30 flex items-center justify-between px-6 sm:pl-72 transition-all duration-300"
      style={{ backgroundColor: 'var(--dash-bg-sidebar)', borderBottom: '1px solid var(--dash-border)' }}
    >
      <div className="flex items-center gap-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--dash-text-muted)' }} />
          <input 
            type="text"
            placeholder="Buscar en el dashboard..."
            className="pl-9 pr-4 py-2 text-sm w-64 md:w-80 outline-none transition-all placeholder:text-(--dash-text-muted)"
            style={{ 
              backgroundColor: 'var(--dash-bg-muted)',
              border: '1px solid var(--dash-border)',
              color: 'var(--dash-text)',
              borderRadius: '0.5rem',
            }}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          className="relative p-2 rounded-full transition-colors"
          style={{ color: 'var(--dash-text-muted)' }}
        >
          <Bell className="h-5 w-5" />
          <span 
            className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full"
            style={{ backgroundColor: 'var(--dash-danger)', border: '2px solid var(--dash-bg-sidebar)' }}
          ></span>
        </button>
        
        <div 
          className="h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm overflow-hidden cursor-pointer"
          style={{ 
            backgroundColor: 'var(--dash-primary-subtle)', 
            color: 'var(--dash-primary)',
            border: '1.5px solid var(--dash-primary)',
          }}
        >
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}

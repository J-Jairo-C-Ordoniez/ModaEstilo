'use client';

import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

export function SalesClient({ initialSales }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredSales = initialSales.filter(sale =>
    sale.variant.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.saleId.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
  const paginatedSales = filteredSales.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const textMuted = { color: 'var(--dash-text-muted)' };
  const textStrong = { color: 'var(--dash-text-strong)' };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4" style={{ borderBottom: '1px solid var(--dash-border)' }}>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--dash-primary-subtle)' }}>
            <TrendingUp style={{ color: 'var(--dash-primary)', width: '1.1rem', height: '1.1rem' }} />
          </div>
          <div>
            <h3 className="font-semibold text-base" style={textStrong}>Historial de Ventas</h3>
            <p className="text-xs" style={textMuted}>{initialSales.length} transacciones registradas</p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={textMuted} />
          <input
            type="text"
            placeholder="Buscar por ID, producto, método..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="pl-9 pr-4 py-2 text-sm w-full sm:w-80 outline-none transition-all"
            style={{ backgroundColor: 'var(--dash-bg-muted)', border: '1px solid var(--dash-border)', color: 'var(--dash-text)', borderRadius: '0.5rem' }}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr style={{ backgroundColor: 'var(--dash-bg-muted)', color: 'var(--dash-text-muted)' }}>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Producto</th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Cantidad</th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Método de Pago</th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {paginatedSales.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-sm" style={textMuted}>
                  No se encontraron ventas para &quot;{searchTerm}&quot;
                </td>
              </tr>
            ) : (
              paginatedSales.map((sale) => (
                <tr
                  key={sale.saleId}
                  className="transition-colors"
                  style={{ borderBottom: '1px solid var(--dash-border)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--dash-bg-muted)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = ''}
                >
                  <td className="px-6 py-4 font-mono text-xs font-semibold" style={{ color: 'var(--dash-primary)' }}>
                    #{sale.saleId.toString().padStart(6, '0')}
                  </td>
                  <td className="px-6 py-4 text-xs" style={textMuted}>
                    {new Date(sale.createdAt).toLocaleDateString('es-CO', {
                      year: 'numeric', month: 'short', day: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold" style={textStrong}>{sale.variant.product.name}</p>
                    <p className="text-xs mt-0.5" style={textMuted}>{sale.variant.name} · {sale.variant.size}</p>
                  </td>
                  <td className="px-6 py-4" style={textMuted}>{sale.amount} unid.</td>
                  <td className="px-6 py-4">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
                      style={{ backgroundColor: 'var(--dash-primary-subtle)', color: 'var(--dash-primary)' }}
                    >
                      {sale.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-base font-bold" style={{ color: 'var(--dash-success)' }}>
                      ${Number(sale.total).toLocaleString('es-CO')}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4" style={{ borderTop: '1px solid var(--dash-border)' }}>
          <span className="text-sm" style={textMuted}>
            Pág {currentPage} de {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm rounded-lg transition-colors disabled:opacity-40"
              style={{ border: '1px solid var(--dash-border)', color: 'var(--dash-text-muted)' }}
            >
              <ChevronLeft className="h-4 w-4" /> Anterior
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm rounded-lg transition-colors disabled:opacity-40"
              style={{ border: '1px solid var(--dash-border)', color: 'var(--dash-text-muted)' }}
            >
              Siguiente <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

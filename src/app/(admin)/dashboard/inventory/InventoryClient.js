'use client';

import React, { useState, useEffect } from 'react';
import { updateInventoryBlock, createInventoryRecord } from './actions';
import { Search, AlertCircle, CheckCircle2, Boxes } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export function InventoryClient({ initialVariants }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingId, setLoadingId] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const variantId = searchParams.get('variantId');
    if (variantId) {
      const variant = initialVariants.find(v => v.variantId.toString() === variantId);
      if (variant) {
        // We could set search term to SKU to isolate it, 
        // or just scroll to it if it's already in the list.
        // Let's scroll and highlight.
        setTimeout(() => {
          const element = document.getElementById(`inventory-row-${variantId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('animate-highlight-brief');
          }
        }, 300);
      }
    }
  }, [searchParams, initialVariants]);

  const handleStockUpdate = async (variantId, inventoryId, currentStock, e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newStock = formData.get('stock');
    if (newStock === currentStock?.toString()) return;
    setLoadingId(variantId);
    let result;
    if (inventoryId) {
      result = await updateInventoryBlock(inventoryId, newStock);
    } else {
      result = await createInventoryRecord(variantId, newStock);
    }
    if (result.error) alert(result.error);
    else window.location.reload();
    setLoadingId(null);
  };

  const filteredVariants = initialVariants.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const textMuted = { color: 'var(--dash-text-muted)' };
  const textStrong = { color: 'var(--dash-text-strong)' };

  return (
    <>
      <style jsx global>{`
        @keyframes highlight-brief {
          0% { background-color: transparent; }
          50% { background-color: var(--dash-primary-subtle); }
          100% { background-color: transparent; }
        }
        .animate-highlight-brief {
          animation: highlight-brief 2s ease-out 2;
        }
      `}</style>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4" style={{ borderBottom: '1px solid var(--dash-border)' }}>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--dash-primary-subtle)' }}>
            <Boxes style={{ color: 'var(--dash-primary)', width: '1.1rem', height: '1.1rem' }} />
          </div>
          <div>
            <h3 className="font-semibold text-base" style={textStrong}>Control de Existencias</h3>
            <p className="text-xs" style={textMuted}>{initialVariants.length} variantes registradas</p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={textMuted} />
          <input
            type="text"
            placeholder="Buscar por SKU, producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm w-full sm:w-72 outline-none transition-all"
            style={{ backgroundColor: 'var(--dash-bg-muted)', border: '1px solid var(--dash-border)', color: 'var(--dash-text)', borderRadius: '0.5rem' }}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr style={{ backgroundColor: 'var(--dash-bg-muted)', color: 'var(--dash-text-muted)' }}>
              <th colSpan="2" className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Variante</th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">SKU</th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-right w-48">Actualizar</th>
            </tr>
          </thead>
          <tbody>
            {filteredVariants.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-sm" style={textMuted}>
                  No se encontraron resultados para &quot;{searchTerm}&quot;
                </td>
              </tr>
            ) : (
              filteredVariants.map((variant) => {
                const inventory = variant.inventories[0];
                const stock = inventory ? inventory.stock : 0;
                const isLowStock = stock < 10;

                return (
                  <tr
                    key={variant.variantId}
                    id={`inventory-row-${variant.variantId}`}
                    className="transition-colors"
                    style={{ borderBottom: '1px solid var(--dash-border)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--dash-bg-muted)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = ''}
                  >
                    <td className="w-14 pl-6 py-4 pr-0">
                      <div className="h-10 w-10 rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--dash-bg-muted)' }}>
                        {variant.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={variant.image} alt={variant.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-xs" style={textMuted}>IMG</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold" style={textStrong}>{variant.product.name}</p>
                      <p className="text-xs mt-0.5" style={textMuted}>{variant.name} · {variant.size} · {variant.color}</p>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs" style={textMuted}>{variant.sku}</td>
                    <td className="px-6 py-4">
                      {!inventory ? (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: 'var(--dash-warning-subtle)', color: 'var(--dash-warning)' }}>
                          Sin Inventario
                        </span>
                      ) : isLowStock ? (
                        <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full w-fit"
                          style={{ backgroundColor: 'var(--dash-danger-subtle)', color: 'var(--dash-danger)' }}>
                          <AlertCircle className="h-3.5 w-3.5" /> Agotándose
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full w-fit"
                          style={{ backgroundColor: 'var(--dash-success-subtle)', color: 'var(--dash-success)' }}>
                          <CheckCircle2 className="h-3.5 w-3.5" /> Óptimo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-xl font-bold"
                        style={{ color: isLowStock ? 'var(--dash-danger)' : 'var(--dash-text-strong)' }}
                      >
                        {stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <form
                        className="flex items-center justify-end gap-2"
                        onSubmit={(e) => handleStockUpdate(variant.variantId, inventory?.inventoryId, stock, e)}
                      >
                        <input
                          type="number"
                          name="stock"
                          defaultValue={stock}
                          min="0"
                          required
                          className="w-20 px-2 py-1.5 text-sm text-right outline-none transition-all"
                          style={{ backgroundColor: 'var(--dash-bg-muted)', border: '1px solid var(--dash-border)', color: 'var(--dash-text)', borderRadius: '0.5rem' }}
                        />
                        <button
                          type="submit"
                          disabled={loadingId === variant.variantId}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg hover:opacity-90 disabled:opacity-40 transition-opacity"
                          style={{ backgroundColor: 'var(--dash-primary)', color: 'var(--dash-primary-fg)', height: '34px' }}
                        >
                          {loadingId === variant.variantId ? '...' : 'Guardar'}
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}


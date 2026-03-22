'use client';

import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, TrendingUp, Plus, X, Package, DollarSign, CreditCard } from 'lucide-react';
import { createSale } from './actions';

export function SalesClient({ initialSales, variants }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // New Sale State
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [amount, setAmount] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');
  const [variantSearch, setVariantSearch] = useState('');

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

  const filteredVariants = useMemo(() => {
    if (!variantSearch) return variants.slice(0, 5);
    return variants.filter(v => 
      v.product.name.toLowerCase().includes(variantSearch.toLowerCase()) ||
      v.sku.toLowerCase().includes(variantSearch.toLowerCase()) ||
      v.name.toLowerCase().includes(variantSearch.toLowerCase())
    ).slice(0, 8);
  }, [variants, variantSearch]);

  const selectedVariant = useMemo(() => 
    variants.find(v => v.variantId === Number(selectedVariantId)),
  [variants, selectedVariantId]);

  const totalSale = selectedVariant ? Number(selectedVariant.price) * amount : 0;

  const handleCreateSale = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('variantId', selectedVariantId);
    formData.append('amount', amount);
    formData.append('paymentMethod', paymentMethod);

    const result = await createSale(formData);
    
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setIsModalOpen(false);
      resetForm();
      window.location.reload();
    }
  };

  const resetForm = () => {
    setSelectedVariantId('');
    setAmount(1);
    setPaymentMethod('Efectivo');
    setVariantSearch('');
    setError('');
  };

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
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={textMuted} />
            <input
              type="text"
              placeholder="Buscar por ID, producto, método..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="pl-9 pr-4 py-2 text-sm w-full sm:w-64 outline-none transition-all"
              style={{ backgroundColor: 'var(--dash-bg-muted)', border: '1px solid var(--dash-border)', color: 'var(--dash-text)', borderRadius: '0.5rem' }}
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 shrink-0"
            style={{ backgroundColor: 'var(--dash-primary)', color: 'var(--dash-primary-fg)' }}
          >
            <Plus className="h-4 w-4" />
            Nueva Venta
          </button>
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

      {/* CREATE SALE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}>
          <div className="dash-card rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]" style={{ backgroundColor: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)' }}>
            <div className="flex justify-between items-center p-5" style={{ borderBottom: '1px solid var(--dash-border)' }}>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" style={{ color: 'var(--dash-primary)' }} />
                <h3 className="text-base font-semibold" style={textStrong}>Registrar Nueva Venta</h3>
              </div>
              <button 
                onClick={() => { setIsModalOpen(false); resetForm(); }} 
                className="p-1.5 rounded-lg hover:bg-(--dash-bg-muted) transition-colors"
                style={textMuted}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSale} className="p-6 space-y-6 overflow-y-auto">
              {error && (
                <div className="p-3.5 rounded-lg text-sm font-medium" style={{ backgroundColor: 'var(--dash-danger-subtle)', color: 'var(--dash-danger)' }}>
                  {error}
                </div>
              )}

              {/* Variant Selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest" style={textMuted}>Seleccionar Variante</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4" style={textMuted} />
                  <input
                    type="text"
                    placeholder="Buscar producto o SKU..."
                    value={variantSearch}
                    onChange={(e) => setVariantSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-sm outline-none transition-all rounded-lg"
                    style={{ backgroundColor: 'var(--dash-bg-muted)', border: '1px solid var(--dash-border)', color: 'var(--dash-text)' }}
                  />
                </div>
                
                <div className="grid gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                  {filteredVariants.map((v) => {
                    const stock = v.inventories[0]?.stock || 0;
                    const isSelected = selectedVariantId === v.variantId.toString();
                    return (
                      <button
                        key={v.variantId}
                        type="button"
                        onClick={() => {
                          setSelectedVariantId(v.variantId.toString());
                          setVariantSearch('');
                        }}
                        className="flex items-center justify-between p-3 rounded-xl border transition-all text-left group"
                        style={{ 
                          backgroundColor: isSelected ? 'var(--dash-primary-subtle)' : 'var(--dash-bg-muted)',
                          borderColor: isSelected ? 'var(--dash-primary)' : 'var(--dash-border)'
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg overflow-hidden bg-background shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={v.image} alt="" className="h-full w-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold truncate" style={isSelected ? { color: 'var(--dash-primary)' } : textStrong}>
                              {v.product.name}
                            </p>
                            <p className="text-xs truncate" style={textMuted}>
                              {v.name} · {v.size} · {v.sku}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold" style={textStrong}>${Number(v.price).toLocaleString('es-CO')}</p>
                          <p className="text-[10px] font-bold uppercase tracking-tighter" style={{ color: stock < 5 ? 'var(--dash-danger)' : 'var(--dash-success)' }}>
                            {stock} en stock
                          </p>
                        </div>
                      </button>
                    );
                  })}
                  {variants.length > 0 && filteredVariants.length === 0 && (
                    <p className="text-center py-4 text-xs" style={textMuted}>No se encontraron variantes.</p>
                  )}
                </div>
              </div>

              {selectedVariant && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest" style={textMuted}>Cantidad</label>
                    <div className="flex items-center gap-2">
                       <input
                        type="number"
                        min="1"
                        max={selectedVariant.inventories[0]?.stock || 1}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full px-4 py-2.5 text-sm font-semibold outline-none rounded-lg"
                        style={{ backgroundColor: 'var(--dash-bg-muted)', border: '1px solid var(--dash-border)', color: 'var(--dash-text)' }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest" style={textMuted}>Método de Pago</label>
                    <div className="flex bg-(--dash-bg-muted) p-1 rounded-lg border border-(--dash-border)">
                      {['Efectivo', 'Tarjeta', 'Transferencia'].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPaymentMethod(method)}
                          className="flex-1 py-1.5 text-xs font-medium rounded-md transition-all"
                          style={paymentMethod === method ? {
                            backgroundColor: 'var(--dash-primary)',
                            color: 'var(--dash-primary-fg)'
                          } : {
                            color: 'var(--dash-text-muted)'
                          }}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="mt-4 p-4 rounded-xl space-y-3" style={{ backgroundColor: 'var(--dash-bg-muted)', border: '1px dashed var(--dash-border)' }}>
                <div className="flex justify-between items-center text-xs" style={textMuted}>
                  <span>Subtotal</span>
                  <span className="font-semibold">${totalSale.toLocaleString('es-CO')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold" style={textStrong}>Total a Pagar</span>
                  <span className="text-xl font-black" style={{ color: 'var(--dash-success)' }}>
                    ${totalSale.toLocaleString('es-CO')}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setIsModalOpen(false); resetForm(); }}
                  className="flex-1 px-4 py-3 rounded-xl text-sm font-bold transition-colors hover:bg-(--dash-bg-muted)"
                  style={{ border: '1px solid var(--dash-border)', color: 'var(--dash-text-muted)' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading || !selectedVariantId || (selectedVariant?.inventories[0]?.stock || 0) < amount}
                  className="flex-3 px-4 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 disabled:opacity-40"
                  style={{ backgroundColor: 'var(--dash-primary)', color: 'var(--dash-primary-fg)' }}
                >
                  {loading ? 'Procesando...' : 'Confirmar Venta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

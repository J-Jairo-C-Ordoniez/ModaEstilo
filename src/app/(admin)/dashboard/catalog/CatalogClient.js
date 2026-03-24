'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, X, ChevronDown, ChevronUp, Image as ImageIcon, Package } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { createProduct, updateProduct, deleteProduct, createVariant, updateVariant, deleteVariant } from './actions';

const S = {
  card: { backgroundColor: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)' },
  input: { backgroundColor: 'var(--dash-bg-muted)', border: '1px solid var(--dash-border)', color: 'var(--dash-text)', borderRadius: '0.5rem' },
  textMuted: { color: 'var(--dash-text-muted)' },
  textStrong: { color: 'var(--dash-text-strong)' },
  primaryBtn: { backgroundColor: 'var(--dash-primary)', color: 'var(--dash-primary-fg)' },
  tablehead: { backgroundColor: 'var(--dash-bg-muted)', color: 'var(--dash-text-muted)' },
};

const inputClass = "w-full px-3 py-2.5 text-sm outline-none transition-all focus:ring-2";
const inputStyle = (extra) => ({ ...S.input, ...extra });

export function CatalogClient({ initialProducts, categories }) {
  const [expandedProducts, setExpandedProducts] = useState({});
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingVariant, setEditingVariant] = useState(null);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const variantId = searchParams.get('variantId');
    if (variantId) {
      const product = initialProducts.find(p => 
        p.variants.some(v => v.variantId.toString() === variantId)
      );
      if (product) {
        setExpandedProducts(prev => ({ ...prev, [product.productId]: true }));
        // Wait for render to scroll
        setTimeout(() => {
          const element = document.getElementById(`variant-${variantId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('animate-pulse-brief');
          }
        }, 300);
      }
    }
  }, [searchParams, initialProducts]);

  const toggleExpand = (productId) =>
    setExpandedProducts(prev => ({ ...prev, [productId]: !prev[productId] }));

  const handleOpenProductModal = (product = null) => {
    setEditingProduct(product);
    setError('');
    setIsProductModalOpen(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const formData = new FormData(e.target);
    const result = editingProduct
      ? await updateProduct(editingProduct.productId, formData)
      : await createProduct(formData);
    if (result.error) { setError(result.error); }
    else { setIsProductModalOpen(false); window.location.reload(); }
    setLoading(false);
  };

  const handleDeleteProduct = async (productId) => {
    if (confirm('¿Eliminar producto? (Requiere no tener variantes)')) {
      const result = await deleteProduct(productId);
      if (result.error) alert(result.error);
      else window.location.reload();
    }
  };

  const handleOpenVariantModal = (productId, variant = null) => {
    setCurrentProductId(productId);
    setEditingVariant(variant);
    setError('');
    setIsVariantModalOpen(true);
  };

  const handleVariantSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const formData = new FormData(e.target);
    formData.append('productId', currentProductId);
    formData.set('isActive', e.target.isActive.checked ? 'true' : 'false');
    const result = editingVariant
      ? await updateVariant(editingVariant.variantId, formData)
      : await createVariant(formData);
    if (result.error) { setError(result.error); }
    else { setIsVariantModalOpen(false); window.location.reload(); }
    setLoading(false);
  };

  const handleDeleteVariant = async (variantId) => {
    if (confirm('¿Eliminar variante?')) {
      const result = await deleteVariant(variantId);
      if (result.error) alert(result.error);
      else window.location.reload();
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes pulse-brief {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(var(--dash-primary-rgb), 0.4); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(var(--dash-primary-rgb), 0); }
          100% { transform: scale(1); }
        }
        .animate-pulse-brief {
          animation: pulse-brief 1.5s ease-out 2;
          border: 2px solid var(--dash-primary) !important;
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid var(--dash-border)' }}>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--dash-primary-subtle)' }}>
            <Package style={{ color: 'var(--dash-primary)', width: '1.1rem', height: '1.1rem' }} />
          </div>
          <div>
            <h3 className="font-semibold text-base" style={S.textStrong}>Catálogo de Productos</h3>
            <p className="text-xs" style={S.textMuted}>{initialProducts.length} productos registrados</p>
          </div>
        </div>
        <button
          onClick={() => handleOpenProductModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
          style={S.primaryBtn}
        >
          <Plus className="h-4 w-4" />
          Nuevo Producto
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr style={S.tablehead}>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider w-10"></th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Categoría</th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Género</th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Variantes</th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {initialProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-sm" style={S.textMuted}>
                  No hay productos registrados aún.
                </td>
              </tr>
            ) : (
              initialProducts.map((product) => (
                <React.Fragment key={product.productId}>
                  <tr
                    className="transition-colors cursor-pointer"
                    style={{ borderBottom: '1px solid var(--dash-border)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--dash-bg-muted)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = ''}
                  >
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleExpand(product.productId)}
                        className="p-1 rounded transition-colors"
                        style={S.textMuted}
                      >
                        {expandedProducts[product.productId]
                          ? <ChevronUp className="h-4 w-4" />
                          : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ backgroundColor: 'var(--dash-bg-muted)', color: 'var(--dash-text-muted)' }}
                      >
                        {product.category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold" style={S.textStrong}>{product.name}</td>
                    <td className="px-6 py-4 capitalize" style={S.textMuted}>{product.gender}</td>
                    <td className="px-6 py-4">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ backgroundColor: 'var(--dash-primary-subtle)', color: 'var(--dash-primary)' }}
                      >
                        {product.variants.length}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => handleOpenVariantModal(product.productId)}
                          className="p-2 rounded-lg transition-colors"
                          style={S.textMuted}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--dash-success)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--dash-text-muted)'}
                          title="Añadir Variante"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleOpenProductModal(product)}
                          className="p-2 rounded-lg transition-colors"
                          style={S.textMuted}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--dash-primary)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--dash-text-muted)'}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.productId)}
                          className="p-2 rounded-lg transition-colors"
                          style={S.textMuted}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--dash-danger)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--dash-text-muted)'}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded variants */}
                  {expandedProducts[product.productId] && (
                    <tr>
                      <td colSpan="6" style={{ borderBottom: '1px solid var(--dash-border)', backgroundColor: 'var(--dash-bg-muted)' }}>
                        <div className="px-6 py-5">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={S.textMuted}>
                            Variantes del producto
                          </h4>
                          {product.variants.length === 0 ? (
                            <p className="text-sm" style={S.textMuted}>No hay variantes. Usa el botón + para añadir.</p>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                              {product.variants.map((v) => (
                                <div
                                  key={v.variantId}
                                  id={`variant-${v.variantId}`}
                                  className="flex gap-3 p-3 rounded-xl transition-all"
                                  style={{ backgroundColor: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)' }}
                                >
                                  <div
                                    className="h-16 w-16 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                                    style={{ backgroundColor: 'var(--dash-bg-muted)' }}
                                  >
                                    {v.image ? (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img src={v.image} alt={v.name} className="h-full w-full object-cover" />
                                    ) : (
                                      <ImageIcon className="h-6 w-6" style={S.textMuted} />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate" style={S.textStrong}>{v.name}</p>
                                    <p className="text-xs truncate mt-0.5" style={S.textMuted}>SKU: {v.sku} · {v.size}</p>
                                    <div className="flex items-center gap-2 mt-1.5">
                                      <span className="text-xs font-bold" style={{ color: 'var(--dash-primary)' }}>
                                        ${Number(v.price).toLocaleString('es-CO')}
                                      </span>
                                      <span
                                        className="text-[10px] px-1.5 py-0.5 rounded-full"
                                        style={{ backgroundColor: 'var(--dash-bg-muted)', color: 'var(--dash-text-muted)' }}
                                      >
                                        {v.color}
                                      </span>
                                      <span
                                        className="text-[10px] px-1.5 py-0.5 rounded-full"
                                        style={{
                                          backgroundColor: v.isActive ? 'var(--dash-success-subtle)' : 'var(--dash-danger-subtle)',
                                          color: v.isActive ? 'var(--dash-success)' : 'var(--dash-danger)'
                                        }}
                                      >
                                        {v.isActive ? 'Activo' : 'Inactivo'}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <button onClick={() => handleOpenVariantModal(product.productId, v)}
                                      className="p-1.5 rounded-lg transition-colors"
                                      style={S.textMuted}
                                      onMouseEnter={e => e.currentTarget.style.color = 'var(--dash-primary)'}
                                      onMouseLeave={e => e.currentTarget.style.color = 'var(--dash-text-muted)'}
                                    >
                                      <Edit2 className="h-3.5 w-3.5" />
                                    </button>
                                    <button onClick={() => handleDeleteVariant(v.variantId)}
                                      className="p-1.5 rounded-lg transition-colors"
                                      style={S.textMuted}
                                      onMouseEnter={e => e.currentTarget.style.color = 'var(--dash-danger)'}
                                      onMouseLeave={e => e.currentTarget.style.color = 'var(--dash-text-muted)'}
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PRODUCT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}>
          <div className="rounded-xl shadow-2xl w-full max-w-lg" style={{ backgroundColor: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)' }}>
            <div className="flex justify-between items-center p-5" style={{ borderBottom: '1px solid var(--dash-border)' }}>
              <h3 className="text-base font-semibold" style={S.textStrong}>
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="p-1.5 rounded-lg" style={S.textMuted}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleProductSubmit} className="p-5 space-y-4">
              {error && <p className="text-sm p-3 rounded-lg" style={{ backgroundColor: 'var(--dash-danger-subtle)', color: 'var(--dash-danger)' }}>{error}</p>}
              <div>
                <label className="text-xs font-medium uppercase tracking-wider block mb-1.5" style={S.textMuted}>Nombre</label>
                <input required name="name" defaultValue={editingProduct?.name} className={inputClass} style={inputStyle()} />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider block mb-1.5" style={S.textMuted}>Descripción</label>
                <textarea required name="description" defaultValue={editingProduct?.description} className={inputClass} style={inputStyle()} rows={3}></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider block mb-1.5" style={S.textMuted}>Categoría</label>
                  <select required name="categoryId" defaultValue={editingProduct?.categoryId} className={inputClass} style={inputStyle()}>
                    <option value="">Seleccione...</option>
                    {categories.map(c => <option key={c.categoryId} value={c.categoryId}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider block mb-1.5" style={S.textMuted}>Género</label>
                  <select required name="gender" defaultValue={editingProduct?.gender || 'mixto'} className={inputClass} style={inputStyle()}>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                    <option value="mixto">Mixto</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium rounded-lg" style={S.textMuted}>
                  Cancelar
                </button>
                <button type="submit" disabled={loading}
                  className="px-4 py-2 text-sm font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity" style={S.primaryBtn}>
                  {loading ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VARIANT MODAL */}
      {isVariantModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}>
          <div className="rounded-xl shadow-2xl w-full max-w-lg" style={{ backgroundColor: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)' }}>
            <div className="flex justify-between items-center p-5" style={{ borderBottom: '1px solid var(--dash-border)' }}>
              <h3 className="text-base font-semibold" style={S.textStrong}>
                {editingVariant ? 'Editar Variante' : 'Nueva Variante'}
              </h3>
              <button onClick={() => setIsVariantModalOpen(false)} className="p-1.5 rounded-lg" style={S.textMuted}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleVariantSubmit} className="p-5 space-y-4">
              {error && <p className="text-sm p-3 rounded-lg" style={{ backgroundColor: 'var(--dash-danger-subtle)', color: 'var(--dash-danger)' }}>{error}</p>}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider block mb-1.5" style={S.textMuted}>Nombre</label>
                  <input required name="name" defaultValue={editingVariant?.name} className={inputClass} style={inputStyle()} placeholder="Ej: Azul M" />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider block mb-1.5" style={S.textMuted}>SKU</label>
                  <input required name="sku" defaultValue={editingVariant?.sku} className={inputClass} style={inputStyle()} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider block mb-1.5" style={S.textMuted}>Color</label>
                  <input required name="color" defaultValue={editingVariant?.color} className={inputClass} style={inputStyle()} />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider block mb-1.5" style={S.textMuted}>Talla</label>
                  <input required name="size" defaultValue={editingVariant?.size} className={inputClass} style={inputStyle()} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider block mb-1.5" style={S.textMuted}>Precio</label>
                  <input required type="number" step="0.01" name="price" defaultValue={editingVariant?.price} className={inputClass} style={inputStyle()} />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider block mb-1.5" style={S.textMuted}>URL Imagen</label>
                  <input required name="image" defaultValue={editingVariant?.image} className={inputClass} style={inputStyle()} placeholder="https://..." />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <input type="checkbox" id="isActive" name="isActive" defaultChecked={editingVariant ? editingVariant.isActive : true} className="h-4 w-4 accent-(--dash-primary)" />
                <label htmlFor="isActive" className="text-sm font-medium" style={S.textMuted}>Variante Activa</label>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsVariantModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium rounded-lg" style={S.textMuted}>
                  Cancelar
                </button>
                <button type="submit" disabled={loading}
                  className="px-4 py-2 text-sm font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity" style={S.primaryBtn}>
                  {loading ? 'Guardando...' : 'Guardar Variante'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

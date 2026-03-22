'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Layers } from 'lucide-react';
import { createCategory, updateCategory, deleteCategory } from './actions';

const S = {
  card: { backgroundColor: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)' },
  input: { 
    backgroundColor: 'var(--dash-bg-muted)', 
    border: '1px solid var(--dash-border)', 
    color: 'var(--dash-text)',
    borderRadius: '0.5rem',
  },
  textMuted: { color: 'var(--dash-text-muted)' },
  textStrong: { color: 'var(--dash-text-strong)' },
  border: { borderColor: 'var(--dash-border)' },
  tablehead: { backgroundColor: 'var(--dash-bg-muted)', color: 'var(--dash-text-muted)' },
  primaryBtn: { backgroundColor: 'var(--dash-primary)', color: 'var(--dash-primary-fg)' },
  dangerHover: 'text-[var(--dash-danger)]',
};

export function CategoryClient({ initialCategories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOpenModal = (category = null) => {
    setEditingCategory(category);
    setName(category ? category.name : '');
    setError('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setName('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) { setError('El nombre es requerido'); return; }
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('name', name);
    const result = editingCategory
      ? await updateCategory(editingCategory.categoryId, formData)
      : await createCategory(formData);
    if (result.error) { setError(result.error); }
    else { handleCloseModal(); window.location.reload(); }
    setLoading(false);
  };

  const handleDelete = async (categoryId) => {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      const result = await deleteCategory(categoryId);
      if (result.error) alert(result.error);
      else window.location.reload();
    }
  };

  return (
    <>
      {/* Header */}
      <div
        className="flex items-center justify-between p-6"
        style={{ borderBottom: '1px solid var(--dash-border)' }}
      >
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--dash-primary-subtle)' }}>
            <Layers className="h-4.5 w-4.5" style={{ color: 'var(--dash-primary)', width: '1.1rem', height: '1.1rem' }} />
          </div>
          <div>
            <h3 className="font-semibold text-base" style={S.textStrong}>Categorías</h3>
            <p className="text-xs" style={S.textMuted}>{initialCategories.length} registradas</p>
          </div>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
          style={S.primaryBtn}
        >
          <Plus className="h-4 w-4" />
          Nueva Categoría
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="dash-table w-full text-sm text-left">
          <thead>
            <tr style={S.tablehead}>
              <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Productos</th>
              <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {initialCategories.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-sm" style={S.textMuted}>
                  No hay categorías creadas aún.
                </td>
              </tr>
            ) : (
              initialCategories.map((cat) => (
                <tr
                  key={cat.categoryId}
                  className="transition-colors"
                  style={{ borderBottom: '1px solid var(--dash-border)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--dash-bg-muted)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = ''}
                >
                  <td className="px-6 py-4 font-mono text-xs" style={S.textMuted}>#{cat.categoryId}</td>
                  <td className="px-6 py-4 font-semibold" style={S.textStrong}>{cat.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ backgroundColor: 'var(--dash-primary-subtle)', color: 'var(--dash-primary)' }}
                    >
                      {cat._count?.products || 0} productos
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => handleOpenModal(cat)}
                        className="p-2 rounded-lg transition-colors hover:bg-[var(--dash-bg-muted)]"
                        style={S.textMuted}
                        title="Editar"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.categoryId)}
                        className="p-2 rounded-lg transition-colors hover:bg-[var(--dash-danger-subtle)]"
                        style={{ color: 'var(--dash-text-muted)' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--dash-danger)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--dash-text-muted)'}
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div
            className="dash-modal rounded-xl shadow-2xl w-full max-w-md"
            style={{ backgroundColor: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)' }}
          >
            <div className="flex justify-between items-center p-5" style={{ borderBottom: '1px solid var(--dash-border)' }}>
              <h3 className="text-base font-semibold" style={S.textStrong}>
                {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
              </h3>
              <button onClick={handleCloseModal} className="p-1.5 rounded-lg hover:bg-[var(--dash-bg-muted)] transition-colors" style={S.textMuted}>
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {error && (
                <div className="p-3 text-sm rounded-lg" style={{ backgroundColor: 'var(--dash-danger-subtle)', color: 'var(--dash-danger)' }}>
                  {error}
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-sm font-medium" style={S.textMuted}>Nombre de la Categoría</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm outline-none transition-all"
                  style={S.input}
                  placeholder="Ej: Camisetas, Pantalones..."
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-[var(--dash-bg-muted)]"
                  style={S.textMuted}>
                  Cancelar
                </button>
                <button type="submit" disabled={loading}
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={S.primaryBtn}>
                  {loading ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

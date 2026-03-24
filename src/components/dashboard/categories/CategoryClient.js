'use client';

import { useState, useEffect } from 'react';
import Header from '../main/ui/Header';
import HeaderCategory from './ui/HeaderCategory';
import MainCategory from './ui/MainCategory';
import Modal from './ui/Modal';
import CategoryForm from './ui/CategoryForm';
import ActionDialog from './ui/ActionDialog';

export default function CategoryClient() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, title: '', message: '', onConfirm: null });
  const [alertConfig, setAlertConfig] = useState({ isOpen: false, title: '', message: '', variant: 'primary' });

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/categories');
      const json = await response.json();
      if (json.success) setCategories(json.data);
      else setError('Error al cargar categorías');
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleSubmit = async (e, forcedName = null) => {
    if (e) e.preventDefault();
    const currentName = forcedName !== null ? forcedName : name;
    
    if (!currentName.trim()) { setError('El nombre es requerido'); return; }
    setSubmitting(true);
    setError('');

    try {
      const url = editingCategory ? `/api/categories/${editingCategory.categoryId}` : '/api/categories';
      const method = editingCategory ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: currentName })
      });

      const json = await response.json();
      if (json.success) {
        handleCloseModal();
        fetchCategories();
      } else {
        setError(json.error || 'Error al guardar');
      }
    } catch (err) {
      setError('Error de conexión al guardar');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (categoryId) => {
    setConfirmConfig({
      isOpen: true,
      title: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.',
      onConfirm: () => executeDelete(categoryId)
    });
  };

  const executeDelete = async (categoryId) => {
    setConfirmConfig(prev => ({ ...prev, isOpen: false }));
    try {
      const response = await fetch(`/api/categories/${categoryId}`, { method: 'DELETE' });
      const json = await response.json();
      if (json.success) {
        fetchCategories();
      } else {
        setAlertConfig({
          isOpen: true,
          title: 'Error',
          message: json.error || 'Error al eliminar la categoría',
          variant: 'danger'
        });
      }
    } catch (err) {
      setAlertConfig({
        isOpen: true,
        title: 'Error de conexión',
        message: 'No se pudo conectar con el servidor para eliminar la categoría',
        variant: 'danger'
      });
    }
  };

  return (
    <main className="h-full flex-1 overflow-y-auto transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4 pb-10">
      <div className="container mx-auto space-y-8 pt-2">
        <Header
          title="Categorías"
          description="Administración de categorías de productos."
        />

        {isLoading && (
          <div className="flex justify-center py-20">
            <p className="animate-pulse text-md font-medium tracking-wider text-secondary">
              Cargando...
            </p>
          </div>
        )}

        {!isLoading && error && (
          <div className="flex justify-center py-20">
            <p className="text-md font-medium tracking-wider text-secondary">
              Ha ocurrido un error, intenta de nuevo
            </p>
          </div>
        )}

        {!isLoading && !error && categories.length === 0 && (
          <div className="flex justify-center py-20">
            <p className="text-md font-medium tracking-wider text-secondary">
              No hay categorías disponibles.
            </p>
          </div>
        )}

        {!isLoading && !error && categories &&
          <section className="rounded-xl p-6 flex flex-col gap-6 relative">
            <HeaderCategory
              handleOpenModal={handleOpenModal}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              categories={categories}
            />

            <MainCategory
              handleOpenModal={handleOpenModal}
              categories={categories}
              handleDelete={handleDelete}
              searchTerm={searchTerm}
            />

            {isModalOpen && (
              <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingCategory ? 'Actualizar Categoría' : 'Nueva Categoría'}
              >
                <CategoryForm
                  editingCategory={editingCategory}
                  initialName={name}
                  onSubmit={(newName) => {
                    setName(newName);
                    const dummyEvent = { preventDefault: () => {} };
                    handleSubmit(dummyEvent, newName);
                  }}
                  onCancel={handleCloseModal}
                  error={error}
                  submitting={submitting}
                />
              </Modal>
            )}

            {confirmConfig.isOpen && (
              <Modal
                isOpen={confirmConfig.isOpen}
                onClose={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))}
                title={confirmConfig.title}
              >
                <ActionDialog
                  type="confirm"
                  message={confirmConfig.message}
                  onConfirm={confirmConfig.onConfirm}
                  onCancel={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))}
                  variant="danger"
                />
              </Modal>
            )}

            {alertConfig.isOpen && (
              <Modal
                isOpen={alertConfig.isOpen}
                onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
                title={alertConfig.title}
              >
                <ActionDialog
                  type="alert"
                  message={alertConfig.message}
                  onConfirm={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
                  variant={alertConfig.variant}
                  confirmText="Cerrar"
                />
              </Modal>
            )}
          </section>
        }
      </div>
    </main>
  );
}

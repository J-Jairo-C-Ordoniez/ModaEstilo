'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CatalogHeader from './ui/CatalogHeader';
import CatalogTable from './ui/CatalogTable';
import ProductForm from './ui/ProductForm';
import VariantForm from './ui/VariantForm';
import Modal from '../categories/ui/Modal';
import ActionDialog from '../categories/ui/ActionDialog';
import Header from '../main/ui/Header';

export default function CatalogClient() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedProducts, setExpandedProducts] = useState({});
    const [productModal, setProductModal] = useState({ isOpen: false, editingProduct: null });
    const [variantModal, setVariantModal] = useState({ isOpen: false, editingVariant: null, productId: null });
    const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, title: '', message: '', onConfirm: null });
    const [alertConfig, setAlertConfig] = useState({ isOpen: false, title: '', message: '', variant: 'primary' });

    const searchParams = useSearchParams();

    const fetchData = async () => {
        setLoading(true);
        try {
            const [productsRes, categoriesRes] = await Promise.all([
                fetch('/api/catalog?action=dashboard'),
                fetch('/api/catalog?action=categories')
            ]);
            
            const productsJson = await productsRes.json();
            const categoriesJson = await categoriesRes.json();

            if (productsJson.success) setProducts(productsJson.data);
            if (categoriesJson.success) setCategories(categoriesJson.data);
        } catch (err) {
            setError('Error al cargar datos del catálogo');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const variantId = searchParams.get('variantId');
        if (variantId && products.length > 0) {
            const product = products.find(p => 
                p.variants.some(v => v.variantId.toString() === variantId)
            );
            if (product) {
                setExpandedProducts(prev => ({ ...prev, [product.productId]: true }));
                setTimeout(() => {
                    const element = document.getElementById(`variant-${variantId}`);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        element.classList.add('animate-pulse-brief');
                    }
                }, 300);
            }
        }
    }, [searchParams, products]);

    const toggleExpand = (productId) =>
        setExpandedProducts(prev => ({ ...prev, [productId]: !prev[productId] }));

    const handleOpenProductModal = (product = null) => {
        setProductModal({ isOpen: true, editingProduct: product });
    };

    const handleProductSubmit = async (data) => {
        setSubmitting(true);
        try {
            const url = productModal.editingProduct 
                ? `/api/catalog/products/${productModal.editingProduct.productId}`
                : '/api/catalog/products';
            const method = productModal.editingProduct ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await res.json();

            if (json.success) {
                setProductModal({ isOpen: false, editingProduct: null });
                fetchData();
            } else {
                setAlertConfig({ isOpen: true, title: 'Error', message: json.error, variant: 'danger' });
            }
        } catch (err) {
            setAlertConfig({ isOpen: true, title: 'Error', message: 'Error de conexión', variant: 'danger' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteProduct = (productId) => {
        setConfirmConfig({
            isOpen: true,
            title: 'Eliminar Producto',
            message: '¿Estás seguro de eliminar este producto? (No debe tener variantes asociadas)',
            onConfirm: () => executeDeleteProduct(productId)
        });
    };

    const executeDeleteProduct = async (productId) => {
        setConfirmConfig(prev => ({ ...prev, isOpen: false }));
        try {
            const res = await fetch(`/api/catalog/products/${productId}`, { method: 'DELETE' });
            const json = await res.json();
            if (json.success) fetchData();
            else setAlertConfig({ isOpen: true, title: 'Error', message: json.error, variant: 'danger' });
        } catch (err) {
            setAlertConfig({ isOpen: true, title: 'Error', message: 'Error de conexión', variant: 'danger' });
        }
    };

    const handleOpenVariantModal = (productId, variant = null) => {
        setVariantModal({ isOpen: true, editingVariant: variant, productId });
    };

    const handleVariantSubmit = async (data) => {
        setSubmitting(true);
        try {
            const url = variantModal.editingVariant 
                ? `/api/catalog/variants/${variantModal.editingVariant.variantId}`
                : '/api/catalog/variants';
            const method = variantModal.editingVariant ? 'PATCH' : 'POST';
            
            if (!variantModal.editingVariant) data.productId = variantModal.productId;

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await res.json();

            if (json.success) {
                setVariantModal({ isOpen: false, editingVariant: null, productId: null });
                fetchData();
            } else {
                setAlertConfig({ isOpen: true, title: 'Error', message: json.error, variant: 'danger' });
            }
        } catch (err) {
            setAlertConfig({ isOpen: true, title: 'Error', message: 'Error de conexión', variant: 'danger' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteVariant = (variantId) => {
        setConfirmConfig({
            isOpen: true,
            title: 'Eliminar Variante',
            message: '¿Estás seguro de eliminar esta variante?',
            onConfirm: () => executeDeleteVariant(variantId)
        });
    };

    const executeDeleteVariant = async (variantId) => {
        setConfirmConfig(prev => ({ ...prev, isOpen: false }));
        try {
            const res = await fetch(`/api/catalog/variants/${variantId}`, { method: 'DELETE' });
            const json = await res.json();
            if (json.success) fetchData();
            else setAlertConfig({ isOpen: true, title: 'Error', message: json.error, variant: 'danger' });
        } catch (err) {
            setAlertConfig({ isOpen: true, title: 'Error', message: 'Error de conexión', variant: 'danger' });
        }
    };

    if (loading && products.length === 0) {
        return (
            <main className="h-full flex-1 flex justify-center py-20">
                <p className="animate-pulse text-md font-medium tracking-wider text-secondary">
                    Cargando catálogo...
                </p>
            </main>
        );
    }

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="h-full flex-1 overflow-y-auto transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4 pb-10">
            <div className="container mx-auto space-y-8 pt-2">
                <Header 
                    title="Catálogo" 
                    description="Gestiona tus productos y todas sus variantes." 
                />

                <section className="rounded-xl p-6 flex flex-col gap-6 relative">
                    <CatalogHeader 
                        productCount={products.length} 
                        onOpenProductModal={() => handleOpenProductModal()} 
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />

                    <CatalogTable 
                        products={filteredProducts}
                        expandedProducts={expandedProducts}
                        onToggleExpand={toggleExpand}
                        onAddVariant={handleOpenVariantModal}
                        onEditProduct={handleOpenProductModal}
                        onDeleteProduct={handleDeleteProduct}
                        onEditVariant={handleOpenVariantModal}
                        onDeleteVariant={handleDeleteVariant}
                    />
                </section>
            </div>

            <Modal
                isOpen={productModal.isOpen}
                onClose={() => setProductModal({ isOpen: false, editingProduct: null })}
                title={productModal.editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            >
                <ProductForm 
                    editingProduct={productModal.editingProduct}
                    categories={categories}
                    onSubmit={handleProductSubmit}
                    onCancel={() => setProductModal({ isOpen: false, editingProduct: null })}
                    loading={submitting}
                />
            </Modal>

            <Modal
                isOpen={variantModal.isOpen}
                onClose={() => setVariantModal({ isOpen: false, editingVariant: null, productId: null })}
                title={variantModal.editingVariant ? 'Editar Variante' : 'Nueva Variante'}
            >
                <VariantForm 
                    editingVariant={variantModal.editingVariant}
                    onSubmit={handleVariantSubmit}
                    onCancel={() => setVariantModal({ isOpen: false, editingVariant: null, productId: null })}
                    loading={submitting}
                />
            </Modal>

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
        </main>
    );
}

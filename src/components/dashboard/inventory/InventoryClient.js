'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../main/ui/Header';
import InventoryHeader from './ui/InventoryHeader';
import InventoryTable from './ui/InventoryTable';

export default function InventoryClient() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [loadingId, setLoadingId] = useState(null);
    const [expandedProducts, setExpandedProducts] = useState({});
    const searchParams = useSearchParams();

    const fetchInventory = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/inventory');
            const json = await res.json();
            if (json.success) setProducts(json.data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    useEffect(() => {
        const variantId = searchParams.get('variantId');
        if (variantId && products.length > 0) {
            // Find which product this variant belongs to and expand it
            const product = products.find(p => p.variants.some(v => v.variantId.toString() === variantId));
            if (product) {
                setExpandedProducts(prev => ({ ...prev, [product.productId]: true }));
                setTimeout(() => {
                    const element = document.getElementById(`inventory-row-${variantId}`);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        element.classList.add('animate-highlight-brief');
                    }
                }, 400);
            }
        }
    }, [searchParams, products]);

    const toggleExpand = (productId) => {
        setExpandedProducts(prev => ({ ...prev, [productId]: !prev[productId] }));
    };

    const handleUpdateStock = async (variantId, newStock) => {
        setLoadingId(variantId);
        try {
            const res = await fetch('/api/inventory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ variantId, stock: parseInt(newStock) })
            });
            const json = await res.json();
            if (json.success) {
                fetchInventory();
            } else {
                alert(json.error || 'Error al actualizar stock');
            }
        } catch (error) {
            alert('Error de conexión');
        } finally {
            setLoadingId(null);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.variants.some(v => 
            v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            v.sku.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (loading && products.length === 0) {
        return (
            <main className="h-full flex-1 flex justify-center py-20">
                <p className="animate-pulse text-md font-medium tracking-wider text-secondary">
                    Cargando inventario...
                </p>
            </main>
        );
    }

    return (
        <main className="h-full flex-1 overflow-y-auto transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4 pb-10">
            <style jsx global>{`
                @keyframes highlight-brief {
                    0% { background-color: transparent; }
                    50% { background-color: rgba(var(--dash-primary-rgb), 0.1); }
                    100% { background-color: transparent; }
                }
                .animate-highlight-brief {
                    animation: highlight-brief 2s ease-out 2;
                    border: 1px solid var(--dash-primary) !important;
                }
            `}</style>
            
            <div className="container mx-auto space-y-8 pt-2">
                <Header 
                    title="Inventario" 
                    description="Control total de existencias por producto y variante." 
                />

                <section className="rounded-xl p-6 flex flex-col gap-6 relative">
                    <InventoryHeader 
                        variantCount={products.reduce((acc, p) => acc + p.variants.length, 0)} 
                        searchTerm={searchTerm} 
                        setSearchTerm={setSearchTerm} 
                    />

                    <InventoryTable 
                        products={filteredProducts} 
                        expandedProducts={expandedProducts}
                        onToggleExpand={toggleExpand}
                        loadingId={loadingId} 
                        onUpdateStock={handleUpdateStock} 
                    />
                </section>
            </div>
        </main>
    );
}

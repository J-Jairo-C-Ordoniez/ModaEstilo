'use client';

import React, { useState, useEffect } from 'react';
import Header from '../main/ui/Header';
import Modal from '../categories/ui/Modal';
import SalesHeader from './ui/SalesHeader';
import SalesTable from './ui/SalesTable';
import SaleForm from './ui/SaleForm';
import ActionDialog from '../categories/ui/ActionDialog';

export default function SalesClient() {
    const [sales, setSales] = useState([]);
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ isOpen: false, title: '', message: '', variant: 'primary', type: 'alert' });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [salesRes, variantsRes] = await Promise.all([
                fetch('/api/sales'),
                fetch('/api/sales?action=variants')
            ]);
            
            const salesJson = await salesRes.json();
            const variantsJson = await variantsRes.json();

            if (salesJson.success) setSales(salesJson.data);
            if (variantsJson.success) setVariants(variantsJson.data);
        } catch (err) {
            console.error('Error fetching sales data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSaleSubmit = async (data) => {
        setSubmitting(true);
        try {
            const res = await fetch('/api/sales', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await res.json();

            if (json.success) {
                setIsModalOpen(false);
                fetchData();
                setAlertConfig({ 
                    isOpen: true, 
                    title: 'Éxito', 
                    message: 'Venta registrada correctamente e inventario actualizado.', 
                    variant: 'success',
                    type: 'success'
                });
            } else {
                setAlertConfig({ 
                    isOpen: true, 
                    title: 'Error', 
                    message: json.error || 'No se pudo registrar la venta', 
                    variant: 'danger',
                    type: 'alert'
                });
            }
        } catch (err) {
            setAlertConfig({ 
                isOpen: true, 
                title: 'Error', 
                message: 'Error de conexión al servidor', 
                variant: 'danger',
                type: 'alert'
            });
        } finally {
            setSubmitting(false);
        }
    };

    const filteredSales = sales.filter(s => 
        s.saleId.toString().includes(searchTerm) ||
        s.variant.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.variant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && sales.length === 0) {
        return (
            <main className="h-full flex-1 flex justify-center py-20">
                <p className="animate-pulse text-md font-medium tracking-wider text-secondary">
                    Cargando historial de ventas...
                </p>
            </main>
        );
    }

    return (
        <main className="h-full flex-1 overflow-y-auto transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4 pb-10">
            <div className="container mx-auto space-y-8 pt-2">
                <Header 
                    title="Ventas" 
                    description="Historial completo de transacciones y registro de nuevas ventas." 
                />

                <section className="rounded-xl p-6 flex flex-col gap-6 relative">
                    <SalesHeader 
                        saleCount={sales.length}
                        onOpenSaleModal={() => setIsModalOpen(true)}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />

                    <SalesTable sales={filteredSales} />
                </section>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Registrar Nueva Venta"
            >
                <SaleForm 
                    variants={variants}
                    onSubmit={handleSaleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                    submitting={submitting}
                />
            </Modal>

            {alertConfig.isOpen && (
                <Modal
                    isOpen={alertConfig.isOpen}
                    onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
                    title={alertConfig.title}
                >
                    <ActionDialog
                        type={alertConfig.type}
                        message={alertConfig.message}
                        onConfirm={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
                        variant={alertConfig.variant}
                        confirmText="Aceptar"
                    />
                </Modal>
            )}
        </main>
    );
}

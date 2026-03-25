import React, { useState, useEffect } from 'react';

export default function SaleForm({ variants, onSubmit, onCancel, submitting }) {
    const [formData, setFormData] = useState({
        variantId: '',
        amount: 1,
        paymentMethod: 'Efectivo',
    });
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (formData.variantId) {
            const v = variants.find(v => v.variantId.toString() === formData.variantId);
            setSelectedVariant(v);
            if (v) setTotal(v.price * formData.amount);
        } else {
            setSelectedVariant(null);
            setTotal(0);
        }
    }, [formData.variantId, formData.amount, variants]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.variantId) return;
        onSubmit({
            ...formData,
            variantId: parseInt(formData.variantId),
            total: total
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <div className="space-y-4">
                <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary ml-1">
                        Producto / Variante
                    </label>
                    <select
                        required
                        value={formData.variantId}
                        onChange={(e) => setFormData({ ...formData, variantId: e.target.value })}
                        className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-sm text-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all appearance-none"
                    >
                        <option value="">Selecciona una variante...</option>
                        {variants.map((v) => (
                            <option key={v.variantId} value={v.variantId}>
                                {v.product.name} - {v.name} ({v.size}/{v.color}) - ${v.price.toLocaleString()}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary ml-1">
                            Cantidad
                        </label>
                        <input
                            type="number"
                            min="1"
                            required
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })}
                            className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-sm text-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                        />
                    </div>

                    <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary ml-1">
                            Método de Pago
                        </label>
                        <select
                            value={formData.paymentMethod}
                            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                            className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-sm text-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all appearance-none"
                        >
                            <option value="Efectivo">Efectivo</option>
                            <option value="Transferencia">Transferencia</option>
                            <option value="Tarjeta">Tarjeta</option>
                        </select>
                    </div>
                </div>

                {selectedVariant && (
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex justify-between items-center animate-in fade-in slide-in-from-top-2 duration-300">
                        <div>
                            <p className="text-[10px] text-secondary tracking-widest uppercase">Resumen de Venta</p>
                            <p className="text-xs text-primary font-medium mt-1">
                                {selectedVariant.product.name} x {formData.amount}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-secondary tracking-widest uppercase">Total Cobrar</p>
                            <p className="text-lg font-bold text-primary">${total.toLocaleString()}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-4 py-3 border border-primary/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-secondary hover:bg-primary/5 transition-all active:scale-95"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={submitting || !formData.variantId}
                    className="flex-2 px-8 py-3 bg-primary/90 hover:bg-primary text-foreground rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm active:scale-95 disabled:opacity-50"
                >
                    {submitting ? 'Procesando...' : 'Confirmar Venta'}
                </button>
            </div>
        </form>
    );
}

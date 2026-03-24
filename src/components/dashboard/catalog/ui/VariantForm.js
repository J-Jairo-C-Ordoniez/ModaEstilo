export default function VariantForm({ editingVariant, onSubmit, onCancel, loading, error }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.isActive = e.target.isActive.checked;
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
                    <p className="text-sm font-medium tracking-wider">{error}</p>
                </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold tracking-wider text-primary/90">
                        Nombre de la variante
                    </label>
                    <input 
                        required 
                        name="name" 
                        defaultValue={editingVariant?.name} 
                        className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors bg-transparent" 
                        placeholder="Ej: Negro L" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold tracking-wider text-primary/90">
                        SKU
                    </label>
                    <input 
                        required 
                        name="sku" 
                        defaultValue={editingVariant?.sku} 
                        className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors bg-transparent" 
                        placeholder="TSHIRT-BLK-L"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold tracking-wider text-primary/90">
                        Color
                    </label>
                    <input 
                        required 
                        name="color" 
                        defaultValue={editingVariant?.color} 
                        className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors bg-transparent" 
                        placeholder="Negro"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold tracking-wider text-primary/90">
                        Talla
                    </label>
                    <input 
                        required 
                        name="size" 
                        defaultValue={editingVariant?.size} 
                        className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors bg-transparent" 
                        placeholder="L"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold tracking-wider text-primary/90">
                        Precio
                    </label>
                    <input 
                        required 
                        type="number" 
                        step="0.01" 
                        name="price" 
                        defaultValue={editingVariant?.price} 
                        className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors bg-transparent" 
                        placeholder="95000"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold tracking-wider text-primary/90">
                        URL Imagen
                    </label>
                    <input 
                        required 
                        name="image" 
                        defaultValue={editingVariant?.image} 
                        className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors bg-transparent" 
                        placeholder="https://..." 
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 bg-secondary/5 p-4 rounded-lg border border-secondary/10">
                <input 
                    type="checkbox" 
                    id="isActive" 
                    name="isActive" 
                    defaultChecked={editingVariant ? editingVariant.isActive : true} 
                    className="h-5 w-5 rounded border-secondary/20 text-primary focus:ring-primary shadow-sm cursor-pointer" 
                />
                <label htmlFor="isActive" className="text-sm font-bold text-primary/80 cursor-pointer select-none">
                    Variante Activa e Visible en Catálogo
                </label>
            </div>

            <div className="flex gap-4 pt-4">
                <button 
                    type="button" 
                    onClick={onCancel}
                    className="bg-secondary/10 hover:bg-secondary/20 transition-colors duration-300 text-secondary px-6 py-3 rounded-md cursor-pointer disabled:opacity-50 flex-1"
                >
                    Cancelar
                </button>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-primary/90 hover:bg-primary transition-colors duration-300 text-foreground px-6 py-3 rounded-md cursor-pointer disabled:opacity-50 flex-1"
                >
                    {loading ? 'Procesando...' : 'Guardar Variante'}
                </button>
            </div>
        </form>
    );
}

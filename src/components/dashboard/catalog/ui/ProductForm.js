export default function ProductForm({ editingProduct, categories, onSubmit, onCancel, loading, error }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
                    <p className="text-sm font-medium tracking-wider">{error}</p>
                </div>
            )}
            
            <div className="space-y-2">
                <label className="block text-sm font-semibold tracking-wider text-primary/90">
                    Nombre del producto
                </label>
                <input 
                    required 
                    name="name" 
                    defaultValue={editingProduct?.name} 
                    className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors bg-transparent" 
                    placeholder="Ej: Camiseta Oversized..."
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-semibold tracking-wider text-primary/90">
                    Descripción
                </label>
                <textarea 
                    required 
                    name="description" 
                    defaultValue={editingProduct?.description} 
                    className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm placeholder:text-secondary/60 focus:outline-none focus:border-secondary/60 transition-colors bg-transparent min-h-[100px]" 
                    placeholder="Describe las características principales..."
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold tracking-wider text-primary/90">
                        Categoría
                    </label>
                    <select 
                        required 
                        name="categoryId" 
                        defaultValue={editingProduct?.categoryId} 
                        className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm bg-transparent focus:outline-none focus:border-secondary/60 transition-colors cursor-pointer appearance-none"
                    >
                        <option value="" className="bg-foreground text-primary">Seleccione...</option>
                        {categories.map(c => (
                            <option key={c.categoryId} value={c.categoryId} className="bg-foreground text-primary">{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold tracking-wider text-primary/90">
                        Género
                    </label>
                    <select 
                        required 
                        name="gender" 
                        defaultValue={editingProduct?.gender || 'mixto'} 
                        className="text-primary tracking-wider w-full border border-secondary/10 p-3 rounded-sm bg-transparent focus:outline-none focus:border-secondary/60 transition-colors cursor-pointer appearance-none"
                    >
                        <option value="hombre" className="bg-foreground text-primary">Hombre</option>
                        <option value="mujer" className="bg-foreground text-primary">Mujer</option>
                        <option value="mixto" className="bg-foreground text-primary">Mixto</option>
                    </select>
                </div>
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
                    {loading ? 'Procesando...' : 'Guardar Producto'}
                </button>
            </div>
        </form>
    );
}

import { create } from "zustand";

const useFilterCatalogStore = create((set, get) => ({
    gender: 'mujer',
    color: [],
    category: [],
    products: [],
    isLoading: false,
    error: null,

    setGender: (gender) => {
        set({ gender: gender });
        get().fetchProducts();
    },

    setColor: (color) => {
        set({ color: color });
        get().fetchProducts();
    },

    setCategory: (category) => {
        console.log(category);
        set({ category: category });
        get().fetchProducts();
    },

    fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
            const { category, color, gender } = get();
            
            const params = new URLSearchParams();

            if (gender) {
                params.append('gender', gender);
            }

            if (category && category.length > 0) {
                const activeCategories = category.map(c => c.categoryId || c).join(',');
                params.append('category', activeCategories);
            }
            
            if (color && color.length > 0) {
                const activeColors = color.map(c => c.name || c).join(',');
                params.append('color', activeColors);
            }
            
            const url = `/api/catalog?${params.toString()}`;
            const res = await fetch(url);
            const json = await res.json();
            
            if (json.success) {
                set({ products: json.data, isLoading: false });
            } else {
                set({ error: json.error, isLoading: false });
            }
        } catch (err) {
            set({ error: err.message, isLoading: false });
        }
    }
}));

export default useFilterCatalogStore;
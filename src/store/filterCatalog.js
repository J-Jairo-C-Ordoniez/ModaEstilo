import { create } from "zustand";

const useFilterCatalogStore = create((set) => ({
    color: ["all"],
    category: ["all"],

    setColor: (color) => {
        set({
            color: color
        })
    },

    setCategory: (category) => {
        set({
            category: category
        })
    }
}));

export default useFilterCatalogStore;
import { create } from "zustand";

const levelMain = "página de inicio";

const useBreadcrumbsStore = create((set) => ({
    breadcrumbs: [
        {
            label: levelMain,
            isAbsolute: false,
        },
        {
            label: "mujer",
            isAbsolute: true,
        }
    ],

    setBreadcrumbsRoute: (route) => {
        set({
            breadcrumbs: [
                {
                    label: levelMain,
                    isAbsolute: false,
                },
                {
                    label: route,
                    isAbsolute: true,
                }
            ]
        })
    },

    setBreadcrumbsProduct: (route, product, variant) => {
        set({
            breadcrumbs: [
                {
                    label: levelMain,
                    isAbsolute: false,
                },
                {
                    label: route,
                    isAbsolute: false,
                },
                {
                    label: product,
                    isAbsolute: false,
                },
                {
                    label: variant,
                    isAbsolute: true,
                }
            ]
        })
    },
}));

export default useBreadcrumbsStore;
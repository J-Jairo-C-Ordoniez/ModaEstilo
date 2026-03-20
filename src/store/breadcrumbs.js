import { create } from "zustand";

const levelMain = "página de inicio";

const useBreadcrumbsStore = create((set) => ({
    breadcrumbs: [
        {
            label: levelMain,
            active: false,
        },
        {
            label: "mujer",
            active: true,
        }
    ],

    setBreadcrumbsRoute: (route) => {
        set({
            breadcrumbs: [
                {
                    label: levelMain,
                    active: false,
                },
                {
                    label: route,
                    active: true,
                }
            ]
        })
    },

    setBreadcrumbsProduct: (route, product, variant) => {
        set({
            breadcrumbs: [
                {
                    label: levelMain,
                    active: false,
                },
                {
                    label: route,
                    active: false,
                },
                {
                    label: product,
                    active: false,
                },
                {
                    label: variant,
                    active: true,
                }
            ]
        })
    },
}));

export default useBreadcrumbsStore;
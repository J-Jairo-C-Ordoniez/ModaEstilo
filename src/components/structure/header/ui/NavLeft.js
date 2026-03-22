export default function NavLeft({ breadcrumbs, setBreadcrumbsRoute, setGender }) {
    return (
        <nav className="flex items-center gap-6 text-xs font-semibold tracking-wider text-gray-500">
            <button
                onClick={() => {
                    setBreadcrumbsRoute("mujer")
                    setGender("mujer")
                }}
                className={breadcrumbs[1].label.toUpperCase() === "MUJER" ? "text-primary transition-colors cursor-pointer" : "text-secondary/90 hover:text-primary transition-colors cursor-pointer"}>
                MUJER
            </button>
            <button
                onClick={() => {
                    setBreadcrumbsRoute("hombre")
                    setGender("hombre")
                }}
                className={breadcrumbs[1].label.toUpperCase() === "HOMBRE" ? "text-primary transition-colors cursor-pointer" : "text-secondary/90 hover:text-primary transition-colors cursor-pointer"}>
                HOMBRE
            </button>
        </nav>
    );
}

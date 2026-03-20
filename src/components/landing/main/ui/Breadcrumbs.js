export default function Breadcrumbs({ breadcrumbs, setBreadcrumbsRoute }) {
    return (
        <div className="flex items-center gap-1 text-xs font-semibold tracking-wider text-gray-500 py-2">
            {breadcrumbs.map((breadcrumb, index) => (
                <button
                    key={index}
                    onClick={() => setBreadcrumbsRoute(breadcrumb.label)}
                    className={breadcrumbs[index].active ? "text-primary transition-colors cursor-pointer" : "text-secondary/90 hover:text-primary transition-colors cursor-pointer"}
                >
                    {breadcrumb.label.toUpperCase()}
                    {index < breadcrumbs.length - 1 && " |"}
                </button>
            ))}
        </div>
    );
}

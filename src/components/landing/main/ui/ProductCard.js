export function ProductCard({ product }) {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });

  return (
    <article className="flex flex-col group cursor-pointer">
      <div className={`aspect-4/6 w-full mb-4 relative overflow-hidden bg-foreground flex items-center justify-center`}>
        <div className={`w-3/4 h-[60%] ${product.imageColor} rounded-md shadow-sm group-hover:scale-105 transition-transform duration-500 ease-out`} />
      </div>

      <div className="flex justify-between items-start leading-tight text-xs uppercase tracking-wide">
        <div className="flex flex-col gap-1 text-secondary font-medium text-xs">
          <h3 className="group-hover:text-primary/90 transition-colors">{product.name}</h3>
          <span className="text-primary uppercase">{product.subtitle}</span>
        </div>
        <div className="text-primary font-extrabold">
          {formatter.format(product.price).replace('$', '$ ')} COP
        </div>
      </div>
    </article>
  );
}

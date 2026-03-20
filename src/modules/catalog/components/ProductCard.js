export function ProductCard({ product }) {
  // Format price in COP
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });

  return (
    <div className="flex flex-col group cursor-pointer">
      {/* Product Image Placeholder */}
      <div className={`aspect-[4/5] w-full mb-6 relative overflow-hidden bg-[#f4f4f4] flex items-center justify-center`}>
        {/* Instead of a real image, we use the colored block to represent the product as instructed by static data. 
            The design has plain backgrounds with a centered shirt. We can simulate it by putting a smaller colored 
            box or just replacing the whole bg, but the prompt says use static data, do not connect to anything, just implement the design. 
            I'll use a centered T-shirt like box for realism or just the background as specified. */}
        <div className={`w-3/4 h-[60%] ${product.imageColor} rounded-md shadow-sm group-hover:scale-105 transition-transform duration-500 ease-out`} />
      </div>

      {/* Product Details */}
      <div className="flex justify-between items-start pt-2 border-t border-transparent leading-tight text-xs uppercase tracking-wide">
        <div className="flex flex-col gap-1 text-gray-900 font-medium">
          <h3 className="group-hover:text-gray-600 transition-colors">{product.name}</h3>
          <span className="text-gray-500 capitalize">{product.subtitle}</span>
        </div>
        <div className="font-bold text-black border-b border-transparent">
          {formatter.format(product.price).replace('$', '$ ')} COP
        </div>
      </div>
    </div>
  );
}

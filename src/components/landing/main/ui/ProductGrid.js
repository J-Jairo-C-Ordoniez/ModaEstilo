import { ProductCard } from './ProductCard';
import { products } from '../../../../modules/catalog/data/products';

export function ProductGrid() {
  if (!products || products.length === 0) {
    return <div className="text-center py-20 text-gray-400">No hay productos disponibles.</div>;
  }

  return (
    <section className="pt-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-16">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
}

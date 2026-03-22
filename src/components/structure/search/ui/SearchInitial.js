"use client";

import { ProductCard } from "../../main/ui/ProductCard";

export default function SearchInitial({ popular, categories }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="md:col-span-3">
        <h2 className="text-secondary/60 text-xs font-semibold uppercase tracking-widest mb-6 border-b border-secondary/10 pb-2">
          Recomendaciones
        </h2>
        <ul className="space-y-2 mb-12">
          {popular.slice(0, 3).map((v) => (
            <li key={v.variantId}>
              <button className="text-primary hover:text-secondary/80 text-sm font-medium transition-colors cursor-pointer uppercase tracking-wider">
                {v.product.name} | {v.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {popular.map((product) => (
            <ProductCard key={product.variantId} product={product} />
          ))}
        </div>
      </div>

      <div className="md:col-span-1">
        <h2 className="text-secondary/60 text-xs font-semibold uppercase tracking-widest mb-6 border-b border-secondary/10 pb-2">
          Categorías
        </h2>
        <ul className="space-y-4">
          {categories.map((cat) => (
            <li key={cat.categoryId}>
              <button className="text-primary hover:text-secondary/80 text-sm font-medium transition-colors cursor-pointer uppercase tracking-wider">
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

"use client";

import { ProductCard } from "../../main/ui/ProductCard";

export default function SearchResults({ query, products }) {
  return (
    <div className="flex flex-col">
      <h2 className="text-secondary/60 text-xs font-semibold uppercase tracking-widest mb-6 border-b border-secondary/10 pb-2">
        Mostrando resultados para: <span className="text-primary">{query}</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.variantId} product={product} />
        ))}
      </div>
    </div>
  );
}

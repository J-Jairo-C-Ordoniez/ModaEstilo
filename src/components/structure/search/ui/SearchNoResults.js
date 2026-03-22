"use client";

import SearchInitial from "./SearchInitial";

export default function SearchNoResults({ query, popular, categories }) {
  return (
    <div className="flex flex-col">
      <div className="mb-12">
        <h2 className="text-secondary/60 text-xs font-semibold uppercase tracking-widest mb-4">
          Lo siento, no encontramos resultados para: <span className="text-primary italic">"{query}"</span>
        </h2>
        <p className="text-sm text-secondary/40 font-medium tracking-wide">
          Pero puedes seguir explorando nuestras recomendaciones:
        </p>
      </div>

      <SearchInitial popular={popular} categories={categories} />
    </div>
  );
}

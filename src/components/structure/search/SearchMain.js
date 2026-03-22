"use client";

import { useState, useEffect } from "react";
import useBreadcrumbsStore from "../../../store/breadcrumbs";
import Breadcrumbs from "../main/ui/Breadcrumbs";
import { X } from "lucide-react";
import SearchInitial from "./ui/SearchInitial";
import SearchResults from "./ui/SearchResults";
import SearchNoResults from "./ui/SearchNoResults";

export default function SearchMain() {
  const { breadcrumbs, setBreadcrumbsRoute } = useBreadcrumbsStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [popular, setPopular] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    // Fetch initial data: popular and categories
    const fetchInitialData = async () => {
      try {
        const [popRes, catRes] = await Promise.all([
          fetch("/api/catalog?action=popular&limit=4"),
          fetch("/api/catalog?action=categories")
        ]);
        const popData = await popRes.json();
        const catData = await catRes.json();
        if (popData.success) setPopular(popData.data);
        if (catData.success) setCategories(catData.data);
      } catch (error) {
        console.error("Error fetching initial search data:", error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() === "") {
        setResults([]);
        setHasSearched(false);
        return;
      }

      const fetchResults = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/catalog?search=${query}`);
          const data = await res.json();
          if (data.success) {
            setResults(data.data);
            setHasSearched(true);
          }
        } catch (error) {
          console.error("Error searching:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchResults();
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
  };

  return (
    <main className="bg-background w-full min-h-screen">
      <div className="container mx-auto p-4 md:p-8 flex flex-col">
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          setBreadcrumbsRoute={setBreadcrumbsRoute}
        />

        <div className="max-w-4xl mx-auto w-full pt-10">
          <div className="relative border-b border-secondary/20 pb-2 mb-12 group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar en la Tienda"
              className="w-full bg-transparent text-xl md:text-2xl font-medium placeholder:text-secondary/40 focus:outline-none text-primary"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-secondary/60 hover:text-primary transition-colors cursor-pointer"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-pulse text-secondary/60 tracking-widest uppercase text-sm">Buscando...</div>
            </div>
          ) : !hasSearched ? (
            <SearchInitial popular={popular} categories={categories} />
          ) : results.length > 0 ? (
            <SearchResults query={query} products={results} />
          ) : (
            <SearchNoResults query={query} popular={popular} categories={categories} />
          )}
        </div>
      </div>
    </main>
  );
}

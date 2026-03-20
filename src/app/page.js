import { Header } from "../components/ui/Header";
import { Footer } from "../components/ui/Footer";
import { FilterBar } from "../modules/catalog/components/FilterBar";
import { ProductGrid } from "../modules/catalog/components/ProductGrid";
import { Pagination } from "../modules/catalog/components/Pagination";
import { products } from "../modules/catalog/data/products";

export const metadata = {
  title: "Moda y Estilo",
  description: "Diseño de la página principal - Moda y Estilo",
};

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <FilterBar />
        <ProductGrid products={products} />
        <Pagination />
      </main>

      <Footer />
    </>
  );
}

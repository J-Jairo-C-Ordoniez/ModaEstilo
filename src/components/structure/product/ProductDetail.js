"use client";

import { useEffect, useState } from "react";
import useBreadcrumbsStore from "../../../store/breadcrumbs.store";
import Breadcrumbs from "../main/ui/Breadcrumbs";
import ProductInfo from "./ui/ProductInfo";
import ProductImg from "./ui/ProductImg";

export default function ProductDetail({ variantId }) {
  const { breadcrumbs, setBreadcrumbsRoute, setBreadcrumbsProduct } = useBreadcrumbsStore();
  const [data, setData] = useState(null);
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/catalog/variants/${variantId}`);
        const result = await res.json();

        if (result.success) {
          setData(result.data);
          setSelectedVariant(result.data);

          const variant = result.data;
          const product = variant.product;
          setBreadcrumbsProduct(
            product.gender === 'hombre' ? 'hombre' : 'mujer',
            product.name,
            variant.name
          );
        } else {
          setError(result.message || "Producto no encontrado");
        }

        const contactRes = await fetch("/api/contact");
        const contactResult = await contactRes.json();
        if (contactResult.success) {
          setContact(contactResult.data.contact);
        }
      } catch (err) {
        setError("Error de conexión");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [variantId, setBreadcrumbsProduct]);


  return (
    <main className="bg-background w-full min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          setBreadcrumbsRoute={setBreadcrumbsRoute}
        />

        {isLoading && (
          <div className="w-full py-20 flex flex-col items-center gap-4 m-auto">
            <p className="animate-pulse text-secondary/60 tracking-widest uppercase text-sm">
              Cargando...
            </p>
          </div>
        )}

        {(!isLoading && (error || !data)) && (
          <div className="w-full py-20 flex flex-col items-center gap-4 m-auto">
            <p className="text-md font-medium tracking-wider text-secondary">
              {error || "No se pudo cargar el producto"}
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-primary/90 hover:bg-primary transition-colors duration-300 text-foreground px-6 py-3 rounded-md cursor-pointer"
            >
              Volver
            </button>
          </div>
        )}

        {!isLoading && !error && data &&
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 py-5">
            <ProductImg variant={selectedVariant} />

            <ProductInfo
              product={data.product}
              variant={selectedVariant}
              allVariants={data.product.variants}
              contact={contact}
              setSelectedVariant={setSelectedVariant}
            />
          </section>}
      </div>
    </main>
  );
}

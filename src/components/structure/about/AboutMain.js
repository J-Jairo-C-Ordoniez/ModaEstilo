"use client";

import { useEffect, useState } from "react";
import useBreadcrumbsStore from "../../../store/breadcrumbs";
import Breadcrumbs from "../main/ui/Breadcrumbs";
import Content from "./ui/Content";

export default function AboutMain() {
  const { breadcrumbs, setBreadcrumbsRoute } = useBreadcrumbsStore();
  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setBreadcrumbsRoute("sobre nosotros");
  }, [setBreadcrumbsRoute]);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/about");
        const result = await response.json();

        if (result.success) {
          setAboutData(result.data);
        } else {
          setError(result.message || "Error al cargar la información");
        }
      } catch (err) {
        console.error("Error fetching about data:", err);
        setError("Error de conexión con el servidor");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <main className="bg-background w-full min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          setBreadcrumbsRoute={setBreadcrumbsRoute}
        />

        {isLoading && (
          <div className="w-full py-20 flex flex-col items-center gap-4 m-auto col-span-full">
            <p className="animate-pulse text-secondary/60 tracking-widest uppercase text-sm">
              Cargando...
            </p>
          </div>
        )}

        {(!isLoading && (error || !aboutData)) && (
          <div className="w-full py-20 flex flex-col items-center gap-4 m-auto col-span-full">
            <p className="text-md font-medium tracking-wider text-secondary">
              {error || "No hay información disponible"}
            </p>
          </div>
        )}

        {!isLoading && !error && aboutData && <Content aboutData={aboutData} />}
      </div>
    </main>
  );
}

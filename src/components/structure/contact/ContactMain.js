"use client";

import { useEffect, useState } from "react";
import useBreadcrumbsStore from "../../../store/breadcrumbs";
import Breadcrumbs from "../main/ui/Breadcrumbs";
import ContactContent from "./ui/ContactContent";

export default function ContactMain() {
  const { breadcrumbs, setBreadcrumbsRoute } = useBreadcrumbsStore();
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setBreadcrumbsRoute("contacto");
  }, [setBreadcrumbsRoute]);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/contact");
        const result = await response.json();
        
        if (result.success) {
          setContact(result.data.contact);
        } else {
          setError(result.message || "Error al cargar el contacto");
        }
      } catch (err) {
        setError("Error de conexión");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactData();
  }, []);

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

        {(!isLoading && (error || !contact)) && (
          <div className="w-full py-20 flex flex-col items-center gap-4 m-auto">
            <p className="text-md font-medium tracking-wider text-secondary">
              {error || "No hay información de contacto disponible"}
            </p>
          </div>
        )}

        {!isLoading && !error && contact && <ContactContent contact={contact} />}
      </div>
    </main>
  );
}

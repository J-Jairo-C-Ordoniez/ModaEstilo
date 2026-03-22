"use client";

import { useEffect, useState } from "react";
import useBreadcrumbsStore from "../../../store/breadcrumbs";
import Breadcrumbs from "../main/ui/Breadcrumbs";
import PolicyContent from "./ui/PolicyContent";

export default function PoliciesMain() {
  const { breadcrumbs, setBreadcrumbsRoute } = useBreadcrumbsStore();
  const [policyData, setPolicyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setBreadcrumbsRoute("políticas y privacidad");
  }, [setBreadcrumbsRoute]);

  useEffect(() => {
    const fetchPolicyData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/policies");
        const result = await response.json();
        
        if (result.success) {
          setPolicyData(result.data);
        } else {
          setError(result.message || "Error al cargar las políticas");
        }
      } catch (err) {
        console.error("Error fetching policies data:", err);
        setError("Error de conexión con el servidor");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolicyData();
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

        {(!isLoading && (error || !policyData)) && (
          <div className="w-full py-20 flex flex-col items-center gap-4 m-auto">
            <p className="text-md font-medium tracking-wider text-secondary">
              {error || "No hay información disponible"}
            </p>
          </div>
        )}

        {!isLoading && !error && policyData && <PolicyContent policyData={policyData} />}
      </div>
    </main>
  );
}

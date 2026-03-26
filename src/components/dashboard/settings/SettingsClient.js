'use client';

import { useState, useEffect } from 'react';
import Header from '../main/ui/Header';
import MainSettings from './ui/mainSettings';

export default function SettingsPage() {
    const [aboutUs, setAboutUs] = useState(null);
    const [policy, setPolicy] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                setIsLoading(true);
                const [aboutResponse, policyResponse] = await Promise.all([
                    fetch("/api/about"),
                    fetch("/api/policies")
                ]);

                const aboutResult = await aboutResponse.json();
                const policyResult = await policyResponse.json();

                if (aboutResult.success) {
                    setAboutUs(aboutResult.data);
                } else {
                    setError(aboutResult.message || "Error al cargar la información");
                }

                if (policyResult.success) {
                    setPolicy(policyResult.data);
                } else {
                    setError(policyResult.message || "Error al cargar la información");
                }
            } catch (err) {
                setError("Error de conexión con el servidor");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAboutData();
    }, []);

    const savePolicyAction = async (data) => {
        try {
            const res = await fetch("/api/policies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            return result;
        } catch (err) {
            return { error: "Error de conexión con el servidor" };
        }
    };

    const saveAboutUsAction = async (data) => {
        try {
            const res = await fetch("/api/about", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            return result;
        } catch (err) {
            return { error: "Error de conexión con el servidor" };
        }
    };

    if (isLoading || error) {
        return (
            <main className="h-full flex-1 flex justify-center py-20">
                <p className="animate-pulse text-md font-medium tracking-wider text-secondary">
                    {error ? "Error al cargar la información" : "Cargando información..."}
                </p>
            </main>
        );
    }

    return (
        <main className="h-full flex-1 overflow-y-auto transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4 pb-10">
            <div className="space-y-6 pt-2">
                <Header
                    title="Ajustes"
                    description="Gestiona el contenido público y las políticas de la tienda."
                />

                <MainSettings 
                    initialAboutUs={aboutUs} 
                    initialPolicy={policy} 
                    savePolicyAction={savePolicyAction}
                    saveAboutUsAction={saveAboutUsAction}
                />
            </div>
        </main>
    );
}
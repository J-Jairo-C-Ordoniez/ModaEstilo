import prisma from '@/infrastructure/db/client';
import { SettingsClient } from './SettingsClient';
import Sidebar from '@/components/dashboard/sidebar/Sidebar';
import Header from '@/components/dashboard/header/Header';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const [aboutUs, policy] = await Promise.all([
    prisma.aboutUs.findFirst(),
    prisma.policy.findFirst()
  ]);

  return (
    <div className='flex flex-col h-screen overflow-hidden w-screen'>
      <Header />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <div className="space-y-6 pt-2 max-w-4xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--dash-text-strong)' }}>Ajustes</h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--dash-text-muted)' }}>
              Gestiona el contenido público y las políticas de la tienda.
            </p>
          </div>
          <SettingsClient initialAboutUs={aboutUs} initialPolicy={policy} />
        </div>
      </div>
    </div>

  );
}
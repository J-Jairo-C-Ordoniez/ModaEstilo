import prisma from '@/infrastructure/db/client';
import { SettingsClient } from './SettingsClient';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const [aboutUs, policy] = await Promise.all([
    prisma.aboutUs.findFirst(),
    prisma.policy.findFirst()
  ]);

  return (
    <div className="space-y-6 pt-2 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--dash-text-strong)' }}>Ajustes</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--dash-text-muted)' }}>
          Gestiona el contenido público y las políticas de la tienda.
        </p>
      </div>
      <SettingsClient initialAboutUs={aboutUs} initialPolicy={policy} />
    </div>
  );
}

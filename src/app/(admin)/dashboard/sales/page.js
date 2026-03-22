import prisma from '@/infrastructure/db/client';
import { SalesClient } from './SalesClient';

export const dynamic = 'force-dynamic';

export default async function SalesPage() {
  const sales = await prisma.sale.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      variant: { include: { product: true } }
    }
  });

  return (
    <div className="space-y-6 pt-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--dash-text-strong)' }}>Ventas</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--dash-text-muted)' }}>
          Historial completo de transacciones registradas.
        </p>
      </div>
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)' }}>
        <SalesClient initialSales={sales} />
      </div>
    </div>
  );
}

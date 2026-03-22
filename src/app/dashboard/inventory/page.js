import prisma from '../../../infrastructure/db/client';
import { InventoryClient } from './InventoryClient';

export const dynamic = 'force-dynamic';

export default async function InventoryPage() {
  const variants = await prisma.variant.findMany({
    include: {
      product: { include: { category: true } },
      inventories: true
    },
    orderBy: { product: { name: 'asc' } }
  });

  return (
    <div className="space-y-6 pt-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--dash-text-strong)' }}>Inventario</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--dash-text-muted)' }}>
          Controla las existencias de cada variante en tiempo real.
        </p>
      </div>
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)' }}>
        <InventoryClient initialVariants={variants} />
      </div>
    </div>
  );
}

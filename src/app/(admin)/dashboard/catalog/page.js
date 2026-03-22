import prisma from '@/infrastructure/db/client';
import { CatalogClient } from './CatalogClient';

export const dynamic = 'force-dynamic';

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: { category: true, variants: true }
    }),
    prisma.category.findMany({ orderBy: { name: 'asc' } })
  ]);

  return (
    <div className="space-y-6 pt-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--dash-text-strong)' }}>Catálogo</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--dash-text-muted)' }}>
          Gestiona tus productos y todas sus variantes.
        </p>
      </div>
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)' }}>
        <CatalogClient initialProducts={products} categories={categories} />
      </div>
    </div>
  );
}

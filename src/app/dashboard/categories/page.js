import prisma from '../../../infrastructure/db/client';
import { CategoryClient } from './CategoryClient';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { products: true } }
    }
  });

  return (
    <div className="space-y-6 pt-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--dash-text-strong)' }}>
          Categorías
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--dash-text-muted)' }}>
          Gestiona las categorías de tus productos.
        </p>
      </div>
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)' }}>
        <CategoryClient initialCategories={categories} />
      </div>
    </div>
  );
}

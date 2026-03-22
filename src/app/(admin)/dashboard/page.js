import prisma from '@/infrastructure/db/client';
import { DollarSign, ShoppingBag, AlertCircle, Package } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardHome() {
  const [
    salesCount,
    totalSalesResult,
    inventoryCountResult,
    lowStockItems,
    topProducts
  ] = await Promise.all([
    prisma.sale.count(),
    prisma.sale.aggregate({ _sum: { total: true } }),
    prisma.inventory.aggregate({ _sum: { stock: true } }),
    prisma.inventory.findMany({
      where: { stock: { lt: 10 } },
      include: { variant: { include: { product: true } } },
      take: 5,
      orderBy: { stock: 'asc' }
    }),
    prisma.variant.findMany({
      orderBy: { popularity: 'desc' },
      include: { product: true },
      take: 5
    })
  ]);

  const totalRevenue = totalSalesResult._sum.total || 0;
  const totalItems = inventoryCountResult._sum.stock || 0;

  const statCards = [
    {
      title: 'Ingresos Totales',
      value: `$${Number(totalRevenue).toLocaleString('es-CO')}`,
      sub: 'Acumulado de todas las ventas',
      icon: DollarSign,
      accent: 'var(--dash-primary)',
      accentBg: 'var(--dash-primary-subtle)',
    },
    {
      title: 'Ventas Registradas',
      value: `+${salesCount}`,
      sub: 'Total de transacciones',
      icon: ShoppingBag,
      accent: 'var(--dash-success)',
      accentBg: 'var(--dash-success-subtle)',
    },
    {
      title: 'Total Inventario',
      value: totalItems,
      sub: 'Unidades disponibles en stock',
      icon: Package,
      accent: 'var(--dash-warning)',
      accentBg: 'var(--dash-warning-subtle)',
    },
    {
      title: 'Alertas de Stock',
      value: lowStockItems.length,
      sub: 'Variantes por agotarse',
      icon: AlertCircle,
      accent: 'var(--dash-danger)',
      accentBg: 'var(--dash-danger-subtle)',
    },
  ];

  return (
    <div className="space-y-6 pt-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--dash-text-strong)' }}>
          Dashboard
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--dash-text-muted)' }}>
          Bienvenido — aquí tienes un resumen de tu tienda.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="dash-card rounded-xl p-5 flex flex-col gap-3 relative overflow-hidden"
            style={{ backgroundColor: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--dash-text-muted)' }}>
                  {card.title}
                </p>
                <p className="text-2xl font-bold mt-1" style={{ color: 'var(--dash-text-strong)' }}>
                  {card.value}
                </p>
              </div>
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: card.accentBg }}
              >
                <card.icon className="h-5 w-5" style={{ color: card.accent }} />
              </div>
            </div>
            <p className="text-xs" style={{ color: 'var(--dash-text-muted)' }}>{card.sub}</p>
            {/* Decorative line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: card.accent, opacity: 0.4 }}></div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Top Products */}
        <div
          className="dash-card col-span-4 rounded-xl overflow-hidden"
          style={{ backgroundColor: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)' }}
        >
          <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--dash-border)' }}>
            <h3 className="font-semibold text-base" style={{ color: 'var(--dash-text-strong)' }}>Productos Top</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--dash-text-muted)' }}>Variantes por popularidad</p>
          </div>
          <div className="p-6 space-y-4">
            {topProducts.length === 0 ? (
              <p className="text-sm text-center py-4" style={{ color: 'var(--dash-text-muted)' }}>
                Aún no hay datos de popularidad.
              </p>
            ) : (
              topProducts.map((variant, idx) => (
                <div key={variant.variantId} className="flex items-center gap-4">
                  <span
                    className="text-xs font-bold w-5 text-center shrink-0"
                    style={{ color: idx === 0 ? 'var(--dash-warning)' : 'var(--dash-text-muted)' }}
                  >
                    #{idx + 1}
                  </span>
                  <div
                    className="h-9 w-9 rounded-lg overflow-hidden shrink-0"
                    style={{ backgroundColor: 'var(--dash-bg-muted)' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={variant.image} alt={variant.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium truncate"
                      style={{ color: 'var(--dash-text-strong)' }}
                    >
                      {variant.product.name}
                    </p>
                    <p className="text-xs truncate" style={{ color: 'var(--dash-text-muted)' }}>
                      {variant.name} · {variant.sku}
                    </p>
                  </div>
                  <div
                    className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{ backgroundColor: 'var(--dash-primary-subtle)', color: 'var(--dash-primary)' }}
                  >
                    {variant.popularity} pop
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Low Stock */}
        <div
          className="dash-card col-span-3 rounded-xl overflow-hidden"
          style={{ backgroundColor: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)' }}
        >
          <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--dash-border)' }}>
            <h3 className="font-semibold text-base" style={{ color: 'var(--dash-text-strong)' }}>Inventario Bajo</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--dash-text-muted)' }}>Variantes con menos de 10 unidades</p>
          </div>
          <div className="p-6 space-y-4">
            {lowStockItems.length === 0 ? (
              <div className="text-center py-6 flex flex-col items-center gap-2">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--dash-success-subtle)' }}
                >
                  <Package className="h-5 w-5" style={{ color: 'var(--dash-success)' }} />
                </div>
                <p className="text-sm" style={{ color: 'var(--dash-text-muted)' }}>
                  Todo el inventario está en estado óptimo.
                </p>
              </div>
            ) : (
              lowStockItems.map((item) => (
                <div key={item.inventoryId} className="flex items-center justify-between">
                  <div className="flex flex-col max-w-[160px]">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--dash-text-strong)' }}>
                      {item.variant.product.name}
                    </p>
                    <p className="text-xs truncate" style={{ color: 'var(--dash-text-muted)' }}>
                      {item.variant.name} · {item.variant.size}
                    </p>
                  </div>
                  <div
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: item.stock === 0 ? 'var(--dash-danger-subtle)' : 'var(--dash-warning-subtle)',
                      color: item.stock === 0 ? 'var(--dash-danger)' : 'var(--dash-warning)',
                    }}
                  >
                    {item.stock} uds.
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
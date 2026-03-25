import prisma from '@/infrastructure/db/client';

export class SalesRepository {
  async createSale(saleData) {
    return await prisma.sale.create({
      data: saleData,
    });
  }
  async getSales() {
    return await prisma.sale.findMany({
      include: {
        variant: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async getSalesMetric(startDate) {
    const [count, result] = await Promise.all([
      prisma.sale.count({ where: { createdAt: { gte: startDate } } }),
      prisma.sale.aggregate({
        _sum: { total: true },
        where: { createdAt: { gte: startDate } }
      })
    ]);
    return { count, revenue: result._sum.total || 0 };
  }

  async getTotalCount() {
    return await prisma.sale.count();
  }

  async getTotalRevenue() {
    const result = await prisma.sale.aggregate({
      _sum: { total: true }
    });
    return result._sum.total || 0;
  }
}

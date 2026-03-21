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
      }
    });
  }
}

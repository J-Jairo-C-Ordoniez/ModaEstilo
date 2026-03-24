import prisma from '@/infrastructure/db/client';

export class InventoryRepository {
  async getInventoryByVariantId(variantId) {
    return await prisma.inventory.findMany({
      where: { variantId: parseInt(variantId) },
    });
  }

  async updateStock(variantId, quantityChange) {
    // In a real app, you'd want a transaction or a specific update query
    const inventories = await this.getInventoryByVariantId(variantId);
    if (!inventories.length) return null;
    
    const inventory = inventories[0];
    return await prisma.inventory.update({
      where: { inventoryId: inventory.inventoryId },
      data: { stock: inventory.stock + quantityChange }
    });
  }

  async getTotalStock() {
    const result = await prisma.inventory.aggregate({
      _sum: { stock: true }
    });
    return result._sum.stock || 0;
  }

  async getLowStockItems(limit = 10) {
    return await prisma.inventory.findMany({
      where: { stock: { lt: 10 } },
      include: {
        variant: {
          include: {
            product: true
          }
        }
      },
      take: limit,
      orderBy: { stock: 'asc' }
    });
  }
}

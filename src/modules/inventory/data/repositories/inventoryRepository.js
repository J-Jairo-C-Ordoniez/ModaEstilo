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
}

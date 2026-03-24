import { InventoryRepository } from '../../data/repositories/inventoryRepository';

export class InventoryService {
  constructor() {
    this.repository = new InventoryRepository();
  }

  async checkStock(variantId) {
    const inventories = await this.repository.getInventoryByVariantId(variantId);
    const totalStock = inventories.reduce((sum, inv) => sum + inv.stock, 0);
    return { variantId, stock: totalStock };
  }

  async decreaseStock(variantId, amount) {
    if (amount <= 0) throw new Error('Amount must be positive');
    
    const { stock } = await this.checkStock(variantId);
    if (stock < amount) {
      throw new Error('No hay suficiente stock disponible');
    }
    
    return await this.repository.updateStock(variantId, -amount);
  }

  async getDashboardData() {
    const [totalStock, lowStockItems] = await Promise.all([
      this.repository.getTotalStock(),
      this.repository.getLowStockItems(10)
    ]);
    return { totalStock, lowStockItems };
  }
}

import { SalesRepository } from '../../data/repositories/salesRepository';
import { InventoryService } from '@/modules/inventory/application/services/inventoryService';

export class SalesService {
  constructor() {
    this.repository = new SalesRepository();
    this.inventoryService = new InventoryService();
  }

  async registerSale(saleData) {
    // Verificar y descontar stock
    await this.inventoryService.decreaseStock(saleData.variantId, saleData.amount);
    
    // Si hay stock, registrar la venta
    const newSale = await this.repository.createSale(saleData);
    return newSale;
  }

  async getAllSales() {
    return await this.repository.getSales();
  }

  async getDashboardMetrics() {
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [day, week, month, totalCount, totalRevenue] = await Promise.all([
      this.repository.getSalesMetric(dayAgo),
      this.repository.getSalesMetric(weekAgo),
      this.repository.getSalesMetric(monthAgo),
      this.repository.getTotalCount(),
      this.repository.getTotalRevenue()
    ]);

    return {
      periods: { day, week, month },
      totalCount,
      totalRevenue
    };
  }
}

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
}

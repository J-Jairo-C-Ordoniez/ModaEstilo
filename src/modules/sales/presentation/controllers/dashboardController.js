import { NextResponse } from 'next/server';
import { SalesService } from '../../application/services/salesService';
import { InventoryService } from '@/modules/inventory/application/services/inventoryService';
import { CatalogService } from '@/modules/catalog/application/services/catalogService';

export class DashboardController {
  constructor() {
    this.salesService = new SalesService();
    this.inventoryService = new InventoryService();
    this.catalogService = new CatalogService();
  }

  async getStats() {
    try {
      const [
        salesData,
        inventoryData,
        topProducts
      ] = await Promise.all([
        this.salesService.getDashboardMetrics(),
        this.inventoryService.getDashboardData(),
        this.catalogService.getPopularVariants(5)
      ]);

      return NextResponse.json({
        success: true,
        data: {
          sales: salesData,
          inventory: inventoryData,
          topProducts
        }
      }, { status: 200 });
    } catch (error) {
      console.error('Error in DashboardController:', error);
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 500 });
    }
  }
}

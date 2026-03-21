import { NextResponse } from 'next/server';
import { InventoryService } from '../../application/services/inventoryService';

export class InventoryController {
  constructor() {
    this.service = new InventoryService();
  }

  async getStock(req) {
    try {
      const { searchParams } = new URL(req.url);
      const variantId = searchParams.get('variantId');
      
      if (!variantId) {
        return NextResponse.json({ success: false, error: 'Falta variantId' }, { status: 400 });
      }

      const stockData = await this.service.checkStock(variantId);
      return NextResponse.json({ success: true, data: stockData }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
}

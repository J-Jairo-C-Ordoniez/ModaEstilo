import { NextResponse } from 'next/server';
import { SalesService } from '../services/sales.service';

export class SalesController {
  constructor() {
    this.service = new SalesService();
  }

  async createSale(req) {
    try {
      const body = await req.json();

      if (!body.variantId || !body.amount || !body.total || !body.paymentMethod) {
        return NextResponse.json({ success: false, error: 'Datos incompletos para la venta' }, { status: 400 });
      }

      const sale = await this.service.registerSale(body);
      return NextResponse.json({ success: true, data: sale }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async getSales() {
    try {
      const sales = await this.service.getAllSales();
      return NextResponse.json({ success: true, data: sales }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
}

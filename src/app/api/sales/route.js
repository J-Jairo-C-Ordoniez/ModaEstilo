import { SalesController } from '@/modules/sales/presentation/controllers/salesController';

export async function GET(req) {
  const controller = new SalesController();
  return controller.getSales();
}

export async function POST(req) {
  const controller = new SalesController();
  return controller.createSale(req);
}

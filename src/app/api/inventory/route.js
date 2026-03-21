import { InventoryController } from '@/modules/inventory/presentation/controllers/inventoryController';

export async function GET(req) {
  const controller = new InventoryController();
  return controller.getStock(req);
}

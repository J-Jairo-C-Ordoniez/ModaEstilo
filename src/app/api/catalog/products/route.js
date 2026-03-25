import { CatalogController } from '@/modules/catalog/controllers/catalogController';

const controller = new CatalogController();

export async function POST(req) {
  return controller.createProduct(req);
}

import { CatalogController } from '@/modules/catalog/presentation/controllers/catalogController';

const controller = new CatalogController();

export async function POST(req) {
  return controller.createProduct(req);
}

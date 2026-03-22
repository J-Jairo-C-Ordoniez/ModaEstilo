import { CatalogController } from '@/modules/catalog/presentation/controllers/catalogController';

export async function GET(req) {
  const controller = new CatalogController();
  return controller.getVariantById(req);
}

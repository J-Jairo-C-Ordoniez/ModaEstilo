import { CatalogController } from '@/modules/catalog/presentation/controllers/catalogController';

const controller = new CatalogController();

export async function PATCH(req) {
  return controller.updateProduct(req);
}

export async function DELETE(req) {
  return controller.deleteProduct(req);
}

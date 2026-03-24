import { CategoryController } from '@/modules/catalog/presentation/controllers/categoryController';

export async function PATCH(req, { params }) {
  const { id } = await params;
  const controller = new CategoryController();
  return controller.updateCategory(req, id);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  const controller = new CategoryController();
  return controller.deleteCategory(id);
}

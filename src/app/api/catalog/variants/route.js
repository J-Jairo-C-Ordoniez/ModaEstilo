import { CatalogController } from '@/modules/catalog/controllers/catalog.controller';

const controller = new CatalogController();

export async function GET(req) {
  return controller.getVariantById(req);
}

export async function POST(req) {
  return controller.createVariant(req);
}
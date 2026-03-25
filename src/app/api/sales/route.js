import { SalesController } from '@/modules/sales/controllers/salesController';
import { CatalogController } from '@/modules/catalog/controllers/catalogController';

const salesController = new SalesController();
const catalogController = new CatalogController();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');

  if (action === 'variants') {
    return catalogController.getProducts(req); // Reuse catalog products/variants fetch if needed, 
    // but better use a specific variants fetch for the sale form
  }

  return salesController.getSales();
}

export async function POST(req) {
  return salesController.createSale(req);
}

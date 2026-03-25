import { DashboardController } from '@/modules/sales/controllers/dashboardController';

export async function GET(req) {
  const controller = new DashboardController();
  return controller.getStats();
}

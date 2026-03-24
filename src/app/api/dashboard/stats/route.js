import { DashboardController } from '@/modules/sales/presentation/controllers/dashboardController';

export async function GET(req) {
  const controller = new DashboardController();
  return controller.getStats();
}

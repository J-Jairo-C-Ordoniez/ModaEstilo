import { AboutUsController } from '@/modules/about/presentation/controllers/aboutUsController';

export async function GET() {
  const controller = new AboutUsController();
  return controller.getContact();
}

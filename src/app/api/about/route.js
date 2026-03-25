import { AboutUsController } from '@/modules/about/controllers/aboutUsController';

export async function GET() {
  const controller = new AboutUsController();
  return controller.getAboutUs();
}
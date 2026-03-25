import { AboutUsController } from '@/modules/about/contoller/aboutUsController';

export async function GET() {
  const controller = new AboutUsController();
  return controller.getContact();
}

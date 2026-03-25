import { AboutUsController } from '@/modules/about/controllers/aboutUs.controller';

export async function GET() {
  const controller = new AboutUsController();
  return controller.getContact();
}

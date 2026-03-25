import { PolicyController } from '@/modules/policies/controllers/policy.controller';

export async function GET() {
  const controller = new PolicyController();
  return controller.getLatestPolicy();
}

import { PolicyController } from '@/modules/policies/controllers/policyController';

export async function GET() {
  const controller = new PolicyController();
  return controller.getLatestPolicy();
}

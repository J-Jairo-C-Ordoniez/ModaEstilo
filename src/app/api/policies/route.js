import { PolicyController } from '@/modules/policy/presentation/controllers/policyController';

export async function GET() {
  const controller = new PolicyController();
  return controller.getLatestPolicy();
}

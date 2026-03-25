import prisma from '@/infrastructure/db/client';

export class PolicyRepository {
  async getLatestPolicy() {
    try {
      return await prisma.policy.findFirst({
        orderBy: {
          createdAt: 'desc'
        }
      });
    } catch (error) {
      throw new Error(`Error en PolicyRepository: ${error.message}`);
    }
  }
}

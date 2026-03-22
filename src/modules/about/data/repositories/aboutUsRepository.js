import prisma from '@/infrastructure/db/client';

export class AboutUsRepository {
  async getAboutUs() {
    try {
      return await prisma.aboutUs.findFirst({
        orderBy: {
          createdAt: 'desc'
        }
      });
    } catch (error) {
      throw new Error(`Error en AboutUsRepository: ${error.message}`);
    }
  }
}

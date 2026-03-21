import prisma from '@/infrastructure/db/client';

export class AuthRepository {
  async getUserByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(userData) {
    return await prisma.user.create({
      data: userData,
    });
  }

  async getUserById(userId) {
    return await prisma.user.findUnique({
      where: { userId: parseInt(userId) },
    });
  }
}

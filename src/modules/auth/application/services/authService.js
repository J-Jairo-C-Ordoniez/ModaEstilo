import { AuthRepository } from '../../data/repositories/authRepository';

export class AuthService {
  constructor() {
    this.repository = new AuthRepository();
  }

  async authenticateUser(email, password) {
    const user = await this.repository.getUserByEmail(email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // A simple text check for now, in a real scenario you would use bcrypt
    if (user.password !== password) {
      throw new Error('Contraseña incorrecta');
    }

    return user;
  }
}

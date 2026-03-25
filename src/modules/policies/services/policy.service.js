import { PolicyRepository } from '../repository/policyRepository';

export class PolicyService {
  constructor() {
    this.repository = new PolicyRepository();
  }

  async getLatestPolicy() {
    try {
      const data = await this.repository.getLatestPolicy();
      if (!data) {
        return null;
      }
      return data;
    } catch (error) {
      throw new Error(`Error en PolicyService: ${error.message}`);
    }
  }
}

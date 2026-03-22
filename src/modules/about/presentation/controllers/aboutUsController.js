import { NextResponse } from 'next/server';
import { AboutUsService } from '../../application/services/aboutUsService';

export class AboutUsController {
  constructor() {
    this.service = new AboutUsService();
  }

  async getAboutUs() {
    try {
      const data = await this.service.getAboutUs();
      if (!data) {
        return NextResponse.json({ success: false, message: 'No se encontró información de Sobre Nosotros' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
}

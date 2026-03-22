import { NextResponse } from 'next/server';
import { CatalogService } from '../../application/services/catalogService';

export class CatalogController {
  constructor() {
    this.service = new CatalogService();
  }

  async getProducts(req) {
    try {
      const { searchParams } = new URL(req.url);
      const filters = {
        categoryId: searchParams.get('category'),
        gender: searchParams.get('gender'),
        search: searchParams.get('search'),
        color: searchParams.get('color'),
      };

      const variants = await this.service.getAllProducts(filters);
      return NextResponse.json({ success: true, data: variants }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async getColors() {
    try {
      const colors = await this.service.getColors();
      return NextResponse.json({ success: true, data: colors }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async getCategories() {
    try {
      const categories = await this.service.getCategories();
      return NextResponse.json({ success: true, data: categories }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async getPopularVariants(req) {
    try {
      const { searchParams } = new URL(req.url);
      const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : 10;
      const variants = await this.service.getPopularVariants(limit);
      return NextResponse.json({ success: true, data: variants }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }

  async getVariantById(req) {
    try {
      const id = req.url.split('/').pop();
      const variant = await this.service.getVariantById(id);
      return NextResponse.json({ success: true, data: variant }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
}

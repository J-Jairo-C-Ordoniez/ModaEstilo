import prisma from '@/infrastructure/db/client';

export class CatalogRepository {
  async getAllProducts(filters = {}) {
    const { categoryId, gender, search, color } = filters;

    const whereClause = { isActive: true };

    const productFilters = {};
    if (categoryId) productFilters.categoryId = parseInt(categoryId);
    if (gender) productFilters.gender = { in: [gender, 'mixto'] };
    
    if (Object.keys(productFilters).length > 0) {
      whereClause.product = productFilters;
    }

    if (color) {
      const colorsArray = color.split(',').map(c => c.trim()).filter(Boolean);
      if (colorsArray.length > 0) {
        whereClause.color = { in: colorsArray };
      }
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { product: { name: { contains: search } } },
        { product: { description: { contains: search } } }
      ];
    }

    return await prisma.variant.findMany({
      where: whereClause,
      include: {
        product: {
          include: {
            category: true
          }
        },
        images: true,
        inventories: true
      },
      orderBy: {
        popularity: 'desc'
      }
    });
  }

  async getColors() {
    const variants = await prisma.variant.findMany({
      select: { color: true },
      distinct: ['color'],
      where: { isActive: true }
    });
    
    return variants
      .filter(v => v.color && v.color.trim() !== '')
      .map(v => ({ 
        id: v.color, 
        name: v.color.charAt(0).toUpperCase() + v.color.slice(1).toLowerCase() 
      }));
  }

  async getProductById(productId) {
    return await prisma.product.findUnique({
      where: { productId: parseInt(productId) },
      include: {
        category: true,
        variants: {
          include: {
            images: true,
            inventories: true
          }
        }
      }
    });
  }

  async getCategories() {
    return await prisma.category.findMany();
  }
}

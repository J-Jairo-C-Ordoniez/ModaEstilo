'use server';

import prisma from '@/infrastructure/db/client';
import { revalidatePath } from 'next/cache';

// --- PRODUCTS ---
export async function createProduct(formData) {
  const name = formData.get('name');
  const description = formData.get('description');
  const categoryId = formData.get('categoryId');
  const gender = formData.get('gender');

  if (!name || !description || !categoryId || !gender) {
    return { error: 'Todos los campos son requeridos' };
  }

  try {
    await prisma.product.create({
      data: {
        name,
        description,
        gender,
        categoryId: Number(categoryId),
      }
    });
    revalidatePath('/dashboard/catalog');
    return { success: true };
  } catch (error) {
    return { error: 'Error al crear el producto' };
  }
}

export async function updateProduct(productId, formData) {
  const name = formData.get('name');
  const description = formData.get('description');
  const categoryId = formData.get('categoryId');
  const gender = formData.get('gender');

  if (!name || !description || !categoryId || !gender) {
    return { error: 'Todos los campos son requeridos' };
  }

  try {
    await prisma.product.update({
      where: { productId: Number(productId) },
      data: {
        name,
        description,
        gender,
        categoryId: Number(categoryId),
      }
    });
    revalidatePath('/dashboard/catalog');
    return { success: true };
  } catch (error) {
    return { error: 'Error al actualizar el producto' };
  }
}

export async function deleteProduct(productId) {
  try {
    await prisma.product.delete({
      where: { productId: Number(productId) }
    });
    revalidatePath('/dashboard/catalog');
    return { success: true };
  } catch (error) {
    return { error: 'No se puede eliminar el producto si tiene variantes asociadas' };
  }
}

// --- VARIANTS ---
export async function createVariant(formData) {
  const productId = Number(formData.get('productId'));
  const name = formData.get('name');
  const sku = formData.get('sku');
  const color = formData.get('color');
  const size = formData.get('size');
  const price = Number(formData.get('price'));
  const image = formData.get('image'); // Assuming a URL or generic string for now
  const isActive = formData.get('isActive') === 'true';

  try {
    await prisma.variant.create({
      data: {
        productId,
        name,
        sku,
        color,
        size,
        price,
        image,
        isActive,
      }
    });
    revalidatePath('/dashboard/catalog');
    return { success: true };
  } catch (error) {
    return { error: 'Error al generar la variante' };
  }
}

export async function updateVariant(variantId, formData) {
  const name = formData.get('name');
  const sku = formData.get('sku');
  const color = formData.get('color');
  const size = formData.get('size');
  const price = Number(formData.get('price'));
  const image = formData.get('image');
  const isActive = formData.get('isActive') === 'true';

  try {
    await prisma.variant.update({
      where: { variantId: Number(variantId) },
      data: {
        name,
        sku,
        color,
        size,
        price,
        image,
        isActive
      }
    });
    revalidatePath('/dashboard/catalog');
    return { success: true };
  } catch (error) {
    return { error: 'Error al actualizar la variante' };
  }
}

export async function deleteVariant(variantId) {
  try {
    await prisma.variant.delete({
      where: { variantId: Number(variantId) }
    });
    revalidatePath('/dashboard/catalog');
    return { success: true };
  } catch (error) {
    return { error: 'No se puede eliminar variantes con inventario o ventas asociadas' };
  }
}

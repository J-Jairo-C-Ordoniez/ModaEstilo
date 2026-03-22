'use server';

import prisma from '../../../infrastructure/db/client';
import { revalidatePath } from 'next/cache';

export async function createCategory(formData) {
  const name = formData.get('name');
  if (!name) return { error: 'Nombre es requerido' };

  try {
    await prisma.category.create({
      data: { name }
    });
    revalidatePath('/dashboard/categories');
    return { success: true };
  } catch (error) {
    return { error: 'Error al crear la categoría' };
  }
}

export async function updateCategory(categoryId, formData) {
  const name = formData.get('name');
  if (!name) return { error: 'Nombre es requerido' };

  try {
    await prisma.category.update({
      where: { categoryId: Number(categoryId) },
      data: { name }
    });
    revalidatePath('/dashboard/categories');
    return { success: true };
  } catch (error) {
    return { error: 'Error al actualizar la categoría' };
  }
}

export async function deleteCategory(categoryId) {
  try {
    await prisma.category.delete({
      where: { categoryId: Number(categoryId) }
    });
    revalidatePath('/dashboard/categories');
    return { success: true };
  } catch (error) {
    return { error: 'No se puede eliminar la categoría si tiene productos asociados' };
  }
}

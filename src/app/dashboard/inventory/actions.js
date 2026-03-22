'use server';

import prisma from '../../../infrastructure/db/client';
import { revalidatePath } from 'next/cache';

export async function updateInventoryBlock(inventoryId, newStock) {
  try {
    const stock = Number(newStock);
    if (isNaN(stock) || stock < 0) {
      return { error: 'Cantidad de stock inválida' };
    }

    await prisma.inventory.update({
      where: { inventoryId: Number(inventoryId) },
      data: { stock }
    });
    
    revalidatePath('/dashboard/inventory');
    return { success: true };
  } catch (error) {
    return { error: 'Error al actualizar el inventario' };
  }
}

export async function createInventoryRecord(variantId, stock) {
  try {
    const s = Number(stock);
    if (isNaN(s) || s < 0) return { error: 'Cantidad inválida' };

    await prisma.inventory.create({
      data: {
        variantId: Number(variantId),
        stock: s
      }
    });

    revalidatePath('/dashboard/inventory');
    return { success: true };
  } catch (error) {
    return { error: 'Error al crear el registro de inventario' };
  }
}

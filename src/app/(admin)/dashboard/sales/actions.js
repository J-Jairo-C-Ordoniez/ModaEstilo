'use server';

import prisma from '@/infrastructure/db/client';
import { revalidatePath } from 'next/cache';

export async function createSale(formData) {
  const variantId = Number(formData.get('variantId'));
  const amount = Number(formData.get('amount'));
  const paymentMethod = formData.get('paymentMethod');

  if (!variantId || !amount || !paymentMethod) {
    return { error: 'Todos los campos son obligatorios' };
  }

  if (amount <= 0) {
    return { error: 'La cantidad debe ser mayor a cero' };
  }

  try {
    // 1. Check stock
    const inventory = await prisma.inventory.findFirst({
      where: { variantId }
    });

    if (!inventory || inventory.stock < amount) {
      return { error: 'Stock insuficiente para esta variante' };
    }

    // 2. Get variant price for total calculation
    const variant = await prisma.variant.findUnique({
      where: { variantId }
    });

    if (!variant) {
      return { error: 'Variante no encontrada' };
    }

    const total = Number(variant.price) * amount;

    // 3. Transaction: Create Sale + Update Inventory + Update Popularity
    await prisma.$transaction([
      prisma.sale.create({
        data: {
          variantId,
          amount,
          total,
          paymentMethod
        }
      }),
      prisma.inventory.update({
        where: { inventoryId: inventory.inventoryId },
        data: { stock: { decrement: amount } }
      }),
      prisma.variant.update({
        where: { variantId },
        data: { popularity: { increment: amount } }
      })
    ]);

    revalidatePath('/dashboard/sales');
    revalidatePath('/dashboard');
    
    return { success: true };
  } catch (error) {
    console.error('Error creating sale:', error);
    return { error: 'Error al registrar la venta en la base de datos' };
  }
}

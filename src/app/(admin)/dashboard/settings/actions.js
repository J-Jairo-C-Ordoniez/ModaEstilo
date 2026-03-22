'use server';

import prisma from '../../../infrastructure/db/client';
import { revalidatePath } from 'next/cache';

export async function saveAboutUs(formData) {
  try {
    const contact = formData.get('contact') || '';
    const logo = formData.get('logo') || '';
    const photo = formData.get('photo') || '';
    let contentJson = {};
    
    try {
      contentJson = JSON.parse(formData.get('content') || '{}');
    } catch(e) {
      return { error: 'El contenido debe ser un JSON válido' };
    }

    const existing = await prisma.aboutUs.findFirst();
    if (existing) {
      await prisma.aboutUs.update({
        where: { aboutId: existing.aboutId },
        data: { contact, logo, photo, content: contentJson }
      });
    } else {
      await prisma.aboutUs.create({
        data: { contact, logo, photo, content: contentJson }
      });
    }
    
    revalidatePath('/dashboard/settings');
    return { success: true };
  } catch (error) {
    return { error: 'Error al guardar la información de Nosotros' };
  }
}

export async function savePolicy(formData) {
  try {
    let contentJson = {};
    
    try {
      contentJson = JSON.parse(formData.get('content') || '{}');
    } catch(e) {
      return { error: 'El contenido debe ser un JSON válido' };
    }

    const existing = await prisma.policy.findFirst();
    if (existing) {
      await prisma.policy.update({
        where: { policyId: existing.policyId },
        data: { content: contentJson }
      });
    } else {
      await prisma.policy.create({
        data: { content: contentJson }
      });
    }
    
    revalidatePath('/dashboard/settings');
    return { success: true };
  } catch (error) {
    return { error: 'Error al guardar las políticas' };
  }
}

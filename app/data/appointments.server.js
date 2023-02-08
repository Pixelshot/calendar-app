import { prisma } from './database.server';

export async function getAppointments() {
  try {
    return prisma.appointment.findMany();
  } catch {
    throw new Error('Failed to fetch Appointment');
  }
}

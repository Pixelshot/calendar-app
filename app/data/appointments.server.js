import { prisma } from './database.server';

export async function getAppointments() {
  try {
    return prisma.appointment.findMany({ orderBy: { date: 'asc' } });
  } catch {
    throw new Error('Failed to fetch Appointment');
  }
}

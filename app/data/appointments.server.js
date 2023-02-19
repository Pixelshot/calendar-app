import { prisma } from './database.server';
import parseISO from 'date-fns/parseISO';
// === === === === === CRUD OPERATIONS  === === === === ===
export async function getAppointments() {
  try {
    return prisma.appointment.findMany({
      orderBy: {
        end_date: 'asc',
      },
    });
  } catch {
    throw new Error('Failed to fetch Appointment');
  }
}

export async function getAppointment(id) {
  try {
    return await prisma.appointment.findFirst({ where: { id: Number(id) } });
  } catch (error) {
    throw error;
  }
}

export async function addAppointment(appointmentData) {
  try {
    return prisma.appointment.create({
      data: {
        title: appointmentData.title,
        start_date: parseISO(appointmentData.start_date),
        end_date: parseISO(appointmentData.end_date),
        description: appointmentData.description,
        people: appointmentData.people,
        location: appointmentData.location,
      },
    });
  } catch (error) {
    throw new Error('Unable to add Appointment');
  }
}

export async function updateAppointment(id, appointmentData) {
  try {
    return await prisma.appointment.update({
      where: { id: Number(id) },
      data: {
        title: appointmentData.title,
        start_date: parseISO(appointmentData.start_date),
        end_date: parseISO(appointmentData.end_date),
        description: appointmentData.description,
        people: appointmentData.people,
        location: appointmentData.location,
      },
    });
  } catch (error) {
    throw new Error('Failed to updated appointment.');
  }
}

export async function deleteAppointment(id) {
  try {
    return await prisma.appointment.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw new Error('Failed to delete appointment.');
  }
}

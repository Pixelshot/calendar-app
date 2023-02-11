import { prisma } from './database.server';
import parseISO from 'date-fns/parseISO';
// === === === === === CRUD OPERATIONS  === === === === ===
export async function getAppointments() {
  try {
    return prisma.appointment.findMany();
  } catch {
    throw new Error('Failed to fetch Appointment');
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
    console.log(error);
    throw new Error('Unable to add Appointment');
  }
}

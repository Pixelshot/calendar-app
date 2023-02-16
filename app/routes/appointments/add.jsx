import { useNavigate } from '@remix-run/react';
import Modal from '~/components/util/Modal';
import Calendar from '~/components/Calendar';
import AppointmentForm from '~/components/AppointmentForm';
import { addAppointment } from '~/data/appointments.server.js';
import { redirect } from '@remix-run/node';

export default function AddAppointmentsPage() {
  const navigate = useNavigate();
  function closeHandler() {
    navigate('..');
  }
  return (
    <Modal onClose={closeHandler}>
      <AppointmentForm />
    </Modal>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const appointmentData = Object.fromEntries(formData);

  await addAppointment(appointmentData);
  return redirect('/');
}

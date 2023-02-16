import AppointmentForm from '~/components/AppointmentForm';
import Modal from '~/components/util/Modal';
import { useNavigate } from '@remix-run/react';
import { redirect } from '@remix-run/node';
import {
  updateAppointment,
  deleteAppointment,
  getAppointment,
} from '~/data/appointments.server.js';

export default function UpdateAppointmentPage() {
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

export async function action({ request, params }) {
  const appointmentId = params.id;
  const formData = await request.formData();
  const appointmentData = Object.fromEntries(formData);
  // making the method conditional is the key to having different data inside of action()
  if (request.method === 'PATCH') {
    await updateAppointment(appointmentId, appointmentData);
    return redirect('/');
  } else if (request.method === 'DELETE') {
    // This else if statement is redundant because there are only two methods coming this way: PATCH & DELETE but for the sake of clarity, we're going to keep it as such
    await deleteAppointment(appointmentId);
    return redirect('/');
  }
}

export async function loader({ params }) {
  const appointmentId = params.id;
  return await getAppointment(appointmentId);
}

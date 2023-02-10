// import { useActionData } from "@remix-run/react";
import { useNavigate } from '@remix-run/react';
import Modal from '~/components/util/Modal';
import Calendar from '~/components/Calendar';
import AppointmentForm from '~/components/AppointmentForm';
import { getAppointments } from '~/data/appointments.server.js';
import { redirect } from '@remix-run/node';

export default function AddAppointmentsPage() {
  const navigate = useNavigate();
  function closeHandler() {
    navigate('..');
  }
  return (
    <>
      <Calendar />
      <Modal onClose={closeHandler}>
        <AppointmentForm />
      </Modal>
    </>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const appointmentData = Object.fromEntries(formData);
  console.log(appointmentData);

  return redirect('/add');
}

export async function loader() {
  return await getAppointments();
}

// import { useActionData } from "@remix-run/react";
import { useNavigate } from '@remix-run/react';
import Modal from '~/components/util/Modal';
import AppointmentForm from '~/components/AppointmentForm';
import { redirect } from '@remix-run/node';

export default function AddAppointmentsPage() {
  const navigate = useNavigate();
  function closeHandler() {
    navigate('..');
  }
  return (
    <>
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

  return redirect('/');
}

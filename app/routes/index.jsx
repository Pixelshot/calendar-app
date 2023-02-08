import Calendar from '~/components/Calendar';
import { useLoaderData } from '@remix-run/react';
import { getAppointments } from '~/data/appointments.server.js';

export default function Index() {
  const appointments = useLoaderData();
  return (
    <div>
      <Calendar appointments={appointments} />
      {/* <h1>Hi</h1> */}
    </div>
  );
}

export async function loader() {
  return await getAppointments();
}

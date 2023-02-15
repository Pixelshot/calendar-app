import { Outlet, useLoaderData } from '@remix-run/react';
import Calendar from '~/components/Calendar';
import { getAppointments } from '~/data/appointments.server.js';

export default function Index() {
  // const appointments = useLoaderData();
  return (
    <div>
      <Outlet />
      <Calendar />
    </div>
  );
}

export async function loader() {
  return await getAppointments();
}

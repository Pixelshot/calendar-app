import { Outlet } from '@remix-run/react';
import Calendar from '~/components/Calendar';
import { getAppointments } from '~/data/appointments.server.js';

export default function Index() {
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

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <div>
      <h2>Oh snap!</h2>
      <p>There was a problem loading this appointment</p>
    </div>
  );
}

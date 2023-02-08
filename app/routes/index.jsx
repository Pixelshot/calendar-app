import Calendar from '~/components/Calendar';
import { getAppointments } from '~/data/appointments.server.js';

export default function Index() {
  return (
    <div>
      {/* Since Calendar is using the same route as index.js, we can use useLoaderData() directly on <Calendar /> */}
      <Calendar />
    </div>
  );
}

export async function loader() {
  return await getAppointments();
}

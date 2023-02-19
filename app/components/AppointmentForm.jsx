import {
  Form,
  useMatches,
  useParams,
  useTransition as useNavigation,
} from '@remix-run/react';
import { parseISO, format } from 'date-fns';

export default function AppointmentForm() {
  const params = useParams();
  const matches = useMatches();
  const navigation = useNavigation();

  const appointments = matches.find(
    (match) => match.id === 'routes/appointments'
  );
  const appointmentData = appointments.data.find(
    (res) => res.id === +params.id
  );

  const isSubmitting = navigation.state !== 'idle';

  if (params.id && !appointmentData) {
    return (
      <p className="text-red-600 text-center">⚠ Invalid appointment id </p>
    );
  }

  const defaultValues = appointmentData
    ? {
        title: appointmentData.title,
        start_date: appointmentData.start_date,
        end_date: appointmentData.end_date,
        description: appointmentData.description,
        people: appointmentData.people,
        location: appointmentData.location,
      }
    : {
        title: '',
        start_date: '',
        end_date: '',
        description: '',
        people: '',
        location: '',
      };

  return (
    <Form method={appointmentData ? 'patch' : 'post'} className="p-4">
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="title"
          id="title"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          maxLength={30}
          defaultValue={defaultValues.title}
        />
        <label
          htmlFor="title"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Title
        </label>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="datetime-local"
            step="1"
            name="start_date"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
            defaultValue={
              defaultValues.start_date
                ? format(
                    parseISO(defaultValues.start_date),
                    "yyyy-MM-dd'T'HH:mm"
                  )
                : ''
            }
          />
          <label
            htmlFor="datetime"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Start date & time
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="datetime-local"
            step="1"
            name="end_date"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
            defaultValue={
              defaultValues.end_date
                ? format(parseISO(defaultValues.end_date), "yyyy-MM-dd'T'HH:mm")
                : ''
            }
          />
          <label
            htmlFor="datetime"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            End date & time
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="people"
            id="people"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            maxLength={30}
            defaultValue={defaultValues.people}
          />
          <label
            htmlFor="people"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            People
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="location"
            id="Location"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            max={30}
            defaultValue={defaultValues.location}
          />
          <label
            htmlFor="Location"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Location
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group col-span-2">
          <input
            type="text"
            name="description"
            id="description"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            maxLength={30}
            defaultValue={defaultValues.description}
          />
          <label
            htmlFor="description"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Description
          </label>
        </div>
      </div>
      <button
        disabled={isSubmitting}
        type="submit"
        className="text-white bg-teal-500 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center"
      >
        {isSubmitting ? 'Saving...' : 'Submit'}
      </button>
    </Form>
  );
}

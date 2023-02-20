import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
} from '@heroicons/react/solid';
import {
  add,
  eachDayOfInterval,
  endOfWeek,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfWeek,
  startOfToday,
} from 'date-fns';
import { useState, useEffect } from 'react';
import Appointment from '~/components/Appointment';
import { Link, useLoaderData } from '@remix-run/react';
import { MdOutlinePostAdd } from 'react-icons/md';

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Calendar() {
  const appointments = useLoaderData();
  let today = startOfToday(); // day starts at 12 am
  let [currentTime, setCurrentTime] = useState(new Date());
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
  let firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
  let firstDayNextMonth = add(firstDayCurrentMonth, { months: +1 });

  let days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    setCurrentMonth(format(firstDayPreviousMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  let selectedDayAppointments = appointments.filter((appointment) =>
    isSameDay(parseISO(appointment.start_date), selectedDay)
  );

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);
  return (
    <div className="md:grid h-[85vh] w-screen place-items-center max-md:pt-4">
      <div className="px-4 mx-auto sm:px-7 md:max-w-6xl md:px-6">
        <div className="md:grid md:grid-cols-3 lg:grid-cols-4 md:divide-x md:divide-gray-200">
          <div className="md:pr-10 col-span-2 lg:col-span-3">
            <div className="">
              <div className="grid grid-cols-2">
                <h2 className="text-4xl">eCalendar</h2>
                <div className="grid grid-cols-1 justify-items-end">
                  <h2 className="text-4xl">
                    {format(firstDayCurrentMonth, 'yyy')}
                  </h2>
                  {/* Clock */}
                  <h2 className="grid grid-cols-2 justify-items-end">
                    <ClockIcon className="h-4 mt-1 mr-1" />{' '}
                    {format(currentTime, 'pp')}
                  </h2>
                </div>
              </div>
              {/* 3 months */}
              <div className="grid grid-cols-3 place-items-center pt-4 text-lg">
                <h2 className="text-gray-500">
                  {format(firstDayPreviousMonth, 'MMMM')}
                </h2>
                <h2 className="text-2xl">
                  {format(firstDayCurrentMonth, 'MMMM')}
                </h2>
                <h2 className="text-gray-500">
                  {format(firstDayNextMonth, 'MMMM')}
                </h2>
              </div>
            </div>
            {/* Horizontal border */}
            <hr className="w-full h-1 mt-4 -mb-4 bg-gray-100 border-0 rounded dark:bg-gray-700" />
            {/* Start of Day and dates */}
            <div className="flex gap-4 place-items-center">
              <button
                type="button"
                onClick={previousMonth}
                className="text-gray-400 hover:text-gray-500 h-1"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-10 h-10" aria-hidden="true" />
              </button>
              <div className="flex flex-col flex-grow md:justify-items-center">
                <div className="grid grid-cols-7 text-xs sm:max-md:text-sm sm:gap-2 mt-10 text-center">
                  <div>SUN</div>
                  <div>MON</div>
                  <div>TUE</div>
                  <div>WED</div>
                  <div>THU</div>
                  <div>FRI</div>
                  <div>SAT</div>
                </div>
                <div className="grid grid-cols-7 h-56 auto-cols-min text-xs lg:gap-2 sm:text-sm sm:mt-4">
                  {days.map((day, dayIdx) => (
                    <div
                      key={day.toString()}
                      className={classNames(
                        dayIdx === 0 && colStartClasses[getDay(day)],
                        'sm:max-md:py-1'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={classNames(
                          isEqual(day, selectedDay) && 'text-white',
                          !isEqual(day, selectedDay) &&
                            isToday(day) &&
                            'text-red-500',
                          !isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            isSameMonth(day, firstDayCurrentMonth) &&
                            'text-gray-900',
                          !isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            !isSameMonth(day, firstDayCurrentMonth) &&
                            'text-gray-400',
                          isEqual(day, selectedDay) &&
                            isToday(day) &&
                            'bg-red-500',
                          isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            'bg-gray-900',
                          !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                          (isEqual(day, selectedDay) || isToday(day)) &&
                            'font-semibold',
                          'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                        )}
                      >
                        <time dateTime={format(day, 'yyyy-MM-dd')}>
                          {format(day, 'd')}
                        </time>
                      </button>

                      <div className="w-1 h-1 mx-auto mt-1">
                        {appointments.some((appointment) =>
                          isSameDay(parseISO(appointment.start_date), day)
                        ) && (
                          <div className="w-1 h-1 rounded-full bg-teal-500"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={nextMonth}
                type="button"
                className=" text-gray-400 hover:text-gray-500 h-1"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-10 h-10" aria-hidden="true" />
              </button>
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-8 md:text-xl flex flex-col m-auto md:m-0">
            <h2 className="font-semibold text-gray-900">
              Schedule for{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'E MMM dd, yyy')}
              </time>
            </h2>
            <ol className="mt-2 space-y-1 md:text-sm leading-6 text-gray-500 grow">
              {selectedDayAppointments.length > 0 ? (
                selectedDayAppointments.map((appointment) => (
                  <Appointment
                    appointment={appointment}
                    key={appointment.id}
                    classNames={classNames}
                  />
                ))
              ) : (
                <p>No appointments for today.</p>
              )}
            </ol>
            <Link
              to="/appointments/add"
              className="text-center mt-6 hover:border-rounded-lg"
            >
              <MdOutlinePostAdd
                className="mx-auto my-1 w-40 h-14 hover:shadow-2xl hover:border-2 hover:border-black  hover:rounded-lg"
                alt="add"
              />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];

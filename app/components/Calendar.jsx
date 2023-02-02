import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
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
import { useState } from 'react';
import Meeting from '~/components/Meeting';
import { meetings } from '~/data/meetings';

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Calendar() {
  let today = startOfToday(); // day starts at 12 am
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

  let selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay)
  );

  return (
    <div className="md:grid h-screen w-screen place-items-center max-md:pt-4">
      <div className="px-4 mx-auto sm:px-7 md:max-w-6xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="">
              <div className="grid grid-cols-2">
                <h2 className="text-4xl">eCalendar</h2>
                <div className="grid grid-cols-1 justify-items-end">
                  <h2 className="text-4xl">
                    {format(firstDayCurrentMonth, 'yyy')}
                  </h2>
                  <h2>Time Placeholder</h2>
                </div>
              </div>
              <div className="grid grid-cols-3 place-items-center pt-4 text-lg">
                <h2 className="">{format(firstDayPreviousMonth, 'MMMM')}</h2>
                <h2 className="text-2xl">
                  {format(firstDayCurrentMonth, 'MMMM')}
                </h2>
                <h2 className="">{format(firstDayNextMonth, 'MMMM')}</h2>
              </div>
            </div>
            <hr className="w-full h-1 mt-4 -mb-4 bg-gray-100 border-0 rounded dark:bg-gray-700" />
            {/* Start of Day and dates */}
            <div className="grid grid-cols-13 place-items-center">
              <button
                type="button"
                onClick={previousMonth}
                className=" text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-10 h-10" aria-hidden="true" />
              </button>
              <div className="grid grid-cols-3 justify-items-center">
                <div className="grid grid-cols-7 col-start-1 col-span-3 gap-10 mt-10 text-md text-center text-gray-700 md:w-96">
                  <div>SUN</div>
                  <div>MON</div>
                  <div>TUE</div>
                  <div>WED</div>
                  <div>THU</div>
                  <div>FRI</div>
                  <div>SAT</div>
                </div>
                <div className="grid grid-cols-7 col-span-7 sm:gap-x-10 sm:gap-y-2 md:w-96">
                  {days.map((day, dayIdx) => (
                    <div
                      key={day.toString()}
                      className={classNames(
                        dayIdx === 0 && colStartClasses[getDay(day)],
                        'py-1.5'
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
                        {meetings.some((meeting) =>
                          isSameDay(parseISO(meeting.startDatetime), day)
                        ) && (
                          <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={nextMonth}
                type="button"
                className=" text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-10 h-10" aria-hidden="true" />
              </button>
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-gray-900">
              Schedule for{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'MMM dd, yyy')}
              </time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((meeting) => (
                  <Meeting
                    meeting={meeting}
                    key={meeting.id}
                    classNames={classNames}
                  />
                ))
              ) : (
                <p>No meetings for today.</p>
              )}
            </ol>
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

// TODO:
// 1. Adjust maximum height of Calendar because certain dates have more numbers
// 2. Decide on font size
// 3. Spacing between the 3 months might be too much on small and medium. Might want to reduce the gap
// 4. Need to push arrows a little bit more to the sides. Might need to reconfigure custom fr in tailwind settings
// 5. Create Time component
// 6. Fonts on the other side needs to be bigger

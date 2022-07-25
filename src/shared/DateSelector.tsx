import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import dayjs from 'dayjs';

import { classNames, days, generateArrayOfYears, months } from '../utils';
import Icon from './Icon';

const DateSelector = ({name}: {name: string}) => {
  const [selectedYear, setSelectedYear] = useState(dayjs().get('year'));
  const [selectedMonth, setSelectedMonth] = useState(dayjs().get('month') + 1);
  const [selectedDate, setSelectedDate] = useState(dayjs().get('date'));
  return (
    <>
      <div className="flex">
          <Listbox value={selectedYear} onChange={setSelectedYear} name={name}>
            {({ open }) => (
              <div className="w-1/3">
                <div className="mt-1">
                  <Listbox.Button
                    className="relative w-full bg-white border border-gray-300 border-r-0 rounded-tl-md rounded-bl-md shadow-sm
                pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500
                focus:border-indigo-500"
                  >
                    <span className="flex items-center">
                      <span className="ml-3 block truncate">
                        {selectedYear}
                      </span>
                    </span>
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <Icon
                        icon={open ? 'BiChevronUp' : 'BiChevronDown'}
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      className="absolute z-10 mt-1 w-1/3 bg-white shadow-lg max-h-56 rounded-md py-1
                text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                    >
                      {generateArrayOfYears(1995).map((year) => (
                        <Listbox.Option
                          key={year}
                          value={year}
                          className={({ active }) =>
                            classNames(
                              active
                                ? 'text-white bg-emerald-400'
                                : 'text-gray-900',
                              'cursor-pointer select-none relative py-2 pl-3 pr-9'
                            )
                          }
                        >
                          {year}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
            </div>
            )}
          </Listbox>

        {/* Selector for Months */}
        <div className="w-1/3">
          <Listbox value={selectedMonth} onChange={setSelectedMonth}>
            {({ open }) => (
              <>
                <div className="mt-1">
                  <Listbox.Button
                    className="relative w-full bg-white border border-gray-300 shadow-sm
                pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500
                focus:border-indigo-500"
                  >
                    <span className="flex items-center">
                      <span className="ml-3 block truncate">
                        {selectedMonth}
                      </span>
                    </span>
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <Icon
                        icon={open ? 'BiChevronUp' : 'BiChevronDown'}
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      className="absolute z-10 mt-1 w-1/3 bg-white shadow-lg max-h-56 rounded-md py-1
                text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                    >
                      {months().map((month) => (
                        <Listbox.Option
                          key={month}
                          value={month}
                          className={({ active }) =>
                            classNames(
                              active
                                ? 'text-white bg-emerald-400'
                                : 'text-gray-900',
                              'cursor-pointer select-none relative py-2 pl-3 pr-9'
                            )
                          }
                        >
                          {month}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>

        {/* Selector for Dates */}
        <div className="w-1/3">
          <Listbox value={selectedDate} onChange={setSelectedDate}>
            {({ open }) => (
              <>
                <div className="mt-1">
                  <Listbox.Button
                    className="relative w-full bg-white border border-gray-300 border-l-0 rounded-tr-md rounded-br-md shadow-sm
                pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500
                focus:border-indigo-500"
                  >
                    <span className="flex items-center">
                      <span className="ml-3 block truncate">
                        {selectedDate}
                      </span>
                    </span>
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <Icon
                        icon={open ? 'BiChevronUp' : 'BiChevronDown'}
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      className="absolute z-10 mt-1 w-1/3 bg-white shadow-lg max-h-56 rounded-md py-1
                text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                    >
                      {days().map((day) => (
                        <Listbox.Option
                          key={day}
                          value={day}
                          className={({ active }) =>
                            classNames(
                              active
                                ? 'text-white bg-emerald-400'
                                : 'text-gray-900',
                              'cursor-pointer select-none relative py-2 pl-3 pr-9'
                            )
                          }
                        >
                          {day}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
      </div>
    </>
  );
};

export default DateSelector;

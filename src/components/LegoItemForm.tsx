import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import * as dayjs from 'dayjs';

import legoThemes from '../data/lego-themes';
import { LegoTheme } from '../types';
import { classNames, days, generateArrayOfYears, months } from '../utils';
import Icon from '../shared/Icon';
import DateSelector from '../shared/DateSelector';

export default function LegoItemForm() {
  const [selectedLegoTheme, setSelectedLegoTheme] = useState<LegoTheme>();
  const [selectedLegoSubTheme, setSelectedLegoSubTheme] = useState<string>();
  const [listLegoSubThemes, setListLegoSubThemes] = useState<string[]>();
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);

  const selectedLegoThemeTrigger = (val: LegoTheme) => {
    setSelectedLegoTheme(val);
    setListLegoSubThemes(val.subthemes.sort());
    setSelectedLegoSubTheme(val.subthemes[0]);
  };
  const legoBuildStates = ['Pre-ordered', 'Sealed', 'Built', 'Dismantled'];
  return (
    <>
      <div className="pb-4">
        <h2 className="text-lg font-medium text-gray-900">
          Add item to Collection
        </h2>
      </div>
      <div className="mb-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="name"
            id="name"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-1 px-2 text-lg border border-gray-300 rounded-md"
            placeholder="Example LEGO Set"
          />
        </div>
      </div>
      <div className="mb-2">
        <label
          htmlFor="number"
          className="block text-sm font-medium text-gray-700"
        >
          Number
        </label>
        <div className="mt-1">
          <input
            type="number"
            name="number"
            id="number"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-1 px-2 text-lg border border-gray-300 rounded-md"
            placeholder="12345"
          />
        </div>
      </div>
      <div className="mb-2">
        <label
          htmlFor="pieces"
          className="block text-sm font-medium text-gray-700"
        >
          Pieces
        </label>
        <div className="mt-1">
          <input
            type="number"
            name="pieces"
            id="pieces"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-1 px-2 text-lg border border-gray-300 rounded-md"
            placeholder="1234"
          />
        </div>
      </div>
      <div className="mb-2">
        <label
          htmlFor="year"
          className="block text-sm font-medium text-gray-700"
        >
          Year
        </label>
        <div className="mt-1">
          <select
            id="year"
            name="year"
            className="focus:ring-indigo-500 focus:border-indigo-500 w-1/3 h-full py-1 px-2 border border-gray-300 bg-transparent text-gray-500 text-lg rounded-md"
          >
            {generateArrayOfYears(1995).map((optionValue: number) => (
              <option key={optionValue}>{optionValue}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-2">
        <Listbox value={selectedLegoTheme} onChange={selectedLegoThemeTrigger}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700">
                Theme:
              </Listbox.Label>
              <div className="mt-1">
                <Listbox.Button
                  className="relative w-2/3 bg-white border border-gray-300 rounded-md shadow-sm
                  pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500
                  focus:border-indigo-500"
                >
                  <span className="flex items-center">
                    <span className="ml-3 block truncate">
                      {selectedLegoTheme?.name || 'Select a Theme'}
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
                    className="absolute z-10 mt-1 w-2/3 bg-white shadow-lg max-h-56 rounded-md py-1
                  text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                  >
                    {legoThemes.map((legoThemeObj) => (
                      <Listbox.Option
                        key={legoThemeObj.id}
                        value={legoThemeObj}
                        className={({ active }) =>
                          classNames(
                            active
                              ? 'text-white bg-emerald-400'
                              : 'text-gray-900',
                            'cursor-pointer select-none relative py-2 pl-3 pr-9'
                          )
                        }
                      >
                        {legoThemeObj.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
      <div className="mb-2 mt-1">
        {selectedLegoTheme &&
        listLegoSubThemes &&
        listLegoSubThemes.length > 0 ? (
          <Listbox
            value={selectedLegoSubTheme}
            onChange={setSelectedLegoSubTheme}
          >
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium text-gray-700">
                  Subtheme:
                </Listbox.Label>
                <div className="mt-1">
                  <Listbox.Button
                    className="relative w-2/3 bg-white border border-gray-300 rounded-md shadow-sm
                pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500
                focus:border-indigo-500"
                  >
                    <span className="flex items-center">
                      <span className="ml-3 block truncate">
                        {selectedLegoSubTheme || 'Select a Subtheme'}
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
                      className="absolute z-10 mt-1 w-2/3 bg-white shadow-lg max-h-56 rounded-md py-1
                text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                    >
                      {listLegoSubThemes.map((legoSubTheme) => (
                        <Listbox.Option
                          key={legoSubTheme}
                          value={legoSubTheme}
                          className={({ active }) =>
                            classNames(
                              active
                                ? 'text-white bg-emerald-400'
                                : 'text-gray-900',
                              'cursor-pointer select-none relative py-2 pl-3 pr-9'
                            )
                          }
                        >
                          {legoSubTheme}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        ) : null}
      </div>
      <div className="mb-2">
        <label
          htmlFor="minifigs"
          className="block text-sm font-medium text-gray-700"
        >
          Minifigs
        </label>
        <div className="mt-1">
          <input
            type="number"
            name="minifigs"
            id="minifigs"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 py-1 px-2 text-lg border border-gray-300 rounded-md"
            placeholder="1"
          />
        </div>
      </div>
      <div className="mb-2">
        <label
          htmlFor="buildstate"
          className="block text-sm font-medium text-gray-700"
        >
          Build state
        </label>
        <div className="mt-1">
          <select
            id="buildstate"
            name="buildstate"
            className="focus:ring-indigo-500 focus:border-indigo-500 w-1/2 h-full py-1 px-2 border border-gray-300 bg-transparent text-gray-500 text-lg rounded-md"
          >
            {legoBuildStates.map((optionValue: string) => (
              <option key={optionValue}>{optionValue}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-2">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700"
        >
          Quantity
        </label>
        <div className="mt-1">
          <input
            type="number"
            name="quantity"
            id="quantity"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 py-1 px-2 text-lg border border-gray-300 rounded-md"
            placeholder="1"
          />
        </div>
      </div>
      <div className="mb-2">
        <label
          htmlFor="release_date"
          className="block text-sm font-medium text-gray-700"
        >
          Release date
        </label>
        <div className="mt-1">
          <DateSelector name="release_date" />
        </div>
      </div>
      <div className="mb-2">
        <label
          htmlFor="discontinued_date"
          className="block text-sm font-medium text-gray-700"
        >
          Discontinued date
        </label>
        <div className="mt-1">
          <DateSelector name="discontinued_date" />
        </div>
      </div>
      <div className="mb-2">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <div className="mt-1">
          <input
            type="number"
            name="price"
            id="price"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 py-1 px-2 text-lg border border-gray-300 rounded-md"
            placeholder="1.25"
            step="0.05"
          />
        </div>
      </div>
      <div className="mb-2">
        <label
          htmlFor="selling_price"
          className="block text-sm font-medium text-gray-700"
        >
          Selling price
        </label>
        <div className="mt-1">
          <input
            type="number"
            name="selling_price"
            id="selling_price"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 py-1 px-2 text-lg border border-gray-300 rounded-md"
            placeholder="1.25"
            step="0.05"
          />
        </div>
      </div>
      <div className="mb-2">
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700"
        >
          URL
        </label>
        <div className="mt-1 flex">
          <div className='text-lg border border-gray-300 rounded-tl-md rounded-bl-md border-r-0 w-1/6 py-1 px-2 text-gray-400'>
            http://
          </div>
          <input
            type="text"
            name="url"
            id="url"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-1 pr-2 text-lg border border-gray-300 border-l-0 rounded-tr-md rounded-br-md"
          />
        </div>
      </div>
    </>
  );
}

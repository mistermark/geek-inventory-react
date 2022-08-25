import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import { ItemStateIcon } from '../types';
import { classNames, stateIcons } from '../utils';
import Icon from './Icon';

type StateSelectorProps = {
  states: [string, ItemStateIcon][];
};

export const StateSelector = ({ states }: StateSelectorProps) => {
  const [selectedState, setSelectedState] = useState(states[0][0]);
  return (
    <Listbox value={selectedState} onChange={setSelectedState}>
      {({ open }) => (
        <div className="w-1/2">
          <div className="mt-1">
            <Listbox.Button
              className="relative w-full bg-white border border-gray-300 rounded shadow-sm pl-3
            pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500
            focus:border-indigo-500"
            >
              <span className="flex items-center">
                <Icon icon={stateIcons[selectedState]} />
                <span className="ml-3 block truncate capitalize">{selectedState}</span>
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
                className="absolute z-10 w-1/2 bg-white shadow-lg max-h-56 rounded-md py-1
            text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              >
                {states.map((state) => (
                  <Listbox.Option
                    key={state[0]}
                    value={state[0]}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-emerald-400' : 'text-gray-900',
                        'cursor-pointer select-none relative py-2 pl-3 pr-9'
                      )
                    }
                  >
                    <div className="flex items-center">
                      <Icon icon={stateIcons[state[0]]} />
                      <span
                        className={classNames(
                          selectedState === state[0] ? 'font-semibold' : 'font-normal',
                          'ml-3 block truncate capitalize'
                        )}
                      >
                        {state[0]}
                      </span>
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};

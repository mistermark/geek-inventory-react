/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

import Icon from '../shared/Icon';
import { CollectionItem, ItemCollectionType } from '../types';
import { classNames, collectionTypeMap, uniqBy } from '../utils';

/**
 * @param {object} props
 * @return {React.ReactElement}
 */
export default function CollectionSelectList(props: {
  list: CollectionItem[];
  onSelected: any;
}): React.ReactElement {
  const [selected, setSelected] = useState<ItemCollectionType>({
    type: "none",
    name: "Select a Collection"
  });

  const onChangeTrigger = (value: ItemCollectionType) => {
    props.onSelected(value);
    setSelected(value);
  };

  const arrayOfTypes = props.list.map(listItem => {
    return {name: collectionTypeMap(listItem.type), type: listItem.type};
  });
  const filteredArray = uniqBy(arrayOfTypes, JSON.stringify);

  return (
    <Listbox value={selected} onChange={onChangeTrigger}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            Selected collection:
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button
              className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3
              pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500
              focus:border-indigo-500"
            >
              <span className="flex items-center">
                <Icon icon="BiBox" />
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <Icon icon={open ? "BiChevronUp" : "BiChevronDown"}
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
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1
                text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              >
                {filteredArray.map((listItem: ItemCollectionType) => (
                  <Listbox.Option
                    key={listItem.type}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-emerald-400' : 'text-gray-900',
                        'cursor-pointer select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={listItem}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <Icon icon="BiBox" />
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate'
                            )}
                          >
                            {listItem.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <Icon icon={"BiCheck"} className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

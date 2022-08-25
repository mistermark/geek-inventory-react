import { Controller } from 'react-hook-form';
import {
  TextField,
} from '@mui/material';
import { useEffect } from 'react';

type CollectionItemTypeFormFieldsProps = {
  itemType: string;
  control: any;
  unregister: any;
  register: any;
};

const fieldsPerType: { [key: string]: string[] } = {
  lego: ['pieces', 'number', 'theme', 'subtheme', 'minifigs'],
  nendoroid: ['number', 'series', 'manufacturer'],
  videogame: ['platform', 'developer', 'genre', 'rating', 'ean'],
};

export const CollectionItemTypeFormFields = ({
  itemType,
  control,
  unregister,
  register,
}: CollectionItemTypeFormFieldsProps) => {
  useEffect(() => {
    if (itemType !== '') {
      const fieldsToArray = Object.entries(fieldsPerType);
    //   unregister(
    //     fieldsToArray.filter((fieldItem) => fieldItem[0] !== itemType).map(itemFields => itemFields[1]).flat()
    //   );
      register(['pieces', 'number', 'theme', 'subtheme', 'minifigs']);
    }
  }, [itemType, register, unregister]);

  if (itemType === 'lego') {
    return (
      <>
        <section className="mb-5">
          <Controller
            name="number"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                id="number"
                label="Number"
                variant="outlined"
                onChange={field.onChange}
                onBlur={field.onBlur}
                className="w-1/2"
                type="number"
                inputProps={{ min: 1 }}
                value={field.value}
              />
            )}
          />
        </section>
        <section className="mb-5">
          <Controller
            name="minifigs"
            control={control}
            defaultValue="0"
            render={({ field }) => (
              <TextField
                id="minifigs"
                label="Minifigs"
                variant="outlined"
                onChange={field.onChange}
                onBlur={field.onBlur}
                className="w-1/2"
                type="number"
                inputProps={{ min: 0 }}
                value={field.value}
              />
            )}
          />
        </section>
        <section className="mb-5">
          <Controller
            name="pieces"
            control={control}
            defaultValue="0"
            render={({ field }) => (
              <TextField
                id="pieces"
                label="Pieces"
                variant="outlined"
                onChange={field.onChange}
                onBlur={field.onBlur}
                className="w-1/2"
                type="number"
                inputProps={{ min: 1 }}
                value={field.value}
              />
            )}
          />
        </section>
        <section className="mb-5">
          <Controller
            name="theme"
            control={control}
            defaultValue="Star Wars"
            render={({ field }) => (
              <TextField
                id="theme"
                label="Theme"
                variant="outlined"
                onChange={field.onChange}
                onBlur={field.onBlur}
                className="w-1/2"
                type="text"
                value={field.value}
              />
            )}
          />
        </section>
        <section className="mb-5">
          <Controller
            name="subtheme"
            control={control}
            defaultValue="Star Wars"
            render={({ field }) => (
              <TextField
                id="subtheme"
                label="Subtheme"
                variant="outlined"
                onChange={field.onChange}
                onBlur={field.onBlur}
                className="w-1/2"
                type="text"
                value={field.value}
              />
            )}
          />
        </section>

        {/* <div className="mb-2">
            <Listbox
              value={selectedLegoTheme}
              onChange={selectedLegoThemeTrigger}
            >
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
          </div> */}
      </>
    );
  } else {
    return <p>Select an Item Type to show the relevant fields.</p>;
  }
};

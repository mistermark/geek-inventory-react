import dayjs from 'dayjs';

import { LegoItem } from '../../types';
import Icon from '../../shared/Icon';
import { useState } from 'react';
import { stateIcons } from '../../utils';

type CollectionItemProps = {
  items: any[] | undefined;
  selected: Function;
};

export const CollectionItemLego = ({items, selected}: CollectionItemProps): React.ReactElement => {
  const [selectedListItem, setSelectedListItem] = useState<LegoItem>();
  const setSelectedItem = (selectedItem: LegoItem) => {
    setSelectedListItem(selectedItem);
    selected(selectedItem);
  }

  return (
    <>
      <table className="divide-y divide-gray-200 w-full">
        <thead>
          <tr className="text-sm text-gray-400 text-left">
            <th className="p-2">Number</th>
            <th className="p-2">Name</th>
            <th className="p-2">Theme</th>
            <th className="p-2 text-center">State</th>
            <th className="p-2">Date</th>
            <th className="w-9"></th>
          </tr>
        </thead>
        <tbody>
        {items !== undefined ? (
          items.map((item: LegoItem) => (
            <tr key={item.id} onClick={() => setSelectedItem(item)} 
              className={`cursor-pointer select-none text-sm text-gray-900 hover:bg-emerald-200 ${selectedListItem === item ? 'bg-emerald-100' : 'odd:bg-white even:bg-gray-50'}`}>
              <td className="p-2 text-gray-400">
                {item.number}
              </td>
              <td className="p-2 truncate">
                <div className="flex">
                  {item.name}
                </div>
              </td>
              <td className="p-2 truncate text-gray-400">
                {item.theme}
              </td>
              <td className="p-2 text-gray-400 align-middle">
                <div className="flex justify-center">
                  <Icon icon={stateIcons[item.state]} className="w-5 h-5" />
                </div>
              </td>
              <td className="p-2 text-gray-400">
                {dayjs(item.release_date).format('YYYY-M-D')}
              </td>
              <td>
                <div className='h-full justify-center flex'>
                  <Icon
                    icon="BiRightArrowAlt" className="w-4 h-4 ml-1"
                  />
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5}>No items in list.</td>
          </tr>
        )}
        </tbody>
      </table>
    </>
  );
};

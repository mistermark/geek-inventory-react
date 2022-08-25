import dayjs from 'dayjs';

import { LegoItem } from '../../types';
import Icon from '../../shared/Icon';
import { useState } from 'react';
import { stateIcons } from '../../utils';
import { gql, NetworkStatus, useQuery } from '@apollo/client';
import { EmptyState } from '../../shared/EmptyState';
import { CollectionItemDetails } from './CollectionItemDetails/CollectionItemDetails';
import { LoadingSpinner } from '../../shared/LoadingSpinner';

const GET_COLLECTIONITEMS_BYTYPE = gql`
  query CollectionItemsByType($type: String!) {
    collectionItemsByType(type: $type) {
      _id
      name
      state
      release_date
      meta {
        theme
        number
      }
    }
  }
`;

export const CollectionItemsLego = (): React.ReactElement => {
  const { data, loading, error, refetch, networkStatus } = useQuery(
    GET_COLLECTIONITEMS_BYTYPE, {
      variables: { type: "lego" }
    }
  );

  const [selectedListItemId, setSelectedListItemId] = useState('');
  const setSelectedItem = (selectedItem: LegoItem) => {
    setSelectedListItemId(selectedItem._id);
    // selected(selectedItem);
  }

  const onItemDelete = () => {
    setSelectedListItemId('');
    refetch();
  };

  if (loading || networkStatus === NetworkStatus.refetch)
    return (
     <LoadingSpinner />
    );
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <div className="bg-white shadow overflow-hidden w-3/5">
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
          {data && data.collectionItemsByType.length !== 0 ? (
            data?.collectionItemsByType.map((item: LegoItem) => (
              <tr key={item._id} onClick={() => setSelectedItem(item)} 
                className={`cursor-pointer select-none text-sm text-gray-900 hover:bg-emerald-200 ${selectedListItemId === item._id ? 'bg-emerald-100' : 'odd:bg-white even:bg-gray-50'}`}>
                <td className="p-2 text-gray-400">
                  {item.meta?.number}
                </td>
                <td className="p-2 truncate">
                  <div className="flex">
                    {item.name}
                  </div>
                </td>
                <td className="p-2 truncate text-gray-400">
                  {item.meta?.theme}
                </td>
                <td className="p-2 text-gray-400 align-middle">
                  <div className="flex justify-center">
                    <Icon icon={stateIcons[item.state || 'unknown']} className="w-5 h-5" />
                  </div>
                </td>
                <td className="p-2 text-gray-400">
                  {dayjs(item.release_date).format('YYYY/MM/DD')}
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
              <td colSpan={5}>
                <EmptyState
                  icon="BiCube"
                  label="No items found"
                />
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
      <div className="w-2/5 px-4">
        <div className="bg-white shadow overflow-hidden relative">
          <CollectionItemDetails selectedItemId={selectedListItemId} onDelete={onItemDelete} itemType="lego" />
        </div>
      </div>
    </>
  );
};

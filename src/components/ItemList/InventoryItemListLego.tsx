import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { gql, NetworkStatus, useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react'

import { LegoItem } from '../../types';
import Icon from '../../shared/Icon';
import { stateIcons } from '../../utils';
import { EmptyState } from '../../shared/EmptyState';
import { ItemDetails } from '../ItemDetails/ItemDetails';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { toolbarActionsEventChannel, userInventoryEventChannel } from '../../eventchannels';

const GET_COLLECTIONITEMS_BYTYPE = gql`
  query ItemsByType($type: String!, $username: String) {
    itemsByType(type: $type, username: $username) {
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

export const InventoryItemListLego = (): React.ReactElement => {
  const { user } = useAuth0();
  const username: string = user && user['https://scrubjay.io/username'];
  
  const { data: dataInventory, loading, error, refetch, networkStatus } = useQuery(
    GET_COLLECTIONITEMS_BYTYPE, {
      variables: { type: "lego", username }
    }
  );

  const [selectedListItemId, setSelectedListItemId] = useState<string | undefined>('');
  const setSelectedItem = (selectedItem: LegoItem) => {
    setSelectedListItemId(selectedItem._id);
  }

  useEffect(() => {
    const unsubOnInventoryUpdated = userInventoryEventChannel.on('onInventoryUpdated', refetch);
    const unsubOnInventoryItemRemoved = userInventoryEventChannel.on('onInventoryItemRemoved', () => {
      setSelectedListItemId(undefined);
      refetch();
    });
    return () => {
      unsubOnInventoryUpdated();
      unsubOnInventoryItemRemoved();
    }
  }, [refetch]);

  if (loading || networkStatus === NetworkStatus.refetch)
    return <LoadingSpinner />;
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
          {dataInventory && dataInventory.itemsByType.length !== 0 ? (
            dataInventory?.itemsByType.map((item: LegoItem) => (
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
        <div className="bg-white min-h-26 shadow overflow-hidden relative">
          <ItemDetails selectedItem={selectedListItemId} />
        </div>
      </div>
    </>
  );
};

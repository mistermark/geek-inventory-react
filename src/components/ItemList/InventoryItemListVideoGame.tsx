import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { VideoGameItem } from "../../types";
import Icon from "../../shared/Icon";
import { stateIcons, truncate } from '../../utils';
import { gql, NetworkStatus, useQuery } from '@apollo/client';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { ItemDetails } from '../ItemDetails/ItemDetails';
import { EmptyState } from '../../shared/EmptyState';
import { userInventoryEventChannel } from '../../eventchannels';

const GET_COLLECTIONITEMS_BYTYPE = gql`
  query CollectionItemsByType($type: String!) {
    collectionItemsByType(type: $type) {
      _id
      name
      state
      release_date
      meta {
        platform
        developer
      }
    }
  }
`;

export const InventoryItemListVideoGame = () => {
  const { data, loading, error, refetch, networkStatus } = useQuery(
    GET_COLLECTIONITEMS_BYTYPE, {
      variables: { type: "videogame" }
    }
  );

  const [selectedListItemId, setSelectedListItemId] = useState('');
  const setSelectedItem = (selectedItem: VideoGameItem) => {
    setSelectedListItemId(selectedItem._id);
    // selected(selectedItem);
  }

  useEffect(() => {
    const unsubOnInventoryUpdated = userInventoryEventChannel.on('onInventoryUpdated', refetch);
    const unsubOnInventoryItemRemoved = userInventoryEventChannel.on('onInventoryItemRemoved', () => {
      setSelectedListItemId('');
      refetch();
    });
    return () => {
      unsubOnInventoryUpdated();
      unsubOnInventoryItemRemoved();
    }
  }, [refetch]);

  if (loading || networkStatus === NetworkStatus.refetch)
    return (
     <LoadingSpinner />
    );
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <div className="bg-white shadow overflow-hidden w-3/5">
        <table className="max-w-full divide-y divide-gray-200 w-full">
          <thead>
            <tr className="text-sm text-gray-400 text-left">
              <th className="p-2 w-1/12">Platform</th>
              <th className="p-2">Name</th>
              <th className="p-2">Theme</th>
              <th className="p-2 text-center">State</th>
              <th className="p-2">Date</th>
              <th className="w-9"></th>
            </tr>
          </thead>
          <tbody>
          {data && data.collectionItemsByType.length !== 0 ? (
            data?.collectionItemsByType.map((item: VideoGameItem, i: number) => (
              <tr key={item._id} onClick={() => setSelectedItem(item)} 
                className={`cursor-pointer select-none text-sm text-gray-900 hover:bg-emerald-200 ${selectedListItemId === item._id ? 'bg-emerald-100' : 'odd:bg-white even:bg-gray-50'}`}>
                <td className="p-2 text-gray-400 whitespace-nowrap">
                  {item.meta.platform}
                </td>
                <td className="p-2">
                  {truncate(item.name, 30)}
                </td>
                <td className="p-2 text-gray-400">
                  {truncate(item.meta.developer, 30)}
                </td>
                <td className="p-2 text-gray-400 align-middle">
                  <div className="flex justify-center">
                    <Icon icon={stateIcons[item.state || 'unknown']} className="w-5 h-5" />
                  </div>
                </td>
                <td className="p-2 text-gray-400 whitespace-nowrap">
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
          <ItemDetails selectedItem={selectedListItemId} />
        </div>
      </div>
    </>
    
  );
}

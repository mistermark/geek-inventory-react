import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { Divider, IconButton } from '@mui/material';
import dayjs from 'dayjs';

import { toolbarActionsEventChannel, userInventoryEventChannel } from '../eventchannels';
import Icon from '../shared/Icon';
import { CollectionItem, ItemCollectionType } from '../types';
import { stateIcons } from '../utils';
import { ItemDetails } from './ItemDetails/ItemDetails';

const GET_INVENTORYITEMS = gql`
  query GetInventory($username: String!) {
    getInventory(username: $username) {
      _id
      type
      name
      state
      release_date
    }
  }
`;

export default function InventoryList() {
  const { user } = useAuth0();
  const username: string = user && user['https://scrubjay.io/username'];
  
  const [selectedListItem, setSelectedListItem] = useState<CollectionItem | undefined>(undefined);
  const [filteredData, setFilteredData] = useState<ItemCollectionType[]>([]);

  const { loading, error, data, refetch } = useQuery(GET_INVENTORYITEMS, {
    variables: { username },
    onCompleted: (gqlData) => {
      setFilteredData(gqlData.getInventory);
    }
  });

  
  const handleInventoryItemRemoved = () => {
    refetch();
    setSelectedListItem(undefined);
  }

  const itemTypeFilter = (collectionItems: CollectionItem[], filterKeys: ItemCollectionType[]) => {
    const filterKeyTypes = filterKeys.map(key => key.type);
    if(filterKeys.length > 0) {
      return collectionItems.filter((collectionItem: ItemCollectionType) => filterKeyTypes.includes(collectionItem.type));
    }
    return collectionItems;
  }

  useEffect(() => {
    const unsubToolbarActionsEventChannel = toolbarActionsEventChannel.on('filterTypeUpdated', (filterItems: ItemCollectionType[]) => {
      const filteredTypes = itemTypeFilter(data.getInventory, filterItems);
      setFilteredData(filteredTypes);
    })
    const unsubOnInventoryUpdated = userInventoryEventChannel.on('onInventoryUpdated', refetch);
    const unsubOnInventoryItemRemoved = userInventoryEventChannel.on('onInventoryItemRemoved', handleInventoryItemRemoved);
    return () => {
      unsubOnInventoryUpdated();
      unsubOnInventoryItemRemoved();
      unsubToolbarActionsEventChannel();
    }
  }, [refetch, filteredData, setFilteredData]);
  
  return (
    <>
      <Divider sx={{
        marginBottom: '1rem'
      }} />
      <div className="flex items-start">
        <div className="bg-white shadow overflow-hidden w-3/5">
          <table className="divide-y divide-gray-200 w-full">
            <thead>
              <tr className="text-sm text-gray-400 text-left">
                <th className="p-2">Name</th>
                <th className="p-2">State</th>
                <th className="p-2">Type</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item: any) => (
              <tr key={item._id} onClick={() => setSelectedListItem(item)} 
                className={`cursor-pointer select-none text-sm text-gray-900 hover:bg-emerald-200 ${selectedListItem?._id === item._id ? 'bg-emerald-100' : 'odd:bg-white even:bg-gray-50'}`}>
                <td className="p-2 truncate">{item.name}</td>
                <td className="p-2 text-gray-400 align-middle">
                  <Icon icon={stateIcons[item.state || 'unknown']} className="w-5 h-5" />
                </td>
                <td className='p-2'>{ item.type }</td>
                <td className="p-2 text-gray-400">
                  {dayjs(item.release_date).format('YYYY/MM/DD')}
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-2/5 px-4">
          <div className="bg-white min-h-26 shadow overflow-hidden relative">
            <ItemDetails selectedItem={selectedListItem} />
            {/* {selectedListItem?.type === 'lego' ? <ItemDetailsLego itemId={selectedListItem._id} /> : null}
            {selectedListItem?.type === 'videogame' ? <ItemDetailsVideoGame itemId={selectedListItem._id} /> : null} */}
            {/* return <EmptyState icon="BiCube" label="Select an Item" />; */}
          </div>
        </div>
      </div>
    </>
  );
}

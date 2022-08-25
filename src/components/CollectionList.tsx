import { useEffect, useState } from 'react';
import { useQuery, gql, NetworkStatus } from '@apollo/client';

import { CollectionItem, ItemCollectionType } from '../types';
import { CollectionItems } from './CollectionItems/CollectionItems';
import { EmptyState } from '../shared/EmptyState';
import { CollectionItemDetails } from './CollectionItems/CollectionItemDetails/CollectionItemDetails';

type CollectionListProps = {
  collectionType: ItemCollectionType | undefined;
  refetchStatus: boolean;
};

export default function CollectionList({
  collectionType = {type: '', name: ''},
  refetchStatus,
}: CollectionListProps) {
  const [selectedCollectionItem, setSelectedCollectionItem] = useState<
    CollectionItem | undefined
  >();

  const onItemSelectionTrigger = (itemDetails: CollectionItem) => {
    const parsedItemDetails = Object.assign(itemDetails);
    console.log(parsedItemDetails);
    setSelectedCollectionItem(itemDetails);
  };

  return (
    <>
      <div className="border-b mb-4 px-2 pb-2 border-gray-400 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          <span>
            Collection: {collectionType ? collectionType.name : 'Not selected'}
          </span>
        </h3>
      </div>
      <div className="flex items-start">
        <CollectionItems type={collectionType?.type} />
      </div>
    </>
  );
}

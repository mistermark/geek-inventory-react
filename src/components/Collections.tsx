import React, { useState } from 'react';

import { ItemCollectionType } from '../types';

import CollectionSelectList from './CollectionSelectList';
import CollectionList from './CollectionList';
import collectionItems from '../data/collection-items';

/**
 * @return {React.ReactElement}
 */
 export default function Collections(): React.ReactElement {
  const [selectedCollection, setSelectedCollection] = useState<ItemCollectionType>();
  const fnSelected = (thisValue: ItemCollectionType) => {
    setSelectedCollection(thisValue);
  };

  return (
    <div>
      <div className="flex mb-6">
        <div className="w-1/2">
          <CollectionSelectList list={collectionItems} onSelected={fnSelected} />
        </div>
      </div>
      <div className="pt-4">
        <CollectionList collectionType={selectedCollection} />
      </div>
    </div>
  );
}

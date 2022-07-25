import React, { useState } from 'react';

import { Collection } from '../types';
import collections from '../data/collections';

import CollectionSelectList from './CollectionSelectList';
import CollectionList from './CollectionList';

/**
 * @return {React.ReactElement}
 */
 export default function Collections(): React.ReactElement {
  const [selectedCollection, setSelectedCollection] = useState<Collection>();
  const fnSelected = (thisValue: Collection) => {
    setSelectedCollection(thisValue);
  };

  return (
    <div>
      <div className="flex mb-6">
        <div className="w-1/2">
          <CollectionSelectList list={collections} onSelected={fnSelected} />
        </div>
      </div>
      <div className="pt-4">
        <CollectionList collection={selectedCollection} />
      </div>
    </div>
  );
}

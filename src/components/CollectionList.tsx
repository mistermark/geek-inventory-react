import { useEffect, useState } from 'react';

import { CollectionItem, ItemCollectionType } from '../types';
import Icon from '../shared/Icon';
import LegoItemForm from './LegoItemForm';
import SlideOver from '../shared/SlideOver';
import { CollectionItems } from './CollectionItems/CollectionItems';
import { EmptyState } from '../shared/EmptyState';
import { CollectionItemDetails } from './CollectionItems/CollectionItemDetails';
import collectionItems from '../data/collection-items';

type CollectionListProps = {
  collectionType: ItemCollectionType | undefined;
};

export default function CollectionList({
  collectionType,
}: CollectionListProps) {
  const [slideOverState, setSlideOverState] = useState({ open: false });
  const [selectedCollectionItem, setSelectedCollectionItem] = useState<
    CollectionItem | undefined
  >();

  const onSlideOverClose = (val: boolean) => {
    setSlideOverState({ open: val });
  };
  const onItemSelectionTrigger = (itemDetails: CollectionItem) => {
    setSelectedCollectionItem(itemDetails);
  };

  const collectionItemsData = collectionItems.filter(
    (item: CollectionItem) =>
      collectionType && item.type === collectionType.type
  );

  useEffect(() => {
    setSelectedCollectionItem(undefined);
  }, [collectionType]);

  return (
    <>
      <div className="border-b mb-4 px-2 pb-2 border-gray-400 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          <span>Collection: {collectionType ? collectionType.name : 'Not selected'}</span>
        </h3>
        {collectionType ? (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setSlideOverState({ open: true })}
          >
            <Icon
              icon={'BiPlus'}
              className="-ml-1 mr-2 h-5 w-5"
              aria-hidden="true"
            />
            Add
          </button>
        ) : null}
      </div>
      {collectionType !== undefined ? (
        <div className="flex items-start">
          <div className="bg-white shadow overflow-hidden w-3/5">
            <CollectionItems
              collection={collectionItemsData}
              type={collectionType.type}
              selected={onItemSelectionTrigger}
            />
          </div>
          <div className="w-2/5 px-4">
            <div className="bg-white shadow overflow-hidden">
              {selectedCollectionItem ? (
                <CollectionItemDetails selectedItem={selectedCollectionItem} />
              ) : (
                <EmptyState icon="BiCube" label="Select an Item" />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="px-2">Pick a Collection above.</div>
      )}
      <SlideOver setOpen={slideOverState.open} onClose={onSlideOverClose}>
        <div className="w-96 px-4">
          <LegoItemForm />
        </div>
      </SlideOver>
    </>
  );
}

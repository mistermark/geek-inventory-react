
import { ItemCollectionType } from '../types';
import { CollectionItems } from './CollectionItems/CollectionItems';

type CollectionListProps = {
  collectionType: ItemCollectionType | undefined;
  refetchStatus: boolean;
};

export default function CollectionList({
  collectionType = {type: '', name: ''}
}: CollectionListProps) {

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

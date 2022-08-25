import { EmptyState } from '../../../shared/EmptyState';
import { CollectionItemDetailsLego } from './CollectionItemDetailsLego';
import { CollectionItemDetailsNendoroid } from './CollectionItemDetailsNendoroid';
import { CollectionItemDetailsVideoGame } from './CollectionItemDetailsVideoGame';

type CollectionItemDetailsProps = {
  selectedItemId: any;
  onDelete: Function,
  itemType: string
};

export const CollectionItemDetails = ({
  selectedItemId,
  onDelete,
  itemType
}: CollectionItemDetailsProps) => {
  
  if(selectedItemId) {
    if(itemType === 'lego') return <CollectionItemDetailsLego itemId={selectedItemId} onDelete={onDelete} />;
    if(itemType === 'videogame') return <CollectionItemDetailsVideoGame itemId={selectedItemId} onDelete={onDelete} />;
  }

  return <EmptyState icon="BiCube" label="Select an Item" />;
};

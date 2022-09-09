import { EmptyState } from '../../shared/EmptyState';
import { ItemDetailsLego } from './ItemDetailsLego';
import { ItemDetailsNendoroid } from './ItemDetailsNendoroid';
import { ItemDetailsVideoGame } from './ItemDetailsVideoGame';

type ItemDetailsProps = {
  selectedItem: any;
};

export const ItemDetails = ({
  selectedItem,
}: ItemDetailsProps) => {

  if(selectedItem) {
    if(selectedItem.type === 'lego') return <ItemDetailsLego itemId={selectedItem._id} />;
    if(selectedItem.type === 'videogame') return <ItemDetailsVideoGame itemId={selectedItem._id} />;
  }

  return <EmptyState icon="BiCube" label="Select an Item" />;
};

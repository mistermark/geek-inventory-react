import { CollectionItem } from '../../types';
import { CollectionItemsLego } from './CollectionItemsLego';
import { CollectionItemNendoroid } from './CollectionItemNendoroid';
import { CollectionItemVideoGame } from './CollectionItemVideoGame';
import { EmptyState } from '../../shared/EmptyState';

type CollectionItemsProps = {
  type: string;
};

export const CollectionItems = ({ type }: CollectionItemsProps) => {
  if(type === 'lego') return <CollectionItemsLego />;
  if(type === 'videogame') return <CollectionItemVideoGame />;
  // {type === 'nendoroid'} return <CollectionItemNendoroid />;

  return (
    <div className="bg-white shadow overflow-hidden w-3/5">
      <div className="bg-transparent overflow-hidden">
        <EmptyState
          icon="BiCube"
          label="Nothing here ... yet?"
        />
      </div>
    </div>
  );
};

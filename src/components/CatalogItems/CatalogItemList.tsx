import { EmptyState } from '../../shared/EmptyState';
import CatalogItemListLego from './CatalogItemListLego';
import CatalogItemListVideogame from './CatalogItemListVideogame';

type CatalogItemListProps = {
  type: string;
};

export const CatalogItemList = ({ type }: CatalogItemListProps) => {
  if(type === 'lego') return <CatalogItemListLego />;
  if(type === 'videogame') return <CatalogItemListVideogame />;

  return (
    <div className="bg-white overflow-hidden w-full">
      <div className="bg-transparent overflow-hidden">
        <EmptyState
          icon="BiCube"
          label="Nothing here"
        />
      </div>
    </div>
  );
};

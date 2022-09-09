import { Key, useState } from 'react';
import { Select, MenuItem } from '@mui/material';

import { Condition } from '../../shared/Condition';
import { CollectionItemTypeLegoForm } from './CollectionItemTypeLegoForm';
import { CollectionItemTypeVideoGameForm } from './CollectionItemTypeVideoGameForm';
import SelectItemType from './SelectItemType';

type CollectionItemFormProps = {
  onItemAdded: Function;
};

export const CollectionItemForm = ({
  onItemAdded,
}: CollectionItemFormProps) => {
  const [selectedItemType, setSelectedItemType] = useState('');

  return (
    <>
      <div className="pb-4 flex justify-between">
        <h2 className="text-lg font-medium text-gray-900">Add an Item</h2>
      </div>

      <fieldset>
        <section className="mb-5">
          <SelectItemType onTypeSelected={setSelectedItemType} />
        </section>
      </fieldset>

      <Condition when={selectedItemType} is="lego">
        <CollectionItemTypeLegoForm onItemAdded={onItemAdded} />
      </Condition>
      <Condition when={selectedItemType} is="videogame">
        <CollectionItemTypeVideoGameForm onItemAdded={onItemAdded} />
      </Condition>
      <Condition when={selectedItemType} is="nendoroid">
        <pre>Nendoroid form fields.</pre>
      </Condition>
    </>
  );
};

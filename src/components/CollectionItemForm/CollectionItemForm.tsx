import { Key, useState } from 'react';
import { Select, MenuItem } from '@mui/material';

import { Condition } from '../../shared/Condition';
import { CollectionItemTypeLegoForm } from './CollectionItemTypeLegoForm';
import { CollectionItemTypeVideoGameForm } from './CollectionItemTypeVideoGameForm';

type ItemType = {
  name: string;
  type: string;
  url: string;
};

type CollectionItemFormProps = {
  onItemAdded: Function;
};

export const CollectionItemForm = ({
  onItemAdded,
}: CollectionItemFormProps) => {
  const [selectedItemType, setSelectedItemType] = useState('');

  const itemTypes: ItemType[] = [
    {
      name: 'LEGO',
      type: 'lego',
      url: 'https://www.lego.com',
    },
    {
      name: 'Nendoroid',
      type: 'nendoroid',
      url: 'https://www.goodsmile.com',
    },
    {
      name: 'Video Game',
      type: 'videogame',
      url: 'https://www.amazon.com',
    },
  ];

  const handleSelectTypeChange = (event: any) => {
    setSelectedItemType(event.target.value);
  };

  return (
    <>
      <div className="pb-4 flex justify-between">
        <h2 className="text-lg font-medium text-gray-900">Add an Item</h2>
      </div>

      <fieldset>
        <section className="mb-5">
          <Select
            id="type"
            value={selectedItemType}
            onChange={(ev) => handleSelectTypeChange(ev)}
            displayEmpty
            className="w-full"
          >
            <MenuItem value="" disabled>
              <div className="flex items-center">Select a Collection Type</div>
            </MenuItem>
            {itemTypes.map((itemType: ItemType) => (
              <MenuItem key={itemType.type} value={itemType.type}>
                <div className="flex items-center">{itemType.name}</div>
              </MenuItem>
            ))}
          </Select>
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

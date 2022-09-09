import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { ItemType } from '../../types';

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

type SelectItemTypeProps = {
  onTypeSelected: Function;
};

const SelectItemType = ({ onTypeSelected }: SelectItemTypeProps) => {
  const [selectedItemType, setSelectedItemType] = useState('');
  const handleSelectTypeChange = (event: SelectChangeEvent) => {
    const { target: { value }} = event;
    setSelectedItemType(value);
    onTypeSelected(value);
  };
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="select-item-type-label">Select Item Type</InputLabel>
        <Select
          labelId="select-item-type-label"
          id="type"
          label="Select Item Type"
          value={selectedItemType}
          onChange={handleSelectTypeChange}
          displayEmpty
          className="w-full"
        >
          {itemTypes.map((itemType: ItemType) => (
            <MenuItem key={itemType.type} value={itemType.type}>
              <div className="flex items-center">{itemType.name}</div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectItemType;

/* This example requires Tailwind CSS v2.0+ */
import React, { useState } from 'react';

import { ItemCollectionType } from '../types';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';

type CollectionSelectListProps = {
  list: ItemCollectionType[];
  onSelected: any;
};

/**
 * @param {object} props
 * @return {React.ReactElement}
 */
export const CollectionSelectList = ({list,onSelected}: CollectionSelectListProps): React.ReactElement => {
  const [selected, setSelected] = useState('');

  const onChangeTrigger = (event: SelectChangeEvent) => {
    const { target: { value }} = event;
    setSelected(value);
    onSelected(JSON.parse(value));
  };

  const arrayOfTypes = [...list].sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-multiple-name-label">Collection Type</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        defaultValue=''
        label="Collection Type"
        onChange={onChangeTrigger}
        name="collectionType"
        className='w-full bg-white'
        input={<OutlinedInput label="Collection type" />}
        value={selected}
      >
        {arrayOfTypes.map((listItem: ItemCollectionType) => (
          <MenuItem key={listItem.name} value={JSON.stringify(listItem)}>{listItem.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

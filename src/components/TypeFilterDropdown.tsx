import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Autocomplete,
  TextField,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

import { ItemCollectionType } from '../types';
import { toolbarActionsEventChannel, userInventoryEventChannel } from '../eventchannels';
import { LoadingSpinner } from '../shared/LoadingSpinner';

const GET_INVENTORYTYPES = gql`
  query GetTypes($username: String!) {
    types(username: $username) {
      _id
      type
      name
    }
  }
`;

/**
 * @param {object} props
 * @return {React.ReactElement}
 */
export const TypeFilterDropdown = (): React.ReactElement => {
  const { user } = useAuth0();
  const username: string = user && user['https://scrubjay.io/username'];

  const {
    loading,
    error,
    data,
    refetch,
  } = useQuery(GET_INVENTORYTYPES, {
    variables: { username },
  });

  const onChangeTrigger = (event: any, newValue: any) => {
    toolbarActionsEventChannel.emit('filterTypeUpdated', newValue);
  };

  useEffect(() => {
    const unsubOnInventoryUpdated = userInventoryEventChannel.on(
      'onInventoryUpdated',
      refetch
    );
    const unsubOnInventoryItemRemoved = userInventoryEventChannel.on(
      'onInventoryItemRemoved',
      refetch
    );
    return () => {
      unsubOnInventoryUpdated();
      unsubOnInventoryItemRemoved();
    };
  }, [refetch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <Autocomplete
        multiple
        size="small"
        disableCloseOnSelect
        id="tags-standard"
        options={data.types}
        onChange={onChangeTrigger}
        getOptionLabel={(option: ItemCollectionType) => option.name}
        defaultValue={undefined}
        className="bg-white"
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Type"
          />
        )}
      />
    </>
  );
};

import React, { useEffect, useState } from 'react';
import { gql, NetworkStatus, useMutation, useQuery } from '@apollo/client';
import {
  Alert,
  AlertColor,
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

import Icon from '../../shared/Icon';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { LegoItem, VideoGameItem } from '../../types';
import { userInventoryEventChannel } from '../../eventchannels';

const GET_COLLECTIONITEMS_BYTYPE = gql`
  query ItemsByType($type: String!) {
    itemsByType(type: $type) {
      _id
      name
      state
      release_date
      meta {
        platform
      }
    }
  }
`;

const ADD_TOINVENTORY = gql`
  mutation addToInventory($id: String!, $username: String!) {
    addToInventory(id: $id, username: $username) {
      code
      message
    }
  }
`;

const CatalogItemListLego = () => {
  const { user } = useAuth0();
  const username: string = user && user['https://scrubjay.io/username'];

  /**
   * Handle fetching catalog items
   */
  const { data, loading, error, networkStatus } = useQuery(
    GET_COLLECTIONITEMS_BYTYPE,
    {
      variables: { type: 'videogame' },
    }
  );

  /**
   * Handle assigning items to a user
   */
  const [openSnackbar, setOpenSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [assignCatalogItem] = useMutation(ADD_TOINVENTORY);
  const handleAssignItem = (clickedItem: VideoGameItem) => {
    assignCatalogItem({
      variables: {
        id: clickedItem._id,
        username,
      },
      onCompleted(response) {
        if (response.addToInventory.message === 'success') {
          setOpenSnackbar({
            open: true,
            message: 'Item successfully added!',
            severity: 'success',
          });
          userInventoryEventChannel.emit('onInventoryUpdated');
        }
        if (response.addToInventory.message === 'duplicate') {
          setOpenSnackbar({
            open: true,
            message: 'Item already exists in your inventory.',
            severity: 'info',
          });
        }
      },
    });
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar({ ...openSnackbar, open: false });
  };

  if (loading || networkStatus === NetworkStatus.refetch)
    return <LoadingSpinner />;
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <List>
        {data.itemsByType.map((catalogItem: VideoGameItem) => (
          <React.Fragment key={catalogItem._id}>
            <ListItem
              onClick={() => handleAssignItem(catalogItem)}
              className="select-none cursor-pointer"
              sx={{
                '&:hover, &:focus': {
                  button: { opacity: 1 },
                },
              }}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  sx={{
                    opacity: 0,
                  }}
                >
                  <Icon icon="BiPlus" />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>{catalogItem.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={catalogItem.name}
                secondary={catalogItem.meta.platform}
              ></ListItemText>
            </ListItem>
            <Divider variant="fullWidth" component="li" />
          </React.Fragment>
        ))}
      </List>
      <Snackbar
        className="drop-shadow-lg"
        open={openSnackbar.open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={openSnackbar.severity}
          sx={{ width: '100%' }}
        >
          {openSnackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CatalogItemListLego;

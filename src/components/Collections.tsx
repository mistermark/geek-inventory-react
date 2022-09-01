import React, { Fragment, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import { ItemCollectionType } from '../types';

import { CollectionSelectList } from './CollectionSelectList';
import CollectionList from './CollectionList';
import { EmptyState } from '../shared/EmptyState';
import { CollectionItemForm } from './CollectionItemForm/CollectionItemForm';
import Icon from '../shared/Icon';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { Button } from '@mui/material';

const GET_COLLECTIONITEMTYPES = gql`
  query CollectionItems {
    types {
      _id
      name
      type
    }
  }
`;

/**
 * @return {React.ReactElement}
 */
export default function Collections(): React.ReactElement {
  const [selectedCollection, setSelectedCollection] =
    useState<ItemCollectionType>();
  const fnSelected = (thisValue: ItemCollectionType) => {
    setSelectedCollection(thisValue);
  };
  const [drawerOpen, setDrawerOpen] = useState(false);
  const onDrawerClose = (val: boolean) => {
    setDrawerOpen(val);
  };

  const { loading, error, data } = useQuery(GET_COLLECTIONITEMTYPES);

  const [refetchStatus, setRefetchStatus] = useState(false);
  const onItemAdded = (val: any) => {
    setRefetchStatus(val);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <pre>{error.message}</pre>;

  return (
    <div>
      <div className="flex mb-6">
        <div className="w-full flex items-end flex-row justify-between">
          <div className="w-1/3">
            <CollectionSelectList list={data?.types} onSelected={fnSelected} />
          </div>
          <div className="flex-0">
            <Button
              variant="contained"
              className="inline-flex items-center px-4 py-2 border border-indigo-800 rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setDrawerOpen(true)}
            >
              <Icon
                icon={'BiPlus'}
                className="-ml-1 mr-2 h-5 w-5"
                aria-hidden="true"
              />
              <span className="block">Add Item</span>
            </Button>
          </div>
        </div>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => onDrawerClose(false)}
          variant="persistent"
        >
          <div className="relative pb-10 pt-4" style={{ width: 416 }}>
            <div className="border-b border-gray-300 mb-6 px-4 pb-2">
              <IconButton size="large" onClick={() => setDrawerOpen(false)}>
                <Icon icon="BiX" />
              </IconButton>
            </div>
            <div className="px-8">
              <Fragment key={`${drawerOpen}`}>
                <CollectionItemForm onItemAdded={onItemAdded} />
              </Fragment>
            </div>
          </div>
        </Drawer>
      </div>
      <div className="pt-4 relative">
        {selectedCollection ? (
          <CollectionList
            collectionType={selectedCollection}
            refetchStatus={refetchStatus}
          />
        ) : (
          <div className="bg-white shadow overflow-hidden">
            <EmptyState
              icon="BiCube"
              label="Select a Collection from the dropdown."
            />
          </div>
        )}
      </div>
    </div>
  );
}

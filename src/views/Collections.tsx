import React, { useEffect, Fragment, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useAuth0 } from "@auth0/auth0-react";
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { Autocomplete, Button } from '@mui/material';

import { ItemCollectionType } from '../types';
import { TypeFilterDropdown } from '../components/TypeFilterDropdown';
import InventoryList from '../components/InventoryList';
import { EmptyState } from '../shared/EmptyState';
import { CollectionItemForm } from '../components/Admin/CollectionItemForm';
import Icon from '../shared/Icon';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import AssignItemForm from '../components/UserForms/AssignItemform';
import { userInventoryEventChannel } from '../eventchannels';

/**
 * @return {React.ReactElement}
 */
export default function Collections(): React.ReactElement {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const onDrawerClose = (val: boolean) => {
    setDrawerOpen(val);
  };

  const handleRefreshInventory = () => {
    userInventoryEventChannel.emit('onInventoryUpdated');
  }

  return (
      <div>
        <div className="flex mb-6">
          <div className="w-full flex items-end flex-row justify-between">
            <div className="flex-1 flex justify-start items-center">
              <div className='w-1/4 mr-3'>
                <TypeFilterDropdown />
              </div>
              {/* {data && data.types.length === 0 ?
              <div className='flex justify-start text-gray-600 italic'>
                <p>You have nothing in your inventory. Add something using the "ADD ITEM" button</p>
                <Icon icon="BiRightArrowAlt" className='w-6 h-6' />
              </div>
              : null} */}
            </div>
            <div>
              <IconButton onClick={() => handleRefreshInventory()}>
                <Icon icon="BiRefresh" />
              </IconButton>
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
                  <AssignItemForm />
                </Fragment>
              </div>
            </div>
          </Drawer>
        </div>

        <div className="pt-4 relative">
          <InventoryList />
          {/* {selectedCollection ? (
          ) : (
            <div className="bg-white shadow overflow-hidden">
              <EmptyState
                icon="BiCube"
                label="Select a Collection from the dropdown."
              />
            </div>
          )} */}
        </div>
      </div>
  );
}

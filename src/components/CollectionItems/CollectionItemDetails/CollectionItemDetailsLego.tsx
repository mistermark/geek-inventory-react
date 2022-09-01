import { FormattedNumber } from 'react-intl';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { gql, NetworkStatus, useLazyQuery, useMutation } from '@apollo/client';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import Icon from '../../../shared/Icon';
import { LegoItem } from '../../../types';
import { stateIcons, stripTypename } from '../../../utils';
import { CollectionItemDetailsHeader } from './CollectionItemDetailsHeader';
import { CollectionItemDetailsList } from './CollectionItemDetailsList';
import { CollectionItemDetailsListItem } from './CollectionItemDetailsListItem';
import { CollectionItemDetailsHeaderMenu } from './CollectionItemDetailsHeaderMenu';
import { DeleteDialog } from '../../../shared/DeleteDialog';
import { FormInputNumber } from '../../../shared/FormInputNumber';
import { FormInputText } from '../../../shared/FormInputText';
import { FormInputUrl } from '../../../shared/FormInputUrl';
import { LoadingSpinner } from '../../../shared/LoadingSpinner';

type CollectionItemDetailsLegoProps = {
  itemId: string;
  onDelete: Function;
};

const GET_COLLECTIONITEM = gql`
  query Item($id: String!) {
    item(id: $id) {
      _id
      type
      name
      state
      quantity
      release_date
      price {
        amount
        currency
      }
      ean
      link {
        url
        name
      }
      meta {
        pieces
        minifigs
        number
        subtheme
        theme
      }
    }
  }
`;

const UPDATE_COLLECTIONITEM = gql`
  mutation UpdateCollectionItemLego($data: CollectionItemLegoInput!) {
    updateCollectionItemLego(data: $data) {
      code
      message
      data {
        _id
        name
      }
    }
  }
`;

const DELETE_COLLECTIONITEM = gql`
  mutation DeleteCollectionItem($deleteCollectionItemId: String!) {
    deleteCollectionItem(id: $deleteCollectionItemId) {
      code
      message
    }
  }
`;

export const CollectionItemDetailsLego = ({
  itemId,
  onDelete,
}: CollectionItemDetailsLegoProps) => {
  /**
   * Handle GET action
   */
  const [itemDetails, setItemDetails] = useState<LegoItem>();
  const [
    getItem,
    { data, loading, error, refetch: itemRefetch, networkStatus },
  ] = useLazyQuery(GET_COLLECTIONITEM, {
    fetchPolicy: 'network-only', // Used for first execution
    nextFetchPolicy: 'cache-first', // Used for subsequent executions
    onCompleted: (data) => {
      setItemDetails(data?.item);
    },
  });

  useEffect(() => {
    getItem({ variables: { id: itemId } });
  }, [itemId, getItem]);

  /**
   * Handle EDIT action
   */
  const [updateCollectionItem] = useMutation(UPDATE_COLLECTIONITEM);

  const methods = useForm();
  const { handleSubmit, reset, control } = methods;
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const handleEditDialog = (openState: boolean) => {
    setOpenEditDialog(openState);
    reset(stripTypename(itemDetails));
  };
  const onSubmit = (submitData: any) => {
    updateCollectionItem({
      variables: {
        data: submitData,
      },
      onCompleted(submitData) {
        if (submitData.updateCollectionItemLego.message === 'success') {
          setOpenEditDialog(false);
          itemRefetch();
          // setSubmitSuccess(true);
          // props.onItemAdded(true);
        }
      },
    });
  };

  /**
   * Handling DELETE action
   */
  const [deleteCollectionItem] = useMutation(DELETE_COLLECTIONITEM);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDeleteDialog = (dialogOpen: boolean, id?: String) => {
    if (id) {
      deleteCollectionItem({
        variables: {
          deleteCollectionItemId: id,
        },
        onCompleted(data) {
          if (data.deleteCollectionItem.message === 'success') {
            setDeleteDialogOpen(false);
            setItemDetails(undefined);
            onDelete();
          }
        },
      });
    } else {
      setDeleteDialogOpen(dialogOpen);
    }
  };

  if (networkStatus === NetworkStatus.refetch)
    return (
      <div className="min-h-fit">
        <LoadingSpinner />
      </div>
    );

  return (
    <>
      <CollectionItemDetailsHeader>
        <>
          <div className="flex justify-start items-end">
            <Icon
              icon={stateIcons[itemDetails?.state || 'unknown']}
              className="w-8 h-8 mr-2"
            />
            <div className="flex flex-col justify-start">
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {itemDetails?.meta.number}
              </p>
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex-1 truncate pr-3">
                {itemDetails?.name}
              </h3>
            </div>
          </div>
          <div>
            <CollectionItemDetailsHeaderMenu
              handleEditDialog={handleEditDialog}
              handleDeleteDialog={handleDeleteDialog}
            />
          </div>
        </>
      </CollectionItemDetailsHeader>
      <CollectionItemDetailsList>
        <>
          <CollectionItemDetailsListItem label="Theme">
            <span>{itemDetails?.meta.theme}</span>
          </CollectionItemDetailsListItem>
          <CollectionItemDetailsListItem label="Subtheme">
            <span>{itemDetails?.meta.subtheme}</span>
          </CollectionItemDetailsListItem>
          <CollectionItemDetailsListItem label="Minifigs">
            <span>{itemDetails?.meta.minifigs}</span>
          </CollectionItemDetailsListItem>
          <CollectionItemDetailsListItem label="Release Date">
            {dayjs(itemDetails?.release_date).format('YYYY/MM/DD')}
          </CollectionItemDetailsListItem>
          {/* <CollectionItemDetailsListItem label="Discontinued">
            <span>{itemDetails?.discontinued_date}</span>
          </CollectionItemDetailsListItem> */}
          <CollectionItemDetailsListItem label="Pieces">
            <span>{itemDetails?.meta.pieces}</span>
          </CollectionItemDetailsListItem>
          <CollectionItemDetailsListItem label="Price">
            <FormattedNumber
              value={itemDetails?.price?.amount || 0}
              // eslint-disable-next-line react/style-prop-object
              style="currency"
              currency={itemDetails?.price?.currency || 'EUR'}
            />
          </CollectionItemDetailsListItem>
          {itemDetails?.link ? (
            <CollectionItemDetailsListItem label="Link(s)">
              <ul className="list-none">
                {/* {itemDetails?.links.map((link: RefUrl) => ( */}
                <li className="flex items-center mb-1">
                  <a
                    href={itemDetails?.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline text-blue-700"
                  >
                    {itemDetails?.link.name}
                  </a>
                  <Icon icon="BiLinkExternal" className="ml-1 w-4 h-4"></Icon>
                </li>
                {/* ))} */}
              </ul>
            </CollectionItemDetailsListItem>
          ) : null}
          <CollectionItemDetailsListItem label="ID">
            <span>{itemDetails?._id}</span>
          </CollectionItemDetailsListItem>
        </>
      </CollectionItemDetailsList>

      {itemDetails ? (
        <DeleteDialog
          dialogOpen={deleteDialogOpen}
          handleDialog={handleDeleteDialog}
          deleteItem={{ name: itemDetails?.name, itemId: itemDetails?._id }}
        />
      ) : null}

      {itemDetails ? (
        <Dialog
          open={openEditDialog}
          onClose={() => handleEditDialog(false)}
          fullWidth={true}
          maxWidth="md"
        >
          <DialogTitle>Update {itemDetails.name}</DialogTitle>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogContent>
                <div className="w-full flex justify-between">
                  <div className="w-1/2 pr-3">
                    <section className="py-3">
                      <FormInputText
                        name="meta.number"
                        label="Number"
                        required={true}
                      />
                    </section>
                    <section className="py-3">
                      <FormInputText name="name" label="Name" required={true} />
                    </section>
                    <section className="py-3">
                      <Controller
                        name="release_date"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            label="Release date"
                            inputFormat="DD-MM-YYYY"
                            minDate={dayjs('01-01-1949')}
                            value={field.value}
                            onChange={field.onChange}
                            renderInput={(relParams) => (
                              <TextField {...relParams} className="w-full" />
                            )}
                          />
                        )}
                      />
                    </section>
                    <section className="py-3">
                      <FormControl fullWidth>
                        <InputLabel id="state-label">State</InputLabel>
                        <Controller
                          name="state"
                          control={control}
                          defaultValue="sealed"
                          render={({ field }) => (
                            <Select
                              label="State"
                              id="state"
                              labelId="state-label"
                              value={field.value}
                              onChange={field.onChange}
                            >
                              {Object.entries(stateIcons).map((state) => (
                                <MenuItem key={state[0]} value={state[0]}>
                                  <div className="flex items-center">
                                    <Icon icon={stateIcons[state[0]]} />
                                    <span className="ml-3 block truncate capitalize">
                                      {state[0]}
                                    </span>
                                  </div>
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                      </FormControl>
                    </section>
                    <section className="py-3 flex justify-start">
                      <div className="w-1/3 mr-3">
                        <FormInputNumber
                          name="price.amount"
                          label="Price"
                          inputProps={{ min: 0, step: 0.01 }}
                        />
                      </div>
                      <div>
                        <FormControl fullWidth>
                          <InputLabel id="currency-label">Currency</InputLabel>
                          <Controller
                            name="price.currency"
                            control={control}
                            render={({ field }) => (
                              <Select
                                label="Currency"
                                id="currency"
                                labelId="currency-label"
                                {...field}
                              >
                                {['EUR', 'USD'].map((currencyCode) => (
                                  <MenuItem
                                    key={currencyCode}
                                    value={currencyCode}
                                  >
                                    <div className="flex items-center">
                                      <span className="uppercase">
                                        {currencyCode}
                                      </span>
                                    </div>
                                  </MenuItem>
                                ))}
                              </Select>
                            )}
                          />
                        </FormControl>
                      </div>
                    </section>
                    <section className="py-3">
                      <div className="w-2/5 mr-3">
                        <FormInputNumber
                          name="quantity"
                          label="Quantity"
                          inputProps={{ min: 0 }}
                        />
                      </div>
                    </section>
                  </div>
                  <div className="w-1/2 pl-3">
                    <section className="py-3">
                      <FormInputText name="meta.theme" label="Theme" />
                    </section>
                    <section className="py-3">
                      <FormInputText name="meta.subtheme" label="Subtheme" />
                    </section>
                    <section className="py-3">
                      <FormInputNumber
                        name="meta.minifigs"
                        label="Minifigs"
                        inputProps={{ min: 0 }}
                      />
                    </section>
                    <section className="py-3">
                      <FormInputNumber
                        name="meta.pieces"
                        label="Pieces"
                        inputProps={{ min: 0 }}
                      />
                    </section>
                    <section className="py-3">
                      <div className="mb-2">
                        <FormInputText
                          name="link.name"
                          label="Link Name"
                          required={true}
                        />
                      </div>
                      <div>
                        <FormInputUrl name="link.url" label="Link URL" />
                      </div>
                    </section>
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                <Button type="submit">Save</Button>
              </DialogActions>
            </form>
          </FormProvider>
        </Dialog>
      ) : null}
    </>
  );
};

import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { FormProvider, Controller, useForm } from 'react-hook-form';
import { FormInputNumber } from '../../shared/FormInputNumber';
import { FormInputText } from '../../shared/FormInputText';
import { FormInputUrl } from '../../shared/FormInputUrl';
import { FormInputCurrencySelector } from '../../shared/FormInputCurrencySelector';
import { FormInputItemStateSelector } from '../../shared/FormInputItemStateSelector';
import { Error } from '../../shared/Error';
import Icon from '../../shared/Icon';

const ADD_COLLECTIONITEM = gql`
  mutation CreateCollectionItemLego($data: CollectionItemLegoInput) {
    createCollectionItemLego(data: $data) {
      code
      message
      data {
        type
        name
        number
      }
    }
  }
`;

type CollectionItemTypeLegoFormProps = {
  onItemAdded: Function
}

export const CollectionItemTypeLegoForm = ({onItemAdded}: CollectionItemTypeLegoFormProps) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [addCollectionItem, { data, loading, error }] =
    useMutation(ADD_COLLECTIONITEM);

  const methods = useForm();
  const { handleSubmit, reset, control } = methods;

  const onSubmit = (data: any) => {
    const parsedData = {
      ...data,
      quantity: parseInt(data.quantity),
      price: { ...data.price, amount: parseFloat(data.price.amount) },
    };
    addCollectionItem({
      variables: {
        data: parsedData,
      },
      onCompleted(data) {
        if (data.createCollectionItemLego.message === 'success') {
          setSubmitSuccess(true);
          onItemAdded(true);
        }
      }
    });
  };

  const onSubmitNew = () => {
    setSubmitSuccess(false);
    reset();
  }

  if (loading) return <p>Submitting...</p>;
  if (error)
    return (
      <Error>
        <p>Error submitting data: ${error.message}</p>
      </Error>
    );
  if (submitSuccess)
    return (
      <>
        <div className="w-full flex justify-center items-center flex-col p-3 text-gray-600">
          <Icon icon="BiBadgeCheck" className="w-10 h-10 mb-2"></Icon>
          <p>Item successfully added.</p>
        </div>
        <div className='flex justify-center py-5'>
            <Button variant="contained" onClick={onSubmitNew}>
                Add another Item
            </Button>
        </div>
      </>
    );

  return (
    <>
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="border-t border-gray-300 py-3 mb-5">
          <legend className="pr-3">LEGO Item</legend>
          <section className="mb-5">
            <FormInputText
              name="meta.number"
              label="Number"
            />
          </section>
          <section className="mb-5">
            <FormInputText
              name="name"
              label="Name"
              required={true}
            />
          </section>
          <section className="mb-5 flex justify-between">
            <div className="pr-3">
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
            </div>
            {/* <div className="pl-3">
                    <Controller
                        name="discontinued_date"
                        control={control}
                        render={({ field }) => (
                        <DatePicker
                            label="Discontinue date"
                            inputFormat="DD-MM-YYYY"
                            minDate={dayjs('01-01-1949')}
                            value={field.value}
                            onChange={field.onChange}
                            renderInput={(discParams) => (
                            <TextField {...discParams} className="w-full" />
                            )}
                        />
                        )}
                    />
                    </div> */}
          </section>
          <section className="mb-5">
            <FormInputItemStateSelector
              name="state"
              label="State"
            />
          </section>
          <section className="mb-5">
            <FormInputNumber
              name="quantity"
              label="Quantity"
              inputProps={{ min: 1 }}
              required={true}
            />
          </section>
          <section className="mb-5 flex justify-start">
            <div className="w-1/3 mr-3">
              <FormInputNumber
                name="price.amount"
                label="Amount"
                inputProps={{ min: 0.0, step: 0.01 }}
              />
            </div>
            <div>
              <FormInputCurrencySelector
                name="price.currency"
                label="Currency"
              />
            </div>
          </section>
          <section className="mb-5">
            <div className="mb-2">
              <FormInputText
                name="link.name"
                label="Link Name"
              />
            </div>
            <div>
              <FormInputUrl
                name="link.url"
                label="Link URL"
              />
            </div>
          </section>

          <section className="mb-5">
            <FormInputNumber
              name="meta.minifigs"
              label="Minifigs"
              inputProps={{ min: 0 }}
            />
          </section>
          <section className="mb-5">
            <FormInputNumber
              name="meta.pieces"
              label="Pieces"
              inputProps={{ min: 0 }}
            />
          </section>
          <section className="mb-5">
            <FormInputText name="meta.theme" label="Theme" />
          </section>
          <section className="m2-5">
            <FormInputText
              name="meta.subtheme"
              label="Subtheme"
            />
          </section>
        </fieldset>
        <div className="w-full">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-indigo-800 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Icon
              icon={'BiPlus'}
              className="-ml-1 mr-2 h-5 w-5"
              aria-hidden="true"
            />
            <span className="block">Submit</span>
          </button>
        </div>
      </form>
      </FormProvider>
    </>
  );
};

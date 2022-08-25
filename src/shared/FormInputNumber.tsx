import React from 'react';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type FormInputTextProps = {
  name: string;
  label: string;
  required?: boolean;
  inputProps?: any;
  parseNumberType?: 'parseInt' | 'parseFloat';
};
export const FormInputNumber = ({
  name,
  label,
  required = false,
  inputProps,
  parseNumberType = 'parseInt',
}: FormInputTextProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field }) => (
        <TextField
          {...field}
          id={name}
          label={label}
          variant="outlined"
          className="w-full"
          type="number"
          inputProps={inputProps}
          onChange={(e) =>
            field.onChange(
              e.target.value
                ? parseNumberType === 'parseInt'
                  ? parseInt(e.target.value)
                  : parseFloat(e.target.value)
                : ''
            )
          }
        />
      )}
    />
  );
};

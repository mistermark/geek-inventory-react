import React from 'react';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type FormInputTextProps = {
  name: string;
  label: string;
  required?: boolean;
};
export const FormInputText = ({
  name,
  label,
  required = false,
}: FormInputTextProps) => {
  const { control } = useFormContext();
  return (
    <Controller
    name={name}
    rules={{ required: required }}
    render={({ field }) => (
      <TextField
          {...field}
          id={name}
          label={label}
          variant="outlined"
          className="w-full"
        />
      )}
    />
  );
};

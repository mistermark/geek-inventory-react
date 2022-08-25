import * as React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';

export const FormInputTags = ({name, options, ...rest}: any) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={undefined}
      render={({
        field: { ref, ...field },
        fieldState: { invalid, error },
      }) => (
        <Autocomplete
          {...field}
          className="w-full"
          freeSolo
          multiple
          handleHomeEndKeys
          disableCloseOnSelect
          id="fixed-tags-demo"
          options={options}
          getOptionLabel={(option) => option.name || ''}
          renderInput={(params) => (
            <TextField
              {...params}
              {...rest}
              inputRef={ref}
              error={invalid}
              helperText={error?.message}
            />
          )}
          onChange={(e, value) => field.onChange(value)}
          onInputChange={(_, data) => {
            if (data) field.onChange(data);
          }}
        />
      )}
    />
  );
}
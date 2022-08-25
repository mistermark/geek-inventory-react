import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type FormInputUrlProps = {
  name: string;
  label: string;
  required?: boolean;
};

export const FormInputUrl = ({
  name,
  label,
  required,
}: FormInputUrlProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="mt-1 flex">
          <div className="text-lg border border-gray-300 bg-gray-200 rounded-tl-md rounded-bl-md border-r-0 flex-0 py-1 px-2 text-gray-600 items-center flex">
            <span>http://</span>
          </div>
          <TextField
            {...field}
            id={name}
            label={label}
            variant="outlined"
            className="w-full"
          />
        </div>
      )}
    />
  );
};

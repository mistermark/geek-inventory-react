import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"

type FormInputCurrencySelectorProps = {
    name: string;
    label: string;
    required?: boolean;
    inputProps?: {}
}

export const FormInputCurrencySelector = ({name, label, required, inputProps}: FormInputCurrencySelectorProps) => {
  const { control } = useFormContext();
    return (
        <FormControl fullWidth>
              <InputLabel id="currency-label">Currency</InputLabel>
              <Controller
                name="price.currency"
                control={control}
                defaultValue="EUR"
                render={({ field }) => (
                  <Select
                    label="Currency"
                    id="currency"
                    labelId="currency-label"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    {['EUR', 'USD'].map((currencyCode) => (
                      <MenuItem key={currencyCode} value={currencyCode}>
                        <div className="flex items-center">
                          <span className="uppercase">{currencyCode}</span>
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
    )
}
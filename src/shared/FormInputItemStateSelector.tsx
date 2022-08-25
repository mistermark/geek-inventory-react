import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"
import { stateIcons } from "../utils"
import Icon from "./Icon"

type FormInputItemStateSelectorProps = {
    name: string;
    label: string;
    required?: boolean;
    inputProps?: {}
}
export const FormInputItemStateSelector = ({name, label, required, inputProps}: FormInputItemStateSelectorProps) => {
  const { control } = useFormContext();
    return (
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
    )
}
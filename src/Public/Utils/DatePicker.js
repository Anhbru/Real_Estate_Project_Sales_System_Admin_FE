import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

function DatePickerJs(props) {
  const { errors, name, label, control } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field: { onChange, value } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={value ? dayjs(value) : null}
            onChange={(date) =>
              onChange(date ? dayjs(date).toISOString() : null)
            }
            label={label}
            slotProps={{
              textField: {
                error: !!errors,
                fullWidth: true,
                helperText: errors?.message,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
}

export default DatePickerJs;

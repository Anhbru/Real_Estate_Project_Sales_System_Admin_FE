import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller } from "react-hook-form";

function SelectJs({ arrayValue, errors, name, label, control }) {
  return (
    <FormControl fullWidth error={!!errors}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label={label}
            sx={{
              borderRadius: "8px",
              borderColor: "rgb(33, 43, 54)",
              color: "rgb(33, 43, 54)",
            }}
            error={!!errors}
          >
            {arrayValue.map((item) => (
              <MenuItem
                key={item.id}
                value={item.value}
                defaultValue="aaaaaa"
                sx={{
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right top, left bottom",
                  outline: "0px",
                  minHeight: "16px",
                  backdropFilter: "blur(20px)",
                  borderRadius: "8px",
                  padding: "8px",
                  ml: 1,
                  mr: 1,
                  marginBottom: "4px",
                  "&:hover": {
                    marginBottom: "4px",
                    backgroundColor: "rgba(145, 158, 171, 0.08)",
                  },
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText>{errors?.message}</FormHelperText>
    </FormControl>
  );
}

export default SelectJs;

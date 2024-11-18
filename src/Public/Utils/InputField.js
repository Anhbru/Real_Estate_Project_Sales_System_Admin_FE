import TextField from "@mui/material/TextField";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import React from "react";
import EyeClose from "./EyeClose";
import EyeOpen from "./EyeOpen";

export default function InputField({
  label,
  name,
  errors,
  register,
  startIcon,
  endIcon,
  inputPassowrd,
  placeholder,
  type = "text",
  defaultValue,
  multiline,
  rows,
  clickEndIcon,
  clickStartIcon,
  onChange,
}) {
  const customTheme = (inputTheme) =>
    createTheme({
      palette: {
        mode: inputTheme.palette.mode,
      },
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              "--TextField-brandBorderFocusedColor": "#6F7E8C",
              "& label.Mui-focused": {
                color: errors ? "" : "var(--TextField-brandBorderFocusedColor)",
              },
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
              borderColor: "#E0E3E7",
              borderRadius: "8px",
            },
            root: {
              [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: errors ? "" : "#B2BAC2",
              },
              [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: errors ? "" : "#6F7E8C",
              },
              [`& label.Mui-focused`]: {
                color: errors ? "" : "#6F7E8C",
              },
            },
          },
        },
      },
    });

  const inputTheme = useTheme();

  return (
    <ThemeProvider theme={customTheme(inputTheme)}>
      <TextField
        multiline={multiline}
        rows={rows}
        defaultValue={defaultValue}
        type={type}
        onChange={onChange}
        InputProps={{
          startAdornment: clickStartIcon && (
            <IconButton onClick={clickStartIcon}>{startIcon}</IconButton>
          ),
          endAdornment: (clickEndIcon || inputPassowrd) && (
            <IconButton onClick={clickEndIcon}>
              {type === "password" && inputPassowrd ? (
                <EyeClose />
              ) : inputPassowrd ? (
                <EyeOpen />
              ) : (
                endIcon
              )}
            </IconButton>
          ),
        }}
        helperText={errors?.message}
        error={errors}
        {...register(name, {
          required: true,
        })}
        placeholder={placeholder}
        name={name}
        fullWidth
        label={label}
      />
    </ThemeProvider>
  );
}

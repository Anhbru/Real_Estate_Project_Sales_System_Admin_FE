import React from "react";
import {
  BUTTON_BORDER_COLOR,
  BUTTON_COLOR,
  BUTTON_HOVER_BOX_SHADOW_COLOR,
  BUTTON_HOVER_COLOR,
  BUTTON_HOVER_COLOR_OUTLINED,
  BUTTON_TEXT_COLOR,
} from "../Contants/Contatns";
import { Button } from "@mui/material";

function ButtonJs({
  color,
  disabled,
  title = "button",
  rightIcon,
  leftIcon,
  icon,
  size = "medium",
  variant = "contained",
  onClick,
  type,
}) {
  const styles = {
    borderRadius: "8px",
    fontWeight: 700,
    textTransform: "capitalize",
    lineHeight: "1.71429",
    border: variant === "outlined" ? BUTTON_BORDER_COLOR[color] : "none",
    color:
      variant === "outlined" ? BUTTON_TEXT_COLOR[color] : "rgb(255, 255, 255)",
    backgroundColor:
      variant === "contained" ? BUTTON_COLOR[color] : "transparent",
    "&:hover": {
      border: variant === "outlined" ? BUTTON_BORDER_COLOR[color] : "none",
      backgroundColor:
        variant === "contained"
          ? BUTTON_HOVER_COLOR[color]
          : BUTTON_HOVER_COLOR_OUTLINED[color],
      boxShadow:
        variant === "contained" ? BUTTON_HOVER_BOX_SHADOW_COLOR[color] : "none",
    },
  };

  return (
    <Button
      type={type}
      onClick={onClick}
      size={size}
      endIcon={rightIcon && icon}
      startIcon={leftIcon && icon}
      disabled={disabled}
      sx={styles}
      variant={variant}
    >
      {title}
    </Button>
  );
}

export default ButtonJs;

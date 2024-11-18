import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

function LoadingSpinner({ open }) {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default LoadingSpinner;

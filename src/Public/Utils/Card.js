import React from "react";
import { Card } from "@mui/material";

function CardJs({ children }) {
  return (
    <Card
      sx={{
        borderRadius: "16px",
        backgroundColor: "rgb(255, 255, 255)",
        color: "rgb(33, 43, 54)",
        boxShadow:
          "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        padding: "24px",
      }}
    >
      {children}
    </Card>
  );
}

export default CardJs;

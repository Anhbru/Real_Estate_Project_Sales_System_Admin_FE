import React from "react";
import Header from "../../Shared/Admin/Header/Header";
import Sidebar from "../../Shared/Admin/Sidebar/Sidebar";
import { Box, Typography } from "@mui/material";
import ButtonJs from "../../../Utils/Button";
import AddIcon from "@mui/icons-material/Add";
import ContractTable from "./Components/Table/ContractTable";
import { useNavigate } from "react-router-dom";

function Contract() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Sidebar />
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "8rem",
          width: "100%",
          padding: "0 2rem",
        }}
      >
        <Box
          style={{
            textAlign: "center",
            marginLeft: "16rem",
          }}
        >
          <Typography variant="h5">Contract</Typography>
        </Box>
        <ButtonJs
          title="Create"
          leftIcon
          icon={<AddIcon />}
          onClick={() => navigate("/contract/create")}
        />
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <ContractTable />
      </Box>
    </>
  );
}

export default Contract;

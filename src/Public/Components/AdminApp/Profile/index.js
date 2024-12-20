import React, { useEffect, useState } from "react";
import Header from "../../Shared/Admin/Header/Header";
import Sidebar from "../../Shared/Admin/Sidebar/Sidebar";
import accountService from "../../Service/AccountService";
import { Box, Container, Grid } from "@mui/material";
import CardJs from "../../../Utils/Card";
import Typography from "@mui/material/Typography";

function ProfileAccont() {
  const [dataUser, setDataUser] = useState({
    staffID: "",
    name: "",
    personalEmail: "",
    dateOfBirth: "",
    image: "",
    identityCardNumber: "",
    nationality: "",
    placeOfOrigin: "",
    placeOfResidence: "",
    status: true,
    accountID: "",
    email: "",
  });
  const accountId = sessionStorage.getItem("accountId");

  const getProfileAccount = async () => {
    await accountService
      .getProfile(accountId)
      .then((res) => {
        console.log(res.data);
        setDataUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (accountId) {
      getProfileAccount();
    }
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <Container
        maxWidth="xl"
        sx={{
          mt: 10,
          padding: { xs: 2, sm: 4, md: 6 },
          marginLeft: { xs: 0, md: 30 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CardJs>
              <Box
                sx={{
                  borderRadius: "50%",
                  width: "10rem",
                  height: "10rem",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={
                    dataUser.image ||
                    "https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
                  }
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Typography variant="subtitle1" fontSize={16}>
                Full Name: {dataUser.name}
              </Typography>
              <Typography variant="subtitle1" fontSize={16}>
                Email: {dataUser.email}
              </Typography>
            </CardJs>
          </Grid>
          <Grid item xs={8}>
            <CardJs>dsadsa</CardJs>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProfileAccont;

import * as React from "react";
import AppTheme from "./AppTheme";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import authService from "../../Service/AuthService";
import { toast } from "react-toastify";
import FormProviderJs from "../../../Utils/FormProvider";
import InputField from "../../../Utils/InputField";
import EyeClose from "../../../Utils/EyeClose";
import { CircularProgress } from "@mui/material";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import { ROLE_ADMIN, ROLE_STAFF } from "../../../Contants/Contatns";

export default function LoginV2(props) {
  const [typePassword, setTypePassword] = React.useState(true);
  const navigate = useNavigate();

  const SchemaLogin = yup.object({
    emailOrPhone: yup.string().required("Vui lòng nhập thông tin"),
    password: yup.string().required("Vui lòng nhập thông tin"),
  });

  const defaultValues = {
    emailOrPhone: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(SchemaLogin),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmitForm = async (values) => {
    const data = {
      emailOrPhone: values.emailOrPhone,
      password: values.password,
    };

    await authService
      .loginAccount(data)
      .then((res) => {
        if (res.data.role !== ROLE_STAFF && res.data.role !== ROLE_ADMIN) {
          toast.error("You do not have permission to access the website");
          return;
        }
        sessionStorage.setItem("accessToken", res.data.token);
        sessionStorage.setItem("userRole", res.data.role);
        toast.success("Đăng nhập thành công!");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const handleClickShowPassword = () => {
    setTypePassword(!typePassword);
  };

  return (
    <AppTheme {...props}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={9}
          sx={{
            backgroundImage: "url(/assets/img/bg-auth.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        />

        {/* Right Side */}
        <Grid
          item
          sx={{
            my: 12,
            display: "flex",
            justifyContent: "center",
            height: "100%",
            margin: 0,
            alignItems: "center",
          }}
          sm={8}
          md={3}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in to your account
            </Typography>

            {/* Form */}
            <Box sx={{ mt: 3, width: "100%" }}>
              <FormProviderJs
                handleSubmit={handleSubmit(onSubmitForm)}
                methods={methods}
              >
                <InputField
                  register={register}
                  name="emailOrPhone"
                  label="User name or email address"
                  errors={errors.emailOrPhone}
                />
                <Box mt={2}>
                  <InputField
                    register={register}
                    name="password"
                    label="Password"
                    type={typePassword ? "password" : "text"}
                    errors={errors.password}
                    endIcon={<EyeClose />}
                    inputPassowrd
                    clickEndIcon={handleClickShowPassword}
                  />
                </Box>
                <Button
                  sx={{ mt: 2 }}
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                  variant="contained"
                  startIcon={
                    isSubmitting && (
                      <CircularProgress
                        style={{
                          width: "20px",
                          height: "20px",
                          color: "white",
                          marginLeft: "20px",
                        }}
                      />
                    )
                  }
                >
                  {isSubmitting ? "" : "Sign in"}
                </Button>
              </FormProviderJs>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </AppTheme>
  );
}

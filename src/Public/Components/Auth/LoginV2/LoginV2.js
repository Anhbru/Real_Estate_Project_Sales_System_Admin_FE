import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { GoogleIcon, FacebookIcon } from "./CustomIcons";
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

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

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
        sessionStorage.setItem("accessToken", res.data.token);
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
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
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
            <Box mt={2} mb={2}>
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
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
              Sign in with Google
            </Button>
            <Button fullWidth variant="outlined" startIcon={<FacebookIcon />}>
              Sign in with Facebook
            </Button>
            <Divider sx={{ cursor: "pointer" }}>
              <Typography
                sx={{ textAlign: "center" }}
                onClick={() => navigate("/dashboard")}
              >
                Return to dashboard
              </Typography>
            </Divider>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}

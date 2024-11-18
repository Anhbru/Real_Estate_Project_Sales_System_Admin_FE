import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../Service/AuthService";
import Css from "../../Shared/Admin/Lib/StyleSheet";
import Script from "../../Shared/Admin/Lib/Script";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FormProviderJs from "../../../Utils/FormProvider";
import InputField from "../../../Utils/InputField";
import ButtonJs from "../../../Utils/Button";
import EyeClose from "../../../Utils/EyeClose";
import LoadingSpinner from "../../../Utils/LoadingSpinner";

function Login() {
  const [typePassword, setTypePassword] = useState(true);
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
        toast.error("Thông tin tài khoản không chính xác!");
      });
  };

  const handleClickShowPassword = () => {
    setTypePassword(!typePassword);
  };

  return (
    <>
      <Css />
      <main className="main_auth">
        <section className="row">
          <div className="col-md-6">
            <img
              src="/assets/img/bg-auth.png"
              alt="Background Image"
              className="image_bg"
            />
          </div>
          <div className="login_content d-flex align-items-center justify-content-start col-md-6">
            <div className="login_form_">
              <FormProviderJs
                handleSubmit={handleSubmit(onSubmitForm)}
                methods={methods}
              >
                <div className="login_title_">Sign in</div>
                <div className="form_group_">
                  <InputField
                    register={register}
                    name="emailOrPhone"
                    label="User name or email address"
                    errors={errors.emailOrPhone}
                  />
                </div>
                <div className="form_group_" style={{ marginTop: "20px" }}>
                  <InputField
                    register={register}
                    name="password"
                    label="Password"
                    type={typePassword ? "password" : "text"}
                    errors={errors.emailOrPhone}
                    endIcon={<EyeClose />}
                    inputPassowrd
                    clickEndIcon={handleClickShowPassword}
                  />
                </div>
                <p className="d-flex align-items-center justify-content-end">
                  <a href="#" className="forgot_password">
                    Forget your password
                  </a>
                </p>
                <ButtonJs type="submit" title="Sign in" />
                <div className="col-12">
                  <p className="dont_account_ mb-0">
                    Don’t have an acount? <a href="#">Sign up</a>
                  </p>
                </div>
              </FormProviderJs>
            </div>
          </div>
        </section>
      </main>
      <Script />
      <LoadingSpinner open={isSubmitting} />
    </>
  );
}

export default Login;

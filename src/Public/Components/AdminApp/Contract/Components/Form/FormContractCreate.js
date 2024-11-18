import React, { useEffect, useState } from "react";
import Header from "../../../../Shared/Admin/Header/Header";
import Sidebar from "../../../../Shared/Admin/Sidebar/Sidebar";
import CardJs from "../../../../../Utils/Card";
import { Box, Button, Grid, Typography } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../../../../Utils/InputField";
import ButtonJs from "../../../../../Utils/Button";
import FormProviderJs from "../../../../../Utils/FormProvider";
import SelectJs from "../../../../../Utils/Select";
import DatePickerJs from "../../../../../Utils/DatePicker";
import documentTemplateService from "../../../../Service/DocumentTemplateService";
import bookingService from "../../../../Service/BookingService";
import customerService from "../../../../Service/CustomerService";
import paymentProcessService from "../../../../Service/PaymentProcessService";
import promotionDetailService from "../../../../Service/PromotionDetailService";
import contractService from "../../../../Service/ContractService";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

function FormContractCreate() {
  const [documentTemplateData, setDocumentTemplateData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [paymentProcessData, setPaymentProcessData] = useState([]);
  const [promotionDetailData, setPromotionDetailData] = useState([]);
  const [fileName, setFileName] = useState("");

  const SchemaCreate = yup.object({
    contractCode: yup.string().required("Vui lòng nhập thông tin"),
    expiredTime: yup.string().required("Vui lòng nhập thông tin"),
    customerID: yup.string().required("Vui lòng nhập thông tin"),
    contractType: yup.string().required("Vui lòng nhập thông tin"),
    totalPrice: yup.string().required("Vui lòng nhập thông tin"),
    documentTemplateID: yup.string().required("Vui lòng nhập thông tin"),
    promotionDetailID: yup.string().required("Vui lòng nhập thông tin"),
    paymentProcessID: yup.string().required("Vui lòng nhập thông tin"),
    bookingID: yup.string().required("Vui lòng nhập thông tin"),
    description: yup.string().required("Vui lòng nhập thông tin"),
  });
  const defaultValues = {
    contractCode: "",
    expiredTime: "",
    customerID: "",
    contractType: "",
    totalPrice: "",
    documentTemplateID: "",
    promotionDetailID: "",
    paymentProcessID: "",
    bookingID: "",
    description: "",
  };

  const methods = useForm({
    resolver: yupResolver(SchemaCreate),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting, errors },
  } = methods;

  const getListBooking = async () => {
    await bookingService
      .getList()
      .then((res) => {
        const data = res.data.map((item) => {
          return {
            id: item.bookingID,
            label: item.projectName,
            value: item.bookingID,
          };
        });
        setBookingData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    await customerService
      .getList()
      .then((res) => {
        console.log(res.data);
        const data = res.data.map((item) => {
          return {
            id: item.customerID,
            label: item.fullName,
            value: item.customerID,
          };
        });
        setCustomerData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    await paymentProcessService
      .getList()
      .then((res) => {
        const data = res.data.map((item) => {
          return {
            id: item.paymentProcessID,
            label: item.paymentProcessName,
            value: item.paymentProcessID,
          };
        });
        setPaymentProcessData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    await promotionDetailService
      .getList()
      .then((res) => {
        const data = res.data.map((item) => {
          return {
            id: item.promotionDetaiID,
            label: item.promotionName,
            value: item.promotionDetaiID,
          };
        });
        setPromotionDetailData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    await documentTemplateService
      .getList()
      .then((res) => {
        const data = res.data.map((item) => {
          return {
            id: item.documentTemplateID,
            label: item.documentName,
            value: item.documentTemplateID,
          };
        });
        setDocumentTemplateData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListBooking();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const onSubmitForm = async (values) => {
    const data = {
      contractCode: values.contractCode,
      contractType: values.contractType,
      expiredTime: values.expiredTime,
      totalPrice: values.totalPrice,
      description: values.description,
      contractDepositFile: fileName,
      documentTemplateID: values.documentTemplateID,
      bookingID: values.bookingID,
      customerID: values.customerID,
      paymentProcessID: values.paymentProcessID,
      promotionDetailID: values.promotionDetailID,
    };

    await contractService
      .create(data)
      .then(() => {
        toast.success("Thêm mới hợp đồng thành công!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Thêm mới hợp đồng thất bại!");
      });
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <Box
        sx={{
          marginLeft: "20rem",
          marginTop: "10rem",
          width: "95rem",
        }}
      >
        <FormProviderJs
          methods={methods}
          handleSubmit={handleSubmit(onSubmitForm)}
        >
          <CardJs>
            <Typography variant="h6">Tạo mới hợp đồng</Typography>
            <Grid container item xs={12} spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={3}>
                <InputField
                  register={register}
                  name="contractCode"
                  label="Mã hợp đồng"
                  errors={errors.contractCode}
                />
              </Grid>
              <Grid item xs={3}>
                <InputField
                  register={register}
                  name="contractType"
                  label="Loại hợp đồng"
                  errors={errors.contractType}
                />
              </Grid>
              <Grid item xs={3}>
                <InputField
                  register={register}
                  name="totalPrice"
                  label="Giá"
                  errors={errors.totalPrice}
                />
              </Grid>
              <Grid item xs={3}>
                <SelectJs
                  control={control}
                  arrayValue={documentTemplateData}
                  name="documentTemplateID"
                  label="Mẫu tài liệu"
                  errors={errors.documentTemplateID}
                />
              </Grid>
              <Grid item xs={3}>
                <SelectJs
                  control={control}
                  arrayValue={paymentProcessData}
                  register={register}
                  name="paymentProcessID"
                  label="Quy trình thanh toán"
                  errors={errors.paymentProcessID}
                />
              </Grid>
              <Grid item xs={3}>
                <SelectJs
                  control={control}
                  arrayValue={bookingData}
                  register={register}
                  name="bookingID"
                  label="Đặt chỗ"
                  errors={errors.bookingID}
                />
              </Grid>
              <Grid item xs={3}>
                <SelectJs
                  control={control}
                  arrayValue={customerData}
                  register={register}
                  name="customerID"
                  label="khách hàng"
                  errors={errors.customerID}
                />
              </Grid>
              <Grid item xs={3}>
                <SelectJs
                  control={control}
                  arrayValue={promotionDetailData}
                  register={register}
                  name="promotionDetailID"
                  label="khuyến mãi"
                  errors={errors.promotionDetailID}
                />
              </Grid>

              <Grid item xs={3}>
                <DatePickerJs
                  register={register}
                  errors={errors.expiredTime}
                  name="expiredTime"
                  label="Thời gian hết hạn"
                />
              </Grid>
              <Grid item xs={3}>
                <input
                  accept="image/*"
                  id="file-upload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                  <Button variant="contained" color="primary" component="span">
                    Upload File
                  </Button>
                </label>
                {fileName && (
                  <Typography variant="body1" color="text.secondary">
                    Selected File: {fileName}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <InputField
                  multiline
                  rows={5}
                  register={register}
                  name="description"
                  label="Mô tả"
                  errors={errors.description}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
              <ButtonJs
                title="submit"
                type="submit"
                disabled={isSubmitting}
                icon={
                  <CircularProgress
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "white",
                    }}
                  />
                }
                leftIcon={isSubmitting}
              />
            </Box>
          </CardJs>
        </FormProviderJs>
      </Box>
    </div>
  );
}

export default FormContractCreate;

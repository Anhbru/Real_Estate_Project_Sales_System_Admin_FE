import React, { useEffect, useState } from "react";
import Header from "../../../../Shared/Admin/Header/Header";
import Sidebar from "../../../../Shared/Admin/Sidebar/Sidebar";
import CardJs from "../../../../../Utils/Card";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
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
import { useNavigate } from "react-router-dom";

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
    promotionDetailID: yup.string().notRequired("Vui lòng nhập thông tin"),
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
    try {
      const fetchAndSetData = async (service, mapper, setter) => {
        const res = await service();
        const data = res.data.map(mapper);
        setter(data);
      };

      await Promise.all([
        fetchAndSetData(
          bookingService.getList,
          (item) => ({
            id: item.bookingID,
            label: item.projectName,
            value: item.bookingID,
          }),
          setBookingData
        ),
        fetchAndSetData(
          customerService.getList,
          (item) => ({
            id: item.customerID,
            label: item.fullName,
            value: item.customerID,
          }),
          setCustomerData
        ),
        fetchAndSetData(
          paymentProcessService.getList,
          (item) => ({
            id: item.paymentProcessID,
            label: item.paymentProcessName,
            value: item.paymentProcessID,
          }),
          setPaymentProcessData
        ),
        fetchAndSetData(
          promotionDetailService.getList,
          (item) => ({
            id: item.promotionDetaiID,
            label: item.promotionName,
            value: item.promotionDetaiID,
          }),
          setPromotionDetailData
        ),
        fetchAndSetData(
          documentTemplateService.getList,
          (item) => ({
            id: item.documentTemplateID,
            label: item.documentName,
            value: item.documentTemplateID,
          }),
          setDocumentTemplateData
        ),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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

  const navigate = useNavigate();

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
      createdTime: new Date(),
    };

    await contractService
      .create(data)
      .then(() => {
        navigate("/contract");
        toast.success("Thêm mới hợp đồng thành công!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Thêm mới hợp đồng thất bại!");
      });
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Container
        maxWidth="xl"
        sx={{
          marginLeft: {
            lg: "20rem",
          },
          marginTop: {
            xs: "5rem",
            sm: "7rem",
            md: "8rem",
            lg: "10rem",
          },
        }}
      >
        <FormProviderJs
          methods={methods}
          handleSubmit={handleSubmit(onSubmitForm)}
        >
          <CardJs>
            <Typography variant="h6">Add new contract</Typography>
            <Grid container item xs={12} spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={3}>
                <InputField
                  register={register}
                  name="contractCode"
                  label="Contract Code"
                  errors={errors.contractCode}
                />
              </Grid>
              <Grid item xs={3}>
                <InputField
                  register={register}
                  name="contractType"
                  label="Contract Type"
                  errors={errors.contractType}
                />
              </Grid>
              <Grid item xs={3}>
                <InputField
                  register={register}
                  name="totalPrice"
                  label="Total Price"
                  type="number"
                  errors={errors.totalPrice}
                />
              </Grid>
              <Grid item xs={3}>
                <SelectJs
                  control={control}
                  arrayValue={documentTemplateData}
                  name="documentTemplateID"
                  label="Document Template"
                  errors={errors.documentTemplateID}
                />
              </Grid>
              <Grid item xs={3}>
                <SelectJs
                  control={control}
                  arrayValue={paymentProcessData}
                  register={register}
                  name="paymentProcessID"
                  label="Payment Process"
                  errors={errors.paymentProcessID}
                />
              </Grid>
              <Grid item xs={3}>
                <SelectJs
                  control={control}
                  arrayValue={bookingData}
                  register={register}
                  name="bookingID"
                  label="Booking"
                  errors={errors.bookingID}
                />
              </Grid>
              <Grid item xs={3}>
                <SelectJs
                  control={control}
                  arrayValue={customerData}
                  register={register}
                  name="customerID"
                  label="Customer"
                  errors={errors.customerID}
                />
              </Grid>
              <Grid item xs={3}>
                <SelectJs
                  control={control}
                  arrayValue={promotionDetailData}
                  register={register}
                  name="promotionDetailID"
                  label="Promotion Detail"
                  errors={errors.promotionDetailID}
                />
              </Grid>

              <Grid item xs={3}>
                <DatePickerJs
                  register={register}
                  errors={errors.expiredTime}
                  name="expiredTime"
                  label="Expired Time"
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
                  label="Description"
                  errors={errors.description}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 4,
                gap: 2,
              }}
            >
              <ButtonJs
                title="Back"
                type="button"
                variant="outlined"
                color="default"
                onClick={() => navigate("/contract")}
              />
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
      </Container>
    </>
  );
}

export default FormContractCreate;

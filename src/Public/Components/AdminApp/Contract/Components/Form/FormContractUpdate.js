import React, { useEffect, useState } from "react";
import Header from "../../../../Shared/Admin/Header/Header";
import Sidebar from "../../../../Shared/Admin/Sidebar/Sidebar";
import CardJs from "../../../../../Utils/Card";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
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
import { useNavigate, useParams } from "react-router-dom";

export default function FormContractUpdate() {
  const [documentTemplateData, setDocumentTemplateData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [paymentProcessData, setPaymentProcessData] = useState([]);
  const [promotionDetailData, setPromotionDetailData] = useState([]);
  const [fileName, setFileName] = useState("");
  const { id } = useParams();

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
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const [loading, setLoading] = useState(false);

  const getListBooking = async () => {
    try {
      setLoading(true);
      const apiCalls = [
        {
          service: bookingService.getList,
          handler: (res) =>
            res.data.map((item) => ({
              id: item.bookingID,
              label: item.projectName,
              value: item.bookingID,
            })),
          setter: setBookingData,
        },
        {
          service: customerService.getList,
          handler: (res) =>
            res.data.map((item) => ({
              id: item.customerID,
              label: item.fullName,
              value: item.customerID,
            })),
          setter: setCustomerData,
        },
        {
          service: paymentProcessService.getList,
          handler: (res) =>
            res.data.map((item) => ({
              id: item.paymentProcessID,
              label: item.paymentProcessName,
              value: item.paymentProcessID,
            })),
          setter: setPaymentProcessData,
        },
        {
          service: promotionDetailService.getList,
          handler: (res) =>
            res.data.map((item) => ({
              id: item.promotionDetailID,
              label: item.promotionName,
              value: item.promotionDetailID,
            })),
          setter: setPromotionDetailData,
        },
        {
          service: documentTemplateService.getList,
          handler: (res) =>
            res.data.map((item) => ({
              id: item.documentTemplateID,
              label: item.documentName,
              value: item.documentTemplateID,
            })),
          setter: setDocumentTemplateData,
        },
      ];

      const results = await Promise.all(
        apiCalls.map((api) =>
          api
            .service()
            .then((res) => ({ data: api.handler(res), setter: api.setter }))
        )
      );

      results.forEach(({ data, setter }) => setter(data));

      const contractDetail = await contractService.getDetail(id);
      reset(contractDetail.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
      // promotionDetailID: values.promotionDetailID,
      updatedTime: new Date(),
    };

    await contractService
      .update(data, id)
      .then(() => {
        toast.success("Cập nhật hợp đồng thành công!");
        navigate("/contract");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Cập nhật hợp đồng thất bại!");
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
            <Typography variant="h6">
              {loading ? (
                <Skeleton width="10%" sx={{ borderRadius: "8px" }} />
              ) : (
                "Cập nhật hợp đồng"
              )}
            </Typography>
            <Grid container item xs={12} spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={3}>
                {loading ? (
                  <Skeleton
                    width="100%"
                    variant="rectangular"
                    height={56}
                    sx={{
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <InputField
                    register={register}
                    name="contractCode"
                    label="Mã hợp đồng"
                    errors={errors.contractCode}
                  />
                )}
              </Grid>
              <Grid item xs={3}>
                {loading ? (
                  <Skeleton
                    width="100%"
                    variant="rectangular"
                    height={56}
                    sx={{
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <InputField
                    register={register}
                    name="contractType"
                    label="Loại hợp đồng"
                    errors={errors.contractType}
                  />
                )}
              </Grid>
              <Grid item xs={3}>
                {loading ? (
                  <Skeleton
                    width="100%"
                    variant="rectangular"
                    height={56}
                    sx={{
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <InputField
                    register={register}
                    name="totalPrice"
                    label="Giá"
                    errors={errors.totalPrice}
                  />
                )}
              </Grid>
              <Grid item xs={3}>
                {loading ? (
                  <Skeleton
                    width="100%"
                    variant="rectangular"
                    height={56}
                    sx={{
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <SelectJs
                    control={control}
                    arrayValue={documentTemplateData}
                    name="documentTemplateID"
                    label="Mẫu tài liệu"
                    errors={errors.documentTemplateID}
                  />
                )}
              </Grid>
              <Grid item xs={3}>
                {loading ? (
                  <Skeleton
                    width="100%"
                    variant="rectangular"
                    height={56}
                    sx={{
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <SelectJs
                    control={control}
                    arrayValue={paymentProcessData}
                    register={register}
                    name="paymentProcessID"
                    label="Quy trình thanh toán"
                    errors={errors.paymentProcessID}
                  />
                )}
              </Grid>
              <Grid item xs={3}>
                {loading ? (
                  <Skeleton
                    width="100%"
                    variant="rectangular"
                    height={56}
                    sx={{
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <SelectJs
                    control={control}
                    arrayValue={bookingData}
                    register={register}
                    name="bookingID"
                    label="Đặt chỗ"
                    errors={errors.bookingID}
                  />
                )}
              </Grid>
              <Grid item xs={3}>
                {loading ? (
                  <Skeleton
                    width="100%"
                    variant="rectangular"
                    height={56}
                    sx={{
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <SelectJs
                    control={control}
                    arrayValue={customerData}
                    register={register}
                    name="customerID"
                    label="khách hàng"
                    errors={errors.customerID}
                  />
                )}
              </Grid>
              <Grid item xs={3}>
                {loading ? (
                  <Skeleton
                    width="100%"
                    variant="rectangular"
                    height={56}
                    sx={{
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <SelectJs
                    control={control}
                    arrayValue={promotionDetailData}
                    register={register}
                    name="promotionDetailID"
                    label="khuyến mãi"
                    errors={errors.promotionDetailID}
                  />
                )}
              </Grid>

              <Grid item xs={3}>
                {loading ? (
                  <Skeleton
                    width="100%"
                    variant="rectangular"
                    height={56}
                    sx={{
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <DatePickerJs
                    register={register}
                    errors={errors.expiredTime}
                    name="expiredTime"
                    label="Thời gian hết hạn"
                  />
                )}
              </Grid>
              <Grid item xs={3}>
                {loading ? (
                  <Skeleton
                    width="100%"
                    variant="rectangular"
                    height={56}
                    sx={{
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <InputField
                    register={register}
                    name="file"
                    label="File"
                    errors={errors.file}
                    type="file"
                    onChange={handleFileChange}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                {loading ? (
                  <Skeleton
                    width="100%"
                    variant="rectangular"
                    height={150}
                    sx={{
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <InputField
                    multiline
                    rows={5}
                    register={register}
                    name="description"
                    label="Mô tả"
                    errors={errors.description}
                  />
                )}
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
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  sx={{ borderRadius: "8px" }}
                  width={100}
                  height={40}
                />
              ) : (
                <ButtonJs
                  title="Cancel"
                  variant="outlined"
                  type="button"
                  onClick={() => navigate("/contract")}
                />
              )}

              {loading ? (
                <Skeleton
                  variant="rectangular"
                  sx={{ borderRadius: "8px" }}
                  width={100}
                  height={40}
                />
              ) : (
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
              )}
            </Box>
          </CardJs>
        </FormProviderJs>
      </Box>
    </div>
  );
}

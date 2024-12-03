import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../Utils/InputField";
import {
  Box,
  CircularProgress,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import CardJs from "../../../../Utils/Card";
import FormProviderJs from "../../../../Utils/FormProvider";
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import ButtonJs from "../../../../Utils/Button";
import SelectJs from "../../../../Utils/Select";
import customerService from "../../../Service/CustomerService";
import projectCategoryDetailService from "../../../Service/ProjectCategoryDetailService";
import openSaleService from "../../../Service/OpenForSaleService";
import documentTemplateService from "../../../Service/DocumentTemplateService";
import staffService from "../../../Service/StaffService";
import bookingService from "../../../Service/BookingService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function FormUpdateBookings() {
  const { id } = useParams();
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const SchemaUpdate = yup.object({
    status: yup.string().required("Vui lòng nhập thông tin"),
    documentTemplateID: yup.string().required("Vui lòng chọn thông tin"),
    staffId: yup.string().notRequired("Vui lòng chọn thông tin"),
    openingForSaleID: yup.string().required("Vui lòng chọn thông tin"),
    customerID: yup.string().required("Vui lòng chọn thông tin"),
    projectCategoryDetailID: yup.string().required("Vui lòng chọn thông tin"),
    note: yup.string().notRequired("Vui lòng chọn thông tin"),
  });

  const defaultValues = {
    status: "",
    documentTemplateID: "",
    staffId: "",
    openingForSaleID: "",
    customerID: "",
    projectCategoryDetailID: "",
    note: "",
    bookingFile: "",
  };

  const methods = useForm({
    resolver: yupResolver(SchemaUpdate),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmitForm = async (values) => {
    const data = {
      BookingFile: fileName,
      Note: values.note,
      Status: values.status,
      CustomerID: values.customerID,
      StaffID: values.staffID,
      OpeningForSaleID: values.openingForSaleID,
      ProjectCategoryDetailID: values.projectCategoryDetailID,
      DocumentTemplateID: values.documentTemplateID,
    };
    await bookingService
      .update(data, id)
      .then(() => {
        toast.success("Cập nhật thành công!");
        navigate("/bookings");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Cập nhật thất bại!");
      });
  };

  const [customerData, setCustomerData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [openingForSaleData, setOpeningForSaleData] = useState([]);
  const [projectCategoryDetailData, setProjectCategoryDetailData] = useState(
    []
  );
  const [documentTemplateData, setDocumentTemplateData] = useState([]);

  const getListSelect = async () => {
    try {
      setLoading(true);
      const [
        customerResponse,
        projectCategoryResponse,
        openSaleResponse,
        documentTemplateResponse,
        staffResponse,
        bookingsData,
      ] = await Promise.all([
        customerService.adminListCustomer(),
        projectCategoryDetailService.getList(),
        openSaleService.adminListOpenSales(),
        documentTemplateService.getList(),
        staffService.getList(),
        bookingService.detail(id),
      ]);

      const mapData = (data, idKey, labelKey) =>
        data.map((item) => ({
          id: item[idKey],
          value: item[idKey],
          label: item[labelKey],
        }));

      setCustomerData(mapData(customerResponse.data, "customerID", "fullName"));
      setProjectCategoryDetailData(
        mapData(
          projectCategoryResponse.data,
          "projectCategoryDetailID",
          "projectName"
        )
      );
      setOpeningForSaleData(
        mapData(openSaleResponse.data, "openingForSaleID", "decisionName")
      );
      setDocumentTemplateData(
        mapData(
          documentTemplateResponse.data,
          "documentTemplateID",
          "documentName"
        )
      );
      setStaffData(mapData(staffResponse.data, "staffID", "name"));
      reset(bookingsData.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getListSelect();
  }, []);

  const arrayStatus = [
    {
      id: 1,
      label: "Chưa thanh toán tiền giữ chỗ",
      value: "Chưa thanh toán tiền giữ chỗ",
    },
    {
      id: 2,
      label: "Đã đặt chỗ",
      value: "Đã đặt chỗ",
    },
    {
      id: 3,
      label: "Đã check in",
      value: "Đã check in",
    },
    {
      id: 4,
      label: "Đã chọn sản phẩm",
      value: "Đã chọn sản phẩm",
    },
    {
      id: 5,
      label: "Đa ký thỏa thuận đặt cọc",
      value: "Đa ký thỏa thuận đặt cọc",
    },
    {
      id: 6,
      label: "Đã hủy",
      value: "Đã hủy",
    },
  ];

  return (
    <>
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
                "Cập nhật bookings"
              )}
            </Typography>
            <Grid container item xs={12} spacing={2} sx={{ mt: 2 }}>
              {/* Trạng thái */}
              <Grid item xs={3}>
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    sx={{ borderRadius: "8px" }}
                    height={56}
                  />
                ) : (
                  // <InputField
                  //   register={register}
                  //   name="status"
                  //   label="Trạng thái"
                  //   errors={errors.status}
                  // />
                  <SelectJs
                    control={control}
                    arrayValue={arrayStatus}
                    name="status"
                    label="Trạng thái"
                    errors={errors.status}
                  />
                )}
              </Grid>

              {/* Mẫu tài liệu */}
              <Grid item xs={3}>
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    sx={{ borderRadius: "8px" }}
                    height={56}
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

              {/* Nhân viên */}
              <Grid item xs={3}>
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    sx={{ borderRadius: "8px" }}
                    height={56}
                  />
                ) : (
                  <SelectJs
                    control={control}
                    arrayValue={staffData}
                    name="staffId"
                    label="Nhân viên"
                    errors={errors.staffId}
                  />
                )}
              </Grid>

              {/* Mở bán */}
              <Grid item xs={3}>
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    sx={{ borderRadius: "8px" }}
                    height={56}
                  />
                ) : (
                  <SelectJs
                    control={control}
                    arrayValue={openingForSaleData}
                    name="openingForSaleID"
                    label="Mở bán"
                    errors={errors.openingForSaleID}
                  />
                )}
              </Grid>

              {/* Khách hàng */}
              <Grid item xs={3}>
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    sx={{ borderRadius: "8px" }}
                    height={56}
                  />
                ) : (
                  <SelectJs
                    control={control}
                    arrayValue={customerData}
                    name="customerID"
                    label="khách hàng"
                    errors={errors.customerID}
                  />
                )}
              </Grid>
              {/* Danh mục dự án */}
              <Grid item xs={3}>
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    sx={{ borderRadius: "8px" }}
                    height={56}
                  />
                ) : (
                  <SelectJs
                    control={control}
                    arrayValue={projectCategoryDetailData}
                    name="projectCategoryDetailID"
                    label="Danh mục dự án"
                    errors={errors.projectCategoryDetailID}
                  />
                )}
              </Grid>

              {/* File */}
              <Grid item xs={3}>
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    sx={{ borderRadius: "8px" }}
                    height={56}
                  />
                ) : (
                  <InputField
                    onChange={handleFileChange}
                    register={register}
                    name="bookingFile"
                    type="file"
                    label="File"
                    errors={errors.bookingFile}
                  />
                )}
              </Grid>

              {/* Ghi chú */}
              <Grid item xs={12}>
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    sx={{ borderRadius: "8px" }}
                    height={180}
                  />
                ) : (
                  <InputField
                    multiline
                    rows={5}
                    register={register}
                    name="note"
                    label="Ghi chú"
                    errors={errors.note}
                  />
                )}
              </Grid>
            </Grid>
            {/* Buttons */}
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
                  width={120}
                  height={40}
                />
              ) : (
                <ButtonJs
                  title="Cancel"
                  type="button"
                  variant="outlined"
                  color="default"
                  onClick={() => navigate("/bookings")}
                />
              )}
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  sx={{ borderRadius: "8px" }}
                  width={120}
                  height={40}
                />
              ) : (
                <ButtonJs
                  title="submit"
                  type="submit"
                  disabled={isSubmitting}
                  icon={
                    isSubmitting && (
                      <CircularProgress
                        style={{
                          width: "20px",
                          height: "20px",
                          color: "white",
                        }}
                      />
                    )
                  }
                  leftIcon={isSubmitting}
                />
              )}
            </Box>
          </CardJs>
        </FormProviderJs>
      </Box>
    </>
  );
}

export default FormUpdateBookings;

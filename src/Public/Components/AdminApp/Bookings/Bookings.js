import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ButtonJs from "../../../Utils/Button";
import AddIcon from "@mui/icons-material/Add";
import BookingsTable from "./Table/BookingsTable";
import Header from "../../Shared/Admin/Header/Header";
import Sidebar from "../../Shared/Admin/Sidebar/Sidebar";
import DialogJs from "../../../Utils/Dialog";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import customerService from "../../Service/CustomerService";
import SelectJs from "../../../Utils/Select";
import projectCategoryDetailService from "../../Service/ProjectCategoryDetailService";
import bookingService from "../../Service/BookingService";
import { toast } from "react-toastify";

function Bookings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [projectCategoryDetailData, setProjectCategoryDetailData] = useState(
    []
  );

  const SchemaCreate = yup.object({
    categoryDetailId: yup.string().required("Vui lòng chọn thông tin"),
    customerId: yup.string().required("Vui lòng chọn thông tin"),
  });
  const defaultValues = {
    categoryDetailId: "",
    customerId: "",
  };

  const methods = useForm({
    resolver: yupResolver(SchemaCreate),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmitForm = async (values) => {
    const data = {
      categoryDetailId: values.categoryDetailId,
      customerId: values.customerId,
    };

    await bookingService
      .create(data)
      .then(() => {
        toast.success("Tạo mới thành công!");
        setOpenDialog(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        setOpenDialog(false);
      });
  };

  const getListBooking = async () => {
    setLoading(true);
    await bookingService
      .getList()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListCustomer = async () => {
    await customerService
      .getList()
      .then((res) => {
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

    await projectCategoryDetailService
      .getList()
      .then((res) => {
        const data = res.data.map((item) => {
          return {
            id: item.projectCategoryDetailID,
            label: item.projectName,
            value: item.projectCategoryDetailID,
          };
        });
        setProjectCategoryDetailData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListCustomer();
    getListBooking();
  }, []);

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
          <Typography variant="h5">Bookings</Typography>
        </Box>
        <ButtonJs
          title="Create"
          leftIcon
          icon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
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
        <BookingsTable
          data={data}
          loading={loading}
          getListBooking={getListBooking}
        />
      </Box>

      <DialogJs
        onSubmit={handleSubmit(onSubmitForm)}
        open={openDialog}
        dialogSubmit
        maxWidth="sm"
        title="Tạo mới đặt chỗ"
        footerAction
        submitButton
        closeButton
        fullWidth
        closeText="close"
        submitText="submit"
        onClose={() => setOpenDialog(false)}
        loading={isSubmitting}
      >
        <Grid container spacing={2} sx={{ marginTop: "1px" }}>
          <Grid item xs={12}>
            <SelectJs
              arrayValue={customerData}
              name="customerId"
              control={control}
              label="Khách hàng"
              errors={errors.customerId}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectJs
              arrayValue={projectCategoryDetailData}
              name="categoryDetailId"
              control={control}
              label="Dự án"
              errors={errors.categoryDetailId}
            />
          </Grid>
        </Grid>
      </DialogJs>
    </>
  );
}

export default Bookings;

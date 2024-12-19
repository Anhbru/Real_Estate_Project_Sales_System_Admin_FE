import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHeader from "./TableHeader";
import { Box, Chip, Grid, Skeleton, Typography } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonJs from "../../../../../Utils/Button";
import { useLocation, useNavigate } from "react-router-dom";
import DialogJs from "../../../../../Utils/Dialog";
import SelectJs from "../../../../../Utils/Select";
import { useForm } from "react-hook-form";
import projectCategoryDetailService from "../../../../Service/ProjectCategoryDetailService";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ProjectCategoryTable({
  data,
  getListProjectDataTable,
  dataProject,
  dataProperty,
  loading,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const navigate = useNavigate();

  const handleClickEdit = (rowId) => {
    navigate(`?id=${rowId}`);
    setOpenDialog(true);
  };

  const SchemaCreate = yup.object({
    projectID: yup.string().required("Vui lòng chọn dự án"),
    propertyCategoryID: yup.string().required("Vui lòng chọn danh mục"),
  });

  const defaultValues = {
    projectID: "",
    propertyCategoryID: "",
  };

  const methods = useForm({
    resolver: yupResolver(SchemaCreate),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const getDetail = async () => {
    await projectCategoryDetailService
      .getDetail(id)
      .then((res) => {
        setValue("projectID", res.data.projectID);
        setValue("propertyCategoryID", res.data.propertyCategoryID);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id, location]);

  const onSubmitForm = async (values) => {
    const dataUpdate = {
      projectID: values.projectID,
      propertyCategoryID: values.propertyCategoryID,
    };
    await projectCategoryDetailService
      .update(dataUpdate, id)
      .then(() => {
        setOpenDialog(false);
        getListProjectDataTable();
        toast.success("Cập nhật thành công!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Cập nhật thất bại!");
      });
  };

  const handleClickDelete = (rowId) => {
    navigate(`?id=${rowId}`);
    setOpenDialogConfirm(true);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you want to delete?')){
      return;
    }

    setIsLoading(true);
    await projectCategoryDetailService
      .delete(id)
      .then(() => {
        getListProjectDataTable();
        toast.success("Xóa bản ghi thành công!");
        setIsLoading(false);
        setOpenDialogConfirm(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        setIsLoading(false);
        setOpenDialogConfirm(false);
      });
  };

  return (
    <>
      <Paper
        sx={{
          mb: 2,
          width: "100rem",
          marginLeft: "15rem",
          borderRadius: "16px",
          backgroundColor: "rgb(255, 255, 255)",
          color: "rgb(33, 43, 54)",
          boxShadow:
            "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        }}
      >
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHeader />
            <TableBody>
              {loading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton width="100%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton width="100%" height="30px" />
                      </TableCell>
                      <TableCell>
                        <Skeleton width="100%" height="30px" />
                      </TableCell>
                      <TableCell>
                        <Skeleton width="100%" height="30px" />
                      </TableCell>
                      <TableCell sx={{ display: "flex", gap: 2 }}>
                        <Skeleton width="100%" height="50px" />
                        <Skeleton width="100%" height="50px" />
                      </TableCell>
                    </TableRow>
                  ))
                : data.map((row, index) => (
                    <TableRow
                      key={row.projectCategoryDetailID}
                      sx={{
                        ":hover": {
                          backgroundColor: "#f1f5f9",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{row.projectName}</TableCell>
                      <TableCell align="left">
                        {row.propertyCategoryName}
                      </TableCell>
                      <TableCell align="left">
                        <Chip label={row.openForSale} />
                      </TableCell>
                      <TableCell align="left">
                        <Grid container spacing={2}>
                          <Grid item>
                            <ButtonJs
                              title="edit"
                              type="button"
                              leftIcon
                              icon={<EditIcon />}
                              onClick={() =>
                                handleClickEdit(row.projectCategoryDetailID)
                              }
                            />
                          </Grid>
                          <Grid item>
                            <ButtonJs
                              title="delete"
                              color="ERROR"
                              leftIcon
                              icon={<DeleteIcon />}
                              onClick={() =>
                                handleClickDelete(row.projectCategoryDetailID)
                              }
                            />
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <DialogJs
        dialogSubmit
        onSubmit={handleSubmit(onSubmitForm)}
        open={openDialog}
        title="Cập nhật chi tiết hạng mục dự án"
        footerAction
        submitButton
        closeButton
        content="dsadsa"
        closeText="close"
        submitText="submit"
        maxWidth="sm"
        fullWidth
        loading={isSubmitting}
        onClose={() => setOpenDialog(false)}
      >
        <Box sx={{ mt: 2 }}>
          <SelectJs
            control={control}
            errors={errors.projectID}
            label="Dự án"
            arrayValue={dataProject}
            name="projectID"
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <SelectJs
            control={control}
            errors={errors.propertyCategoryID}
            label="Danh mục tài sản"
            arrayValue={dataProperty}
            name="propertyCategoryID"
          />
        </Box>
      </DialogJs>
      <DialogJs
        title="Delete"
        open={openDialogConfirm}
        fullWidth
        maxWidth="xs"
        footerAction
        closeButton
        closeText="Close"
        submitButton
        submitText="Delete"
        loading={isLoading}
        onClose={() => setOpenDialogConfirm(false)}
        color="ERROR"
        onClickSubmit={handleDelete}
      >
        <Typography variant="subtitle1">
          Bạn có chắc chắn muốn xóa bản ghi này không?
        </Typography>
      </DialogJs>
    </>
  );
}

export default ProjectCategoryTable;

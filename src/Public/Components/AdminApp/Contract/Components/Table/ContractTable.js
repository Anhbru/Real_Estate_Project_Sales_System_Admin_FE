import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip, Grid, Skeleton, Typography } from "@mui/material";
import ButtonJs from "../../../../../Utils/Button";
import ContractTableHeader from "./ContractTableHeader";
import contractService from "../../../../Service/ContractService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingSpinner from "../../../../../Utils/LoadingSpinner";
import { useLocation, useNavigate } from "react-router-dom";
import DialogJs from "../../../../../Utils/Dialog";
import { toast } from "react-toastify";

export default function ContractTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const getListData = async () => {
    setLoading(true);
    await contractService
      .getList()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListData();
  }, []);

  const navigate = useNavigate();
  const handleClickEdit = (id) => {
    navigate(`edit/${id}`);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenDialog = (id) => {
    setOpenDialog(true);
    navigate(`?id=${id}`);
  };

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  const handleDelete = async () => {
    setIsLoading(true);
    await contractService
      .delete(id)
      .then(() => {
        setIsLoading(false);
        setOpenDialog(false);
        getListData();
        toast.success("Xóa bản ghi thành công!");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error("Xóa bản ghi thất bại!");
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
            <ContractTableHeader />
            <TableBody>
              {loading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton width="100%" height="30px" />
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
                      <TableCell>
                        <Skeleton width="100%" height="30px" />
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
                      <TableCell>
                        <Skeleton width="100%" height="30px" />
                      </TableCell>
                      <TableCell sx={{ display: "flex", gap: 2 }}>
                        <Skeleton width="120px" height="50px" />
                        <Skeleton width="120px" height="50px" />
                      </TableCell>
                    </TableRow>
                  ))
                : data.map((row, index) => (
                    <TableRow
                      key={row.contractID}
                      sx={{
                        ":hover": {
                          backgroundColor: "#f1f5f9",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{row.contractCode}</TableCell>
                      <TableCell align="left">{row.contractType}</TableCell>
                      <TableCell align="left">{row.fullName}</TableCell>
                      <TableCell align="left">{row.totalPrice}</TableCell>
                      <TableCell align="left">
                        {row.paymentProcessName || "---"}
                      </TableCell>
                      <TableCell align="left">{row.documentName}</TableCell>
                      <TableCell align="left">
                        <Chip label={row.status} />
                      </TableCell>
                      <TableCell align="left">{row.expiredTime}</TableCell>
                      <TableCell align="left">
                        <Grid container spacing={2}>
                          <Grid item>
                            <ButtonJs
                              title="edit"
                              type="button"
                              leftIcon
                              onClick={() => handleClickEdit(row.contractID)}
                              icon={<EditIcon />}
                            />
                          </Grid>
                          <Grid item>
                            <ButtonJs
                              title="delete"
                              type="button"
                              color="ERROR"
                              leftIcon
                              onClick={() => handleOpenDialog(row.contractID)}
                              icon={<DeleteIcon />}
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
        title="Xóa hợp đồng"
        fullWidth
        maxWidth="xs"
        onClickSubmit={handleDelete}
        loading={isLoading}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        footerAction
        closeButton
        closeText="Close"
        submitButton
        submitText="Delete"
        color="ERROR"
      >
        <Typography variant="subtitle1">
          Bạn có chắc chắn muốn xóa hợp đồng này không?
        </Typography>
      </DialogJs>
    </>
  );
}

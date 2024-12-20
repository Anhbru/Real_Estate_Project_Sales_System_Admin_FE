import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip, Grid, Skeleton, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatIcon from "@mui/icons-material/Chat";
import ButtonJs from "../../../../Utils/Button";
import BookingsTableHeader from "./BookingTableHeader";
import DialogJs from "../../../../Utils/Dialog";
import bookingService from "../../../Service/BookingService";
import notificationService from "../../../Service/NotificationService";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function BookingsTable({ data, loading, getListBooking }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openUpdateImageDialog, setOpenUpdateImageDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedBookingID, setSelectedBookingID] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const navigate = useNavigate();

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleOpenDialogConfirm = (id) => {
    setOpenDialogConfirm(true);
    navigate(`?id=${id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you want to delete?')){
      return;
    }

    setIsLoading(true);
    await bookingService
      .delete(id)
      .then(() => {
        toast.success("Xóa booking thành công!");
        setIsLoading(false);
        setOpenDialogConfirm(false);
        getListBooking();
      })
      .catch((err) => {
        toast.error("Xóa booking thất bại!");
        console.log(err);
        setIsLoading(false);
        setOpenDialogConfirm(false);
      });
  };

  const handleSendIos = async (id) => {
    let data = {};
    setIsLoading(true);
    await notificationService
      .sendIos(id, data)
      .then(() => {
        toast.success("Send notification ios success!");
        setIsLoading(false);
        getListBooking();
      })
      .catch((err) => {
        toast.error("Send notification ios fail!");
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleOpenUpdateImageDialog = (id) => {
    setSelectedBookingID(id);
    setOpenUpdateImageDialog(true);
  };

  const handleCloseUpdateImageDialog = () => {
    setSelectedBookingID(null);
    setOpenUpdateImageDialog(false);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setErrorMessage(""); // Reset error message when file is selected
  };

  const handleUploadImage = async () => {
    if (!selectedFile) {
      setErrorMessage("Vui lòng chọn một file ảnh!");
      return;
    }

    setIsLoading(true);

    try {
      await bookingService.uploadPaymentOrder(selectedBookingID, selectedFile);
      toast.success("Cập nhật ảnh thành công!");
      setIsLoading(false);
      setOpenUpdateImageDialog(false);
      getListBooking();
    } catch (error) {
      toast.error("Cập nhật ảnh thất bại!");
      console.log(error);
      setIsLoading(false);
    }
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
          <Table sx={{ minWidth: 850 }} aria-labelledby="tableTitle" size="medium">
            <BookingsTableHeader />
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
                      </TableRow>
                  ))
                : data.map((row, index) => {
                    return (
                      <TableRow
                        key={row.bookingID}
                        sx={{
                          ":hover": {
                            backgroundColor: "#f1f5f9",
                          },
                        }}
                      >
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">{row.customerName}</TableCell>
                        <TableCell align="left">{row.decisionName}</TableCell>
                        <TableCell align="left">{row.projectName}</TableCell>
                        <TableCell align="left">{row.documentName || "---"}</TableCell>
                        <TableCell align="left">{row.depositedPrice || "---"}</TableCell>
                        <TableCell align="left">{row.depositedTimed?.split(" ")[0] || "---"}</TableCell>
                        <TableCell align="left">
                          <Chip label={row.status} />
                        </TableCell>
                        <TableCell align="left">
                          <Grid container spacing={2}>
                            <Grid item>
                              <ButtonJs
                                title="edit"
                                type="button"
                                leftIcon
                                onClick={() => navigate(`/bookings/edit/${row.bookingID}`)}
                                icon={<EditIcon />}
                              />
                            </Grid>
                            <Grid item>
                              <ButtonJs
                                title="delete"
                                type="button"
                                color="ERROR"
                                leftIcon
                                onClick={() => handleOpenDialogConfirm(row.bookingID)}
                                icon={<DeleteIcon />}
                              />
                            </Grid>
                            <Grid item>
                              <ButtonJs
                                title="Send Notification"
                                type="button"
                                color="ERROR"
                                leftIcon
                                onClick={() => handleSendIos(row.bookingID)}
                                icon={<ChatIcon />}
                              />
                            </Grid>
                            {row.status === "Không chọn sản phẩm" && (
                              <Grid item>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleOpenUpdateImageDialog(row.bookingID)}
                                >
                                  Upload Image Refurn
                                </Button>
                              </Grid>
                            )}
                          </Grid>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
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
      <Dialog open={openUpdateImageDialog} onClose={handleCloseUpdateImageDialog}>
        <DialogTitle>Update Image</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Chọn ảnh để tải lên</Typography>
          <input type="file" onChange={handleFileChange} />
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateImageDialog} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleUploadImage} color="primary" disabled={isLoading}>
            {isLoading ? "Đang tải..." : "Tải lên"}
          </Button>
        </DialogActions>
      </Dialog>
      <DialogJs
        open={openDialogConfirm}
        setOpen={setOpenDialogConfirm}
        title="Xác nhận xóa"
        content="Bạn có chắc chắn muốn xóa?"
        onConfirm={handleDelete}
        loading={isLoading}
      />
    </>
  );
}

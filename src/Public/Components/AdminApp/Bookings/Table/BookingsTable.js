import React, {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Chip, Grid, Skeleton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatIcon from "@mui/icons-material/Chat";
import ButtonJs from "../../../../Utils/Button";
import BookingsTableHeader from "./BookingTableHeader";
import DialogJs from "../../../../Utils/Dialog";
import bookingService from "../../../Service/BookingService";
import notificationService from "../../../Service/NotificationService";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function BookingsTable({data, loading, getListBooking}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleOpenDialogConfirm = (id) => {
        setOpenDialogConfirm(true);
        navigate(`?id=${id}`);
    };

    const handleDelete = async () => {
        setIsLoading(true);
        await bookingService
            .delete(id)
            .then(() => {
                toast.success("Xóa bản ghi thành công!");
                setIsLoading(false);
                setOpenDialogConfirm(false);
                getListBooking();
            })
            .catch((err) => {
                toast.error("Xóa bản ghi thất bại!");
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
                        sx={{minWidth: 850}}
                        aria-labelledby="tableTitle"
                        size="medium"
                    >
                        <BookingsTableHeader/>
                        <TableBody>
                            {loading
                                ? Array.from({length: 10}).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Skeleton width="100%" height="30px"/>
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton width="100%" height="30px"/>
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton width="100%" height="30px"/>
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton width="100%" height="30px"/>
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton width="100%" height="30px"/>
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton width="100%" height="30px"/>
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton width="100%" height="30px"/>
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton width="100%" height="30px"/>
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton width="100%" height="100px"/>
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
                                            <TableCell align="left">
                                                {row.documentName || "---"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.depositedPrice || "---"}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.depositedTimed?.split(" ")[0] || "---"}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Chip label={row.status}/>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <ButtonJs
                                                            title="edit"
                                                            type="button"
                                                            leftIcon
                                                            onClick={() =>
                                                                navigate(`/bookings/edit/${row.bookingID}`)
                                                            }
                                                            icon={<EditIcon/>}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <ButtonJs
                                                            title="delete"
                                                            type="button"
                                                            color="ERROR"
                                                            leftIcon
                                                            onClick={() =>
                                                                handleOpenDialogConfirm(row.bookingID)
                                                            }
                                                            icon={<DeleteIcon/>}
                                                        />
                                                    </Grid>

                                                    <Grid item>
                                                        <ButtonJs
                                                            title="Send Notification"
                                                            type="button"
                                                            color="ERROR"
                                                            leftIcon
                                                            onClick={() =>
                                                                handleSendIos(row.bookingID)
                                                            }
                                                            icon={<ChatIcon/>}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}

                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6}/>
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
                open={openDialogConfirm}
                title="Xóa đặt chỗ"
                fullWidth
                maxWidth="xs"
                footerAction
                submitButton
                submitText="Delete"
                closeButton
                closeText="Close"
                onClickSubmit={handleDelete}
                color="ERROR"
                loading={isLoading}
                onClose={() => setOpenDialogConfirm(false)}
            >
                <Typography variant="subtitle1">
                    Bạn có chắc chắn muốn xóa bản ghi này không?
                </Typography>
            </DialogJs>
        </>
    );
}

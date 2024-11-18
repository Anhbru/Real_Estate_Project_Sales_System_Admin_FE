import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonJs from "../../../../Utils/Button";
import BookingsTableHeader from "./BookingTableHeader";
import LoadingSpinner from "../../../../Utils/LoadingSpinner";

export default function BookingsTable({ data }) {
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

  const loading = true;

  return (
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
          sx={{ minWidth: 850 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <BookingsTableHeader />
          <TableBody>
            {data.map((row, index) => {
              return (
                <TableRow
                  key={row.contractID}
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
                    <Chip label={row.status} />
                  </TableCell>
                  <TableCell align="left">
                    <Grid container spacing={2}>
                      <Grid item>
                        <ButtonJs
                          title="edit"
                          type="button"
                          leftIcon
                          icon={<EditIcon />}
                        />
                      </Grid>
                      <Grid item>
                        <ButtonJs
                          title="delete"
                          type="button"
                          color="ERROR"
                          leftIcon
                          icon={<DeleteIcon />}
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
  );
}

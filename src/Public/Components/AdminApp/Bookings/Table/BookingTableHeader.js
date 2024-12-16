import { TableRow, TableCell } from "@mui/material";
import TableHead from "@mui/material/TableHead";

const headCells = [
  {
    id: "stt",
    label: "STT",
  },
  {
    id: "customerName",
    label: "Customer Name",
  },

  {
    id: "projectName",
    label: "Project Name",
  },
  {
    id: "propertyCategoryName",
    label: "Property Category Name",
  },
  {
    id: "documentName",
    label: "Document Name",
  },

  {
    id: "Giá ký gửi",
    label: "Total Prices",
  },
  {
    id: "depositedTimed",
    label: "Deposited Timed",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "Action",
    label: "Action",
  },
];

export default function BookingsTableHeader() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

import { TableRow, TableCell } from "@mui/material";
import TableHead from "@mui/material/TableHead";

const headCells = [
  {
    id: "stt",
    label: "STT",
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
    id: "openForSale",
    label: "Status",
  },
  {
    id: "action",
    label: "Action",
  },
];

function TableHeader() {
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

export default TableHeader;

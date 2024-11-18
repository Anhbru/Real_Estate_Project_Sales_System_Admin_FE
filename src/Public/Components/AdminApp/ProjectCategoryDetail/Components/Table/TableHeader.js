import { TableRow, TableCell } from "@mui/material";
import TableHead from "@mui/material/TableHead";

const headCells = [
  {
    id: "stt",
    label: "Stt",
  },
  {
    id: "projectName",
    label: "Tên dự án",
  },
  {
    id: "propertyCategoryName",
    label: "Thuộc tính danh mục",
  },
  {
    id: "openForSale",
    label: "Trạng thái",
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

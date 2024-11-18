import { TableRow, TableCell } from "@mui/material";
import TableHead from "@mui/material/TableHead";

const headCells = [
  {
    id: "stt",
    label: "Stt",
  },
  {
    id: "customerName",
    label: "Tên khách hàng",
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
    id: "documentName",
    label: "Tên tài liệu",
  },

  {
    id: "Giá ký gửi",
    label: "Tổng giá",
  },
  {
    id: "depositedTimed",
    label: "Thời gian ký gửi",
  },
  {
    id: "status",
    label: "Trạng thái",
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

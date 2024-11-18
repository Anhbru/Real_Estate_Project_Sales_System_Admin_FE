import { TableRow, TableCell } from "@mui/material";
import TableHead from "@mui/material/TableHead";

const headCells = [
  {
    id: "stt",
    label: "Stt",
  },
  {
    id: "contractCode",
    label: "Mã hợp đồng",
  },
  {
    id: "contractType",
    label: "Loại hợp đồng",
  },
  {
    id: "fullName",
    label: "Tên khách hàng",
  },
  {
    id: "totalPrice",
    label: "Tổng giá",
  },
  {
    id: "paymentProcessName",
    label: "Quy trình thanh toán",
  },
  {
    id: "documentName",
    label: "Tài liệu",
  },

  {
    id: "status",
    label: "Trạng thái",
  },

  {
    id: "expiredTime",
    label: "Thời gian hết hạn",
  },
  {
    id: "Action",
    label: "Action",
  },
];

function ContractTableHeader() {
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

export default ContractTableHeader;

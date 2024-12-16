import { TableRow, TableCell } from "@mui/material";
import TableHead from "@mui/material/TableHead";

const headCells = [
  {
    id: "stt",
    label: "STT",
  },
  {
    id: "contractCode",
    label: "Contract Code",
  },
  {
    id: "contractType",
    label: "Contract Type",
  },
  {
    id: "fullName",
    label: "Full Name",
  },
  {
    id: "totalPrice",
    label: "Total Price",
  },
  {
    id: "paymentProcessName",
    label: "Payment Process Name",
  },
  {
    id: "documentName",
    label: "Document Name",
  },

  {
    id: "status",
    label: "Status",
  },

  {
    id: "expiredTime",
    label: "Expired Time",
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

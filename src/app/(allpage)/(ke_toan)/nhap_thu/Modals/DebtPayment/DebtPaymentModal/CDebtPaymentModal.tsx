import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody  from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer  from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow  from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox  from "@mui/material/Checkbox";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store/store';
import BodyInvoice from '@/app/api/BodyInvoice.json'
import Link from "next/link";

type Props = {
  data: typeof BodyInvoice
  checkedRows: { [invoice_id: string]: boolean };
  setCheckedRows: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
};

const CDebtPaymentModal = ({
  data, checkedRows, setCheckedRows
}: Props) => {
  const checkedColumns = useSelector((state: RootState) => state.columnInvoice.checkedColumns); // Lấy checkedColumns từ Redux
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  // Hàm xử lý chọn tất cả
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const newCheckedState: { [invoice_id: string]: boolean } = {};
  
    BodyInvoice.filter(row => row.remaining > 0).forEach((row) => {
      newCheckedState[row.invoice_id] = isChecked;
    });
  
    setCheckedRows(newCheckedState);
  };
  
  // Hàm xử lý chọn từng hàng
  const handleRowSelect = (invoice_id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRows(prev => ({
      ...prev,
      [invoice_id]: event.target.checked,
    }));
  };


  useEffect(() => {
    const visibleRows = BodyInvoice.filter(row => row.remaining > 0);
    const checkedCount = visibleRows.filter(row => checkedRows[row.invoice_id]).length;
  
    setSelectAllChecked(checkedCount === visibleRows.length);
  }, [checkedRows]);
  
  return (
    // MaxHeight là tạm thời. Công thức = khung - headeColumn - boardColumn => ra Body column
    <TableContainer
    component={Paper}
    sx={{
      mt: "30px",
      mb: "10px",
      maxHeight: 560,
      overflowX: "auto",
      overflowY: "auto",  // Thêm cuộn dọc nếu cần
      borderRadius: "10px",
    }}
  >
     <Table stickyHeader>
  <TableHead>
    <TableRow>
      {Object.keys(head_column_ke_toan_nhap_thu).map((key, index) => (
        checkedColumns.includes(key) && (
          <TableCell
            key={index}
            sx={{
              bgcolor: "#8DB883",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              textAlign: "center",
              width: columnWidths[key] || "auto", // Đảm bảo chiều rộng đồng nhất
              minWidth: columnWidths[key] || "100px", // Đảm bảo min-width cho các cột
              maxWidth: columnWidths[key] || "auto", // Đảm bảo max-width cho các cột
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {key === "select" ? (
              <Checkbox
                checked={selectAllChecked}
                onChange={handleSelectAll}
                sx={{
                  color: "white",
                  padding: 0,
                  "&.Mui-checked": {
                    color: "white",
                    backgroundColor: "#",
                    borderRadius: "4px",
                  },
                }}
              />
            ) : 
            (
              head_column_ke_toan_nhap_thu[key]
            )}
          </TableCell>
        )
      ))}
    </TableRow>
  </TableHead>

  <TableBody>
    {data
    .filter(row => row.remaining > 0)
    .map((row: { [key: string]: any}, rowIndex) => (
      <TableRow
        key={rowIndex}
        sx={{
          bgcolor: rowIndex % 2 === 0 ? "white" : "#f9f9f9",
        }}
      >
        {Object.keys(head_column_ke_toan_nhap_thu).map((key, colIndex) => (
          checkedColumns.includes(key) && (
            <TableCell
              key={`${rowIndex}-${colIndex}`}
              sx={{
                textAlign: "center",
                width: columnWidths[key] || "auto", // Đảm bảo độ rộng đồng nhất
                minWidth: columnWidths[key] || "100px", // Đảm bảo min-width cho các cột
                maxWidth: columnWidths[key] || "auto", // Đảm bảo max-width cho các cột
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
                {key === "select" ? (
    <Checkbox
      checked={!!checkedRows[row.invoice_id]}
      onChange={handleRowSelect(row.invoice_id)}
      sx={{ padding: 0 }}
    />
  ) : key === "invoice_id" ? (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        localStorage.setItem("selected_invoice_id", row[key]);
        window.open("/giao_dich/hoa_don", "_blank");
      }}
      style={{
        color: "#1976d2",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      {row[key]}
    </Link>
  ) : typeof row[key] === "number" ? (
    row[key].toLocaleString("vi-VN")
  ) : (
    row[key]
  )}
            </TableCell>
          )
        ))}
      </TableRow>
    ))}
  </TableBody>
</Table>




    </TableContainer>
  );
};

export default CDebtPaymentModal;

// =========================
// 🛠 Cấu hình cột
const head_column_ke_toan_nhap_thu: { [key: string]: string } = {
  select: "",
  invoice_id: "MHD",
  order_id: "MDH",
  date: "Ngày tháng",
  vat: "VAT",
  total: "Thành tiền",
  deposit: "Tiền cọc",
  paid: "Đã thanh toán",
  remaining: "Thanh toán còn lại",
  paymentMethod: "Hình thức thanh toán",
  paymentStatus: "Thanh toán",
  seller: "Nhân viên Sale",
  customer: "Khách hàng"
};

// 📌 Thiết lập độ rộng của từng cột
const columnWidths: { [key: string]: string } = {
  select: "40px", // 📌 Thu nhỏ select
};

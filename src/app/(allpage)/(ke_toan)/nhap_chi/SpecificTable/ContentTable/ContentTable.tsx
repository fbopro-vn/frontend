'use client'

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store/store';
import BodyExpense from '@/app/api/Accountant/BodyExpense.json'

const ContentTable = ({ searchText }: { searchText: string }) => {
  const checkedColumns = useSelector((state: RootState) => state.columnExpense.checkedColumns); // Lấy checkedColumns từ Redux
  const selectedMonth = useSelector((state: RootState) => state.month.selectedMonth);

  const normalizedSearch = searchText.trim().toLowerCase();

  const filteredData = BodyExpense.filter(item => {
    const rawDate = typeof item.date === 'string' ? item.date : '';
    const itemMonth = rawDate.split('/')[1] ?? "";

    const matchesMonth = itemMonth === selectedMonth.padStart(2, '0');

    const matchesSearch = Object.values(item).some(value =>
      String(value).toLowerCase().includes(normalizedSearch)
    );

    return matchesMonth && matchesSearch;
  });

  console.log("Data chi", filteredData)
  return (
    // MaxHeight là tạm thời. Công thức = khung - headeColumn - boardColumn => ra Body column
    <TableContainer
      component={Paper}
      sx={{
        mt: "30px",
        mb: "10px",
        maxHeight: 560,
        overflowX: "auto",
        overflowY: "auto", // Thêm cuộn dọc nếu cần
        borderRadius: "10px",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {Object.keys(head_column).map(
              (key, index) =>
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
                      {head_column[key]}
                  </TableCell>
                )
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredData.map((row: { [key: string]: any }, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{
                bgcolor: rowIndex % 2 === 0 ? "white" : "#f9f9f9",
              }}
            >
              {Object.keys(head_column).map(
                (key, colIndex) =>
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
                      {typeof row[key] === "number" ? (
                                            row[key].toLocaleString("vi-VN")
                                        ) : (
                                            row[key]
                                        )}
                    </TableCell>
                  )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContentTable;

// =========================
// 🛠 Cấu hình cột
const head_column: { [key: string]: string } = {
  purchase_id: "Mã đơn",
  date: "Ngày tháng",
  vat: "VAT",
  total: "Thành tiền",
  amount_paid: "Đã thanh toán",
  remaining_payment: "Thanh toán còn lại",
  paymentMethod: "Hình thức thanh toán",
  paymentStatus: "Thanh toán",
  provider: "Nhà cung cấp"
};

// 📌 Thiết lập độ rộng của từng cột
const columnWidths: { [key: string]: string } = {
  purchase_id: "130px",
  date: "120px",
  product: "300px", // 📌 Mở rộng tên sản phẩm
  seller: "150px", // 📌 Mở rộng nhân viên Sale
  customer: "150px", // 📌 Mở rộng khách hàng
};

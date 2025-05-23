'use client'

import * as React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store/store';
import BodyInvoice from '@/app/api/BodyInvoice.json'
import Link from "next/link";

const ContentTable = ({ searchText }: { searchText: string }) => {
  const checkedColumns = useSelector((state: RootState) => state.columnInvoice.checkedColumns); // Lấy checkedColumns từ Redux
  const selectedMonth = useSelector((state: RootState) => state.month.selectedMonth);

  const normalizedSearch = searchText.trim().toLowerCase();

  const filteredData = BodyInvoice.filter(item => {
    const rawDate = typeof item.date === 'string' ? item.date : '';
    const itemMonth = rawDate.split('/')[1] ?? "";

    const matchesMonth = itemMonth === selectedMonth.padStart(2, '0');

    const matchesSearch = Object.values(item).some(value =>
      String(value).toLowerCase().includes(normalizedSearch)
    );

    return matchesMonth && matchesSearch;
  });


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
                      {key === "invoice_id" ? (
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
                      ) : (
                        typeof row[key] === "number"
                          ? row[key].toLocaleString("vi-VN")
                          : row[key]
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
  invoice_id: "MDH",
  date: "Ngày tháng",
  vat: "VAT",
  total: "Thành tiền",
  deposit: "Tiền cọc",
  paid: "Tiền đã thanh toán",
  remaining: "Thanh toán còn lại",
  paymentMethod: "Hình thức thanh toán",
  paymentStatus: "Thanh toán",
  seller: "Nhân viên Sale",
  customer: "Khách hàng",
};

// 📌 Thiết lập độ rộng của từng cột
const columnWidths: { [key: string]: string } = {
  order_id: "130px",
  date: "120px",
  product: "300px", // 📌 Mở rộng tên sản phẩm
  seller: "150px", // 📌 Mở rộng nhân viên Sale
  customer: "150px", // 📌 Mở rộng khách hàng
};


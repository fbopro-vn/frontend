import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store/store';
import ColumnPopover from "@/app/components/Popover/ColumnPopover"
import Link from "next/link";
import BodyInvoice from '@/app/api/BodyInvoice.json'

const CSearchModal = ({data} : {data: typeof BodyInvoice}) => {
    const checkedColumns = useSelector((state: RootState) => state.columnInvoice.checkedColumns); // Lấy checkedColumns từ Redux
    return (
        <Box>
            <Box sx={{
                display: "flex",
                justifyContent: 'flex-end'
            }}>
                <ColumnPopover headColumn={head_column_ke_toan_nhap_thu} />
            </Box>
            <TableContainer component={Paper} sx={{ mt: "10px", maxHeight: 560, overflow: "auto", borderRadius: "10px" }}>
                <Table stickyHeader>
                    {/* Header */}
                    <TableHead>
                        <TableRow>
                            {Object.keys(head_column_ke_toan_nhap_thu).map((key, index) => (
                                checkedColumns.includes(key) &&
                                <TableCell key={index} sx={{
                                    bgcolor: "#8DB883",
                                    color: "white",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    width: columnWidths[key] || "auto" // 📌 Thiết lập độ rộng từng cột
                                }}>
                                    {
                                        head_column_ke_toan_nhap_thu[key]
                                    }
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    {/* Body */}
                    <TableBody>
                        {data.map((row: { [key: string]: any }, rowIndex) => (
                            <TableRow key={rowIndex} sx={{
                                bgcolor: rowIndex % 2 === 0 ? "white" : "#f9f9f9",
                            }}>
                                {Object.keys(head_column_ke_toan_nhap_thu).map((key, colIndex) => (
                                    checkedColumns.includes(key) &&
                                    <TableCell key={`${rowIndex}-${colIndex}`} sx={{
                                        textAlign: "center",
                                        width: columnWidths[key] || "auto" // 📌 Áp dụng width từng cột
                                    }}>
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
                                        ) : typeof row[key] === "number" ? (
                                            row[key].toLocaleString("vi-VN")
                                        ) : (
                                            row[key]
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CSearchModal;

// =========================
// 🛠 Cấu hình cột
const head_column_ke_toan_nhap_thu: { [key: string]: string } = {
    invoice_id: "MHD",
    order_id: "MDH",
    date: "Ngày tháng",
    total: "Thành tiền",
    deposit: "Tiền cọc",
    paid: "Đã thanh toán",
    remaining: "Thanh toán còn lại",
    paymentMethod: "Hình thức thanh toán",
    paymentStatus: "Thanh toán",
    seller: "Nhân viên Sale",
    customer: "Khách hàng",
};
// 📌 Thiết lập độ rộng của từng cột
const columnWidths: { [key: string]: string } = {
    select: "40px",  // 📌 Thu nhỏ select
};



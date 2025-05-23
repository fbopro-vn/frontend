import * as React from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button
} from "@mui/material";

const CSearchModal = () => {

    return (
        <TableContainer component={Paper} sx={{ mt: "20px", maxHeight: 560, overflow: "auto", borderRadius: "10px"}}>
            <Table stickyHeader>
                {/* Header */}
                <TableHead>
                    <TableRow>
                        {Object.keys(head_column).map((key, index) => (
                            <TableCell key={index} sx={{
                                bgcolor: "#8DB883",
                                color: "white",
                                fontSize: "16px",
                                fontWeight: "bold",
                                textAlign: "center",
                                width: columnWidths[key] || "auto" // 📌 Thiết lập độ rộng từng cột
                            }}>
                                {
                                    head_column[key]
                                }
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                {/* Body */}
                <TableBody>
                    {body_data.map((row, rowIndex) => (
                        <TableRow key={rowIndex} sx={{
                            bgcolor: rowIndex % 2 === 0 ? "white" : "#f9f9f9",
                        }}>
                            {Object.keys(head_column).map((key, colIndex) => (
                                <TableCell key={`${rowIndex}-${colIndex}`} sx={{
                                    textAlign: "center",
                                    width: columnWidths[key] || "auto" // 📌 Áp dụng width từng cột
                                }}>
                                    {
                                        row[key]
                                    }
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CSearchModal;

// =========================
// 🛠 Cấu hình cột
const head_column: { [key: string]: string } = {
    order_id: "Mã đơn hàng", date: "Ngày tháng", product: "Tên sản phẩm",
    unit: "Đơn vị tính", price: "Giá bán", amount: "Số lượng", vat: "VAT", total: "Thành tiền",
    deposit: "Tiền cọc", paid: "Tiền đã thanh toán", remaining: "Thanh toán còn lại",
    paymentMethod: "Hình thức thanh toán", paymentStatus: "Thanh toán", seller: "Nhân viên Sale",
    customer: "Khách hàng", action: "Hành động"
};

// 📌 Thiết lập độ rộng của từng cột
const columnWidths: { [key: string]: string } = {
    select: "40px",  // 📌 Thu nhỏ select
    product: "150px", // 📌 Mở rộng tên sản phẩm
    seller: "150px", // 📌 Mở rộng nhân viên Sale
    customer: "150px", // 📌 Mở rộng khách hàng
};

// Dữ liệu động
const body_data: { [key: string]: string | React.ReactNode }[] = [
    { order_id: "DH005", date: "05/01/2025", product: "Thùng Phiếu Vuông 30cm", unit: "Cái", price: "300.000", amount: "6", vat: "8%", total: "1.800.000", deposit: "500.000", paid: "800.000", remaining: "500.000", paymentMethod: "Tiền mặt", paymentStatus: "Công Nợ", seller: "Kim Ngân", customer: "Chị Gái", action: <Button>Xử lý</Button> },
    { order_id: "DH006", date: "06/01/2025", product: "Thùng Nhựa Tròn 20cm", unit: "Cái", price: "250.000", amount: "8", vat: "10%", total: "2.000.000", deposit: "700.000", paid: "1.000.000", remaining: "300.000", paymentMethod: "Chuyển khoản", paymentStatus: "Hoàn tất", seller: "Minh Tâm", customer: "Anh Tuấn", action: <Button>Xử lý</Button> },
    { order_id: "DH007", date: "07/01/2025", product: "Hộp Carton Lớn", unit: "Thùng", price: "290.000", amount: "12", vat: "0%", total: "3.500.000", deposit: "1.000.000", paid: "2.000.000", remaining: "500.000", paymentMethod: "Tiền mặt", paymentStatus: "Công Nợ", seller: "Phương Thảo", customer: "Ngọc Hân", action: <Button>Xử lý</Button> },
    { order_id: "DH008", date: "08/01/2025", product: "Túi Vải Không Dệt", unit: "Túi", price: "250.000", amount: "20", vat: "8%", total: "5.000.000", deposit: "2.000.000", paid: "2.500.000", remaining: "500.000", paymentMethod: "Chuyển khoản", paymentStatus: "Đang xử lý", seller: "Quang Huy", customer: "Thu Trang", action: <Button>Xử lý</Button> },
    { order_id: "DH009", date: "09/01/2025", product: "Chai Nhựa PET 500ml", unit: "Chai", price: "250.000", amount: "15", vat: "10%", total: "3.750.000", deposit: "1.000.000", paid: "2.500.000", remaining: "250.000", paymentMethod: "Tiền mặt", paymentStatus: "Chờ thanh toán", seller: "Hoàng Nam", customer: "Bảo Anh", action: <Button>Xử lý</Button> },
    { order_id: "DH010", date: "10/01/2025", product: "Hộp Nhựa Đựng Thực Phẩm", unit: "Hộp", price: "300.000", amount: "30", vat: "8%", total: "9.000.000", deposit: "4.000.000", paid: "4.000.000", remaining: "1.000.000", paymentMethod: "Chuyển khoản", paymentStatus: "Hoàn tất", seller: "Thùy Dương", customer: "Hữu Phúc", action: <Button>Xử lý</Button> },
    { order_id: "DH011", date: "11/01/2025", product: "Bình Giữ Nhiệt Inox", unit: "Bình", price: "500.000", amount: "25", vat: "10%", total: "12.500.000", deposit: "5.000.000", paid: "6.000.000", remaining: "1.500.000", paymentMethod: "Tiền mặt", paymentStatus: "Công Nợ", seller: "Mai Hoa", customer: "Tấn Khoa", action: <Button>Xử lý</Button> },
    { order_id: "DH012", date: "12/01/2025", product: "Túi Đựng Rác Sinh Học", unit: "Túi", price: "300.000", amount: "50", vat: "0%", total: "15.000.000", deposit: "8.000.000", paid: "6.000.000", remaining: "1.000.000", paymentMethod: "Chuyển khoản", paymentStatus: "Đang xử lý", seller: "Hữu Nghĩa", customer: "Minh Châu", action: <Button>Xử lý</Button> },
    { order_id: "DH013", date: "13/01/2025", product: "Giấy Gói Thực Phẩm", unit: "Cuộn", price: "200.000", amount: "40", vat: "8%", total: "8.000.000", deposit: "2.000.000", paid: "5.500.000", remaining: "500.000", paymentMethod: "Tiền mặt", paymentStatus: "Chờ thanh toán", seller: "Khánh Ngọc", customer: "Lệ Thu", action: <Button>Xử lý</Button> },
    { order_id: "DH014", date: "14/01/2025", product: "Hộp Nhôm Đựng Cơm", unit: "Hộp", price: "350.000", amount: "20", vat: "10%", total: "7.000.000", deposit: "3.000.000", paid: "3.500.000", remaining: "500.000", paymentMethod: "Chuyển khoản", paymentStatus: "Hoàn tất", seller: "Trọng Nhân", customer: "Hồng Nhung", action: <Button>Xử lý</Button> },
    { order_id: "DH015", date: "15/01/2025", product: "Bình Đựng Nước Thủy Tinh", unit: "Bình", price: "400.000", amount: "10", vat: "8%", total: "4.000.000", deposit: "1.500.000", paid: "2.000.000", remaining: "500.000", paymentMethod: "Tiền mặt", paymentStatus: "Công Nợ", seller: "Hải Đăng", customer: "Nhật Minh", action: <Button>Xử lý</Button> }
];
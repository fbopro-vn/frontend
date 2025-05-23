import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store/store';
import BodyInvoice from '@/app/api/BodyInvoice.json'
import Link from 'next/link'

type Props = {
  data: typeof BodyInvoice
  checkedRows: { [invoice_id: string]: boolean };
  setCheckedRows: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
};


const CDebtPaymentModal = ({
  data, checkedRows, setCheckedRows
}: Props) => {
  const checkedColumns = useSelector((state: RootState) => state.columnExpense.checkedColumns); // Lấy checkedColumns từ Redux
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
    <Box>
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
        {Object.keys(head_column).map((key, index) => (
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
              ) : (
                head_column[key]
              )}
            </TableCell>
          )
        ))}
      </TableRow>
    </TableHead>

    <TableBody>
      {data.map((row: { [key: string]: any}, rowIndex) => (
        <TableRow
          key={rowIndex}
          sx={{
            bgcolor: rowIndex % 2 === 0 ? "white" : "#f9f9f9",
          }}
        >
          {Object.keys(head_column).map((key, colIndex) => (
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
    </Box>
  );
};

export default CDebtPaymentModal;

// =========================
// 🛠 Cấu hình cột
const head_column: { [key: string]: string } = {
  select: "✓",
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
  select: "40px", // 📌 Thu nhỏ select
  order_id: "130px",
  date: "120px",
  product: "300px", // 📌 Mở rộng tên sản phẩm
  seller: "150px", // 📌 Mở rộng nhân viên Sale
  customer: "150px", // 📌 Mở rộng khách hàng
};

// Dữ liệu động
const body_data: { [key: string]: string | React.ReactNode }[] = [
  {
 
    invoice_id: "HD001", // Đã có invoice_id
    order_id: "DH005",
    date: "05/01/2025",
    product: "Thùng Phiếu Vuông 30cm",
    unit: "Cái",
    price: "300.000",
    amount: "6",
    vat: "8%",
    total: "1.800.000",
    deposit: "500.000",
    paid: "800.000",
    remaining: "500.000",
    paymentMethod: "Tiền mặt",
    paymentStatus: "Công Nợ",
    seller: "Kim Ngân",
    customer: "Chị Gái",
    action: <Button>Xử lý</Button>,
  },
  {
 
    invoice_id: "HD002", // Bổ sung invoice_id
    order_id: "DH006",
    date: "06/01/2025",
    product: "Thùng Nhựa Tròn 20cm",
    unit: "Cái",
    price: "250.000",
    amount: "8",
    vat: "10%",
    total: "2.000.000",
    deposit: "700.000",
    paid: "1.000.000",
    remaining: "300.000",
    paymentMethod: "Chuyển khoản",
    paymentStatus: "Hoàn tất",
    seller: "Minh Tâm",
    customer: "Anh Tuấn",
    action: <Button>Xử lý</Button>,
  },
  {
 
    invoice_id: "HD003", // Bổ sung invoice_id
    order_id: "DH007",
    date: "07/01/2025",
    product: "Hộp Carton Lớn",
    unit: "Thùng",
    price: "290.000",
    amount: "12",
    vat: "0%",
    total: "3.500.000",
    deposit: "1.000.000",
    paid: "2.000.000",
    remaining: "500.000",
    paymentMethod: "Tiền mặt",
    paymentStatus: "Công Nợ",
    seller: "Phương Thảo",
    customer: "Ngọc Hân",
    action: <Button>Xử lý</Button>,
  },
  {
 
    invoice_id: "HD004", // Bổ sung invoice_id
    order_id: "DH008",
    date: "08/01/2025",
    product: "Túi Vải Không Dệt",
    unit: "Túi",
    price: "250.000",
    amount: "20",
    vat: "8%",
    total: "5.000.000",
    deposit: "2.000.000",
    paid: "2.500.000",
    remaining: "500.000",
    paymentMethod: "Chuyển khoản",
    paymentStatus: "Đang xử lý",
    seller: "Quang Huy",
    customer: "Thu Trang",
    action: <Button>Xử lý</Button>,
  },
  {
 
    invoice_id: "HD005", // Bổ sung invoice_id
    order_id: "DH009",
    date: "09/01/2025",
    product: "Chai Nhựa PET 500ml",
    unit: "Chai",
    price: "250.000",
    amount: "15",
    vat: "10%",
    total: "3.750.000",
    deposit: "1.000.000",
    paid: "2.500.000",
    remaining: "250.000",
    paymentMethod: "Tiền mặt",
    paymentStatus: "Chờ thanh toán",
    seller: "Hoàng Nam",
    customer: "Bảo Anh",
    action: <Button>Xử lý</Button>,
  },
  {
 
    invoice_id: "HD006", // Bổ sung invoice_id
    order_id: "DH010",
    date: "10/01/2025",
    product: "Hộp Nhựa Đựng Thực Phẩm",
    unit: "Hộp",
    price: "300.000",
    amount: "30",
    vat: "8%",
    total: "9.000.000",
    deposit: "4.000.000",
    paid: "4.000.000",
    remaining: "1.000.000",
    paymentMethod: "Chuyển khoản",
    paymentStatus: "Hoàn tất",
    seller: "Thùy Dương",
    customer: "Hữu Phúc",
    action: <Button>Xử lý</Button>,
  },
  {
 
    invoice_id: "HD007", // Bổ sung invoice_id
    order_id: "DH011",
    date: "11/01/2025",
    product: "Bình Giữ Nhiệt Inox",
    unit: "Bình",
    price: "500.000",
    amount: "25",
    vat: "10%",
    total: "12.500.000",
    deposit: "5.000.000",
    paid: "6.000.000",
    remaining: "1.500.000",
    paymentMethod: "Tiền mặt",
    paymentStatus: "Công Nợ",
    seller: "Mai Hoa",
    customer: "Tấn Khoa",
    action: <Button>Xử lý</Button>,
  },
  {
 
    invoice_id: "HD008", // Bổ sung invoice_id
    order_id: "DH012",
    date: "12/01/2025",
    product: "Túi Đựng Rác Sinh Học",
    unit: "Túi",
    price: "300.000",
    amount: "50",
    vat: "0%",
    total: "15.000.000",
    deposit: "8.000.000",
    paid: "6.000.000",
    remaining: "1.000.000",
    paymentMethod: "Chuyển khoản",
    paymentStatus: "Đang xử lý",
    seller: "Hữu Nghĩa",
    customer: "Minh Châu",
    action: <Button>Xử lý</Button>,
  },
  {
 
    invoice_id: "HD009", // Bổ sung invoice_id
    order_id: "DH013",
    date: "13/01/2025",
    product: "Giấy Gói Thực Phẩm",
    unit: "Cuộn",
    price: "200.000",
    amount: "40",
    vat: "8%",
    total: "8.000.000",
    deposit: "2.000.000",
    paid: "5.500.000",
    remaining: "500.000",
    paymentMethod: "Tiền mặt",
    paymentStatus: "Chờ thanh toán",
    seller: "Khánh Ngọc",
    customer: "Lệ Thu",
    action: <Button>Xử lý</Button>,
  },
  {
 
    invoice_id: "HD010", // Bổ sung invoice_id
    order_id: "DH014",
    date: "14/01/2025",
    product: "Hộp Nhôm Đựng Cơm",
    unit: "Hộp",
    price: "350.000",
    amount: "20",
    vat: "10%",
    total: "7.000.000",
    deposit: "3.000.000",
    paid: "3.500.000",
    remaining: "500.000",
    paymentMethod: "Chuyển khoản",
    paymentStatus: "Hoàn tất",
    seller: "Trọng Nhân",
    customer: "Hồng Nhung",
    action: <Button>Xử lý</Button>,
  },
  {
 
    invoice_id: "HD011", // Bổ sung invoice_id
    order_id: "DH015",
    date: "15/01/2025",
    product: "Bình Đựng Nước Thủy Tinh",
    unit: "Bình",
    price: "400.000",
    amount: "10",
    vat: "8%",
    total: "4.000.000",
    deposit: "1.500.000",
    paid: "2.000.000",
    remaining: "500.000",
    paymentMethod: "Tiền mặt",
    paymentStatus: "Công Nợ",
    seller: "Hải Đăng",
    customer: "Nhật Minh",
    action: <Button>Xử lý</Button>,
  },
];

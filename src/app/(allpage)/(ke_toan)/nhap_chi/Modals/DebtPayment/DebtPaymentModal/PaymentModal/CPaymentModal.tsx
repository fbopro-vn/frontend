import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NumericFormat } from 'react-number-format';
import BodyInvoice from '@/app/api/BodyInvoice.json'

type Props = {
  selectedInvoices: typeof BodyInvoice,
  providerPay: number,
  totalDebt: number
}

export default function CPaymentModal({
  selectedInvoices,
  providerPay,
  totalDebt } : Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Đặt số lượng dòng mỗi trang
  const [manualValues, setManualValues] = useState<{ [invoiceId: string]: number }>({});

  // 👉 Tự động phân bổ tiền từ trên xuống
  const distributedManual = (() => {
    let remaining = providerPay;
    const result: { [invoiceId: string]: number } = {};

    for (const invoice of selectedInvoices) {
      const need = invoice.remaining;

      if (remaining <= 0) {
        result[invoice.invoice_id] = 0;
        continue;
      }

      const payThis = Math.min(need, remaining);
      result[invoice.invoice_id] = payThis;
      remaining -= payThis;
    }

    return result;
  })();
  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);  // Trừ 1 vì trang bắt đầu từ 0 trong trạng thái
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));  // Cập nhật số dòng mỗi trang
    setPage(0); // Quay lại trang đầu tiên
  };
  // Tính toán các dòng hiển thị
  const startRow = page * rowsPerPage + 1;
  const endRow = Math.min((page + 1) * rowsPerPage, selectedInvoices.length);

  return (
    <Box px="10px">
      <TableContainer
        component={Paper}
        sx={{
          minHeight: '270px',
          maxHeight: '270px', // Đặt chiều cao tối đa của TableContainer
          overflowY: 'auto', // Thêm thanh cuộn dọc khi vượt quá chiều cao
        }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead sx={{ position: 'sticky', top: '0', zIndex: 1 }}>
            <TableRow
              sx={{
                bgcolor: '#8DB883',
              }}
            >
           {Object.keys(head_column).map((key, index) => (
              <TableCell
                key={index}
                sx={{
                  bgcolor: "#8DB883",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                {head_column[key]}
              </TableCell>
            ))}

            </TableRow>
          </TableHead>
          <TableBody>
  {selectedInvoices.map((row: { [key: string]: any }, rowIndex) => (
    <TableRow
      key={row.invoice_id}
      sx={{ bgcolor: rowIndex % 2 === 0 ? "white" : "#f9f9f9" }}
    >
      {Object.keys(head_column).map((key, colIndex) => (
        <TableCell
          key={`${rowIndex}-${colIndex}`}
          sx={{ textAlign: "center" }}
        >
          {key === "manual" ? (
           <NumericFormat
           value={distributedManual[row.invoice_id] || ""}
           onValueChange={(values) => {
             setManualValues((prev) => ({
               ...prev,
               [row.invoice_id]: values.value, // Đây là số thuần: không dấu, không suffix
             }));
           }}
           customInput={TextField}
           thousandSeparator="."
           decimalSeparator=","
           valueIsNumericString
           variant="standard"
           disabled
           sx={{
            '& input': {
              textAlign: 'center',
              color: '#333',
              WebkitTextFillColor: '#333', // fix text bị mờ khi disabled
            },
            '& .Mui-disabled': {
              WebkitTextFillColor: '#333 !important', // đảm bảo chữ hiện rõ khi disabled
            },
          }}
         />
         
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

      {/* Hiển thị phân trang và tổng số bản ghi */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Pagination
            count={Math.ceil(selectedInvoices.length / rowsPerPage)}  // Tính số trang
            page={page + 1}  // Hiển thị số trang bắt đầu từ 1
            onChange={handleChangePage}  // Cập nhật trang khi người dùng thay đổi
            showFirstButton
            showLastButton
          />
          <Typography variant="body2">
            Hiển thị {startRow} - {endRow} / Tổng số {selectedInvoices.length} bản ghi
          </Typography>
        </Box>

        <Box width={'400px'}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Typography align="right">Tổng thanh toán hóa đơn:</Typography>
            <Typography align="right">
              {totalDebt.toLocaleString('vi-VN')} VND
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}


const head_column: { [key: string]: string } = {
  invoice_id: "Mã hóa đơn",
  date: "Thời gian",
  total: "Giá trị hóa đơn",
  paid: "Đã thu trước",
  remaining: "Còn cần thu",
  manual: "Tiền thu", // Cột tùy nhập
};

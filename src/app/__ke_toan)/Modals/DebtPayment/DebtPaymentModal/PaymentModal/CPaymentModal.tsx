import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Divider from '@mui/material/Divider';

function ccyFormat(num: number) {
  return `${num.toLocaleString()}`; // Định dạng số với dấu phân cách hàng nghìn
}

function createRow(invoiceCode: string, time: string, totalValue: number, paid: number, remaining: number, received: number) {
  return { invoiceCode, time, totalValue, paid, remaining, received };
}

const ol = [
  createRow('HD008323', '08/10/2024 20:36', 1540000, 433000, 1107000, 1107000),
  createRow('HD008340', '10/10/2024 18:56', 4175000, 0, 4175000, 4175000),
  createRow('HD008341', '10/10/2024 18:57', 1325000, 0, 1325000, 718000),
  createRow('HD008342', '10/10/2024 19:00', 390000, 0, 390000, 0),
  createRow('HD008343', '11/10/2024 08:15', 2550000, 100000, 2450000, 2450000),
  createRow('HD008344', '11/10/2024 09:30', 5600000, 2000000, 3600000, 3600000),
  createRow('HD008345', '11/10/2024 10:05', 720000, 300000, 420000, 420000),
  createRow('HD008346', '11/10/2024 11:10', 4900000, 1000000, 3900000, 3900000),
  createRow('HD008347', '11/10/2024 14:45', 3150000, 1500000, 1650000, 1650000),
  createRow('HD008348', '12/10/2024 12:00', 8300000, 5000000, 3300000, 3300000),
  createRow('HD008349', '12/10/2024 13:30', 2700000, 500000, 2200000, 2200000),
  createRow('HD008350', '12/10/2024 15:00', 1100000, 0, 1100000, 1100000),
  createRow('HD008351', '12/10/2024 16:20', 1800000, 0, 1800000, 0),
  createRow('HD008352', '12/10/2024 17:00', 4000000, 1500000, 2500000, 2500000),
  createRow('HD008353', '13/10/2024 09:00', 5100000, 0, 5100000, 5100000),
  createRow('HD008354', '13/10/2024 11:30', 3700000, 1000000, 2700000, 2700000),
];

// Nhân bản gấp 10 lần các dữ liệu hiện tại
const rows = [...ol, ...ol, ...ol, ...ol, ...ol, ...ol, ...ol];

export default function CPaymentModal() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10); // Đặt số lượng dòng mỗi trang

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);  // Trừ 1 vì trang bắt đầu từ 0 trong trạng thái
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));  // Cập nhật số dòng mỗi trang
    setPage(0); // Quay lại trang đầu tiên
  };

  // Tính toán các dòng hiển thị
  const startRow = page * rowsPerPage + 1;
  const endRow = Math.min((page + 1) * rowsPerPage, rows.length);

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
              <TableCell sx={{ color: 'white', fontSize: "16px", fontWeight: 'bold' }}>Mã hóa đơn</TableCell>
              <TableCell sx={{ color: 'white', fontSize: "16px", fontWeight: 'bold' }} align="center">
                Thời gian
              </TableCell>
              <TableCell sx={{ color: 'white', fontSize: "16px", fontWeight: 'bold' }} align="right">
                Giá trị hóa đơn
              </TableCell>
              <TableCell sx={{ color: 'white', fontSize: "16px", fontWeight: 'bold' }} align="right">
                Đã thu trước
              </TableCell>
              <TableCell sx={{ color: 'white', fontSize: "16px", fontWeight: 'bold' }} align="right">
                Còn cần thu
              </TableCell>
              <TableCell sx={{ color: 'white', fontSize: "16px", fontWeight: 'bold' }} align="right">
                Tiền thu
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.invoiceCode}>
                <TableCell>{row.invoiceCode}</TableCell>
                <TableCell align="center">{row.time}</TableCell>
                <TableCell align="right">{ccyFormat(row.totalValue)}</TableCell>
                <TableCell align="right">{ccyFormat(row.paid)}</TableCell>
                <TableCell align="right">{ccyFormat(row.remaining)}</TableCell>
                <TableCell align="right">{ccyFormat(row.received)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Hiển thị phân trang và tổng số bản ghi */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Pagination
            count={Math.ceil(rows.length / rowsPerPage)}  // Tính số trang
            page={page + 1}  // Hiển thị số trang bắt đầu từ 1
            onChange={handleChangePage}  // Cập nhật trang khi người dùng thay đổi
            showFirstButton
            showLastButton
          />
          <Typography variant="body2">
            Hiển thị {startRow} - {endRow} / Tổng số {rows.length} bản ghi
          </Typography>
        </Box>

        {/* Tổng cộng */}
        <Box width={'400px'}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Typography align="right">Tổng thanh toán hóa đơn:</Typography>
            <Typography align="right">
              {ccyFormat(rows.reduce((sum, row) => sum + row.received, 0))}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '10px', gap: 2 }}>
            <Typography align="right">Cộng vào tài khoản khách hàng:</Typography>
            <Typography align="right">20.000.000</Typography>
          </Box>
          <Divider />
        </Box>
      </Box>
    </Box>
  );
}

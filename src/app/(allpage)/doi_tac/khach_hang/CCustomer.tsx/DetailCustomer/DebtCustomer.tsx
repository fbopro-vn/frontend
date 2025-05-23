import Box from '@mui/material/Box'
import React, { useState } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import BodyInvoice from '@/app/api/BodyInvoice.json'
import Link from 'next/link'

const DebtCustomer = ({ customer_id }: ({ customer_id: string })) => {
  const [page, setPage] = useState(0); // Trang bắt đầu từ 0
  const rowsPerPage = 5;

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1); // Vì page trong Pagination bắt đầu từ 1, còn state từ 0
  };

  const startRow = page * rowsPerPage + 1;
  const endRow = Math.min((page + 1) * rowsPerPage, body_data_inside.length);
  const rowsToDisplay = body_data_inside.slice(startRow - 1, endRow);

  const filteredData = BodyInvoice.filter(item => item.customer_id === customer_id)
  const totalDebtCustomer = filteredData.reduce((sum, item) => sum + item.remaining, 0);
  
  return (
  <Box mt='10px'>
    <Box sx={{
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'center'
    }}>
       <Typography fontWeight='bold'>Tổng công nợ: {totalDebtCustomer.toLocaleString("vi-VN")} VND</Typography> 
    </Box>

    <TableContainer sx={{ maxHeight: 270, borderRadius: "10px" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {Object.keys(head_column_inside).map((key, index) => (
              <TableCell key={index} sx={{ bgcolor: "#487eb0", color: "white", textAlign: "center" }}>
                {head_column_inside[key]}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData?.map((row, rowIndex) => (
            <TableRow key={rowIndex} sx={{ bgcolor: rowIndex % 2 === 0 ? "white" : "#f9f9f9" }}>
              {Object.keys(head_column_inside).map((key, colIndex) => (
                <TableCell key={`${rowIndex}-${colIndex}`} sx={{ textAlign: "center" }}>
                   {key === "invoice_id" ? (
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                localStorage.setItem("selected_invoice_id", row[key]);
                window.open("/giao_dich/hoa_don", "_blank");
              }}
              style={{ color: "#1976d2", textDecoration: "none", cursor: "pointer" }}
            >
              {row[key]}
            </Link>
                ) : key === "remaining" || key === "total" && typeof row[key] === "number" ? (
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

    {/* Pagination */}
    <Box mt={2} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Pagination
          count={Math.ceil(body_data_inside.length / rowsPerPage)}
          page={page + 1}
          onChange={handleChangePage}
          showFirstButton
          showLastButton
        />
        <Typography variant="body2">
          Hiển thị {startRow} - {endRow} / Tổng số {body_data_inside.length} bản ghi
        </Typography>
      </Box>
</Box>
  )
}

export default DebtCustomer

const head_column_inside: { [key: string]: string } = {
  invoice_id: "Mã hóa đơn",
  date: "Thời gian",
  total: "Tổng thành tiền",
  remaining: "Thanh toán còn lại",
};

const body_data_inside: { [key: string]: string | React.ReactNode }[] = [
  {
    invoice_id: "HD001",
    date: "10:30 01/04/2025",
    value: "900.000",
    debt_customer: "500.000",
  },
  {
    invoice_id: "HD002",
    date: "11:15 01/04/2025",
    value: "1.500.000",
    debt_customer: "1.000.000",
  },
  {
    invoice_id: "HD003",
    date: "13:45 01/04/2025",
    value: "2.200.000",
    debt_customer: "0",
  },
  {
    invoice_id: "HD004",
    date: "15:00 01/04/2025",
    value: "750.000",
    debt_customer: "250.000",
  },
  {
    invoice_id: "HD005",
    date: "16:20 01/04/2025",
    value: "3.000.000",
    debt_customer: "2.000.000",
  },
  {
    invoice_id: "HD006",
    date: "17:40 01/04/2025",
    value: "1.800.000",
    debt_customer: "1.800.000",
  },
  {
    invoice_id: "HD007",
    date: "18:10 01/04/2025",
    value: "2.700.000",
    debt_customer: "0",
  },
  {
    invoice_id: "HD008",
    date: "19:30 01/04/2025",
    value: "1.250.000",
    debt_customer: "600.000",
  },
];

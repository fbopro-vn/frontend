import Box from '@mui/material/Box'
import React from 'react'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import BodyInvoice from '@/app/api/BodyInvoice.json'
import Link from 'next/link'

const OrderHistory = ({ customer_id }: ({ customer_id: string })) => {
  const filteredData = BodyInvoice.filter(item => item.customer_id === customer_id)

  return (
    <Box mt='10px'>
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
            {filteredData?.map((row: { [key: string]: any }, rowIndex) => (
              <TableRow key={rowIndex} sx={{ bgcolor: rowIndex % 2 === 0 ? "white" : "#f9f9f9" }}>
                {Object.keys(head_column_inside).map((key, colIndex) => (
                  <TableCell key={`${rowIndex}-${colIndex}`} sx={{ textAlign: "center" }}>
                    {key === "order_id" ? (
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              localStorage.setItem("selected_order_id", row[key]);
              window.open("/giao_dich/hoa_don", "_blank");
            }}
            style={{ color: "#1976d2", textDecoration: "none", cursor: "pointer" }}
          >
            {row[key]}
          </Link>
        ) : key === "total" && typeof row[key] === "number" ? (
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
  )
}

export default OrderHistory

const head_column_inside: { [key: string]: string } = {
  order_id: "Mã đơn hàng",
  date: "Thời gian",
  seller: "Người bán",
  total: "Tổng cộng",
};
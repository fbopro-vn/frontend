'use client'
import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { useOrderContext } from "@/app/context/OrderContext";
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const formatNumber = (value: number | string) => {
  return Number(value).toLocaleString("vi-VN"); // Format số có dấu chấm (1000 -> 1.000)
};

interface Column {
  id: 'id' | 'name' | 'amount' | 'costPrice' | 'salePrice' | 'totalPrice';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Mã sản phẩm', minWidth: 100 },
  { id: 'name', label: 'Tên sản phẩm', minWidth: 300 },
  {
    id: 'amount',
    label: 'Số Lượng',
    minWidth: 100,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'costPrice',
    label: 'Giá Vốn',
    minWidth: 0,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'salePrice',
    label: 'Đơn Giá',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'totalPrice',
    label: 'Thành Tiền',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#8DB883",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function TablePro() {

  // Context
  const { orders, activeOrderId, updateProductInOrder, removeProductFromOrder } = useOrderContext();
  const activeOrder = orders.find((order) => order.id === activeOrderId);


  return (
    <Paper sx={{
      width: '1100px', overflow: 'hidden', borderRadius: '10px',
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" /* Đổ bóng nhẹ */
    }}>
      <TableContainer sx={{ minHeight: 550, maxHeight: 550 }}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead >
            <TableRow >
              {columns.
                filter((column) => column.id !== "costPrice") // Ẩn cột giá vốn
                .map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontSize: "18px"
                    }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {
              activeOrder?.orderDetails.map((product) => (
                <TableRow key={product.id} >
                  <TableCell sx={{
                    fontSize: "16px",
                  }}>
                    <Box>
                      <IconButton
                          aria-label="delete"
                          color="error"
                          size="small"
                          onClick={() => removeProductFromOrder(product.id)}
                          sx={{ marginLeft: 'auto' }} // đẩy icon về phía cuối cell, bạn có thể bỏ nếu muốn gần mã
                        >
                          <DeleteForeverIcon fontSize="small" />
                        </IconButton>

                        {product.id}
                    </Box>
                    </TableCell>
                  <TableCell sx={{
                    fontSize: "16px",
                  }}>{product.name}</TableCell>

                  {/* Input chỉnh sửa số lượng */}
                  <TableCell align="right">
                    <TextField
                      type="number"
                      value={product.amount}

                      onChange={(e) => updateProductInOrder(product.id, "amount", Number(e.target.value))}

                      variant="outlined"
                      size="small"
                      sx={{
                        width: "70px",
                        "& .MuiInputBase-root": {
                          height: "35px",
                        },
                        "& input": {
                          textAlign: "center",
                          padding: "5px",
                        },
                        "& input[type=number]": {
                          MozAppearance: "number-input", // Hiển thị spinner trên Firefox
                        },
                        "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button": {
                          opacity: 1, // Giữ spinner luôn hiển thị
                          WebkitAppearance: "auto",
                        },
                      }}
                    />
                  </TableCell>

                  {/* Input giá vốn */}
                  <TableCell align="right" sx={{ display: "none" }}>
                    <TextField
                      type="number"
                      value={product.costPrice}

                      onChange={(e) => updateProductInOrder(product.id, "costPrice", Number(e.target.value))}

                      variant="outlined"
                      size="small"
                      sx={{
                        width: "70px",
                        "& .MuiInputBase-root": {
                          height: "35px",
                        },
                        "& input": {
                          textAlign: "center",
                          padding: "5px",
                        },
                        "& input[type=number]": {
                          MozAppearance: "number-input", // Hiển thị spinner trên Firefox
                        },
                        "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button": {
                          opacity: 1, // Giữ spinner luôn hiển thị
                          WebkitAppearance: "auto",
                        },
                      }}
                    />
                  </TableCell>

                  {/* Input chỉnh sửa đơn giá */}
                  <TableCell align="center">
                    <TextField
                      type="text"
                      value={formatNumber(product.salePrice)}
                      onChange={(e) => {
                        let rawValue = e.target.value.replace(/\./g, ""); // Xóa dấu chấm phân cách
                        if (/^\d*$/.test(rawValue)) { // Kiểm tra nếu chỉ chứa số
                          updateProductInOrder(product.id, "salePrice", Number(rawValue));
                        }
                      }}
                      variant="outlined"
                      size="small"
                      sx={{
                        width: "130px",
                        textAlign: "right",
                        "& .MuiInputBase-root": {
                          height: "35px",
                        },
                        "& input": {
                          textAlign: "center",
                        },
                      }}
                    />
                  </TableCell>
                  {/* Tính tổng tiền */}
                  <TableCell align="right" sx={{
                    fontSize: "16px",
                  }}>
                    {formatNumber(product.amount * product.salePrice)}
                  </TableCell>

                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>

    </Paper>
  );
}

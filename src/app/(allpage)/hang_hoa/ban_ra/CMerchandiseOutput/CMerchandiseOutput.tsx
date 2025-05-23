"use client";

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import ColumnPopover from '@/app/components/Popover/ColumnPopover'
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store/store';
import AddProductModal from "../Modals/AddProductModal";
import UpdateProductModal from "../Modals/UpdateProductModal";
import DeleteProductModal from "../Modals/DeleteProductModal";
import BodyMerchandiseOutput from '@/app/api/Merchandise/BodyMerchandiseOutput.json'

const CMerchandiseOutput = ({data}: {data: typeof BodyMerchandiseOutput}) => {
  const checkedColumns = useSelector((state: RootState) => state.columnMerchandiseOutput.checkedColumns); // Lấy checkedColumns từ Redux
  const [checkedRows, setCheckedRows] = useState<Record<string, boolean>>({});
  
  // Hàm xử lý chọn từng hàng
  const handleRowSelect = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRows(prev => ({
      ...prev,
      [id]: event.target.checked
    }));
  };

  return (
    <Box sx={{ mt: "70px", mx: '10px', height: "100vh", minWidth: "80%" }}>
      <Box display="flex" justifyContent="end" alignItems='' mb={'10px'} gap={4}>
        <AddProductModal />
        <DeleteProductModal checkedRows={checkedRows} data={data}/>
        <UpdateProductModal checkedRows={checkedRows} data={data}/>
        <ColumnPopover headColumn={head_column_product} />
      </Box>
      <Box display="flex" justifyContent="center">
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 700,
            overflowX: "auto",
            overflowY: "auto",
            borderRadius: "10px",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {Object.keys(head_column_product).map(
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
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {head_column_product[key]}

                      </TableCell>
                    )
                )}
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
      {Object.keys(head_column_product).map((key, colIndex) =>
        checkedColumns.includes(key) ? (
          <TableCell
            key={`${rowIndex}-${colIndex}`}
            sx={{
              textAlign: "center",
              width: columnWidths[key] || "auto",
              minWidth: columnWidths[key] || "100px",
              maxWidth: columnWidths[key] || "auto",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {key === "select" ? (
              <Checkbox
                checked={!!checkedRows[row.product_id]}
                onChange={handleRowSelect(row.product_id)}
                sx={{ padding: 0 }}
              />
            ) : (
              typeof row[key] === "number"
                ? (row[key] as number).toLocaleString("vi-VN")
                : row[key]
            )}
          </TableCell>
        ) : null
      )}
    </TableRow>
  ))}
</TableBody>

          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default CMerchandiseOutput;
// // =========================
// Cấu hình cột và dữ liệu
const head_column_product: { [key: string]: string } = {
  select: "Chọn",
  product_id: "Mã sản phẩm",
  product: "Tên sản phẩm",
  product_group: 'Nhóm sản phẩm',
  unit: "Đơn vị tính",
  costPrice: "Giá vốn",
  salePrice: "Giá bán",
  stockQuantity: "Tồn kho",
  created_at: "Thời gian tạo"
};

const columnWidths: { [key: string]: string } = {
  select: "40px",
  product_id: "100px",
  created_at: "180px",
  product: "300px",
};



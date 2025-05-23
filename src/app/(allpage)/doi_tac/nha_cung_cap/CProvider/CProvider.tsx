"use client";

import React, { useState } from "react";
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
  IconButton,
} from "@mui/material";
import ColumnPopover from '@/app/components/Popover/ColumnPopover'
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store/store';
import AddProviderModal from "../Modals/AddProviderModal";
import DeleteProviderModal from "../Modals/DeleteProviderModal";
import UpdateProviderModal from "../Modals/UpdateProviderModal";
import BodyProvider from '@/app/api/BodyProvider.json'
const CProvider = ({data}: {data: typeof BodyProvider}) => {
  const checkedColumns = useSelector((state: RootState) => state.columnProvider.checkedColumns); // Lấy checkedColumns từ Redux
  const [checkedRows, setCheckedRows] = useState<Record<string, boolean>>({});

// Hàm xử lý chọn từng hàng
const handleRowSelect = (providerId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
  setCheckedRows(prev => ({
    ...prev,
    [providerId]: event.target.checked
  }));
};
  return (
    <Box sx={{ mt: "70px", mx: '10px', height: "100vh", minWidth: "80%" }}>
      <Box display="flex" justifyContent="end" alignItems='' mb={'10px'} gap={4}>
        <AddProviderModal checkedRows={checkedRows}/>
        <DeleteProviderModal checkedRows={checkedRows} data={data}/>
        <UpdateProviderModal checkedRows={checkedRows} data={data}/>
        <ColumnPopover headColumn={head_column_provider} />
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
                {Object.keys(head_column_provider).map(
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
                       {head_column_provider[key]}

                      </TableCell>
                    )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    bgcolor: rowIndex % 2 === 0 ? "white" : "#f9f9f9",
                  }}
                >
                  {Object.keys(head_column_provider).map(
                    (key, colIndex) =>
                      checkedColumns.includes(key) && (
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
                              checked={!!checkedRows[row.provider_id]}
                              onChange={handleRowSelect(row.provider_id)}
                              sx={{ padding: 0 }}
                            />
                          ) : (
                            row[key as keyof typeof row]
                          )}
                        </TableCell>
                      )
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

export default CProvider;
// // =========================
// Cấu hình cột và dữ liệu
const head_column_provider: { [key: string]: string } = {
  select: "Chọn",
  provider_id: "Mã nhà cung cấp",
  provider: "Tên nhà cung cấp",
  phone: "Điện thoại",
  address: "Địa chỉ",
  debt: 'Nợ cần trả hiện tại',
  total_buy: 'Tổng mua'
};

const columnWidths: { [key: string]: string } = {
  select: "40px",
  provider_id: "100px",
  created_at: "200px",
  provider: "300px",
  seller: "150px",
  customer: "150px",
};


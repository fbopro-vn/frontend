"use client";

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import ColumnPopover from '@/app/components/Popover/ColumnPopover'
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store/store';
import AddMaterialModal from "../Modals/AddMaterialModal";
import UpdateMaterialModal from "../Modals/UpdateMaterialModal";
import DeleteMaterialModal from "../Modals/DeleteMaterialModal";
import BodyMerchandiseInput from '@/app/api/Merchandise/BodyMerchandiseInput.json'

const CMerchandiseInput = ({data}: {data: typeof BodyMerchandiseInput}) => {
  const checkedColumns = useSelector((state: RootState) => state.columnMerchandiseInput.checkedColumns); // Lấy checkedColumns từ Redux
  const [checkedRows, setCheckedRows] = useState<Record<string, boolean>>({});
  
  // Hàm xử lý chọn từng hàng
  const handleRowSelect = (materialId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRows(prev => ({
      ...prev,
      [materialId]: event.target.checked
    }));
  };

  return (
    <Box sx={{ mt: "70px", mx: '10px', height: "100vh", minWidth: "80%" }}>
      <Box display="flex" justifyContent="end" alignItems='' mb={'10px'} gap={4}>
        <AddMaterialModal />
        <DeleteMaterialModal checkedRows={checkedRows} data={data}/>
        <UpdateMaterialModal checkedRows={checkedRows} data={data}/>
        <ColumnPopover headColumn={head_column_material} />
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
                {Object.keys(head_column_material).map(
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
                        {head_column_material[key]}

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
      {Object.keys(head_column_material).map((key, colIndex) =>
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
                checked={!!checkedRows[row.material_id]}
                onChange={handleRowSelect(row.material_id)}
                sx={{ padding: 0 }}
              />
            ) : (
              row[key as keyof typeof row]
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

export default CMerchandiseInput;
// // =========================
// Cấu hình cột và dữ liệu
const head_column_material: { [key: string]: string } = {
  select: "Chọn",
  material_id: "Mã vật tư",
  material_name: "Tên vật tư",
  material_group: 'Nhóm vật tư',
  unit: 'Đơn vị tính',
  created_at: "Thời gian tạo"
};

const columnWidths: { [key: string]: string } = {
  select: "40px",
};



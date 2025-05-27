import React, { useState } from 'react'
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSelectedMaterials,
} from '@/app/redux/store/selectors/purchaseSelector';
import {
  updateAmount,
  updateCostPrice,
  removeMaterial,
} from '@/app/redux/features/Purchase/PurchaseSlice';

const CExpenseModal = () => {
    const dispatch = useDispatch();
    const materialList = useSelector(selectSelectedMaterials);
  

   const formatMoney = (value: number | string | undefined) => {
    const num = typeof value === "string" ? Number(value.replace(/\./g, "")) : value ?? NaN;
    if (isNaN(num)) return "";
    return num.toLocaleString("vi-VN");
};


    return (
        <TableContainer
            component={Paper}
            sx={{
                minHeight: 420,
                maxHeight: 422,
                overflowX: "auto",
                overflowY: "auto",
                borderRadius: "10px",
            }}
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                bgcolor: "#8DB883",
                                width: "50px",
                            }}
                        />
                        {Object.keys(head_column_material).map((key, index) => (
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
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {materialList.map((row, rowIndex) => (
                        <TableRow
                            key={rowIndex}
                            sx={{ bgcolor: rowIndex % 2 === 0 ? "white" : "#f9f9f9" }}
                        >
                            <TableCell sx={{ textAlign: "left" }}>
                                <IconButton
                                    onClick={() => dispatch(removeMaterial(row.material_id))}
                                >
                                    <DeleteForeverOutlinedIcon />
                                </IconButton>
                            </TableCell>

                            {Object.keys(head_column_material).map((key, colIndex) => (
                                <TableCell
                                    key={`${rowIndex}-${colIndex}`}
                                    sx={{
                                        textAlign: "center",
                                        whiteSpace: "nowrap",
                                        width: columnWidths[key] || "auto",
                                        minWidth: columnWidths[key] || "100px",
                                        maxWidth: columnWidths[key] || "auto",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {key === "total_price" ? (
                                        <Typography>
                                            {formatMoney((row.amount || 0) * (row.costPrice || 0))}
                                        </Typography>
                                    ) : key === "costPrice" ? (
                                        <TextField
                                            type="text"
                                            value={formatMoney(row[key])}
                                            // onChange={(e) => {
                                            //     const raw = e.target.value.replace(/\./g, "");
                                            //     if (/^\d*$/.test(raw)) {
                                            //         updateMaterialField(rowIndex, key, raw);
                                            //     }
                                            // }}
                                            onChange={(e) => {
                                                const raw = e.target.value.replace(/\./g, "");
                                                if (/^\d*$/.test(raw)) {
                                                  dispatch(updateCostPrice({
                                                    material_id: row.material_id,
                                                    costPrice: Number(raw)
                                                  }));
                                                }
                                              }}
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                width: "120px",
                                                "& .MuiInputBase-root": {
                                                    height: "35px",
                                                },
                                                "& input": {
                                                    textAlign: "center",
                                                },
                                            }}
                                        />
                                    ) : key === "amount" ? (
                                        <TextField
                                            type="number"
                                            value={row[key] || ""}
                                            onChange={(e) => {
                                                const newAmount = Number(e.target.value);
                                                if (newAmount >= 0) {
                                                  dispatch(updateAmount({ material_id: row.material_id, amount: newAmount }));
                                                }
                                              }}
                                            onKeyDown={(e) => {
                                                if (e.key === '-' || e.key === 'e') {
                                                  e.preventDefault();
                                                }
                                            }}
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                width: "80px",
                                                "& .MuiInputBase-root": {
                                                    height: "35px",
                                                },
                                                "& input": {
                                                    textAlign: "center",
                                                },
                                                "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button": {
                                                    opacity: 1, // Giữ spinner luôn hiển thị
                                                    WebkitAppearance: "auto",
                                                },
                                            }}
                                        />
                                    ) : (
                                        row[key as keyof typeof row]
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>


            </Table>
        </TableContainer>

    )
}

export default CExpenseModal



const head_column_material: { [key: string]: string } = {
    material_id: "Mã vật tư",
    material_name: "Tên vật tư",
    amount: "Số lượng",
    costPrice: "Giá nhập",
    total_price: "Thành tiền" //
};



const columnWidths: { [key: string]: string } = {
    material_id: "120px",
    material_name: "200px",
    // ...v.v nếu muốn
};

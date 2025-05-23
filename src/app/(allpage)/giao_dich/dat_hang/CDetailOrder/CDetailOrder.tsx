"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

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

import {
  CheckCircle,
  Save,
  Refresh,
  Print,
  FileDownload,
  ContentCopy,
  Cancel,
  Close
} from "@mui/icons-material";

import ColumnPopover from '@/app/components/Popover/ColumnPopover'
import { Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store/store';
import BodyDetailOrder from '@/app/api/BodyDetailOrder.json'
import BodyCustomer from '@/app/api/BodyCustomer.json'
import BodyMerchandiseOutput from '@/app/api/Merchandise/BodyMerchandiseOutput.json'

const CDetailOrder = ({data}: {data: typeof BodyDetailOrder}) => {
  const [selectedOrderId, setSelectedOrderId] = React.useState<any>(null);
  const [expandedRow, setExpandedRow] = React.useState<number | null>(null); // State để lưu chỉ mục của dòng mở rộng
  const [openDialog, setOpenDialog] = React.useState(false); // State để điều khiển Dialog
  const checkedColumns = useSelector((state: RootState) => state.columnOrder.checkedColumns); // Lấy checkedColumns từ Redux
  const handleRowClick = (rowIndex: number, rowData: any) => {
    setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
    setSelectedOrderId(rowData.order_id); // ✅ chỉ lưu ID
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const selectedOrder = data.find((item) => item.order_id === selectedOrderId);
  const selectedCustomer = BodyCustomer.find(c => c.customer_id === selectedOrder?.customer_id);
  const productListWithId = selectedOrder?.products.map((prod) => {
    const matchedProduct = BodyMerchandiseOutput.find((item) => item.product === prod.name);
    return {
      ...prod,
      product_id: matchedProduct?.product_id,
      total:  prod.amount * prod.salePrice 
    };
  });

  // Tổng tiền hàng
  const totalMerchandise = productListWithId?.reduce((sum, item) => sum + (item.total || 0), 0) || 0;
  const vat = selectedOrder?.vat ?? 0;
  const deposit = selectedOrder?.deposit ?? 0;
  const totalDue = totalMerchandise - vat - deposit;

  return (
    <Box sx={{ mt: "80px", mx: '10px', height: "100vh", minWidth: "80%" }}>
      <Box display="flex" justifyContent="end">
        <ColumnPopover headColumn={head_column_giao_dich_dat_hang}/>
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
                {Object.keys(head_column_giao_dich_dat_hang).map(
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
                        {head_column_giao_dich_dat_hang[key]}
                      </TableCell>
                    )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map(( row : {[key: string]: any}, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    bgcolor: rowIndex % 2 === 0 ? "white" : "#f9f9f9",
                  }}
                  onClick={() => handleRowClick(rowIndex, row)} // Mở rộng thông tin khi click vào dòng
                >
                  {Object.keys(head_column_giao_dich_dat_hang).map(
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
                            cursor: 'pointer'
                          }}
                        > 
                          {typeof row[key] === 'number' ? (
                            row[key].toLocaleString('vi-VN')
                          ) : (
                            row[key]) }
                        </TableCell>
                      )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Dialog - hiển thị thông tin chi tiết đơn hàng */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth
       slotProps={{
        paper: {
          sx: {
            borderRadius: "10px",
          }
        }
      }}
      >
      <DialogTitle sx={{ backgroundColor: "#8DB883", color: "white" }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          Chi tiết đơn hàng
   
          <IconButton sx={{ color: 'white' }} onClick={handleCloseDialog}>
              <Close/>
          </IconButton>
        </Box>
  
      </DialogTitle>
      <DialogContent>
        <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9", borderTop: "2px solid #ddd" }}>
          <Box display="flex" gap={3}>
            <Box sx={{ width: "30%" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Mã đơn hàng:</Typography>
                <Typography>{selectedOrder?.order_id}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Thời gian:</Typography>
                <Typography>{selectedOrder?.date}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Người đặt:</Typography>
                <Typography>{selectedOrder?.seller}</Typography>
              </Box>
            </Box>

  {/* Thêm cột dọc phân cách */}
  <Box sx={{ borderLeft: "1px solid #ccc", height: "auto", mx: 2 }} />  {/* Cột dọc */}
  
            <Box sx={{ width: "40%" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Khách hàng:</Typography>
                <Typography>{selectedOrder?.customer_id} - {selectedOrder?.customer}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Số điện thoại:</Typography>
                <Typography>{selectedCustomer?.phone}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Địa chỉ:</Typography>
                <Typography sx={{ wordWrap: "break-word", maxWidth: "200px", textAlign: "right" }}>
                 {selectedCustomer?.address}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Table */}
          <Box sx={{ width: "100%" }}>
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
                  {productListWithId?.map((row, rowIndex) => (
                    <TableRow key={rowIndex} sx={{ bgcolor: rowIndex % 2 === 0 ? "white" : "#f9f9f9" }}>
                      {Object.keys(head_column_inside).map((key, colIndex) => (
                       <TableCell key={`${rowIndex}-${colIndex}`} sx={{ textAlign: "center" }}>
                       {["costPrice", "salePrice", "total"].includes(key)
                         ? row[key]?.toLocaleString("vi-VN")
                         : row[key]}
                     </TableCell>               
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Financial information */}
          <Box sx={{ marginTop: "20px", width: "100%" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography fontWeight="bold">Tổng tiền hàng:</Typography>
              <Typography fontWeight="bold">{totalMerchandise.toLocaleString("vi-VN")} VND</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography fontWeight="bold">VAT:</Typography>
              <Typography fontWeight="bold">{selectedOrder?.vat.toLocaleString("vi-VN")} VND</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography fontWeight="bold" color="#2E7D32">Khách hàng đã trả:</Typography>
              <Typography fontWeight="bold" color="#2E7D32">{selectedOrder?.deposit.toLocaleString("vi-VN")} VND</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography fontWeight="bold" color="#D32F2F">Khách hàng phải trả:</Typography>
              <Typography fontWeight="bold" color="#D32F2F">{totalDue.toLocaleString("vi-VN")} VND</Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      {/* Buttons */}
      <DialogActions sx={{ justifyContent: "center", padding: "20px" }}>
        <Stack direction="row" spacing={2} sx={{ width: "100%", justifyContent: "end" }}>

          <Button variant="contained" color="primary" startIcon={<Save />}>Lưu</Button>
          <Button variant="contained" color="secondary" startIcon={<Refresh />}>Thanh toán</Button>
          <Button variant="contained" startIcon={<Print />}>In</Button>
          <Button variant="contained" startIcon={<FileDownload />}>Xuất file</Button>
 
          <Button variant="contained" color="error" startIcon={<Cancel />}>Xóa</Button>
        </Stack>
      </DialogActions>
    </Dialog>
    </Box>
  );
};

export default CDetailOrder;
// // =========================
// Cấu hình cột và dữ liệu
const head_column_giao_dich_dat_hang: { [key: string]: string } = {
  order_id: "MDH",
  date: "Ngày tháng",
  vat: "VAT",
  total: "Thành tiền",
  deposit: "Tiền cọc",
  paid: "Đã thanh toán",
  remaining: "Thanh toán còn lại",
  paymentMethod: "Hình thức thanh toán",
  paymentStatus: "Thanh toán",
  seller: "Nhân viên Sale",
  customer: "Khách hàng",
  note: "Ghi chú",
}


const head_column_inside: { [key: string]: string } = {
  product_id: "Mã sản phẩm",
  name: "Tên sản phẩm",
  amount: "Số lượng",
  costPrice: "Giá vốn",
  salePrice: "Đơn giá",
  total: "Thành tiền",
};

const columnWidths: { [key: string]: string } = {
  order_id: "130px",
  date: "120px",
  seller: "150px",
  customer: "150px",
};


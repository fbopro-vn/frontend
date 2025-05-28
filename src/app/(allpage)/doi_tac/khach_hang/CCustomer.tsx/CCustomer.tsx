"use client";

import * as React from "react";
import { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import { Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import ColumnPopover from '@/app/components/Popover/ColumnPopover'
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store/store';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
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
import AddCustomerModal from "../Modals/AddCustomerModal";
import InfoCustomer from "./DetailCustomer/InfoCustomer";
import OrderHistory from "./DetailCustomer/OrderHistory";
import DebtCustomer from "./DetailCustomer/DebtCustomer";
import DebtCustomerModal from './DetailCustomer/DebtCustomerModal/DebtCustomerModal'
import { mutate } from 'swr';
const CCustomer = ({ data }: { data: any[] }) => {

  const checkedColumns = useSelector((state: RootState) => state.columnCustomer.checkedColumns); // Lấy checkedColumns từ Redux
  const [seletedCustomerId, setSelectedCustomerId] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null); // State để lưu chỉ mục của dòng mở rộng

  const handleRowClick = (rowIndex: number, rowData: any) => {
    setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
    setSelectedCustomerId(rowData.id); // ✅ chỉ lưu ID
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [valuePage, setValuePage] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValuePage(newValue);
  };

  const handleDelete = async (id: string) => {
    try {
      // Gọi API xóa khách hàng từ BE
      const response = await fetch(`http://api.fbopro.vn/v1/customers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`, // Lấy token từ localStorage
          'Content-Type': 'application/json', // Optional: Đảm bảo gửi dữ liệu JSON
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete customer');
      }
  
      // Sau khi xóa thành công, làm mới dữ liệu bằng SWR
      mutate('http://api.fbopro.vn/v1/customers'); // Sử dụng SWR để làm mới dữ liệu
  
      // Đóng dialog sau khi xóa thành công
      setOpenDialog(false);
      alert("Customer deleted successfully!");
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Failed to delete customer!");
    }
  };
  

  return (
    <Box sx={{ mt: "70px", mx: '10px', height: "100vh", minWidth: "80%" }}>
      <Box display="flex" justifyContent="end" alignItems='' mb={'10px'} gap={4}>
        <AddCustomerModal/>
        <ColumnPopover headColumn={head_column_customer}/>
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
                {Object.keys(head_column_customer).map(
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
                        {head_column_customer[key]}
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
                  onClick={() => handleRowClick(rowIndex, row)} // Mở rộng thông tin khi click vào dòng
                >
                  {Object.keys(head_column_customer).map(
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
                          {row[key as keyof typeof row]}
                        </TableCell>
                      )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>


              {/* Dialog - hiển thị thông tin chi tiết khách hàng */}
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
          Chi tiết khách hàng
   
          <IconButton sx={{ color: 'white' }} onClick={handleCloseDialog}>
              <Close/>
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={valuePage} onChange={handleChange}>
        <Tab label="Thông tin" />
        <Tab label="Lịch sử đặt hàng" />
        <Tab label="Nợ cần thu từ khách" />
      </Tabs>

      {valuePage === 0 && <InfoCustomer id={seletedCustomerId} data={data}/> }  {/* Hiển thị 'A' nếu valuePage === 1 */}
      {valuePage === 1 && <OrderHistory customer_id={seletedCustomerId}/>}  {/* Hiển thị 'B' nếu valuePage === 2 */}
      {valuePage === 2 && <DebtCustomer customer_id={seletedCustomerId}/>}  {/* Hiển thị 'C' nếu valuePage === 3 */}
    </Box>
      </DialogContent>

      {/* Buttons */}
      <DialogActions sx={{ justifyContent: "center", padding: "20px" }}>
      {valuePage === 0 && 
        <Stack direction="row" spacing={2} sx={{ width: "100%", justifyContent: "end" }}>
          <Button variant="contained" color="success" startIcon={<Save />}>Cập nhật</Button>
          <Button variant="contained" color="error" startIcon={<Cancel />}>Ngừng hoạt động</Button>
          <Button variant="contained" color="error" startIcon={<Cancel />} onClick={() => handleDelete(seletedCustomerId)}>Xóa</Button>
        </Stack>
      }

    {valuePage === 1 && 
            <Stack direction="row" spacing={2} sx={{ width: "100%", justifyContent: "end" }}>
              <Button variant="contained" color="success" startIcon={<FileUploadOutlinedIcon />}>Xuất file</Button>
              {/* <Button variant="contained" color="error" startIcon={<Cancel />}>Ngừng hoạt động</Button>
              <Button variant="contained" color="error" startIcon={<Cancel />}>Xóa</Button> */}
            </Stack>
          }

{valuePage === 2 && 
        <Stack direction="row" spacing={2} sx={{ width: "100%", justifyContent: "end" }}>
            <Button startIcon={<RefreshOutlinedIcon/>} sx={{
                bgcolor: '#0984e3',
                color: 'white'
            }}>Điều chỉnh</Button>
            <DebtCustomerModal/>
            <Button startIcon={<FileUploadOutlinedIcon/>} sx={{
                bgcolor: '#e17055',
                color: 'white'
            }}>Xuất file công nợ</Button>
            <Button startIcon={<FileUploadOutlinedIcon/>} sx={{
                bgcolor: '#6c5ce7',
                color: 'white'
            }}>Xuất file</Button>
        </Stack>
      }

      </DialogActions>
    </Dialog>
      
    </Box>

    
  );
};

export default CCustomer;
// // =========================
const head_column_customer: { [key: string]: string } = {
    id: "Mã khách hàng",
    name: "Khách hàng",
    phone: "Số điện thoại",
    address: "Địa chỉ",
    createdAt: "Thời gian tạo"
  };

const columnWidths: { [key: string]: string } = {
    customer_id: '100px',
    name: "300px",
    address: '400px'
  };
  

"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import CDebtPaymentModal from "./CDebtPaymentModal";
import PaymentModal from "./PaymentModal/PaymentModal";
import ColumnPopover from '@/app/components/Popover/ColumnPopover'
import BodyInvoice from '@/app/api/BodyInvoice.json'
import Autocomplete from "@mui/material/Autocomplete";
import ViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';
import removeVietnameseTones from "@/app/utils/removeVietnameseTones";
import DateFill from '@/app/components/Datetime/DateFill';
import dayjs from "dayjs";
import Tooltip from '@mui/material/Tooltip';

const DebtPaymentModal = () => {
  const [open, setOpen] = useState(false);
  const [checkedRows, setCheckedRows] = useState<{ [key: number]: boolean }>({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

   // Lọc đơn hàng công nợ
   const dataFiltered = BodyInvoice.filter(item => item.remaining > 0)
   // Tính tổng thanh toán còn lại
   const totalDebt = dataFiltered.reduce((total, item) => total + item.remaining, 0)
 
   const [searchInvoiceId, setSearchInvoiceId] = useState("");  // Nhập mã đặt hàng
   const [searchCustomer, setSearchCustomer] = useState(""); // Nhập tên khách hàng
   const [inputValueCustomer, setInputValueCustomer] = useState(""); // Quản lý nội dung ô nhập
   const [openAutoCompleteCustomer, setOpenAutoCompleteCustomer] = useState(false);
 
   const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
 
   // Truyền data lọc
   const [dataInvoicesDebt, setDataInvoicesDebt] = useState<any>([]);
   const applyFilters = () => {
     if (!BodyInvoice || BodyInvoice.length === 0) return;
 
     const lowerCaseInvoiceId = removeVietnameseTones(searchInvoiceId.trim().toLowerCase());
     const lowerCaseCustomer = removeVietnameseTones(searchCustomer.trim().toLowerCase());
 
     const filteredInvoices = BodyInvoice.filter(invoice => {
       const invoiceDate = dayjs(invoice.date, "DD/MM/YYYY");
       // ✅ Lọc theo mã đơn hàng
       const matchesInvoiceId = lowerCaseInvoiceId ? removeVietnameseTones(invoice.invoice_id.toLowerCase()).includes(lowerCaseInvoiceId) : true;
 
       // ✅ Lọc theo tên khách hàng (fulltext-search)
       const matchesCustomer = lowerCaseCustomer
         ? lowerCaseCustomer.split(" ").every(term => removeVietnameseTones(invoice.customer.toLowerCase()).includes(term))
         : true;
 
       const start = dateRange.startDate ? dayjs(dateRange.startDate, "DD/MM/YYYY") : null;
       const end = dateRange.endDate ? dayjs(dateRange.endDate, "DD/MM/YYYY") : null
 
       // ✅ Lọc theo khoảng thời gian
       const matchesDate =
         (!start || invoiceDate.isAfter(start.subtract(1, "day"))) &&
         (!end || invoiceDate.isBefore(end.add(1, "day")));
 
       return matchesInvoiceId && matchesCustomer && matchesDate
     });
     setDataInvoicesDebt(filteredInvoices)
   };
 
   const handleDateChange = (startDate: string, endDate: string) => {
     setDateRange({ startDate, endDate });
     applyFilters(); // Cập nhật bộ lọc khi thay đổi ngày
   };
 
   // Reset Form
   const restForm = () => {
     setSearchInvoiceId("")
     setSearchCustomer("")
     setDateRange({ startDate: "", endDate: "" })
   }
 
   useEffect(() => {
     applyFilters();
   }, [searchInvoiceId, searchCustomer, dateRange]);
  return (
    <Box>
        <Button sx={{
            minWidth: "180px",
            bgcolor: "#8DB883",
            color: "white"
        }}
        onClick={handleOpen}
        >
          Thanh toán công nợ
        </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          width: "95%",
          height: "90%",
          bgcolor: "white",
          mx: "auto",
          mt: "35px",
          borderRadius: "10px",
          overflowY: 'auto'
        }}>
          {/* HeadModal */}
          <Box sx={{
            minHeight: "50px",
            bgcolor: "#8DB883",
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
            color: 'white',
            p: "0 20px",
            position: 'sticky',
            top: '0',
            zIndex: 1000,
          }}>
            <Typography sx={{
              fontSize: "20px",
              fontWeight: 'bold',
              textTransform: 'uppercase'            
            }}>Thanh toán công nợ</Typography>
            <IconButton sx={{ color: 'white' }} onClick={handleClose  }>
              <CloseIcon sx={{ fontSize: "30px" }} />
            </IconButton>
          </Box>

          {/* BodyModal */}
          <Box p='20px 40px 0 40px'>
            <Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10
              }}>
                  {/* <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography sx={{ fontWeight: 'bold' }}>Tìm kiếm</Typography>
                    <IconButton onClick={restForm}>
                      <ViewDayOutlinedIcon />
                    </IconButton>
                  </Box> */}
                  <Box>
                  <Typography sx={{ fontWeight: 'bold' }}>Mã đơn hàng</Typography>
                    <TextField
                      placeholder="Nhập mã đơn hàng"
                      sx={{
                        mb: 2.5,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          height: "40px",
                        },
                        "& input::placeholder": {
                          fontSize: 14,
                        },
                      }}
                      value={searchInvoiceId}
                      onChange={(e) => setSearchInvoiceId(e.target.value)}
                    />
                  </Box>

                  <Box sx={{ minWidth: 200 }}> 
                  <Typography sx={{ fontWeight: 'bold' }}>Nhà cung cấp</Typography>
                  <Autocomplete
                    open={openAutoCompleteCustomer}
                    onOpen={() => {
                      if (inputValueCustomer) setOpenAutoCompleteCustomer(true);
                    }}

                    options={Array.from(
                      new Set(BodyInvoice.map(item => item.customer))
                    )} // 🔹 options là mảng string
                    filterOptions={(options, { inputValue }) => {
                      const query = removeVietnameseTones(inputValue.toLowerCase());
                      return options.filter((option) =>
                        removeVietnameseTones(option.toLowerCase()).includes(query)
                      );
                    }}
                    onClose={() => setOpenAutoCompleteCustomer(false)}
                    inputValue={inputValueCustomer}
                    onInputChange={(_, newInputValue) => {
                      if (inputValueCustomer !== newInputValue) {
                        setInputValueCustomer(newInputValue);
                        setOpenAutoCompleteCustomer(!!newInputValue);
                      }
                    }}
                    value={searchCustomer}
                    onChange={(_, newValue) => {
                      if (typeof newValue === "string") {
                        setSearchCustomer(newValue);
                        setInputValueCustomer(newValue);
                        setOpenAutoCompleteCustomer(false); // ✅ đóng popup sau khi chọn
                      }
                    }}

                    // ✅ Chỉ hiển thị popup khi có ký tự nhập vào

                    renderInput={(params) =>
                      <TextField {...params} placeholder='Nhập tên nhà cung cấp'
                        sx={{
                          width: '100%',
                          mb: 2.5,
                          '& .MuiInputBase-root': {
                            borderRadius: "10px",
                            height: 40,
                            pr: '10px !important', 
                            "& .MuiAutocomplete-endAdornment": { display: "none" } // Chiều cao của input
                          },
                          "& input::placeholder": {
                            fontSize: 14,
                          },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'default', // Màu mặc định của border
                            },
                            '&:hover fieldset': {
                              borderColor: '#8DB883', // Khi hover, border sẽ đổi màu đỏ
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#8DB883', // Khi active (focused), border sẽ đổi màu vàng
                            }
                          }
                        }}
                        value={searchCustomer}
                        onChange={(e) => setSearchCustomer(e.target.value)}
                      />

                    }
                  />
                  </Box>
                  {/* Gợi ý */}
                  

                <Box sx={{                }}>
                  {/* 2 Textfile LỌc thời gian */}
                  <DateFill
                    onDateChange={handleDateChange}
                    dateRange={dateRange}
                  />
                </Box>
                <Tooltip title="Xóa mẫu">
                    <IconButton onClick={restForm}>
                      <ViewDayOutlinedIcon />
                    </IconButton>
                  </Tooltip>
              </Box>

              <Box mt='10px'>
                <Typography sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                }}>Tổng thanh toán còn lại: 25.000.000 VND</Typography>

                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {/* PaymentModal */}
                <PaymentModal checkedRows={checkedRows}/>
                {/* DebtPaymentPopover */}
                <ColumnPopover headColumn={head_column_ke_toan_nhap_chi}/>
                </Box>
              </Box>
            </Box>

            {/* Cbody */}
            <CDebtPaymentModal 
            checkedRows={checkedRows}
            setCheckedRows={setCheckedRows}
            data={dataInvoicesDebt}/>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default DebtPaymentModal;

const head_column_ke_toan_nhap_chi: { [key: string]: string } = {
  select: "Chọn đơn",
  purchase_id: "Mã đơn",
  date: "Ngày tháng",
  vat: "VAT",
  total: "Thành tiền",
  amount_paid: "Đã thanh toán",
  remaining_payment: "Thanh toán còn lại",
  paymentMethod: "Hình thức thanh toán",
  paymentStatus: "Thanh toán",
  provider: "Nhà cung cấp"
};
'use client'

import React, { useState } from 'react'
import  Box  from "@mui/material/Box"
import  Typography  from "@mui/material/Typography"
import  IconButton  from "@mui/material/IconButton"
import SearchTable from "./ToolsTable/SearchTable"
import ColumnPopover from "@/app/components/Popover/ColumnPopover"
import ContentTable from "./ContentTable/ContentTable";

const SpecificTable = () => {
    const [searchText, setSearchText] = useState('');

    return (
        <Box mt= "50px">
            {/* Title */}
            <Box display="flex" justifyContent="center">
                <Typography sx={{
                    mt: "40px",
                    fontSize: '26px',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                }}> Báo cáo chi tiết 
                </Typography>
            </Box>
            

            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                my: '10px'
            }}>
                <SearchTable onSearchChange={setSearchText}/>
                <ColumnPopover headColumn={head_column_ke_toan}/>
            </Box>
            {/* Content */}
            {/* <Box display="flex" justifyContent="center"
                sx={{
                    height: "400px",
                    bgcolor: "#747d8c",
                    border: "2px solid #8DB883",
                    borderRadius: "10px",
                }}
            > */}
            <ContentTable searchText={searchText}/>
 
            {/* </Box> */}
        </Box>
    )
}

export default SpecificTable

const head_column_ke_toan: { [key: string]: string } = {
    invoice_id: "MDH",
    date: "Ngày tháng",
    vat: "VAT",
    total: "Thành tiền",
    deposit: "Tiền cọc",
    paid: "Tiền đã thanh toán",
    remaining: "Thanh toán còn lại",
    paymentMethod: "Hình thức thanh toán",
    paymentStatus: "Thanh toán",
    seller: "Nhân viên Sale",
    customer: "Khách hàng",
  };
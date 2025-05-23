'use client'

import React, { useState } from 'react'
import Box  from "@mui/material/Box"
import Typography  from "@mui/material/Typography"
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
                <ColumnPopover headColumn={head_column_ke_toan_nhap_chi}/>
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

const head_column_ke_toan_nhap_chi: { [key: string]: string } = {
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
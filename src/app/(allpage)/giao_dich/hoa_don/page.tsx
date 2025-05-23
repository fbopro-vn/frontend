'use client'

import { useState } from "react"
import Container from "@mui/material/Container"
import InvoiceSidebar from "../../../components/Sidebar/InvoiceSidebar"
import CInvoice from "./CInvoice/CInvoice"
import BodyInvoice from "@/app/api/BodyInvoice.json"

const Invoice = () => {
    const [filteredData, setFilteredData] = useState<typeof BodyInvoice>([]);
    
    return (
        <Container  disableGutters maxWidth={false} sx={{ display: 'flex', px: '150px'}}>
            {/* Sidebar */}
            <InvoiceSidebar onFilter={(data) => setFilteredData(data)}/>
            {/* Content */}
            <CInvoice data={filteredData}/>
        </Container>
    )
}

export default Invoice
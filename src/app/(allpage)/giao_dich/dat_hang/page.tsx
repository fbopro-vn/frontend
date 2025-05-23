'use client'

import { useState } from "react";
import DetailOrderSidebar from "../../../components/Sidebar/DetailOrderSidebar"
import CDetailOrder from "./CDetailOrder/CDetailOrder"
import BodyDetailOrder from "@/app/api/BodyDetailOrder.json"
import Container from "@mui/material/Container";

const DetailOrder = () => {
    const [filteredData, setFilteredData] = useState<typeof BodyDetailOrder>([]);

    return (
        <Container  disableGutters maxWidth={false} sx={{ display: 'flex', px: '150px'}}>
                {/* Sidebar */}
                <DetailOrderSidebar onFilter={(data) => setFilteredData(data)}/>
                <CDetailOrder data={filteredData}/>
        </Container>
    )
}

export default DetailOrder
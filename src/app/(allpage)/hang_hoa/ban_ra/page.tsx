'use client'
import { useState } from "react"
import Container from "@mui/material/Container"
import CMerchandiseOutput from "./CMerchandiseOutput/CMerchandiseOutput"
import MerchandiseOutputSidebar from "@/app/components/Sidebar/MerchandiseOutputSidebar"
import BodyMerchandiseOutput from "@/app/api/Merchandise/BodyMerchandiseOutput.json"


const MerchandiseOutput = () => {
    const [filteredData, setFilteredData] = useState<typeof BodyMerchandiseOutput>([])
    return (
        <Container disableGutters maxWidth={false} sx={{ display: 'flex', px: '150px'}}>
            <MerchandiseOutputSidebar onFilter={(data) => setFilteredData(data)}/>
            <CMerchandiseOutput data={filteredData}/>
        </Container>
    )
}

export default MerchandiseOutput
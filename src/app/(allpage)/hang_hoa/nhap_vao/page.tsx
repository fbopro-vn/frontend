'use client'
import { useState } from "react"
import Container from "@mui/material/Container"
import CMerchandiseInput from "./CMerchandiseInput/CMerchandiseInput"
import MerchandiseInputSidebar from "@/app/components/Sidebar/MerchandiseInputSidebar"
import BodyMerchandiseInput from "@/app/api/Merchandise/BodyMerchandiseInput.json"


const MerchandiseInput = () => {
    const [filteredData, setFilteredData] = useState<typeof BodyMerchandiseInput>([])
    return (
        <Container disableGutters maxWidth={false} sx={{ display: 'flex', px: '150px'}}>
            <MerchandiseInputSidebar onFilter={(data) => setFilteredData(data)}/>
            <CMerchandiseInput data={filteredData}/>
        </Container>
    )
}

export default MerchandiseInput
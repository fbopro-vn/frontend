'use client'
import { useState } from "react"
import Container from "@mui/material/Container"
import CProvider from "./CProvider/CProvider"
import ProviderSidebar from "@/app/components/Sidebar/ProviderSidebar"
import BodyProvider from "@/app/api/BodyProvider.json"

const Provider = () => {
    const [filteredData, setFilteredData] = useState<typeof BodyProvider>([])

    return (
        <Container disableGutters maxWidth={false} sx={{ display: 'flex', px: '150px'}}>
            <ProviderSidebar onFilter={(data) => setFilteredData(data)}/>
            <CProvider data={filteredData}/>
        </Container>
    )
}

export default Provider
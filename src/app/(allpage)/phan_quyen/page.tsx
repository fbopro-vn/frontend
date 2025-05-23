'use client'
import React, { useState } from 'react'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import UserTable from './ContentTable/UserTable'
import User from '@/app/api/User/User.json'

const AddAccountPage = () => {
  // const [filteredData, setFilteredData] = useState<typeof User>([])

  return (
    <Container disableGutters>
        <UserTable data={User}/>
        {/* Row1 */}
            {/* Add another account */}
          {/* <Divider sx={{ 
            width: '80%',
            mx: 'auto',
            borderBottomWidth: '5px',
            borderRadius: '10px',
            borderColor: "#8DB883" }}/>       */}
    </Container>
  )
}

export default AddAccountPage

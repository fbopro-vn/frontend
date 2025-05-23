'use client'
import { useState, useEffect } from 'react';
import Container from "@mui/material/Container";
import CCustomer from '../khach_hang/CCustomer.tsx/CCustomer';
import CustomerSidebar from "@/app/components/Sidebar/CustomerSidebar";
import useSWR from "swr"; // Import Axios
import useCustomerData from '@/app/hooks/useCustomerData';
const CustomerPartner = () => {
    // const [filteredData, setFilteredData] = useState<any[]>([]); // Dữ liệu đã lọc later
  
    const { customerData, error, isLoading} = useCustomerData("http://api.sdc.com:8000/v1/customers");

    if (error) return <div>Error loading customer data</div>;
    if (isLoading) return <div>Loading...</div>;
   
    return (
        <Container disableGutters maxWidth={false} sx={{ display: 'flex', px: '150px' }}>
            {/* <CustomerSidebar onFilter={setFilteredData} data={customerData} /> */}
            <CCustomer data={customerData} />
        </Container>
    );
};

export default CustomerPartner;

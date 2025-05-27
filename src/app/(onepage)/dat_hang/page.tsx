'use client'
import SearchCat from "./components/header/SearchCat";
import Tabs from "./components/header/Tabs";
import TablePro from "./components/body/TablePro";
import UnderTable from "./components/body/underTable";
import InfoC from "./components/body/InfoCustomer";
import UnderInfo from "./components/body/underInfo";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Profiles from "@/app/components/AppHeader/Profiles";




// ModalCart
import ModalCart from "./components/header/Modal/ModalCart";
import DropdownPrint from "./components/header/Modal/DropdownPrint";
import MenuToc from "./components/header/Modal/MenuToc";

const ShopPage = () => {
    return (
        <Box >
            
            {/* Header */}
            <Box sx={{
                height: '53px',
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                background: "#8DB883",
                position: "relative",

            }}>

                <Box>  <SearchCat />

                </Box>

                <Box
                    sx={{
                        position: "absolute",
                        left: "400px"
                    }}
                >
                    <Tabs />
                </Box>

                <Box sx={{
                    display: 'flex',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    paddingRight: 2
                }}>
                    <ModalCart />
                    <DropdownPrint />
                    <MenuToc />
                </Box>
            </Box>


            <Box
                sx={{

                    display: "flex",
                    marginTop: '20px',
                    marginLeft: '80px',
                }}>


                <Box sx={{
                }}>

                    <TablePro />
                    <UnderTable />
                </Box>
                <Box>

                    <InfoC />
                    <UnderInfo />
                </Box>

            </Box>
        </Box>

    )
}

export default ShopPage;
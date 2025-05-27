'use client'

import React, { useState, useEffect } from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import Image from "next/image";
import LogoSDC from "../../../public/assets/logo_sdc.png";
import Merchandise from "./NavButton/Merchandise";
import Accountant from "./NavButton/Accountant";
import Partner from "./NavButton/Partner";
import Report from "./NavButton/Report";
import Transaction from "./NavButton/Transaction";
import Profiles from "./Profiles";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { Popover, List, ListItem, ListItemText } from '@mui/material';
import { usePathname } from "next/navigation";
import { getActiveMenuKey } from '@/app/utils/menuHighlights';
import { RootState } from '@/app/redux/store/store'
import { useDispatch, useSelector } from 'react-redux'

const AppHeader = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const role = user?.role;
    // console.log('Người dùng hiện tại', user)
    const isAdmin = role === 'admin';
    const isAccountant = role === 'accountant';
    const isSaleOrAccountant = role === 'sale' || role === 'accountant';

    const pathname = usePathname();
    const isActive = getActiveMenuKey(pathname);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1100, // cao hơn modal hoặc content
                width: "100%",
                bgcolor: "#8DB883",
                height: "53px",
            }}
        >
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: "10px",
                }}
            >
                {/* Left Header */}
                <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
                    <IconButton onClick={handleMenuClick} sx={{ color: "white" }}>
                        <MenuIcon />
                    </IconButton>
                </Box>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    <List>
                        <ListItem component={Link} href="/">
                            <ListItemText primary="Tổng quan" />
                        </ListItem>
                        <ListItem component={Link} href="/hang_hoa">
                            <ListItemText primary="Hàng hóa" />
                        </ListItem>
                        <ListItem component={Link} href="/dat_hang">
                            <ListItemText primary="Đặt hàng" />
                        </ListItem>
                        <ListItem component={Link} href="/van_hanh">
                            <ListItemText primary="Vận hành" />
                        </ListItem>
                        {/* Có thể thêm các mục khác: Transaction, Partner, Report... nếu cần */}
                    </List>
                </Popover>

                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Link href="/">
                        <Button
                            startIcon={<HomeIcon />}
                            sx={{
                                color: "white",
                                minWidth: '135px',
                                backgroundColor: isActive === 'overview' ? "#4CAF50" : "transparent"
                            }}

                        >
                            Tổng quan
                        </Button>
                    </Link>
                    {isAdmin && <Merchandise />}
                    {isAdmin && <Transaction />}
                    {isAdmin && <Partner />}
                    {(isAdmin || isAccountant) && <Accountant />}
                    {/* {<Merchandise />}
                    {<Transaction />}
                    {<Partner />}
                    {<Accountant />} */}
                    {/* <Merchandise/>
                    <Transaction />
                    <Partner />
                    {/* <Report /> 
                    <Accountant /> */}
                </Box>
                {/* Right Header */}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    {/* <Link href="/van_hanh">
                        <Button
                            startIcon={<CategoryOutlinedIcon />}
                            sx={{ color: "white", minWidth: '135px', backgroundColor: isActive === 'operate' ? "#4CAF50" : "transparent"}}                   
                        >
                            Vận hành
                        </Button>
                    </Link> */}
                    <Link href="/dat_hang">
                        <Button
                            startIcon={<ShoppingCartOutlinedIcon />}
                            sx={{ color: "white", minWidth: '135px', backgroundColor: isActive === 'order' ? "#4CAF50" : "transparent" }}

                        >
                            Đặt hàng
                        </Button>
                    </Link>

                    <Profiles />

                </Box>
            </Box>
        </Box>

    );

};


export default AppHeader;

'use client';

import React, { useState } from 'react';
import { Button, Popover, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import TocIcon from '@mui/icons-material/Toc';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from 'next/link';

const MenuToc: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Button sx={{
                color: "#fff"
            }}onClick={handleClick}>
                <TocIcon fontSize="large" />
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <List>
                    <ListItemButton onClick={handleClose}>
                        <ListItemIcon>
                            <VisibilityIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tuỳ chọn hiển thị" />
                    </ListItemButton>
                    <ListItemButton component={Link} href={'/'} onClick={handleClose}>
                        <ListItemIcon>
                            <ManageAccountsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Quản lý" />
                    </ListItemButton>
                    <ListItemButton component={Link} href={'/logout'}  onClick={handleClose}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Đăng xuất" />
                    </ListItemButton>
                </List>
            </Popover>
        </>
    );
};

export default MenuToc;

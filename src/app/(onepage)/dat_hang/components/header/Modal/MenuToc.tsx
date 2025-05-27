'use client';

import React, { useState } from 'react';
import {
  Button,
  Popover,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import TocIcon from '@mui/icons-material/Toc';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const MenuToc: React.FC = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      let userId = null;

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          userId = parsedUser?.id;
        } catch (err) {
          console.error("❌ Lỗi khi parse user:", err);
        }
      }

      localStorage.removeItem('access_token');
      if (userId) {
        localStorage.removeItem(`session_id_${userId}`);
        localStorage.removeItem(`orderState-session-${userId}`);
      }
      localStorage.removeItem('user');
    }

    router.push('/login');
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Button sx={{ color: "#fff" }} onClick={handleClick}>
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
          <ListItemButton component={Link} href="/" onClick={handleClose}>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý" />
          </ListItemButton>
          <ListItemButton onClick={handleLogout}>
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

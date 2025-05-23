'use client'

import React from 'react'
import Box from "@mui/material/Box"
import Link from "next/link";
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import Logout from '@mui/icons-material/Logout';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store/store';


const Profiles = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = useSelector((state: RootState) => state.user.user);
  const role = user?.role;

  // const isAdmin = role === 'admin';
  // const isSaleOrAccountant = role === 'sale' || role === 'ketoan';

  return (
    <Box>
      <Tooltip title={user?.fullname || ''}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'account-menu-profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 30, height: 30 }}
            alt={user?.fullname || 'User'}
            src={'/images/default-avatar.jpg'}
          />
        </IconButton>
      </Tooltip>

      <Menu
        id="account-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 3,
          },
        }}
      >
        {/* {(isAdmin || isSaleOrAccountant) && (
          <MenuItem component={Link} href="/ca_nhan">
            <Avatar sx={{ width: 28, height: 28, mr: 2 }} />
            Thông tin cá nhân
          </MenuItem>
        )}

        {isAdmin && [
          <Divider key="divider1" />,
          <MenuItem key="user-manage" component={Link} href="/phan_quyen">
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Quản lý người dùng
          </MenuItem>,
          <MenuItem key="store-design" component={Link} href="/phan_quyen">
            <ListItemIcon>
              <StorefrontOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Thiết kế cửa hàng
          </MenuItem>,
          <MenuItem key="system-design" component={Link} href="/phan_quyen">
            <ListItemIcon>
              <SettingsSuggestOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Thiết kế hệ thống
          </MenuItem>,
        ]}


        {(isAdmin || isSaleOrAccountant) && [
          <Divider key="divider2" />,
          <MenuItem key="logout" component={Link} href="/logout">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Đăng xuất
          </MenuItem>,
        ]} */}

          <MenuItem component={Link} href="/ca_nhan">
            <Avatar sx={{ width: 28, height: 28, mr: 2 }} />
            Thông tin cá nhân
          </MenuItem>

          <Divider key="divider1" />
          <MenuItem key="user-manage" component={Link} href="/phan_quyen">
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Quản lý người dùng
          </MenuItem>
          <MenuItem key="store-design" component={Link} href="/phan_quyen">
            <ListItemIcon>
              <StorefrontOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Thiết kế cửa hàng
          </MenuItem>
          <MenuItem key="system-design" component={Link} href="/phan_quyen">
            <ListItemIcon>
              <SettingsSuggestOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Thiết kế hệ thống
          </MenuItem>

          <Divider key="divider2" />
          <MenuItem key="logout" component={Link} href="/logout">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Đăng xuất
          </MenuItem>
  
      </Menu>
    </Box>
  );
};

export default Profiles;



'use client'

import React from 'react'
import Link from 'next/link'
import Box from "@mui/material/Box"
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import { usePathname } from 'next/navigation'
import { getActiveMenuKey } from '@/app/utils/menuHighlights'
const Partner = () => {
  const pathname = usePathname();
  const isActive = getActiveMenuKey(pathname);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        sx={{
          color: "white",
          minWidth: '135px',
          backgroundColor: isActive === 'partner' ? "#4CAF50" : "transparent",
        }}
        id="basic-button-partner"
        aria-controls={open ? 'basic-menu-partner' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<HandshakeOutlinedIcon/>}
        endIcon={<ExpandMoreIcon />}
      >
        Đối tác
      </Button>
      <Menu
        id="basic-menu-partner "
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 3, // Điều chỉnh độ bóng
          }
        }}
      >
        <MenuItem component={Link} href='/doi_tac/khach_hang'>
          <ListItemIcon>
            <GroupsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Khách hàng</ListItemText>

        </MenuItem>
        <MenuItem component={Link} href='/doi_tac/nha_cung_cap'>
          <ListItemIcon>
            <PrecisionManufacturingOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Nhà cung cấp</ListItemText>
         
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Partner;
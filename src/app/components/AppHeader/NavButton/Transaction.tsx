'use client'

import React from 'react'
import Box from "@mui/material/Box"
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import ContentPaste from '@mui/icons-material/ContentPaste'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import Link from 'next/link'
import { usePathname} from 'next/navigation'
import { getActiveMenuKey } from '@/app/utils/menuHighlights'

const Trasiction = () => {
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
          backgroundColor:  isActive === 'transaction'  ? "#4CAF50" : "transparent",
        }}
        id="basic-button-trasiction"
        aria-controls={open ? 'basic-menu-trasiction' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<ChangeCircleOutlinedIcon/>}
        endIcon={<ExpandMoreIcon />}
      >
        Giao dịch
      </Button>
      <Menu
        id="basic-menu-trasiction "
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 3, // Điều chỉnh độ bóng
          }
        }}
      >
        <MenuItem component={Link} href='/giao_dich/dat_hang'>
          <ListItemIcon>
            <ShoppingBagOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Đặt hàng</ListItemText>

        </MenuItem>
        <MenuItem component={Link} href='/giao_dich/hoa_don'>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Hóa đơn</ListItemText>
         
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Trasiction;
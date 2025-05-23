"use client";

import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { usePathname } from "next/navigation";
import { getActiveMenuKey } from "@/app/utils/menuHighlights";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

const Merchandise = () => {
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
          backgroundColor: isActive === 'merchandise' ? "#4CAF50" : "transparent",
        }}
        id="basic-button-merchandise"
        aria-controls={open ? "basic-menu-merchandise" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={<Inventory2OutlinedIcon />}
        endIcon={<ExpandMoreIcon />}
      >
        Hàng hóa
      </Button>

      <Menu
        id="basic-menu-merchandise"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 3,
          },
        }}
      >
        <MenuItem
          component={Link}
          href="/hang_hoa/nhap_vao"
        >
          <ListItemIcon>
            <LayersOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Hàng hóa nhập vào</ListItemText>
        </MenuItem>

        <MenuItem
          component={Link}
          href="/hang_hoa/ban_ra"
        >
          <ListItemIcon>
            <LayersOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Hàng hóa bán ra</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Merchandise;




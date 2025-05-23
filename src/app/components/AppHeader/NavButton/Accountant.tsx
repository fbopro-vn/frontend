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
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import { usePathname } from "next/navigation";
import { getActiveMenuKey } from "@/app/utils/menuHighlights";

const Accountant = () => {
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
          backgroundColor: isActive === 'accountant' ? "#4CAF50" : "transparent",
        }}
        id="basic-button-accountant"
        aria-controls={open ? "basic-menu-accountant" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={<CalculateOutlinedIcon />}
        endIcon={<ExpandMoreIcon />}
      >
        Kế toán
      </Button>

      <Menu
        id="basic-menu-accountant"
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
          href="/nhap_chi"
        >
          <ListItemIcon>
            <LayersOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Nhập chi</ListItemText>
        </MenuItem>

        <MenuItem
          component={Link}
          href="/nhap_thu"
          onClick={() => {
          }}
        >
          <ListItemIcon>
            <LayersOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Nhập thu</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Accountant;




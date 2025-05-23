"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";
import Image from "next/image";
import LightModeIcon from "@mui/icons-material/LightMode";
import pages from '@/app/utils/page.json';


const settings = ["Profile", "Account", "Dashboard", "Logout"];

function AppHeader() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [menuAnchors, setMenuAnchors] = React.useState<{
    [key: string]: HTMLElement | null;
  }>({});

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenSubMenu = (
    event: React.MouseEvent<HTMLElement>,
    page: string
  ) => {
    setMenuAnchors((prev) => ({ ...prev, [page]: event.currentTarget }));
  };
  const handleCloseSubMenu = (page: string) => {
    setMenuAnchors((prev) => ({ ...prev, [page]: null }));
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: " #fff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mx: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link href={"/"} className="navbar-brand">
              <Image
                src="/assets/logo_sdc.png"
                width={100}
                height={84}
                quality={100}
                alt="sdc"
              />
            </Link>
          </Typography>

          <Box
  sx={{
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  {pages.map((page) => (
    <div key={page.page}>
      {page.childrenPage.length > 0 ? (
        <>
          <Button
            onClick={(event) => handleOpenSubMenu(event, page.page)}
            sx={{
              my: 2,
              color: "#1A1B1E",
              display: "flex",
              alignItems: "center",
            }}
          >
            {page.page} <ArrowDropDownIcon sx={{ ml: 0.5 }} />
          </Button>
          <Menu
            anchorEl={menuAnchors[page.page]}
            open={Boolean(menuAnchors[page.page])}
            onClose={() => handleCloseSubMenu(page.page)}
          >
            {page.childrenPage.map((subPage) => (
              <MenuItem
                key={subPage.name}
                onClick={() => handleCloseSubMenu(page.page)}
              >
                <Link href={subPage.url} style={{ textDecoration: "none", color: "#1A1B1E" }}>
                  {subPage.name}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <Button sx={{ my: 2, color: "#1A1B1E", display: "block" }}>
          <Link href={page.url} style={{ textDecoration: "none", color: "#1A1B1E" }}>
            {page.page}
          </Link>
        </Button>
      )}
    </div>
  ))} 
  {/* <Button sx={{ display: 'flex', 
    alignItems: 'center',
    justifyContent: 'space-center',
    mx: '2px', 
    width: "150px",
    border: "2px solid",
    borderRadius: "8px",
    color: '#fff',
    backgroundColor: "#EE0000"
    }}>

  <span>Liên Hệ</span>
  <PhoneEnabledIcon sx={{ ml: 1}} />


</Button> */}

{/* <Button sx={{ display: 'flex', 
    alignItems: 'center',
    justifyContent: 'space-center',
    mx: '2px',
    backgroundColor: "#fff",
    
    borderRadius: "8px",
       color: 'orange'
 }}>
  <LightModeIcon         
  /> */}
{/* </Button> */}
</Box>


          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppHeader;

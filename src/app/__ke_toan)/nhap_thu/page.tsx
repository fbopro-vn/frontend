// 'use client'

// import React, { useState } from 'react';
// import { Container, Box, Drawer, ListItem, IconButton, Divider, MenuItem, Menu } from '@mui/material';
// import { ChevronLeft, ChevronRight, Menu as MenuIcon, Home, AccountBox, LocalShipping, Business, FileCopy } from '@mui/icons-material';
// import ButtonBar from "../ButtonBar"; 
// import BodyContent from "../BodyContent"; 
// import HeadContent from "../HeadContent"; 
// import ListSubheader from '@mui/material/ListSubheader';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Collapse from '@mui/material/Collapse';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import DraftsIcon from '@mui/icons-material/Drafts';
// import SendIcon from '@mui/icons-material/Send';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import StarBorder from '@mui/icons-material/StarBorder';
// import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import Link from 'next/link'

// const drawerWidth = 240;


// const ShopManager = () => {
//   const [open, setOpen] = useState(false); // Trạng thái của Drawer
//   const [openAccountantPage, setOpenAccountantPage] = useState(true); // Trạng thái của Kế Toán
//   // const [openSalePage, setOpenSalePage] = useState(true); // Trạng thái của Kế Toán
//   // const [openAccountantPage, setOpenAccountantPage] = useState(true); // Trạng thái của Kế Toán
//   // const [openAccountantPage, setOpenAccountantPage] = useState(true); // Trạng thái của Kế Toán
//   // const [openAccountantPage, setOpenAccountantPage] = useState(true); // Trạng thái của Kế Toán

//   const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Trạng thái của dropdown

//   const handleDrawerToggle = () => {
//     setOpen(!open);  // Đóng/mở Drawer
//   };

//   const handlePageClick = () => {
//     setOpenAccountantPage(!openAccountantPage);  // Đóng/mở Drawer
//   };

//   const handleDropdownToggle = (page: string) => {
//     // Mở/đóng dropdown cho mỗi page
//     setOpenDropdown(openDropdown === page ? null : page);
//   };

//   return (
//     <Container disableGutters maxWidth={false} sx={{ height:'100vh', display: 'flex', position: 'relative' }} >
//       {/* Icon để mở Drawer */}
//       <IconButton
//         edge="start"
//         color="inherit"
//         aria-label="menu"
//         sx={{ 
//           mr: 2,
//           position: 'fixed',
//           top: '20px',
//           left: "40px",
//         }}
//         onClick={handleDrawerToggle}
//       >
//         <MenuIcon sx={{ fontSize: "30px" }} />
//       </IconButton>

//       {/* Sidebar (Drawer) */}
//       <Drawer
//         sx={{
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             height: '100%',
//             boxSizing: 'border-box',
//             backgroundColor: '#f9f9f9',
//             paddingTop: '16px',
//             position: 'relative',
//           },
//         }}
//         variant="temporary"
//         anchor="left"
//         open={open}
//         onClose={handleDrawerToggle}
//         ModalProps={{
//           keepMounted: true,
//         }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '10px' }}>
//           <IconButton onClick={handleDrawerToggle}>
//             {open ? <ChevronLeft /> : <ChevronRight />}
//           </IconButton>
//         </Box>

//         <List
//       sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
//       component="nav"
//       aria-labelledby="nested-list-subheader"
//     >
//       <ListItemButton>
//         <ListItemIcon>
//           <Link href='/'>
//             <Home />
//           </Link>
//         </ListItemIcon>
//         <ListItemText primary="Trang chủ" />
//       </ListItemButton>

//       <ListItemButton>
//         <ListItemIcon>
//           <SendIcon />
//         </ListItemIcon>
//         <ListItemText primary="Trello" />
//       </ListItemButton>

//       <ListItemButton>
//         <ListItemIcon>
//           <VolunteerActivismIcon />
//         </ListItemIcon>
//         <ListItemText primary="Vận hành sản xuất" />
//       </ListItemButton>


//         {/* 1 */}
//       <ListItemButton onClick={handlePageClick}>
//         <ListItemIcon>
//           <InboxIcon />
//         </ListItemIcon>
//         <ListItemText primary="Kế toán" />
//         {openAccountantPage ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//       <Collapse in={openAccountantPage} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </ListItemButton>
//         </List>

//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </ListItemButton>
//         </List>

//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </ListItemButton>
//         </List>

//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </ListItemButton>
//         </List>
//       </Collapse>


//         {/* 2 */}
//         <ListItemButton onClick={handlePageClick}>
//         <ListItemIcon>
//           <InboxIcon />
//         </ListItemIcon>
//         <ListItemText primary="Bán hàng" />
//         {openAccountantPage ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//       <Collapse in={openAccountantPage} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </ListItemButton>
//         </List>

//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </ListItemButton>
//         </List>

//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </ListItemButton>
//         </List>

//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </ListItemButton>
//         </List>
//       </Collapse>

//           {/* 3*/}
//           <ListItemButton onClick={handlePageClick}>
//         <ListItemIcon>
//           <InboxIcon />
//         </ListItemIcon>
//         <ListItemText primary="Sản xuất" />
//         {openAccountantPage ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//       <Collapse in={openAccountantPage} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </ListItemButton>
//         </List>

//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </ListItemButton>
//         </List>

//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </ListItemButton>
//         </List>

//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </ListItemButton>
//         </List>
//       </Collapse>


//         {/* 4 */}
//         <ListItemButton onClick={handlePageClick}>
//         <ListItemIcon>
//           <InboxIcon />
//         </ListItemIcon>
//         <ListItemText primary="Văn bản quy định" />
//         {openAccountantPage ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//       <Collapse in={openAccountantPage} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </ListItemButton>
//         </List>

//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </ListItemButton>
//         </List>

//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </ListItemButton>
//         </List>

//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </ListItemButton>
//         </List>
//       </Collapse>


//       <ListItemButton>
//         <ListItemIcon>
//           <ShoppingCartOutlinedIcon />
//         </ListItemIcon>
//         <ListItemText primary="Đặt hàng" />
//       </ListItemButton>

//     </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           bgcolor: 'background.default',
//           p: 3,
//           transition: 'margin-left 0.3s ease',
//           marginLeft: open ? `${drawerWidth}px` : '0',
//         }}
//       >
//         <ButtonBar />
//         <HeadContent />
//         <BodyContent />
//       </Box>
//     </Container>
//   );
// }

// export default ShopManager;








'use client'

import React, { useState } from 'react';
import { Container, Box, Drawer, ListItem, IconButton, Divider, MenuItem, Menu } from '@mui/material';
import { ChevronLeft, ChevronRight, Menu as MenuIcon, Home, AccountBox, LocalShipping, Business, FileCopy } from '@mui/icons-material';
import ButtonBar from "../ButtonBar"; 
import BodyContent from "../BodyContent"; 
import HeadContent from "../HeadContent"; 
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Link from 'next/link'



const ShopManager = () => {


  return (
    <Container disableGutters maxWidth={false} sx={{ height:'100vh' }} >
      {/* Main Content */}
        <ButtonBar />
        <HeadContent />
        <BodyContent />

    </Container>
  );
}

export default ShopManager;

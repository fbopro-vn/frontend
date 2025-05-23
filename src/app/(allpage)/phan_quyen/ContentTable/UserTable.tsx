'use client'
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store/store';
import User from '@/app/api/User/User.json'
import removeVietnameseTones from '@/app/utils/removeVietnameseTones';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchTable from '../Tool/SearchTable'
import ColumnPopover from '@/app/components/Popover/ColumnPopover'
import AddUserModal from '../Modal/AddUserModal'
import AddRoleModal from '../Modal/AddRoleModal'
import DeleteUserModal from '../Modal/DeleteUserModal'
import UpdateUserModal from '../Modal/UpdateUserModal'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Modal from '@mui/material/Modal';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'; // Nếu bạn dùng <Close /> như trong Dialog
import InfoUser from './DetailUser/InfoUser';
import PermissionUser from './DetailUser/PermissionUser';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CancelIcon from '@mui/icons-material/Cancel';

const ContentTable = ({ data }: { data: typeof User }) => {
  const [searchText, setSearchText] = useState('');
  const checkedColumns = useSelector((state: RootState) => state.columnUser.checkedColumns); // Lấy checkedColumns từ Redux
  const [checkedRows, setCheckedRows] = useState<Record<string, boolean>>({});

  const [openAddRole, setOpenAddRole] = useState(false);
  const [openModal, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<any>(null);

  const handleOpenDialog = (userId: string) => {
    setSelectedUserId(userId);
    setOpenDialog(true);
  };

  const handleCloseModal = () => {
    setOpenDialog(false);
  };
  const handleOpenAddRole = () => {
    setOpenAddRole(true);
  }
  // Hàm xử lý chọn từng hàng
  const handleRowSelect = (userId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRows(prev => ({
      ...prev,
      [userId]: event.target.checked
    }));
  };
  
  const normalizedSearch = searchText.trim().toLowerCase();

  const filteredData = User.filter(item => {
    const matchesSearch = Object.values(item).some(value =>
      removeVietnameseTones(String(value)).includes(removeVietnameseTones(normalizedSearch))
    );
    return matchesSearch;
  });

  const handleToggleActive = (userId: string) => {
    const updatedData = data.map(user =>
      user._id === userId ? { ...user, is_active: !user.is_active } : user
    );

    // Change page:
    // Nếu bạn dùng setState để render lại UI:
    // setData(updatedData); 👈 nếu có
    // hoặc trigger mutate nếu dùng SWR

    console.log("Updated trạng thái:", updatedData);
  };

  const [valuePage, setValuePage] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValuePage(newValue);
  };
  return (
    <Box mb='60px'>
      {/* Title */}
      <Box display="flex" justifyContent="center">
        <Typography sx={{
          mt: "40px",
          fontSize: '26px',
          fontWeight: 700,
          textTransform: 'uppercase'
        }}> Quản lý nhân viên
        </Typography>
      </Box>

      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: 'center',
        my: '20px'
      }}>
        <SearchTable onSearchChange={setSearchText} />
        <Box sx={{
          display: 'flex',
          gap: 2
        }}>
          {/* AddUserModal */}
          <Box>
            <Button sx={{ bgcolor: '#8DB883', color: 'white' }} startIcon={<AddOutlinedIcon />} onClick={handleOpenAddRole}>Thêm vai trò</Button>
            <AddRoleModal open={openAddRole} onClose={() => setOpenAddRole(false)} />
          </Box>
          <AddUserModal />
          <DeleteUserModal checkedRows={checkedRows} data={data} />
          <UpdateUserModal checkedRows={checkedRows} data={data} />
          {/*  */}
          <ColumnPopover headColumn={head_column} />
        </Box>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          mt: "30px",
          mb: "10px",
          maxHeight: 477,
          overflowX: "auto",
          overflowY: "auto", // Thêm cuộn dọc nếu cần
          borderRadius: "10px",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {Object.keys(head_column).map(
                (key, index) =>
                  checkedColumns.includes(key) && (
                    <TableCell
                      key={index}
                      sx={{
                        bgcolor: "#8DB883",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textAlign: key === "birthday" || key === "is_active" || key === 'select' ? "center" : "left",
                        width: "auto", // Đảm bảo chiều rộng đồng nhất
                        minWidth: "100px", // Đảm bảo min-width cho các cột
                        maxWidth: "auto", // Đảm bảo max-width cho các cột
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {head_column[key]}
                    </TableCell>
                  )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((row: { [key: string]: any }, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  bgcolor: rowIndex % 2 === 0 ? "white" : "#f9f9f9", cursor: 'pointer'
                }}
              >
                {Object.keys(head_column).map((key, colIndex) => {
                  const isCheckbox = key === "select";
                  return (
                    checkedColumns.includes(key) && (
                      <TableCell
                        key={`${rowIndex}-${colIndex}`}
                        sx={{
                          textAlign: isCheckbox || key === "birthday" || key === "is_active" ? "center" : "left",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        onClick={() => !isCheckbox && handleOpenDialog(row._id)} // ⚠️ Không click checkbox thì mới mở dialog
                      >
                        {isCheckbox ? (
                          <Checkbox
                            checked={!!checkedRows[row._id]}
                            onChange={handleRowSelect(row._id)}
                            sx={{ padding: 0 }}
                            onClick={(e) => e.stopPropagation()} // Ngăn lan sự kiện click
                          />
                        ) : key === "is_active" ? (
                          <Typography>{row[key] ? "Đang hoạt động" : "Ngừng hoạt động"}</Typography>
                        ) : (
                          typeof row[key] === "number"
                            ? row[key].toLocaleString("vi-VN")
                            : row[key]
                        )}
                      </TableCell>
                    )
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* DetailUser */}
      <Modal
  open={openModal}
  onClose={handleCloseModal}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      bgcolor: 'background.paper',
      boxShadow: 24,
      borderRadius: 2,
      maxHeight: '90vh'
    }}
  >
    {/* Header */}
    <Box sx={{
       backgroundColor: "#8DB883", // Nền đỏ
       textAlign: "center", // Căn giữa chữ
       color: "white", // Chữ trắng
       fontWeight: "bold",
       fontSize: "18px",
       px: 2,
       minHeight: '50px',
       borderTopLeftRadius: 8,
       borderTopRightRadius: 8,
       display: 'flex',
       justifyContent: 'space-between',
       alignItems: 'center'
    }}>
      <Typography sx={{
          fontSize: '20px',
          fontWeight: 'bold'
      }}>
          Chi tiết nhân viên
      </Typography>

      <IconButton onClick={handleCloseModal}>
          <CloseIcon sx={{ color: 'white' }} />
      </IconButton>
    </Box>

      {/* Body */}
    <Box sx={{ 
      width: '100%',
      minHeight: '700px',
      maxHeight: '700px',
      bgcolor: 'background.paper',
      overflowY: 'auto'
     }}>
      <Tabs value={valuePage} onChange={handleChange}>
        <Tab label="Thông tin" />
        <Tab label="Phân quyền người dùng" />
      </Tabs>

      {valuePage === 0 && <InfoUser _id={selectedUserId} />}
      {valuePage === 1 && <PermissionUser user_id={selectedUserId} />}
    </Box>

      {/* Footer */}
    <Box sx={{ paddingRight: 2, paddingBottom: 2 }}>
      {valuePage === 0 && (
        <Stack direction="row" spacing={2} sx={{ width: "100%", justifyContent: "end" }}>
          <Button variant="contained" color="error" startIcon={<CancelIcon />}>Ngừng hoạt động</Button>
        </Stack>
      )}
      {valuePage === 1 && (
        <Stack direction="row" spacing={2} sx={{ width: "100%", justifyContent: "end", mt: 2 }}>
          <Button variant="contained" color="success" startIcon={<CheckOutlinedIcon />}>Xác nhận</Button>
        </Stack>
      )}
    </Box>
  </Box>
  </Modal>

    </Box>


  )
}

export default ContentTable


const head_column: { [key: string]: string } = {
  select: "Chọn",
  fullname: "Họ và tên",
  username: "Tên đăng nhập",
  role_name: "Vai trò",
  phone: "Số điện thoại",
  email: "Email",
  birthday: "Ngày sinh",
  is_active: "Trạng thái hoạt động"
}
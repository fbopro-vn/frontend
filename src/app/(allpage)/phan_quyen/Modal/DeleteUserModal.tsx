import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { toast } from 'react-toastify';

type User = {
  id: string;
  username: string;
  [key: string]: any;
};

const DeleteUserModal = ({
  checkedRows,
  data,
  onDeleted, // callback để parent refresh data
}: {
  checkedRows: Record<string, boolean>;
  data: User[];
  onDeleted?: () => void;
}) => {
  const isDisabled = !Object.values(checkedRows).some(Boolean);
  const [select, setSelect] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedUsers = data.filter((item) => checkedRows[item.id]);
  const selectedUserIds = selectedUsers.map((item) => item.id);

  const handleDelete = async () => {
    if (selectedUserIds.includes('US1')) {
      toast.error("Không được xóa admin gốc (US1)!");
      return;
    }

    setLoading(true);
    try {
      const accessToken = localStorage.getItem("access_token");
      // Gọi API xóa hàng loạt
      await axios.post(
        `http://api.sdc.com:8000/v1/users/delete-multiple`,
        { userIds: selectedUserIds },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(`Đã xóa ${selectedUserIds.length} người dùng`);
      setSelect(false);
      if(onDeleted) onDeleted(); // refresh dữ liệu parent nếu có
    } catch (error) {
      console.error(error);
      toast.error("Xóa người dùng thất bại, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Button
        sx={{ width: "100px" }}
        variant="outlined"
        startIcon={<DeleteForeverOutlinedIcon />}
        onClick={() => setSelect(true)}
        disabled={isDisabled}
      >
        Xóa
      </Button>

      <Modal open={select} onClose={() => setSelect(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "25%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              backgroundColor: "#8DB883",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
              p: 3,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              Xóa người dùng
            </Typography>
            <IconButton onClick={() => setSelect(false)}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>

          {/* Body */}
          <Box sx={{ minHeight: "100px", p: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <DeleteForeverOutlinedIcon sx={{ color: "#d63031" }} />
              <Typography fontWeight="bold" color="#d63031" fontSize="16px">
                Bạn đang xóa {selectedUserIds.length} người dùng:
              </Typography>
            </Box>

            <Box
              sx={{
                maxHeight: "150px",
                overflowY: "auto",
                bgcolor: "#f9f9f9",
                p: 2,
                borderRadius: 1,
                border: "1px solid #eee",
              }}
            >
              {selectedUsers.map((item, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#2d3436",
                    borderBottom: "1px dashed #ddd",
                    py: 0.5,
                  }}
                >
                  Tên đăng nhập: {item.username}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: 2,
              p: 2,
            }}
          >
            <Button
              sx={{ bgcolor: "#8DB883", width: "100px", color: "white" }}
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Đang xóa..." : "Xác nhận"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default DeleteUserModal;

'use client'

import React, { useState } from 'react'
import {
    Box,
    Typography,
    Modal,
    Checkbox,
    FormControlLabel,
    Collapse,
    IconButton,
    Button,
    TextField,
    Tooltip
} from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import useRoleData from '@/app/hooks/useRoleData';

type PermissionGroup = {
    label: string
    permissions: {
        label: string
        children?: string[]
    }[]
}


const systemPermissions = [
    {
        label: 'Xem thông tin chung của hàng hóa, giao dịch, đối tác',
        tooltip: 'Cho phép xem tất cả thông tin không giới hạn theo bộ lọc',
        value: 'view_general_info'
    },
    {
        label: 'Xem giao dịch của nhân viên khác',
        tooltip: 'Cho phép xem lịch sử giao dịch không phải do mình tạo',
        value: 'view_other_staff_transactions'
    }
]


const permissionData: PermissionGroup[] = [

    {
        label: 'Hàng hóa',
        permissions: [
            {
                label: 'Hàng hóa nhập vào',
                children: ['Xem DS', 'Thêm mới', 'Xóa', 'Sửa']
            },
            {
                label: 'Hàng hóa bán ra',
                children: ['Xem DS', 'Thêm mới', 'Xóa', 'Sửa', 'Giá nhập', 'Giá bán']
            },
        ]
    },
    {
        label: 'Giao dịch',
        permissions: [
            {
                label: 'Đặt hàng',
                children: ['Xem DS', 'Thêm mới', 'Xóa', 'Sửa', 'Giá nhập', 'Giá bán']
            },
            {
                label: 'Hóa đơn',
                children: ['Xem DS', 'Thêm mới', 'Xóa', 'Sửa', 'Giá nhập', 'Giá bán']
            }
        ]
    },
    {
        label: 'Đối tác',
        permissions: [
            {
                label: 'Khách hàng',
                children: ['Xem DS', 'Thêm mới', 'Xóa', 'Sửa']
            },
            {
                label: 'Nhà cung cấp',
                children: ['Xem DS', 'Thêm mới', 'Xóa', 'Sửa', 'Công nợ']
            },
        ]

    },
    {
        label: 'Báo cáo', // later
        permissions: [
            {
                label: 'Khách hàng',
                children: ['Xem DS']
            },
            {
                label: 'Nhà cung cấp',
                children: ['Xem DS']
            },
        ]

    },
    {
        label: 'Kế toán', //later
        permissions: [
            {
                label: 'Nhập chi',
                children: ['Xem DS', 'Thêm mới', 'Xóa', 'Sửa']
            },
            {
                label: 'Nhập thu',
                children: ['Xem DS', 'Thêm mới', 'Xóa', 'Sửa']
            },
        ]

    },
    // { 
    //     label: 'Vận hành', //later
    //     permissions: [
    //         {
    //             label: 'Nhập chi',
    //             children: ['Xem DS', 'Thêm mới', 'Xóa', 'Sửa']
    //         },
    //         {
    //             label: 'Nhập thu',
    //             children: ['Xem DS', 'Thêm mới', 'Xóa', 'Sửa', 'Công nợ']
    //         },
    //     ]

    // }
]

type AddRoleModalProps = {
    open: boolean
    onClose: () => void
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({ open, onClose }) => {
    const { mutate } = useRoleData('http://api.fbopro.vn/v1/roles')
    const [roleName, setRoleName] = useState('');
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({})
    const [checkedPermissions, setCheckedPermissions] = useState<{ [key: string]: boolean }>({})


    const toggleExpand = (label: string) => {
        setExpanded(prev => ({ ...prev, [label]: !prev[label] }))
    }

    const handleParentToggle = (parentLabel: string, children?: string[]) => {
        const isParentChecked = children?.every(child => checkedPermissions[`${parentLabel}_${child}`]) ?? false
        const newChecked = { ...checkedPermissions }

        if (children) {
            children.forEach(child => {
                newChecked[`${parentLabel}_${child}`] = !isParentChecked
            })
        }

        setCheckedPermissions(newChecked)
    }

    const handleChildToggle = (parentLabel: string, child: string) => {
        const key = `${parentLabel}_${child}`
        const newChecked = {
            ...checkedPermissions,
            [key]: !checkedPermissions[key]
        }

        setCheckedPermissions(newChecked)
    }


    const handleSubmit = async () => {
  if (!roleName.trim()) {
    alert('Vui lòng nhập tên vai trò');
    return;
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  try {
    const response = await fetch('http://api.fbopro.vn/v1/roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify({ name: roleName })
    });

    if (!response.ok) {
      throw new Error('Tạo vai trò thất bại');
    }

    const result = await response.json();
    console.log('Tạo vai trò thành công:', result);

    // Optionally reset
    setRoleName('');
    mutate()
    onClose(); // đóng modal
  } catch (error) {
    console.error('Lỗi khi tạo vai trò:', error);
    alert('Không thể tạo vai trò. Vui lòng thử lại!');
  }
};

    return (

        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    // position: 'absolute',
                    // top: '50%',
                    // left: '50%',
                    // transform: 'translate(-50%, -50%)',
                    // bgcolor: 'background.paper',
                    // width: '90%',
                    // boxShadow: 24,
                    // borderRadius: 2,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    width: '90%',
                    maxHeight: '90vh',
                    boxShadow: 24,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Header */}
                <Box
                    sx={{
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
                    }}
                >
                    <Typography sx={{
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }}>
                        Thêm vai trò
                    </Typography>

                    <IconButton onClick={onClose}>
                        <CloseIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Box>

                {/* Body */}
                <Box sx={{
                    p: 3,
                    maxHeight: '100vh',
                    overflowY: 'auto',
                    pr: 2, // Thêm khoảng cách bên phải tránh đè vào thanh cuộn
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 2,
                    }}>
                        <Typography>
                            Tên Vai trò:
                        </Typography>
                        <TextField
                            variant='standard'
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            sx={{ '& .MuiInputBase-root': { width: 200, height: 40, borderRadius: 2 } }}
                        />
                    </Box>

                    {/* Phân quyền hệ thống ... */}
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
                        Phân quyền hệ thống
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
                        {systemPermissions.map((perm) => (
                            <FormControlLabel
                                key={perm.value}
                                control={<Checkbox />}
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography>{perm.label}</Typography>
                                        <Tooltip title={perm.tooltip}>
                                            <Typography component="span" sx={{ fontSize: '14px', color: '#999', cursor: 'pointer' }}>ⓘ</Typography>
                                        </Tooltip>
                                    </Box>
                                }
                            />
                        ))}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {permissionData.map(group => (
                            <Box key={group.label} sx={{ flex: '1 1 300px', minWidth: '280px' }}>
                                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                    {group.label}
                                </Typography>
                                {group.permissions.map(perm => (
                                    <Box key={perm.label} sx={{ mb: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {/* Chỉ checkbox mới có thể toggle tất cả */}
                                            <Checkbox
                                                checked={perm.children?.every(child => checkedPermissions[`${perm.label}_${child}`]) || false}
                                                indeterminate={
                                                    perm.children?.some(child => checkedPermissions[`${perm.label}_${child}`]) &&
                                                    !perm.children?.every(child => checkedPermissions[`${perm.label}_${child}`])
                                                }
                                                onChange={() => handleParentToggle(perm.label, perm.children)}
                                            />

                                            {/* Label sẽ chỉ toggle dropdown, không ảnh hưởng checkbox */}
                                            <Box
                                                sx={{ cursor: 'pointer', userSelect: 'none', flexGrow: 1 }}
                                                onClick={() => perm.children && toggleExpand(perm.label)}
                                            >
                                                <Typography>{perm.label}</Typography>
                                            </Box>

                                            {perm.children && (
                                                <IconButton size="small" onClick={() => toggleExpand(perm.label)}>
                                                    {expanded[perm.label] ? <ExpandLess /> : <ExpandMore />}
                                                </IconButton>
                                            )}
                                        </Box>

                                        {perm.children && (
                                            <Collapse in={expanded[perm.label]}>
                                                <Box sx={{ pl: 4, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                    {perm.children.map(child => (
                                                        <FormControlLabel
                                                            key={child}
                                                            control={<Checkbox
                                                                checked={checkedPermissions[`${perm.label}_${child}`] || false}
                                                                onChange={() => handleChildToggle(perm.label, child)}
                                                            />}
                                                            label={child}
                                                        />
                                                    ))}
                                                </Box>
                                            </Collapse>
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Footer */}
                <Box sx={{ px: 3, pb: 3, textAlign: 'right' }}>
                    <Button
                        sx={{
                            bgcolor: '#8DB883',
                            color: 'white',
                            minWidth: "100px"
                        }}
                        startIcon={<CheckCircleOutlineOutlinedIcon />}
                    onClick={handleSubmit}
                    >
                        {/* {isLoading ? "Đang gửi..." : "Xác nhận"} */} Xác nhận
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddRoleModal


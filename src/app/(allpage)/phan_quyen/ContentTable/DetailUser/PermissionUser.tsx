import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {
  Checkbox,
  FormControlLabel,
  Collapse,
  IconButton,
  Button,
  TextField,
  Autocomplete,
  Tooltip,
  InputAdornment
} from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const PermissionUser = ({ id }: { id: string }) => {
  const [value, setValue] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState('');

  const handleAddClick = () => {
    console.log('Thêm vai trò:', inputValue || value);
    // Xử lý thêm vai trò ở đây
  };

  const handleEditClick = () => {
    console.log('Sửa vai trò:', inputValue || value);
    // Xử lý sửa vai trò ở đây
  };
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

  const roleOptions = [
    "Admin",
    "Kế toán",
    "Developer",
    "Seller",
    "Nhân viên kho",
    "Thủ quỹ",
    "Quản lý"
  ];

  return (
      <Box sx={{
        p: 3,
        pr: 2, // Thêm khoảng cách bên phải tránh đè vào thanh cuộn
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 2,
        }}>
          <Typography>
            Tên vai trò:
          </Typography>
          <Autocomplete
            options={roleOptions}
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
            sx={{
              width: '25%',
              "& .MuiAutocomplete-inputRoot": {
                paddingRight: "10px !important", // Loại bỏ padding phải của Autocomplete input
              }
            }} // <<< CHỈNH CHIỀU DÀI TẠI ĐÂY
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleAddClick} size="small" edge="end">
                        <AddIcon />
                      </IconButton>
                      <IconButton onClick={handleEditClick} size="small" edge="end">
                        <EditIcon />
                      </IconButton>
                      {params.InputProps.endAdornment}
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>

        {/* Phân quyền hệ thống ... */}
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
          Phân quyền hệ thống
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
  );
};

export default PermissionUser

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
  // {
  //   label: 'Báo cáo', // later
  //   permissions: [
  //     {
  //       label: 'Khách hàng',
  //       children: ['Xem DS']
  //     },
  //     {
  //       label: 'Nhà cung cấp',
  //       children: ['Xem DS']
  //     },
  //   ]

  // },
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

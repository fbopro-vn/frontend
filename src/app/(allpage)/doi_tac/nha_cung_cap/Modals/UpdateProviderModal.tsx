import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import React, { useState, useEffect } from 'react'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import BodyProvider from '@/app/api/BodyProvider.json'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useForm, Controller } from 'react-hook-form'

type ProviderForm = {
  provider_id: string
  provider: string
  phone: string
  address: string
}

const UpdateProviderModal = ({ checkedRows, data }: {
  checkedRows: Record<string, boolean>
  data: typeof BodyProvider
}) => {
  const [open, setOpen] = useState(false);
  const selectedCount = Object.values(checkedRows).filter(Boolean).length;
  const isDisabled = selectedCount !== 1;
  const selectedid = Object.keys(checkedRows).find(
    (id) => checkedRows[id]
  );

  const { control, handleSubmit, reset, formState: { errors } } = useForm<ProviderForm>();

  useEffect(() => {
    if (selectedid && open) {
      const selectedProvider = data.find(p => p.provider_id === selectedid);
      if (selectedProvider) {
        reset({
          provider_id: selectedProvider.provider_id,
          provider: selectedProvider.provider,
          phone: selectedProvider.phone,
          address: selectedProvider.address
        });
      }
    }
  }, [selectedid, data, open, reset]);

  const onSubmit = (formData: ProviderForm) => {
    console.log('Cập nhật dữ liệu:', formData)
    setOpen(false)
  }

  const InputBlock = ({
    label,
    children,
    errorMessage
  }: {
    label: string
    children: React.ReactNode
    error?: boolean
    errorMessage?: string
  }) => (
    <Box mb={2}>
      <Typography fontWeight={500} mb={0.5}>{label}</Typography>
    {children}
    <Typography
      sx={{ minHeight: "20px", fontSize: "15px", color: "red", mt: 0.5 }}
    >
      {errorMessage || ''}
    </Typography>
    </Box>
  );

  return (
    <Box>
      <Button
        sx={{
          bgcolor: '#8DB883',
          color: 'white',
          width: "100px"
        }}
        startIcon={<SettingsOutlinedIcon />}
        disabled={isDisabled}
        onClick={() => setOpen(true)}
      >
        Sửa
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
           position: 'absolute' as const,
           top: '35%',
           left: '50%',
           transform: 'translate(-50%, -50%)',
           width: '30%',
           bgcolor: 'white',
           borderRadius: 2,
           boxShadow: 24,
           p: 0,
        }}>
          {/* HEADER */}
          <Box
            sx={{
              bgcolor: '#8DB883',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              py: 1.5,
              textAlign: 'center'
            }}
          >
            <Typography variant="h6" sx={{ color: 'white' }}>
              Sửa nhà cung cấp
            </Typography>
          </Box>

          {/* FORM NỘI DUNG */}
          <Box sx={{ p: 3 }}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              
              <Controller
                name="provider_id"
                control={control}
                render={({ field }) => (
                  <InputBlock 
                    label="Mã nhà cung cấp"
                    errorMessage={errors.provider_id?.message}
                    >
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      disabled
                    />
                  </InputBlock>
                )}
              />

              <Controller
                name="provider"
                control={control}
                render={({ field }) => (
                  <InputBlock 
                    label="Tên nhà cung cấp"
                    errorMessage={errors.provider?.message}
                    >
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      disabled
                    />
                  </InputBlock>
                )}
              />

              <Controller
                name="phone"
                control={control}
                rules={{ required: 'Số điện thoại không được để trống' }}
                render={({ field }) => (
                  <InputBlock
                    label="Số điện thoại"
                    errorMessage={errors.phone?.message}
                  >
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      error={!!errors.phone}
                    />
                  </InputBlock>
                )}
              />

              <Controller
                name="address"
                control={control}
                rules={{ required: 'Địa chỉ không được để trống' }}
                render={({ field }) => (
                  <InputBlock
                    label="Địa chỉ"
                    error={!!errors.address}
                    errorMessage={errors.address?.message}
                  >
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      error={!!errors.address}
                    />
                  </InputBlock>
                )}
              />

              {/* FOOTER BUTTONS */}
              <Box mt={3} display="flex" justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={() => setOpen(false)}
                  sx={{ mr: 1, color: '#8DB883', borderColor: '#8DB883' }}
                >
                  BỎ QUA
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: '#8DB883', color: 'white' }}
                >
                  XÁC NHẬN
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default UpdateProviderModal;

import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { useForm, Controller } from 'react-hook-form'

type ProviderForm = {
  provider_id: string
  provider: string
  phone: string
  address: string
}

const modalStyle = {
  position: 'absolute' as const,
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'white',
  borderRadius: 2,
  boxShadow: 24,
  p: 0,
};

const AddProviderModal = ({ checkedRows }: {
  checkedRows: Record<string, boolean>
}) => {
  const isDisabled = Object.values(checkedRows).some(Boolean)
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<ProviderForm>({
    defaultValues: {
      provider_id: '',
      provider: '',
      phone: '',
      address: ''
    }
  });

  const onSubmit = (formData: ProviderForm) => {
    console.log('Thêm nhà cung cấp:', formData);
    // TODO: Gửi dữ liệu đến backend tại đây
    setOpen(false);
    reset();
  };


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
        startIcon={<AddOutlinedIcon />}
        disabled={isDisabled}
        onClick={() => setOpen(true)}
      >
        Thêm
      </Button>

      <Modal open={open} onClose={() => { setOpen(false); reset(); }}>
        <Box sx={modalStyle}>
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
              Thêm nhà cung cấp
            </Typography>
          </Box>

          {/* FORM */}
          <Box sx={{ p: 3 }}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

              <Controller
                name="provider_id"
                control={control}
                rules={{ required: 'Mã nhà cung cấp không được để trống' }}
                render={({ field }) => (
                  <InputBlock
                    label="Mã nhà cung cấp"
                    error={!!errors.provider_id}
                    errorMessage={errors.provider_id?.message}
                  >
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      error={!!errors.provider_id}
                    />
                  </InputBlock>
                )}
              />

              <Controller
                name="provider"
                control={control}
                rules={{ required: 'Tên nhà cung cấp không được để trống' }}
                render={({ field }) => (
                  <InputBlock
                    label="Tên nhà cung cấp"
                    error={!!errors.provider}
                    errorMessage={errors.provider?.message}
                  >
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      error={!!errors.provider}
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
                    error={!!errors.phone}
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
                  onClick={() => { setOpen(false); reset(); }}
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

export default AddProviderModal;

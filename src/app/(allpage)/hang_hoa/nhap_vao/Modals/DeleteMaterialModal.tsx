import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import BodyMerchandiseInput from '@/app/api/Merchandise/BodyMerchandiseInput.json'

const DeleteMaterialModal = ({
    checkedRows, data }: {
        checkedRows: Record<string, boolean> // ✅ key là material_id
        data: typeof BodyMerchandiseInput;
    }) => {

    const isDisabled = !Object.values(checkedRows).some(Boolean)
    const [select, setSelect] = useState(false);

    // ✅ Lấy index các dòng được chọn
    // ✅ Lọc danh sách sản phẩm được chọn theo material_id
    const selectedMaterials = data.filter((item) => checkedRows[item.material_id])
    const selectedMaterialIds = selectedMaterials.map((item) => item.material_id)
    return (
        <Box>
            <Button sx={{
                width: "100px"
            }}
                variant='outlined'
                startIcon={<DeleteForeverOutlinedIcon />}
                onClick={() => setSelect(true)}
                disabled={isDisabled}
            >Xóa</Button>


            <Modal
                open={select}
                onClose={() => setSelect(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', width: "30%", bgcolor: 'background.paper', boxShadow: 24, borderRadius: 2 }}>
                    {/* Tiêu đề */}
                    <Box
                        sx={{
                            backgroundColor: "#8DB883", // Nền đỏ
                            textAlign: "center", // Căn giữa chữ
                            color: "white", // Chữ trắng
                            fontWeight: "bold",
                            fontSize: "18px",
                            p: 3,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                        }}
                    >
                        Xóa hàng hóa
                    </Box>
                    {/* Body */}
                    <Box sx={{ minHeight: "100px", p: 2 }}>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <DeleteForeverOutlinedIcon sx={{ color: '#d63031' }} />
                            <Typography fontWeight="bold" color="#d63031" fontSize="16px">
                                Bạn đang xóa {selectedMaterialIds.length} sản phẩm:
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
                            {selectedMaterialIds.map((id, idx) => (
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
                                    Mã sản phẩm: {id}
                                </Typography>
                            ))}
                        </Box>

                    </Box>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        alignItems: 'center',
                        gap: 2,
                        p: 2
                    }}>
                        <Button variant="outlined" sx={{ color: "#8DB883", border: "1px solid #8DB883", width: "100px", "&:hover": { backgroundColor: "rgba(141, 184, 131, 0.1)", border: "1px solid #8DB883" } }}
                            onClick={() => setSelect(false)}
                        >Bỏ qua</Button>
                        <Button type="submit" sx={{ bgcolor: "#8DB883", width: "100px", color: 'white' }}>Xác nhận</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default DeleteMaterialModal

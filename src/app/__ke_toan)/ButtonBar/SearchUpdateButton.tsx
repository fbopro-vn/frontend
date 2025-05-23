import Button from "@mui/material/Button"

const SearchButton: React.FC<OpenModalButtonProps> = ({ openModal }) => {
    return (
        <Button sx={{
            minWidth: "180px",
            bgcolor: "#8DB883",
            color: "white"
        }}
        onClick={openModal}
        >
            Tìm kiếm và chỉnh sửa
        </Button>
    )
}

export default SearchButton
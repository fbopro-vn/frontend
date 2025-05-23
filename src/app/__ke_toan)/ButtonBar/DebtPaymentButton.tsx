import Button from "@mui/material/Button"


const DebtPaymentButton: React.FC<OpenModalButtonProps> = ({ openModal }) => {
    return (
        <Button sx={{
            minWidth: "180px",
            bgcolor: "#8DB883",
            color: "white"
        }}
        onClick={openModal}
        >
          Thanh toán công nợ
        </Button>
    )
}

export default DebtPaymentButton


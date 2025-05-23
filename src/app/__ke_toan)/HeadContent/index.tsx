import  Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const HeadContent = () => {
    return (
        <Box display={"flex"} justifyContent={"center"}>
            <Typography sx={{
                mt: "40px",
                fontSize: '26px',
                fontWeight: 700,
                textTransform: 'uppercase'
            }}> Báo cáo tổng hợp
            </Typography>
        </Box>
    )
}

export default HeadContent;
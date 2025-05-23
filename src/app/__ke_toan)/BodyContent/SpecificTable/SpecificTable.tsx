import  Box  from "@mui/material/Box"
import  Typography  from "@mui/material/Typography"

const SpecificTable = () => {
    return (
        <Box mt= "100px">
            {/* Title */}
            <Box display="flex" justifyContent="center">
                <Typography sx={{
                    mt: "40px",
                    fontSize: '26px',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                }}> Báo cáo chi tiết
                </Typography>
            </Box>

            {/* Content */}
            <Box display="flex" justifyContent="center"
                sx={{
                    height: "400px",
                    bgcolor: "#747d8c",
                    border: "2px solid #8DB883",
                    borderRadius: "10px",
                }}
            >
                LOE
            </Box>
        </Box>
    )
}

export default SpecificTable

// import Container from "@mui/material/Container";
// import ButtonBar from "./ButtonBar";
// import BodyContent from "./BodyContent";
// import HeadContent from "./HeadContent";

// const ShopManager = () => {
//   return (
//     <Container disableGutters maxWidth={false} sx={{height:'100vh', px: "20px"}}>
      
//     <ButtonBar/>
//     {/* HeadContent */}
//     <HeadContent/>
//     {/* BodyContent */}
//     <BodyContent/>
//     </Container>
//   )
// }

// export default ShopManager;
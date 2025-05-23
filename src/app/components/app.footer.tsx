import { Box, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import "@/components/css_animation/productFactory.css";

const AppFooter = () => {
  return (
    <Box
      sx={{
        display: "flex",
        background: " #C5122A",
        padding: "5px 0",
        color: "white",
        height: "250px",
        alignItems: "center",
      }}
    >
      <Box m={"20px"} alignItems={"center"}>
        <Link href="/" className="">
          <Image
            src="/assets/logo_sdc.png"
            width={150}
            height={120}
            quality={100}
            alt="sdc"
          />
        </Link>
        <Box className="loader"></Box>
      </Box>
      <Box mx={"100px"}>
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "20px",
            pb: "12px",
          }}
        >
          CÔNG TY CPDV THƯƠNG MẠI VÀ QC SDC
        </Typography>
        <Typography>
          64 Nguyễn Thế Truyện, P. 3, Quận Tân Phú, TP HCM
        </Typography>
        <Typography>Tel: 0911466485 - Fax: 028.20302032</Typography>
        <Typography>Email: sdchelpbot@sdc.vn</Typography>
        <Typography>Mã số thuế: 0310179xxx</Typography>
        <Typography>Tài khoản: 101872663898</Typography>
        <Typography>
          Mở tại: Ngân hàng TMCP Tài Chính (VIETINBANK) - Chi Nhánh TP. HCM –
          PGD Tân Bình
        </Typography>
      </Box>
      <Box textAlign={"center"}>
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "20px",
            pb: "12px",
          }}
        >
          Liên hệ chúng tôi
        </Typography>
        <Box className="contact-container">
            <Typography className="contact-item">
        <FacebookIcon
        className="IconC"
          sx={{
            height: "32px",
            width: "32px",
          }}
        />
                  <Typography className="contact-info">Facebook</Typography>
        </Typography>
        <Typography className="contact-item">
        <LinkedInIcon
         className="IconC"
          sx={{
            height: "32px",
            width: "32px"
          }}
        />
                  <Typography className="contact-info">LinkedIn</Typography>
         </Typography>
         <Typography className="contact-item">
        <PhoneEnabledIcon
         className="IconC"
          sx={{
            height: "32px",
            width: "32px",
          }}
        />
              <Typography className="contact-info">Phone</Typography>
        </Typography>
        </Box>
        <Typography sx={{ textAlign: "start" }}>
          Copyright © 2025 by SDC. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default AppFooter;

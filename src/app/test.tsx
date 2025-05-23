import { Button } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Công nghệ sản xuất Gỗ Mica</title>
        <meta
          name="description"
          content="Khám phá công nghệ và quy trình sản xuất gỗ mica hiện đại nhất."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main style={{ fontFamily: 'Roboto, sans-serif' }}>
        <header style={{ backgroundColor: "#0d47a1", color: "white", padding: "2rem 1rem", position: "relative" }}>
          <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
            <Link href="/login" passHref>
              <Button variant="outlined" color="inherit" size="small" style={{ marginRight: "0.5rem" }}>
                Đăng nhập
              </Button>
            </Link>
            <Link href="/register" passHref>
              <Button variant="contained" color="secondary" size="small">
                Đăng ký
              </Button>
            </Link>
          </div>
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem", textAlign: "center" }}>Gỗ Mica – Công nghệ sản xuất hiện đại</h1>
          <p style={{ fontSize: "1.25rem", textAlign: "center" }}>Sự kết hợp giữa vật liệu tiên tiến và quy trình kỹ thuật cao</p>
          <div style={{ textAlign: "center" }}>
            <Button variant="contained" color="secondary" style={{ marginTop: "1.5rem" }}>
              Tìm hiểu thêm
            </Button>
          </div>
        </header>

        <section style={{ padding: "4rem 2rem", backgroundColor: "#f5f5f5" }}>
          <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "2rem" }}>Quy trình sản xuất</h2>
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "2rem" }}>
            <Step icon="🪵" title="Lựa chọn nguyên liệu" desc="Chọn lựa mica chất lượng cao, đảm bảo độ bền và trong suốt." />
            <Step icon="⚙️" title="Gia công CNC" desc="Dùng máy CNC hiện đại để cắt, tạo hình chính xác theo thiết kế." />
            <Step icon="🔥" title="Xử lý nhiệt" desc="Gia nhiệt để tăng độ dẻo và kết dính các tấm mica." />
            <Step icon="🎨" title="Hoàn thiện bề mặt" desc="Đánh bóng, in UV và phủ lớp bảo vệ để đảm bảo thẩm mỹ và độ bền." />
          </div>
        </section>

        <section style={{ padding: "4rem 2rem", backgroundColor: "white" }}>
          <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "2rem" }}>Ưu điểm vượt trội</h2>
          <ul style={{ maxWidth: "700px", margin: "auto", fontSize: "1.1rem", lineHeight: "1.8" }}>
            <li>Độ bền cao và khả năng chống nước tuyệt vời</li>
            <li>Dễ tạo hình, cắt khắc linh hoạt theo yêu cầu</li>
            <li>Bề mặt bóng đẹp, có thể in hoặc phủ màu đa dạng</li>
            <li>Thân thiện với môi trường và tái chế được</li>
          </ul>
        </section>

        <footer style={{ backgroundColor: "#263238", color: "white", textAlign: "center", padding: "2rem 1rem" }}>
          <p>Bản quyền © 2025 Công nghệ Gỗ Mica Việt Nam</p>
        </footer>
      </main>
    </>
  );
}

function Step({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem", maxWidth: "280px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
      <div style={{ fontSize: "2rem" }}>{icon}</div>
      <h3 style={{ fontSize: "1.2rem", marginTop: "1rem" }}>{title}</h3>
      <p style={{ fontSize: "0.95rem", color: "#555" }}>{desc}</p>
    </div>
  );
}

import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "4rem 1rem",
      }}
    >
      <h1 style={{ fontSize: "5rem", margin: 0, color: "#1e40af" }}>404</h1>
      <p style={{ fontSize: "1.2rem", color: "#4a5568" }}>
        ไม่พบหน้าที่คุณต้องการ
      </p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.5rem 1.5rem",
          background: "#1e40af",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
        }}
      >
        ← กลับหน้าหลัก
      </Link>
    </div>
  );
}

export default NotFoundPage;
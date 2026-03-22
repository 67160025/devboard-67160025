import { Link } from "react-router-dom"; // ใช้เปลี่ยนหน้าโดยไม่ reload

// แสดงเมื่อผู้ใช้เข้า URL ที่ไม่มีในแอป เช่น /random หรือ /posts/99999
// ถูก render โดย App.jsx ในเส้นทาง path="*" ซึ่ง React Router จับทุก URL ที่ไม่ match
function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
      <h1 style={{ fontSize: "5rem", margin: 0, color: "#1e40af" }}>404</h1>
      <p style={{ fontSize: "1.2rem", color: "#4a5568" }}>
        ไม่พบหน้าที่คุณต้องการ
      </p>
      {/* คลิกแล้วกลับไป HomePage โดยไม่ reload */}
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
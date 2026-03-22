import { Link } from "react-router-dom"; // ใช้แทน <a> เพื่อเปลี่ยนหน้าโดยไม่ reload
import { useFavorites } from "../context/FavoritesContext"; // ดึงข้อมูล favorites ที่แชร์ร่วมกันทั้งแอป

function Navbar() {
  const { favorites } = useFavorites(); // จำนวน favorites อัปเดตอัตโนมัติทุกครั้งที่มีการกดถูกใจในหน้าไหนก็ตาม

  return (
    <nav
      style={{
        background: "#1e40af",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between", // ดัน logo ไปซ้าย เมนูไปขวา
        alignItems: "center",
      }}
    >
      {/* คลิก logo แล้วกลับหน้าหลัก */}
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>DevBoard</h1>
      </Link>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          หน้าหลัก
        </Link>
        <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
          สมาชิก
        </Link>
        {/* ปุ่มถูกใจ: เปลี่ยนพื้นหลังเป็นสีแดงและแสดงจำนวนเมื่อมี favorites อย่างน้อย 1 รายการ */}
        <Link
          to="/favorites"
          style={{
            color: "white",
            textDecoration: "none",
            background: favorites.length > 0 ? "#e53e3e" : "transparent", // มี favorites → สีแดง, ไม่มี → ใส
            padding: "0.25rem 0.75rem",
            borderRadius: "20px",
            fontSize: "0.9rem",
          }}
        >
          ❤️ ถูกใจ {favorites.length > 0 && `(${favorites.length})`} {/* แสดงจำนวนในวงเล็บเฉพาะตอนมี favorites */}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
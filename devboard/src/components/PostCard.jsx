import { useState } from "react";
import { Link } from "react-router-dom"; // ใช้เปลี่ยนหน้าไป PostDetailPage โดยไม่ reload
import { useFavorites } from "../context/FavoritesContext"; // ดึง favorites state และ toggleFavorite ที่แชร์ทั้งแอป
import CommentList from "./CommentList"; // แสดง comment ใต้โพสต์เมื่อกดเปิด

// รับ post object มาจาก PostList.jsx ที่วน .map() ส่งลงมา
function PostCard({ post }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(post.id); // เช็คว่าโพสต์นี้ถูกใจอยู่หรือเปล่า
  const [showComments, setShowComments] = useState(false); // ควบคุมการแสดง/ซ่อน CommentList

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "white",
      }}
    >
      {/* คลิก title แล้วไปหน้า PostDetailPage ของโพสต์นั้น */}
      <h3 style={{ margin: "0 0 0.5rem" }}>
        <Link
          to={`/posts/${post.id}`}
          style={{ color: "#1e40af", textDecoration: "none" }}
        >
          {post.title}
        </Link>
      </h3>
      <p style={{ margin: "0 0 0.75rem", color: "#4a5568", lineHeight: 1.6 }}>
        {post.body}
      </p>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        {/* กดแล้วเรียก toggleFavorite ใน FavoritesContext ซึ่งอัปเดต Navbar และ FavoritesPage ด้วย */}
        <button
          onClick={() => toggleFavorite(post.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            color: isFavorite ? "#e53e3e" : "#a0aec0", // ถูกใจ → สีแดง, ยังไม่ถูกใจ → สีเทา
          }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

        {/* กดแล้ว toggle showComments ถ้าเปิดอยู่ก็ปิด ถ้าปิดอยู่ก็เปิด */}
        <button
          onClick={() => setShowComments((prev) => !prev)}
          style={{
            background: "none",
            border: "1px solid #e2e8f0",
            cursor: "pointer",
            fontSize: "0.9rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "4px",
            color: "#4a5568",
          }}
        >
          {showComments ? "▲ ซ่อน" : "▼ ความคิดเห็น"} {/* ไอคอนและข้อความเปลี่ยนตามสถานะ */}
        </button>
      </div>

      {/* showComments เป็น true → render CommentList และส่ง post.id ไปดึง comment จาก API */}
      {showComments && <CommentList postId={post.id} />}
    </div>
  );
}

export default PostCard;
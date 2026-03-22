import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // useParams ดึง id จาก URL, Link ใช้เปลี่ยนหน้าโดยไม่ reload
import { useFavorites } from "../context/FavoritesContext"; // ดึง favorites state และ toggleFavorite ที่แชร์ทั้งแอป
import CommentList from "../components/CommentList"; // แสดง comment ของโพสต์นี้
import LoadingSpinner from "../components/LoadingSpinner"; // แสดงระหว่างรอ fetch

function PostDetailPage() {
  const { id } = useParams(); // ดึง id จาก URL เช่น /posts/3 → id = "3"
  const { favorites, toggleFavorite } = useFavorites();
  const [post, setPost] = useState(null); // เก็บข้อมูลโพสต์ที่ดึงมาได้
  const [loading, setLoading] = useState(true); // ควบคุมการแสดง LoadingSpinner

  // fetch ใหม่ทุกครั้งที่ id ใน URL เปลี่ยน เช่น ผู้ใช้กดเข้าโพสต์อื่น
  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`, // ดึงเฉพาะโพสต์ที่ตรงกับ id ใน URL
      );
      const data = await res.json();
      setPost(data); // อัปเดต state ทำให้หน้าเว็บแสดงข้อมูลโพสต์
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  // แสดง spinner ระหว่างรอ fetch เสร็จ
  if (loading) return <LoadingSpinner />;

  // เช็คหลัง loading เสร็จแล้วเท่านั้น เพราะต้องใช้ post.id ซึ่งยังเป็น null ตอน loading
  const isFavorite = favorites.includes(post.id);

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* คลิกแล้วกลับไป HomePage */}
      <Link to="/" style={{ color: "#1e40af", textDecoration: "none" }}>
        ← กลับหน้าหลัก
      </Link>

      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "1.5rem",
          margin: "1rem 0",
          background: "white",
        }}
      >
        <h2 style={{ margin: "0 0 1rem", color: "#1e40af" }}>{post.title}</h2>
        <p style={{ color: "#4a5568", lineHeight: 1.8 }}>{post.body}</p>

        {/* กดแล้วเรียก toggleFavorite ใน FavoritesContext
            Navbar และ FavoritesPage จะอัปเดตตามด้วย */}
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
          {isFavorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
        </button>
      </div>

      {/* ส่ง post.id ให้ CommentList ไปดึง comment ของโพสต์นี้จาก API */}
      <CommentList postId={post.id} />
    </div>
  );
}

export default PostDetailPage;
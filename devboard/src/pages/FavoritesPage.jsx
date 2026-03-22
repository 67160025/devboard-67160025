import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ใช้เปลี่ยนหน้าโดยไม่ reload
import { useFavorites } from "../context/FavoritesContext"; // ดึง favorites state และ toggleFavorite ที่แชร์ทั้งแอป

function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [posts, setPosts] = useState([]); // เก็บข้อมูลโพสต์ที่ถูกใจที่ดึงมาจาก API

  // fetch ใหม่ทุกครั้งที่ favorites เปลี่ยน เช่น กดยกเลิกถูกใจโพสต์ใดโพสต์หนึ่ง
  useEffect(() => {
    if (favorites.length === 0) return; // ถ้าไม่มี favorites ไม่ต้อง fetch

    // ดึงข้อมูลโพสต์ทุกอันที่ถูกใจพร้อมกันในครั้งเดียว แทนที่จะดึงทีละอัน
    async function fetchFavoritePosts() {
      const results = await Promise.all(
        favorites.map((id) =>
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((r) =>
            r.json(),
          ),
        ),
      );
      setPosts(results); // อัปเดต state ทำให้หน้าเว็บแสดงโพสต์ที่ดึงมาได้
    }
    fetchFavoritePosts();
  }, [favorites]); // favorites เปลี่ยน → fetch ใหม่ → posts อัปเดต → หน้าเว็บ re-render

  // ถ้ายังไม่มีโพสต์ที่ถูกใจ แสดงข้อความแทนรายการ
  if (favorites.length === 0) {
    return (
      <div
        style={{
          maxWidth: "700px",
          margin: "2rem auto",
          padding: "0 1rem",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#718096", fontSize: "1.1rem" }}>
          ยังไม่มีโพสต์ที่ถูกใจ
        </p>
        <Link to="/" style={{ color: "#1e40af" }}>
          ← กลับหน้าหลัก
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* หัวข้อแสดงจำนวนโพสต์ที่ถูกใจในขณะนั้น */}
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #e53e3e",
          paddingBottom: "0.5rem",
        }}
      >
        ❤️ โพสต์ที่ถูกใจ ({favorites.length})
      </h2>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
            background: "white",
          }}
        >
          {/* คลิก title แล้วไปหน้า PostDetailPage ของโพสต์นั้น */}
          <h3 style={{ margin: "0 0 0.5rem", color: "#1e40af" }}>
            <Link
              to={`/posts/${post.id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {post.title}
            </Link>
          </h3>
          <p style={{ margin: "0 0 0.75rem", color: "#4a5568" }}>{post.body}</p>
          {/* กดแล้วเรียก toggleFavorite ใน FavoritesContext
              โพสต์นี้จะหายออกจากหน้านี้ และ Navbar จะอัปเดตจำนวนด้วย */}
          <button
            onClick={() => toggleFavorite(post.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#e53e3e",
              fontSize: "0.9rem",
            }}
          >
            ❤️ ยกเลิกถูกใจ
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoritesPage;
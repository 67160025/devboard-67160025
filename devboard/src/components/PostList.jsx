import { useState, useEffect } from "react";
import PostCard from "./PostCard"; // การ์ดแสดงข้อมูลโพสต์แต่ละอัน
import LoadingSpinner from "./LoadingSpinner"; // แสดงระหว่างรอ fetch
import { useFavorites } from "../context/FavoritesContext"; // ดึง favorites state สำหรับส่งต่อให้ PostCard
import PostCount from "./PostCount"; // แสดงจำนวนโพสต์ที่กรองแล้ว

function PostList() {
  const { favorites, toggleFavorite } = useFavorites();
  const [posts, setPosts] = useState([]); // เก็บโพสต์ทั้งหมดที่ดึงมาจาก API
  const [loading, setLoading] = useState(true); // ควบคุมการแสดง LoadingSpinner
  const [error, setError] = useState(null); // เก็บข้อความ error ถ้า fetch ล้มเหลว
  const [search, setSearch] = useState(""); // เก็บคำค้นหาที่พิมพ์ใน input

  // ฟังก์ชัน fetch แยกออกมา เพื่อให้ปุ่ม "โหลดใหม่" เรียกซ้ำได้
  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ"); // ถ้า server ตอบ error เช่น 404, 500
      const data = await res.json();
      setPosts(data.slice(0, 20)); // เอาแค่ 20 รายการแรก ไม่โหลดทั้ง 100
    } catch (err) {
      setError(err.message); // แสดง error แทนรายการโพสต์
    } finally {
      setLoading(false); // ซ่อน loading ไม่ว่าจะสำเร็จหรือล้มเหลว
    }
  }

  // [] = fetch ครั้งเดียวตอนเปิดหน้า HomePage ครั้งแรก
  useEffect(() => {
    fetchPosts();
  }, []);

  // กรองโพสต์แบบ real-time ทุกครั้งที่ search หรือ posts เปลี่ยน
  // ไม่ได้ fetch ใหม่ แค่กรองจาก posts ที่มีอยู่แล้ว
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  // แสดง spinner ระหว่างรอ fetch ครั้งแรกหรือตอนกดโหลดใหม่
  if (loading) return <LoadingSpinner />;

  // ถ้า fetch ล้มเหลว แสดง error box แทนรายการโพสต์ทั้งหมด
  if (error)
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
      </div>
    );

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        โพสต์ล่าสุด
        {/* กดแล้วเรียก fetchPosts ใหม่ ทำให้ loading กลับมาและดึงข้อมูลล่าสุดจาก API */}
        <button onClick={fetchPosts} style={{ /* ... */ }}>
          🔄 โหลดใหม่
        </button>
      </h2>

      {/* แสดงจำนวนโพสต์ที่เหลือหลังกรอง ถ้าค้นหาอยู่จะเห็นตัวเลขลดลง */}
      <PostCount count={filtered.length} />

      {/* search input: พิมพ์แล้ว filtered จะอัปเดตทันที PostCard ที่แสดงก็เปลี่ยนตาม */}
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {/* ถ้าค้นหาแล้วไม่มีผลลัพธ์ แสดงข้อความแทนที่จะเห็นหน้าว่างเปล่า */}
      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* วน render PostCard และส่ง favorites/toggleFavorite ลงไปด้วย
          PostCard จะใช้ข้อมูลนี้แสดงไอคอนหัวใจและจัดการการกดถูกใจ */}
      {filtered.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => toggleFavorite(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;
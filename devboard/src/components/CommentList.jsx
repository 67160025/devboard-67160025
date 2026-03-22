import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner"; // spinner แสดงตอนรอโหลด

// รับ postId มาจาก PostCard.jsx เพื่อรู้ว่าจะดึง comment ของโพสต์ไหน
function CommentList({ postId }) {
  const [comments, setComments] = useState([]); // เก็บ comment ที่ดึงมาได้
  const [loading, setLoading] = useState(true); // ควบคุมการแสดงข้อความ "กำลังโหลด"
  const [error, setError] = useState(null); // เก็บข้อความ error ถ้า fetch ล้มเหลว

  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`, // ดึง comment ตาม postId ที่รับมา
        );
        if (!res.ok) throw new Error("ดึงความคิดเห็นไม่สำเร็จ"); // ถ้า server ตอบกลับ error เช่น 404, 500
        const data = await res.json();
        setComments(data); // อัปเดต state ทำให้หน้าเว็บแสดง comment ที่ดึงมาได้
      } catch (err) {
        setError(err.message); // แสดงข้อความ error แทน comment
      } finally {
        setLoading(false); // ซ่อน loading ไม่ว่าจะสำเร็จหรือล้มเหลว
      }
    }
    fetchComments();
  }, [postId]); // ถ้าผู้ใช้เปิด comment ของโพสต์อื่น จะ fetch ใหม่อัตโนมัติ

  // แสดงข้อความโหลดระหว่างรอ fetch เสร็จ แทนที่จะแสดงกล่องว่างเปล่า
  if (loading)
    return <p style={{ color: "#718096" }}>กำลังโหลดความคิดเห็น...</p>;
  // ถ้า fetch ล้มเหลว แสดง error แทน comment
  if (error) return <p style={{ color: "#c53030" }}>{error}</p>;

  return (
    <div style={{ marginTop: "0.75rem" }}>
      {/* แสดงจำนวน comment ทั้งหมดที่ดึงมาได้ */}
      <strong style={{ color: "#4a5568" }}>
        ความคิดเห็น ({comments.length})
      </strong>
      {/* วน render comment แต่ละอัน โดยใช้ comment.id เป็น key */}
      {comments.map((comment) => (
        <div
          key={comment.id}
          style={{
            background: "#f7fafc",
            borderRadius: "6px",
            padding: "0.5rem 0.75rem",
            marginTop: "0.5rem",
            fontSize: "0.85rem",
          }}
        >
          <div style={{ fontWeight: "bold", color: "#2d3748" }}>
            {comment.name} {/* ชื่อคนที่ comment */}
          </div>
          <div style={{ color: "#718096" }}>{comment.body}</div> {/* เนื้อหา comment */}
        </div>
      ))}
    </div>
  );
}

export default CommentList;
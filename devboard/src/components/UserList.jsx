import { useState, useEffect } from "react";
import UserCard from "./UserCard"; // การ์ดแสดงข้อมูลสมาชิกแต่ละคน
import LoadingSpinner from "./LoadingSpinner"; // แสดงระหว่างรอ fetch

// ถูกเรียกใช้ใน ProfilePage.jsx เพื่อแสดงรายชื่อสมาชิกทั้งหมด
function UserList() {
  const [users, setUsers] = useState([]); // เก็บข้อมูลสมาชิกที่ดึงมาจาก API
  const [loading, setLoading] = useState(true); // ควบคุมการแสดง LoadingSpinner

  // [] = fetch ครั้งเดียวตอนเปิดหน้า ProfilePage
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data); // ดึงมาได้ 10 คน แสดงทั้งหมด
      } catch {
        // ยังไม่มี error state ในตัวอย่างนี้ ลองเพิ่มเองได้เหมือน PostList.jsx
      } finally {
        setLoading(false); // ซ่อน loading ไม่ว่าจะสำเร็จหรือล้มเหลว
      }
    }
    fetchUsers();
  }, []);

  // แสดง spinner ระหว่างรอ fetch เสร็จ
  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        สมาชิก
      </h2>
      {/* วน render UserCard โดยส่งแค่ name และ email ลงไป ไม่ส่ง user ทั้ง object */}
      {users.map((user) => (
        <UserCard key={user.id} name={user.name} email={user.email} />
      ))}
    </div>
  );
}

export default UserList;
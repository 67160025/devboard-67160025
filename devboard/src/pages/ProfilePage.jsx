import UserList from "../components/UserList"; // แสดงรายชื่อสมาชิกทั้งหมดที่ดึงจาก API

// หน้านี้เข้าถึงได้จาก Navbar กดเมนู "สมาชิก" หรือ URL /profile
function ProfilePage() {
  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "0 1rem" }}>
      <UserList />
    </div>
  );
}

export default ProfilePage;
import PostList from "../components/PostList"; // แสดงรายการโพสต์ทั้งหมดที่ดึงจาก API
import AddPostForm from "../components/AddPostForm"; // ฟอร์มเพิ่มโพสต์ใหม่ วางไว้เหนือรายการ

function HomePage() {
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* onAddPost ส่งฟังก์ชันว่างไปก่อน เพราะ PostList จัดการ posts state เองอยู่แล้ว
          ถ้าต้องการให้โพสต์ที่เพิ่มแสดงในลิสต์จริง ต้องย้าย posts state ขึ้นมาจัดการที่นี่แทน */}
      <AddPostForm onAddPost={() => {}} />
      <PostList />
    </div>
  );
}

export default HomePage;
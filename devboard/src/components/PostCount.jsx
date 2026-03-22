// แสดงจำนวนโพสต์ทั้งหมด ถูกเรียกใช้ใน PostList.jsx โดยส่ง posts.length มาเป็น count
function PostCount({ count }) {
  return (
    <p style={{ color: "#718096", fontSize: "0.9rem" }}>
      โพสต์ทั้งหมด: {count} รายการ
    </p>
  );
}

export default PostCount;
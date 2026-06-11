
import categories from "../../data/categories.json"; 
import postsData from "../../data/posts.json"; 



export const getCategories = async () => {
  const data = categories
    .filter(category => category.isActive === true) 
    .sort((a, b) => a.priority - b.priority);

  return {
    status: 200, 
    data: {
      message: "Lấy danh mục thành công",
      data: data 
    }
  };
};

export const getPostsByCategoryId = async (categoryId, pagination) => {
  // 1. Cấu hình mặc định nếu FE không truyền pagination
  const { currentPage = 1, pageSize = 5 } = pagination || {};

  // 2. Lọc bài viết: Phải đang bật VÀ mảng categories phải CHỨA categoryId được truyền vào
  const filteredPosts = postsData
    .filter(post => 
      post.isActive === true && 
      post.categories.includes(categoryId) // Kiểm tra xem bài viết có thuộc danh mục này không
    )
    .sort((a, b) => a.priority - b.priority); // Sắp xếp theo thứ tự ưu tiên của bài viết

  // 3. Tính toán phân trang dựa trên danh sách đã lọc sạch sẽ
  const totalItems = filteredPosts.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredPosts.slice(startIndex, endIndex);

  return {
    status: 200,
    data: {
      message: `Lấy danh sách bài viết của danh mục [${categoryId}] thành công`,
      data: paginatedData,    // Mảng bài viết đã cắt theo trang
      totalItems: totalItems, // Tổng số bài viết của riêng danh mục này
      totalPages: totalPages  // Tổng số trang của riêng danh mục này
    }
  };
};
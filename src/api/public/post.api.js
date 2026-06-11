// src/api/public/post.js
import postsData from "../../data/posts.json";

export const getPosts= async (pagination) => {
  const { currentPage = 1, pageSize = 5 } = pagination || {};

  const activePosts = postsData
    .filter(post => post.isActive === true)
    .sort((a, b) => a.priority - b.priority);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = activePosts.slice(startIndex, endIndex);

  const totalItems = activePosts.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    status: 200,
    data: {
      message: "Lấy dòng thời gian thành công",
      data: paginatedData,   // Mảng bài viết Threads của trang hiện tại
      totalItems: totalItems, // Tổng số bài viết đang hoạt động trên hệ thống
      totalPages: totalPages  // Tổng số trang có thể chia được
    }
  };
};

export const getPostById = async (postId) => {
  const post = postsData.find(item => item.id === postId && item.isActive === true);

  if (!post) {
    return {
      status: 404,
      data: {
        message: "Không tìm thấy bài viết hoặc bài viết đã bị ẩn",
        data: null
      }
    };
  }

  return {
    status: 200,
    data: {
      message: "Lấy chi tiết bài viết thành công",
      data: post 
    }
  };
};

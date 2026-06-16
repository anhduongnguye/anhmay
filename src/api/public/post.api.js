// src/api/public/post.js
import postsData from "../../data/posts.json";

export const getPosts = async (pagination) => {
  const { currentPage = 1, pageSize = 5 } = pagination || {};

  const activePosts = postsData
    .filter(post => post.isActive === true)
    // Sắp xếp từ mới nhất đến cũ nhất
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = activePosts.slice(startIndex, endIndex);

  const totalItems = activePosts.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    status: 200,
    data: {
      message: "Lấy dòng thời gian thành công",
      data: paginatedData,
      totalItems: totalItems,
      totalPages: totalPages
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

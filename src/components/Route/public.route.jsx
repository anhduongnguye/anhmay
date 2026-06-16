
import PublicLayout from "../../layouts/public/PublicLayout";

import Home from "../../pages/public/Home"

import Post from "../../pages/public/posts/Post";
import PostDetail from "../../pages/public/posts/PostDetail";


import Category from "../../pages/public/categories/Category";
import CategoryDetail from "../../pages/public/categories/CategoryDetail";




export const publicRoute = {
  path: "/",
  element:  <PublicLayout />,
  children: [
    {
      index: true,
      element: <Home />
    },
    {
      path: "/bai-viet",
      children: [
        {
          path: ":id",
          element: <PostDetail />
        }
      ]
    },
    {
      path: "/danh-muc",
      children: [
        {
          path: ":id",
          element: <CategoryDetail />
        }
      ]
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]
}


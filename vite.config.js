import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { generateOgPages } from './scripts/generateOgPages.js'

function ogPagesPlugin(siteUrl) {
  return {
    name: 'generate-og-pages',
    closeBundle() {
      if (!siteUrl) {
        console.warn(
          '[og-pages] VITE_SITE_URL chưa được cấu hình — bỏ qua tạo trang OG. ' +
          'Đặt biến môi trường VITE_SITE_URL trên Netlify để preview Facebook/Zalo hiển thị đúng.'
        )
        return
      }

      generateOgPages({
        distDir: path.resolve('dist'),
        postsPath: path.resolve('src/data/posts.json'),
        companyPath: path.resolve('src/data/company.json'),
        siteUrl,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL || process.env.VITE_SITE_URL

  return {
    plugins: [
      react(),
      tailwindcss(),
      ogPagesPlugin(siteUrl),
    ],
  }
})

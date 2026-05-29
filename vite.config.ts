import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // Split heavy vendor libraries into separate chunks
          if (id.includes('node_modules/openai')) return 'vendor-ai'
          if (id.includes('node_modules/jspdf') || id.includes('node_modules/html-to-image') || id.includes('node_modules/docx') || id.includes('node_modules/mammoth')) return 'vendor-export'
          if (id.includes('node_modules/@tiptap')) return 'vendor-editor'
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/clsx') || id.includes('node_modules/tailwind-merge')) return 'vendor-ui'
        },
      },
    },
  },
})

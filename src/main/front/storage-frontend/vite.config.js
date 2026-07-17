import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 💡 This sends the production-built React app straight to Spring Boot's static resources!
    outDir: '../../resources/static',
    emptyOutDir: true, // Clears the folder before rebuilding
  }
})
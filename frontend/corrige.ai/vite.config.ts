import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', //programa que roda o front (vite) manda qualquer solicitação que tenha "/api" para o backend ao invés de tentar resolver ele mesmo
        changeOrigin: true,
      }
    }
  }
})
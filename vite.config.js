import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const dev = process.env.NODE_ENV === "development";

export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://pilah-pinter-be.devprox.my.id/api/",
        changeOrigin: true,
      },
    },
  },
});

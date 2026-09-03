import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: "public_vite",
  server: {
    port: 3001,
    host: true,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});

import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig ({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  root: "",
  build: {
    minify: "terser",
    outDir: "../dist",
    emptyOutDir: true,
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        entryFileNames: "js/[name]-[hash].js", // 将入口文件放到 js 文件夹
        chunkFileNames: "js/[name]-[hash].js", // 将代码分割后的文件放到 js 文件夹
        assetFileNames: "assets/[name]-[hash][extname]", // 将其他静态资源放到 assets 文件夹
      },
    },
  },
}) ;


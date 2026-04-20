import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// GitHub Pages 배포 시 base는 repo 이름과 일치해야 함
// 환경변수 BASE_PATH 또는 GITHUB_REPOSITORY에서 자동 추출
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base = process.env.BASE_PATH || (repoName ? `/${repoName}/` : "./");

const APP_NAME = "GH 재무 캘린더";
const APP_SHORT = "GH Finance";

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "profile.jpeg", "*.png"],
      manifest: {
        name: APP_NAME,
        short_name: APP_SHORT,
        description: "개인 자산관리 캘린더",
        theme_color: "#C08080",
        background_color: "#FAF5F3",
        display: "standalone",
        orientation: "portrait",
        start_url: base,
        scope: base,
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
        ]
      },
      workbox: {
        navigateFallback: `${base}index.html`,
        globPatterns: ["**/*.{js,css,html,svg,png,ico,webmanifest,jpeg,jpg}"]
      }
    })
  ]
});

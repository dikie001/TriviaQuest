import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "images/logo.png"],
      manifest: {
        name: "TriviaQuest",
        short_name: "TriviaQuest",
        description:
          "Challenge your mind with TriviaQuest – a global trivia adventure!",
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#0d1117",
        theme_color: "#1f2937",
        icons: [
          {
            src: "images/logo.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "images/logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});

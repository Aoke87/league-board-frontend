import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import analyze from "rollup-plugin-analyzer";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    server: {
        port: 3030,
    },
    build: {
        outDir: "/Users/buchholzp/Documents/project/private/league-board-backend/client",
    },
});

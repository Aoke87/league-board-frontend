import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        visualizer({
            template: "treemap", // or sunburst
            open: true,
            gzipSize: true,
            brotliSize: true,
            filename: "analice.html",
        }),
    ],
    server: {
        port: 3030,
    },
    build: {
        outDir: "/Users/buchholzp/Documents/project/private/league-board-backend/client",
    },
});

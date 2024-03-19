import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
    plugins: [
        nodePolyfills()
    ],
    build: {
        outDir: "dist",
        lib: {
            entry: "src/main.ts",
            name: "npm-radio",
            formats: ["es", "cjs"],
            fileName: (format) => `index.${format}.js`
        }
    },
    resolve: {
        conditions: ["node", "import", "module"]
    }
});

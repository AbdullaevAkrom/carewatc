import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standard config — no custom esbuild/loader options needed. Every file that
// contains JSX syntax uses the .jsx extension, which Vite/@vitejs/plugin-react
// handle out of the box. src/index.js is the only .js entry file and it
// intentionally avoids JSX (uses React.createElement instead).
export default defineConfig({
  plugins: [react()],
});

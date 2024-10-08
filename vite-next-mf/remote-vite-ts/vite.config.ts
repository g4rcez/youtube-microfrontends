import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfig from "vite-tsconfig-paths";

const buildLib = () => defineConfig({
  plugins: [react(), tsconfig({ configNames: ["tsconfig.lib.json"] })],
  define: {
    'process.env': { NODE_ENV: 'production' }
  },
  build: {
    sourcemap: false,
    outDir: "./dist",
    emptyOutDir: true,
    lib: {
      name: "components",
      entry: "./src/index.tsx",
      fileName: "index",
      formats: ["es", "umd", "cjs"],
    },
    rollupOptions: {
      treeshake: true,
    },
  },
});

// https://vitejs.dev/config/
const buildUi = () => defineConfig({
  plugins: [react()],
})

const fn = process.env.NODE_ENV === "production" ? buildLib : buildUi;

export default fn;

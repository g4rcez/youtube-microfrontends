import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

const buildLib = () => defineConfig({
  plugins: [solid()],
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
  plugins: [solid()],
})

const fn = process.env.NODE_ENV === "production" ? buildLib : buildUi;

export default fn;


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
      entry: "./src/index.ts",
      fileName: "index",
      formats: ["es", "umd", "cjs"],
    },
    rollupOptions: {
      treeshake: true,
      // external: ["react", "react/jsx-runtime", "react-dom", "tailwindcss"],
      // output: {
      //   globals: {
      //     react: "React",
      //     "react/jsx-runtime": "react/jsx-runtime",
      //     "react-dom": "ReactDOM",
      //     tailwindcss: "tailwindcss",
      //   },
      // },
    },
  },
});

// https://vitejs.dev/config/
const buildUi = () => defineConfig({
  plugins: [react()],
})

const fn = process.env.NODE_ENV === "production" ? buildLib : buildUi;

export default fn;

import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const basePath = env.VITE_BASE_PATH?.trim()
  const base = !basePath || basePath === '/'
    ? '/'
    : basePath.startsWith('/')
      ? (basePath.endsWith('/') ? basePath : `${basePath}/`)
      : `/${basePath}${basePath.endsWith('/') ? '' : '/'}`

  return {
    base,
    plugins: [inspectAttr(), react()],
    resolve: {
      alias: {
        "@riq/shared": path.resolve(__dirname, "./packages/shared/src/index.ts"),
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
});

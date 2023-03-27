import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
     usePolling: true,
    },
    host: true, // Here
    strictPort: true,
    port: 3000,
  },
  plugins: [reactRefresh()],
})

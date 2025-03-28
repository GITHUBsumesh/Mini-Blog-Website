import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    watch: {
      usePolling: true,  // Required for Docker file system watching
    },
    hmr: {
      clientPort: 5173,  // Important for WebSocket connection
    },
    host: true,  // Bind to 0.0.0.0
  },
})

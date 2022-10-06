import { build, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'new-team-services/assets/js/[name]-[hash].js',
        entryFileNames: 'new-team-services/assets/js/[name]-[hash].js',
        assetFileNames(chunkInfo) {
          console.log('chunkInfo: ', chunkInfo.name);
          if (/\.(svg|png|jpg)$/.test(chunkInfo.name)) {
            return "new-team-services/assets/images/[name]-[hash].[ext]"
          }
          return "new-team-services/assets/[ext]/[name]-[hash].[ext]"
        },

      },

    },
    minify: 'terser'
  }
})

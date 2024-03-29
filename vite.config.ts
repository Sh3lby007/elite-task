import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      VueDevTools(),
      //Plugin for PWA usage
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',

        // Manifest JSON
        manifest: {
          name: 'Elite Task',
          start_url: '/elite-task/',
          display: 'standalone'
          // Smaller icon as launcher icon, larger icon for app switch.
          // icons: [
          // One full stop to reference a file in the same directory. Two full stop if we reference a file from the parent directory
          // {
          //   src: './assets/icons/bus-192.png',
          //   type: 'image/png',
          //   sizes: '192x192',
          //   purpose: 'maskable'
          // }
          // ]
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },

    // When deploying to Github pages, the base URL will be your repo's name,
    // Thus the production base URL must be changed here for it to work when deployed.
    // Ref: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#next-steps
    base: mode === 'github-pages' ? '/elite-task/' : '/'
  }
})

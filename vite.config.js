import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// The site uses a client-side router on static hosting, so a request for
// /blog/<slug> never matches a real file. GitHub Pages serves 404.html for
// unmatched paths while leaving the URL intact, so an exact copy of index.html
// lets the router resolve the route - deep links and refreshes then work.
//
// On other hosts use their own rewrite instead:
//   Netlify -> public/_redirects with:  /* /index.html 200
//   Vercel  -> vercel.json rewrite to /index.html
//   Nginx   -> try_files $uri $uri/ /index.html;
const spaFallback = () => ({
  name: 'spa-fallback-404',
  closeBundle() {
    const index = resolve(__dirname, 'dist/index.html')
    if (existsSync(index)) {
      copyFileSync(index, resolve(__dirname, 'dist/404.html'))
    }
  },
})

export default defineConfig({
  plugins: [react(), spaFallback()],
  server: {
    port: 3000,
    open: true
  }
})

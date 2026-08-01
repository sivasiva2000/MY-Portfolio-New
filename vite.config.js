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

// GitHub Pages serves this project repo from a subpath, not the domain root:
//   https://sivasiva2000.github.io/MY-Portfolio-New/
// Without a matching base, every bundle URL points at the domain root and 404s,
// which leaves a blank page. Dev stays on '/' so localhost:3000 works as usual.
//
// If you later attach a custom domain (or move to a sivasiva2000.github.io repo),
// the site is served from the root - set BASE to '/' and everything still works,
// because runtime asset URLs go through src/lib/asset.js.
const BASE = '/MY-Portfolio-New/'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? BASE : '/',
  plugins: [react(), spaFallback()],
  server: {
    port: 3000,
    open: true
  }
}))

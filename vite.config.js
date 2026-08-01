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

// A GitHub Pages *project* site is served from a subpath, not the domain root:
//   https://<owner>.github.io/<repo>/
// Without a matching base every bundle URL points at the domain root and 404s,
// leaving a blank page. Rather than hardcode the repo name - which breaks
// silently the next time the repo is renamed - derive it:
//
//   - GitHub Actions sets GITHUB_REPOSITORY to "owner/repo", so a project site
//     resolves to "/repo/" automatically and survives renames.
//   - A user site (owner.github.io) and custom domains serve from the root.
//   - Local builds default to "/"; set BASE_PATH to override.
//
// Dev always stays on "/" so localhost:3000 is unaffected. Runtime asset URLs
// go through src/lib/asset.js, so they follow whatever this resolves to.
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const inferredBase = !repoName || repoName.endsWith('.github.io') ? '/' : `/${repoName}/`
const BASE = process.env.BASE_PATH || inferredBase

export default defineConfig(({ command }) => ({
  base: command === 'build' ? BASE : '/',
  plugins: [react(), spaFallback()],
  server: {
    port: 3000,
    open: true
  }
}))

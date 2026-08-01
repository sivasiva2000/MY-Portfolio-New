// Files in public/ are referenced by URL at runtime, so they must respect the
// deploy base. Vite exposes it as import.meta.env.BASE_URL: '/' in dev, and
// '/MY-Portfolio-New/' in a production build for GitHub Pages.
//
// Vite rewrites asset URLs it can see (imports, index.html) but NOT string
// literals like '/certificates/foo.pdf' - those would resolve against the
// domain root and 404 on a project page. Always build such URLs through this.
export const asset = (path) => `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, '')}`

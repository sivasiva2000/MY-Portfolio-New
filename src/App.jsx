import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import GithubStats from './components/GithubStats'
import Experience from './components/Experience'
import Education from './components/Education'
import LatestArticles from './components/LatestArticles'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Blog from './components/Blog'
import BlogPost from './components/BlogPost'

const NAV_OFFSET = 80 // fixed navbar height, so section headings clear it

// Depending on layout, either the document or the app root is the scroll container.
const getScroller = () => {
  const root = document.getElementById('app-root')
  if (root && root.scrollHeight > root.clientHeight + 10) return root
  return null // means: use the window
}

const scrollToTop = () => {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  const root = document.getElementById('app-root')
  if (root) root.scrollTop = 0
}

// index.css sets scroll-behavior: smooth globally, so scrolls animate by default.
// That is right for a short in-page hop, but crawling thousands of pixels after
// arriving from another route is not - jump instantly when the distance is large.
const alignTo = (target) => {
  const scroller = getScroller()
  const current = scroller ? scroller.scrollTop : window.scrollY
  const top = Math.max(0, target.getBoundingClientRect().top + current - NAV_OFFSET)
  // 'auto' would defer to the CSS value (smooth); 'instant' is what actually jumps.
  const behavior = Math.abs(top - current) > window.innerHeight * 2 ? 'instant' : 'smooth'

  if (scroller) scroller.scrollTo({ top, behavior })
  else window.scrollTo({ top, behavior })
}

const ScrollManager = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      scrollToTop()
      return undefined
    }

    // Coming from /blog the portfolio has to mount before the section exists, so
    // poll briefly for it - then align exactly once. Repeatedly re-scrolling would
    // restart the smooth animation on every tick and never settle.
    let cancelled = false
    let attempts = 0
    let timer = null

    const align = () => {
      if (cancelled) return
      const target = document.querySelector(hash)
      if (target) {
        alignTo(target)
        return
      }
      attempts += 1
      if (attempts < 40) timer = window.setTimeout(align, 50)
    }

    align()

    return () => {
      cancelled = true
      if (timer) window.clearTimeout(timer)
    }
  }, [pathname, hash])

  return null
}

const PortfolioPage = () => (
  <main className="overflow-x-hidden w-full">
    <Home />
    <About />
    <Skills />
    <Projects />
    <GithubStats />
    <Experience />
    <Education />
    <LatestArticles />
    <Contact />
  </main>
)

const RouteNotFound = () => (
  <main className="section-padding pt-28 md:pt-32 bg-gray-50 dark:bg-dark-bg min-h-screen w-full">
    <div className="container-custom text-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Page not found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        That page does not exist. Try the portfolio or the articles instead.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
        >
          Portfolio
        </Link>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500/10 border border-primary-500/30 text-primary-500 font-medium hover:bg-primary-500/20 transition-colors"
        >
          Articles
        </Link>
      </div>
    </div>
  </main>
)

function App() {
  // Light mode temporarily disabled - dark mode only
  const [darkMode, setDarkMode] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  useEffect(() => {
    // Force dark mode always
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }, [darkMode])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="loading-dots text-primary-500 mb-4">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="text-white/60 font-mono">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <ScrollManager />
      <div
        id="app-root"
        className={`min-h-screen transition-colors duration-300 overflow-x-hidden w-full ${
          darkMode ? 'bg-dark-bg text-white' : 'bg-gray-50 text-gray-900'
        }`}
      >
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<RouteNotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

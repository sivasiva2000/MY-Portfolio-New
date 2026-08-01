import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/s_image.png'

// Router-aware so section links keep working from /blog as well as from /
const MotionLink = motion(Link)

const NAV_OFFSET = 90 // fixed navbar height plus a little, for the active test

const navItems = [
  { name: 'Home', to: '/#home', section: 'home' },
  { name: 'About', to: '/#about', section: 'about' },
  { name: 'Skills', to: '/#skills', section: 'skills' },
  { name: 'Projects', to: '/#projects', section: 'projects' },
  { name: 'Experience', to: '/#experience', section: 'experience' },
  { name: 'Blog', to: '/blog' },
  { name: 'Contact', to: '/#contact', section: 'contact' },
]

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('Home')
  const { pathname } = useLocation()
  const onBlog = pathname.startsWith('/blog')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scrollspy: highlight whichever section the reader is currently in. Sections
  // without their own nav entry (GitHub, Education, Articles) simply leave the
  // previous item highlighted, which reads naturally while scrolling through.
  useEffect(() => {
    if (onBlog) {
      setActiveItem('Blog')
      return undefined
    }

    // Timer-throttled rather than rAF-throttled: same effect (at most one layout
    // read per 100ms) without depending on frames being scheduled.
    let timer = null

    const update = () => {
      timer = null
      const spied = navItems.filter((item) => item.section)
      let current = spied[0].name

      for (const item of spied) {
        const el = document.getElementById(item.section)
        if (el && el.getBoundingClientRect().top - NAV_OFFSET <= 0) current = item.name
      }

      // At the very bottom the last section may never cross the line, so claim it.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) current = spied[spied.length - 1].name

      setActiveItem(current)
    }

    const onScroll = () => {
      if (timer === null) timer = window.setTimeout(update, 100)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (timer !== null) window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [onBlog, pathname])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      // Explicit tween: the previous unconfigured spring could be slow to settle,
      // and the nav is hidden off-screen until it does.
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? 'bg-white/80 dark:bg-dark-card/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom w-full max-w-full">
        <div className="flex items-center justify-between h-16 md:h-20 w-full px-2">
          {/* Logo */}
          <MotionLink
            to="/#home"
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={logo} alt="Siva" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
          </MotionLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item, index) => {
              const isActive = activeItem === item.name
              return (
                <MotionLink
                  key={item.name}
                  to={item.to}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-sm transition-colors relative group ${
                    isActive
                      ? 'text-primary-500 font-semibold'
                      : 'font-medium hover:text-primary-500'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary-500 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </MotionLink>
              )
            })}
            
            {/* Theme Toggle - Temporarily disabled (dark mode only) */}
            {/* TODO: Uncomment for light mode support
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-dark-border hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
            </motion.button>
            */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Theme Toggle - Temporarily disabled (dark mode only) */}
            {/* TODO: Uncomment for light mode support
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-dark-border"
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
            </motion.button>
            */}
            
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-dark-border"
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = activeItem === item.name
                  return (
                    <MotionLink
                      key={item.name}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`block px-4 py-2 rounded-lg transition-colors border-l-2 ${
                        isActive
                          ? 'border-primary-500 bg-primary-500/10 text-primary-500 font-semibold'
                          : 'border-transparent hover:bg-gray-200 dark:hover:bg-dark-border'
                      }`}
                      whileHover={{ x: 10 }}
                    >
                      {item.name}
                    </MotionLink>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar

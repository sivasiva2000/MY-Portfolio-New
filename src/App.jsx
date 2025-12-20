import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  // Light mode temporarily disabled - dark mode only
  const [darkMode, setDarkMode] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500)

    // Force dark mode
    // TODO: Uncomment below for light mode support
    // const savedTheme = localStorage.getItem('theme')
    // if (savedTheme) {
    //   setDarkMode(savedTheme === 'dark')
    // }
  }, [])

  useEffect(() => {
    // Force dark mode always
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
    
    // TODO: Uncomment below for light mode support
    // if (darkMode) {
    //   document.documentElement.classList.add('dark')
    //   localStorage.setItem('theme', 'dark')
    // } else {
    //   document.documentElement.classList.remove('dark')
    //   localStorage.setItem('theme', 'light')
    // }
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
    <div className={`min-h-screen transition-colors duration-300 overflow-x-hidden w-full ${
      darkMode ? 'bg-dark-bg text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="overflow-x-hidden w-full">
        <Home />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

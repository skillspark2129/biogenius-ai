import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Chapters from './components/Chapters.jsx'
import Quiz from './components/Quiz.jsx'
import AITutor from './components/AITutor.jsx'

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('biogenius-theme')
    if (saved === 'dark') setDarkMode(true)
    else if (saved === 'light') setDarkMode(false)
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setDarkMode(true)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('biogenius-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const handleSetTab = (tab) => {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header
        activeTab={activeTab}
        setActiveTab={handleSetTab}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main>
        {activeTab === 'home' && (
          <>
            <Hero setActiveTab={handleSetTab} />
            <Footer />
          </>
        )}
        {activeTab === 'chapters' && <Chapters />}
        {activeTab === 'quiz' && <Quiz />}
        {activeTab === 'tutor' && <AITutor />}
      </main>

      {activeTab !== 'home' && <Footer />}
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="12" r="8" opacity="0.4" />
            </svg>
          </div>
          <span className="font-display font-bold text-slate-900 dark:text-white">
            BioGenius<span className="text-primary-500"> AI</span>
          </span>
        </div>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          AI-Powered Biology Learning Platform
        </p>
      </div>
    </footer>
  )
}

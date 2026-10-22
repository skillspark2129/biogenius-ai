import { useState } from 'react'
import { chapters } from '../data/content.js'

export default function Chapters() {
  const [expandedChapter, setExpandedChapter] = useState(null)
  const [activeLesson, setActiveLesson] = useState({})

  const toggleChapter = (id) => {
    setExpandedChapter(expandedChapter === id ? null : id)
    if (expandedChapter !== id) {
      setActiveLesson({ ...activeLesson, [id]: 0 })
    }
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Biology Chapters</h2>
          <p className="section-subtitle">Explore three core areas of biology with detailed lessons</p>
        </div>

        <div className="space-y-6">
          {chapters.map((chapter, idx) => {
            const isOpen = expandedChapter === chapter.id
            const currentLesson = activeLesson[chapter.id] ?? 0
            const lesson = chapter.lessons[currentLesson]

            return (
              <div
                key={chapter.id}
                className="glass-card overflow-hidden animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className="w-full flex items-center gap-4 p-5 md:p-6 text-left hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-all duration-200"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${
                    chapter.color === 'accent'
                      ? 'bg-accent-100 dark:bg-accent-900/30'
                      : 'bg-primary-100 dark:bg-primary-900/30'
                  }`}>
                    {chapter.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-display font-semibold text-slate-900 dark:text-white">
                      {chapter.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      {chapter.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {chapter.lessons.length} lessons
                      </span>
                      <div className="flex gap-1">
                        {chapter.lessons.map((_, i) => (
                          <div
                            key={i}
                            className={`w-8 h-1.5 rounded-full ${
                              i === currentLesson && isOpen
                                ? chapter.color === 'accent' ? 'bg-accent-500' : 'bg-primary-500'
                                : 'bg-slate-200 dark:bg-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-200/60 dark:border-slate-700/60 animate-fade-in">
                    <div className="flex gap-2 p-4 overflow-x-auto bg-slate-50/50 dark:bg-slate-900/30">
                      {chapter.lessons.map((l, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveLesson({ ...activeLesson, [chapter.id]: i })}
                          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                            i === currentLesson
                              ? chapter.color === 'accent'
                                ? 'bg-accent-500 text-white shadow-md'
                                : 'bg-primary-500 text-white shadow-md'
                              : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
                          }`}
                        >
                          {l.title}
                        </button>
                      ))}
                    </div>

                    <div className="p-5 md:p-6">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <h4 className="text-lg font-display font-semibold text-slate-900 dark:text-white mb-3">
                          {lesson.title}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                          {lesson.content}
                        </p>
                      </div>

                      <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 md:p-5">
                        <h5 className="text-sm font-semibold text-primary-700 dark:text-primary-300 mb-3 flex items-center gap-2">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Key Points
                        </h5>
                        <ul className="space-y-2">
                          {lesson.keyPoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                              <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                                chapter.color === 'accent' ? 'bg-accent-500' : 'bg-primary-500'
                              }`} />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { quizzes, chapters } from '../data/content.js'

export default function Quiz() {
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const quiz = quizzes.find((q) => q.chapterId === selectedChapter)
  const chapter = chapters.find((c) => c.id === selectedChapter)
  const question = quiz?.questions[currentQ]

  const startQuiz = (chapterId) => {
    setSelectedChapter(chapterId)
    setCurrentQ(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setFinished(false)
  }

  const handleAnswer = (idx) => {
    if (showResult) return
    setSelectedAnswer(idx)
    setShowResult(true)
    if (idx === question.answer) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQ + 1 < quiz.questions.length) {
      setCurrentQ(currentQ + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setFinished(true)
    }
  }

  const reset = () => {
    setSelectedChapter(null)
    setCurrentQ(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const total = quiz.questions.length
    const percentage = Math.round((score / total) * 100)
    const isGood = percentage >= 70

    return (
      <section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-10 text-center animate-slide-up">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-5xl mb-6 ${
              isGood ? 'bg-accent-100 dark:bg-accent-900/30' : 'bg-primary-100 dark:bg-primary-900/30'
            }`}>
              {isGood ? '🎉' : '💪'}
            </div>
            <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">
              Quiz Complete!
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">{chapter?.title}</p>

            <div className="inline-flex flex-col items-center gap-1 px-8 py-4 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg mb-6">
              <span className="text-4xl font-bold font-display">{percentage}%</span>
              <span className="text-sm opacity-90">{score} / {total} correct</span>
            </div>

            <p className="text-slate-600 dark:text-slate-300 mb-8">
              {isGood
                ? 'Excellent work! You have a strong understanding of this topic.'
                : 'Keep studying! Review the chapter and try again to improve your score.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => startQuiz(selectedChapter)} className="btn-primary">
                Try Again
              </button>
              <button onClick={reset} className="btn-secondary">
                Choose Another Quiz
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!selectedChapter) {
    return (
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Test Your Knowledge</h2>
            <p className="section-subtitle">Choose a topic and take a quiz to see how much you have learned</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chapters.map((chapter, idx) => {
              const chapterQuiz = quizzes.find((q) => q.chapterId === chapter.id)
              return (
                <button
                  key={chapter.id}
                  onClick={() => startQuiz(chapter.id)}
                  className="glass-card p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up group"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-4 ${
                    chapter.color === 'accent'
                      ? 'bg-accent-100 dark:bg-accent-900/30'
                      : 'bg-primary-100 dark:bg-primary-900/30'
                  }`}>
                    {chapter.icon}
                  </div>
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-1">
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    {chapterQuiz.questions.length} questions
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:gap-2.5 transition-all">
                    Start Quiz
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{chapter?.icon}</span>
            <div>
              <h2 className="font-display font-semibold text-slate-900 dark:text-white">{chapter?.title}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Question {currentQ + 1} of {quiz.questions.length}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">
            Score: {score}
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentQ + (showResult ? 1 : 0)) / quiz.questions.length) * 100}%` }}
          />
        </div>

        <div className="glass-card p-6 md:p-8 animate-slide-up" key={currentQ}>
          <h3 className="text-lg md:text-xl font-display font-semibold text-slate-900 dark:text-white mb-6">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isCorrect = idx === question.answer
              const isSelected = idx === selectedAnswer

              let stateClass = 'border-slate-200 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'
              if (showResult) {
                if (isCorrect) {
                  stateClass = 'border-accent-500 bg-accent-50 dark:bg-accent-900/20'
                } else if (isSelected) {
                  stateClass = 'border-red-400 bg-red-50 dark:bg-red-900/20'
                } else {
                  stateClass = 'border-slate-200 dark:border-slate-700 opacity-60'
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showResult}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${stateClass} ${
                    !showResult ? 'active:scale-[0.98] cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                    showResult && isCorrect
                      ? 'bg-accent-500 text-white'
                      : showResult && isSelected
                      ? 'bg-red-400 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {showResult && isCorrect ? '✓' : showResult && isSelected ? '✕' : String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-slate-700 dark:text-slate-200 text-sm md:text-base">{option}</span>
                </button>
              )
            })}
          </div>

          {showResult && (
            <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 animate-fade-in">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-800 dark:text-white">Explanation: </span>
                {question.explanation}
              </p>
            </div>
          )}

          {showResult && (
            <div className="flex justify-end mt-6">
              <button onClick={nextQuestion} className="btn-primary">
                {currentQ + 1 < quiz.questions.length ? 'Next Question' : 'See Results'}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <button onClick={reset} className="mt-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          ← Back to quiz selection
        </button>
      </div>
    </section>
  )
}

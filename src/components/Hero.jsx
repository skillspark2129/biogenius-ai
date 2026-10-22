export default function Hero({ setActiveTab }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/30 dark:bg-primary-700/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-300/20 dark:bg-accent-700/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
            AI-Powered Biology Learning
          </div>

          <h1 className="text-4xl md:text-6xl font-bold font-display text-slate-900 dark:text-white leading-tight mb-6">
            Master Biology with{' '}
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              AI Intelligence
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Explore interactive chapters on Cell Biology, Genetics, and Physiology.
            Test your knowledge with smart quizzes and get instant help from your AI tutor.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setActiveTab('chapters')} className="btn-primary text-base">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Start Learning
            </button>
            <button onClick={() => setActiveTab('quiz')} className="btn-secondary text-base">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Take a Quiz
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
          {[
            { icon: '📚', title: 'Interactive Chapters', desc: '3 core biology topics with detailed lessons' },
            { icon: '✅', title: 'Smart Quizzes', desc: 'Test yourself with instant feedback' },
            { icon: '🤖', title: 'AI Tutor', desc: 'Get answers to your biology questions instantly' },
          ].map((feature, i) => (
            <div
              key={i}
              className="glass-card p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-1">{feature.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

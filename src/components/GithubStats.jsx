import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiGitBranch, FiCode, FiExternalLink } from 'react-icons/fi'
import { SiPython } from 'react-icons/si'

const GITHUB_USER = 'sivasiva2000'
const PROFILE_URL = `https://github.com/${GITHUB_USER}`

const GithubStats = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [stats, setStats] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        // Unauthenticated GitHub API allows ~60 requests/hour per IP, so a visitor
        // may legitimately get rate-limited. Fail quietly to a profile link.
        const [userRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`),
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`),
        ])
        if (!userRes.ok || !repoRes.ok) throw new Error('github api unavailable')

        const user = await userRes.json()
        const repos = await repoRes.json()
        if (cancelled || !Array.isArray(repos)) return

        const languageCounts = repos.reduce((acc, repo) => {
          if (repo.language) acc[repo.language] = (acc[repo.language] || 0) + 1
          return acc
        }, {})
        const languages = Object.entries(languageCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)

        setStats({
          repos: user.public_repos ?? repos.length,
          pythonRepos: languageCounts.Python || 0,
          languageCount: Object.keys(languageCounts).length,
          // Denominator for the chart: repos GitHub could classify. Some have no
          // detected language, so this is deliberately not the total repo count.
          classified: languages.reduce((sum, [, count]) => sum + count, 0),
          languages,
        })
      } catch {
        if (!cancelled) setFailed(true)
      }
    }

    if (inView) load()
    return () => {
      cancelled = true
    }
  }, [inView])

  const tiles = stats
    ? [
        { icon: FiGitBranch, label: 'Public Repositories', value: String(stats.repos) },
        { icon: SiPython, label: 'Python Repositories', value: String(stats.pythonRepos) },
        { icon: FiCode, label: 'Languages Used', value: String(stats.languageCount) },
      ]
    : []

  // white/dark-card keeps the section background alternating after Projects; the
  // bottom border gives a clean seam against Experience, which shares that colour.
  return (
    <section id="github" className="section-padding bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border w-full overflow-x-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="container-custom w-full max-w-full"
      >
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10 mb-6"
          >
            <FiGithub className="text-3xl text-primary-500" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            GitHub <span className="gradient-text">Activity</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-20 h-1 bg-primary-500 mx-auto rounded-full"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Pulled live from my GitHub profile
          </motion.p>
        </div>

        {stats && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {tiles.map((tile, index) => (
                <motion.div
                  key={tile.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-6 rounded-xl bg-white dark:bg-dark-card shadow-lg"
                >
                  <tile.icon className="text-2xl text-primary-500 mx-auto mb-3" />
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{tile.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{tile.label}</div>
                </motion.div>
              ))}
            </div>

            {stats.languages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-12 max-w-2xl mx-auto"
              >
                {/* One measure (repo count) across a few named categories, so: horizontal
                    bars, single hue. Identity comes from the text label, not the colour,
                    which is why no legend is needed. Values are labelled directly. */}
                <h3 className="text-lg font-semibold mb-1 text-center">Language Usage</h3>
                <p className="text-xs text-gray-500 dark:text-gray-500 text-center mb-6">
                  By primary language across {stats.classified} public repositories
                </p>

                <div className="space-y-4">
                  {stats.languages.map(([language, count], index) => {
                    const pct = Math.round((count / stats.classified) * 100)
                    return (
                      <div
                        key={language}
                        className="group"
                        title={`${language}: ${count} of ${stats.classified} repositories (${pct}%)`}
                      >
                        <div className="flex items-baseline justify-between mb-1.5 gap-3">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {language}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                            {count} {count === 1 ? 'repo' : 'repos'} · {pct}%
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${pct}%` } : { width: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 + index * 0.1, ease: 'easeOut' }}
                            className="h-full rounded-full bg-primary-500 group-hover:bg-primary-400 transition-colors"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </>
        )}

        {!stats && (
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            {failed ? 'Live stats are unavailable right now.' : 'Loading GitHub activity…'}
          </p>
        )}

        <div className="mt-10 text-center">
          <motion.a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
          >
            <FiGithub /> View Full Profile <FiExternalLink className="text-sm" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}

export default GithubStats

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi'
import { sortedArticles } from '../data/articles'

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

const Blog = () => {
  useEffect(() => {
    document.title = 'Articles | Siva K — Python Backend Developer'
  }, [])

  return (
    <main className="section-padding pt-28 md:pt-32 bg-gray-50 dark:bg-dark-bg w-full overflow-x-hidden min-h-screen">
      <div className="container-custom w-full max-w-full">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Articles <span className="gradient-text">& Notes</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-primary-500 mx-auto rounded-full"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Writing on backend engineering, identity governance, and security research
          </motion.p>
        </div>

        <div className="grid gap-6 max-w-3xl mx-auto">
          {sortedArticles.map((article, index) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-white dark:bg-dark-card shadow-lg hover:shadow-2xl transition-all"
            >
              <Link to={`/blog/${article.slug}`} className="block p-6 sm:p-8 group">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-500 mb-3">
                  <span className="inline-flex items-center gap-1.5">
                    <FiCalendar /> {formatDate(article.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiClock /> {article.readingTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary-500 transition-colors">
                  {article.title}
                </h2>

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {article.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-2 text-primary-500 text-sm font-semibold">
                  Read article
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Blog

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi'
import { sortedArticles } from '../data/articles'

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

const LatestArticles = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const latest = sortedArticles.slice(0, 3)

  return (
    // dark-card keeps the alternation going after Education; the bottom border
    // gives a clean seam against Contact, which shares this surface colour.
    <section
      id="articles"
      className="section-padding bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border w-full overflow-x-hidden"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="container-custom w-full max-w-full"
      >
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Latest <span className="gradient-text">Articles</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-primary-500 mx-auto rounded-full"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Writing on backend engineering, identity governance, and security research
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {latest.map((article, index) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="rounded-2xl bg-gray-50 dark:bg-dark-bg shadow-lg hover:shadow-2xl transition-all h-full"
            >
              <Link to={`/blog/${article.slug}`} className="flex flex-col h-full p-6 group">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-500 mb-3">
                  <span className="inline-flex items-center gap-1.5">
                    <FiCalendar /> {formatDate(article.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiClock /> {article.readingTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2 leading-snug group-hover:text-primary-500 transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-1">
                  {article.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-primary-500/10 text-primary-500 text-[11px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-2 text-primary-500 text-sm font-semibold mt-auto">
                  Read article
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
          >
            View all articles <FiArrowRight />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default LatestArticles

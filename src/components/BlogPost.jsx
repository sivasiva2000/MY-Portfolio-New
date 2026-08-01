import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiArrowLeft, FiExternalLink } from 'react-icons/fi'
import { getArticle } from '../data/articles'

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

const setMetaDescription = (content) => {
  const tag = document.querySelector('meta[name="description"]')
  if (tag) tag.setAttribute('content', content)
}

const NotFound = () => (
  <main className="section-padding pt-28 md:pt-32 bg-gray-50 dark:bg-dark-bg min-h-screen w-full">
    <div className="container-custom text-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Article not found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        That article does not exist, or the link may have changed.
      </p>
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
      >
        <FiArrowLeft /> All articles
      </Link>
    </div>
  </main>
)

const BlogPost = () => {
  const { slug } = useParams()
  const article = getArticle(slug)

  useEffect(() => {
    if (!article) {
      document.title = 'Article not found | Siva K'
      return
    }
    document.title = `${article.title} | Siva K`
    setMetaDescription(article.description)
  }, [article])

  if (!article) return <NotFound />

  return (
    <main className="section-padding pt-28 md:pt-32 bg-gray-50 dark:bg-dark-bg w-full overflow-x-hidden min-h-screen">
      <div className="container-custom w-full max-w-full">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 text-sm font-semibold mb-8 transition-colors"
          >
            <FiArrowLeft /> All articles
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-500 mb-4">
              <span className="inline-flex items-center gap-1.5">
                <FiCalendar /> {formatDate(article.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FiClock /> {article.readingTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
              {article.description}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.header>

          <div className="space-y-10">
            {article.sections.map((section, index) => (
              <motion.section
                key={section.heading}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-4">{section.heading}</h2>

                {section.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.list && (
                  <ul className="space-y-2 mb-4">
                    {section.list.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-400"
                      >
                        <span className="text-primary-500 mt-1 flex-shrink-0">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.code && (
                  <pre className="mt-4 mb-2 p-4 rounded-xl bg-gray-900 dark:bg-black/50 border border-gray-800 overflow-x-auto">
                    <code className="text-xs sm:text-[13px] font-mono text-gray-300 leading-relaxed whitespace-pre">
                      {section.code.content}
                    </code>
                  </pre>
                )}
              </motion.section>
            ))}
          </div>

          {article.links && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-border">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Referenced in this article
              </h2>
              <div className="flex flex-wrap gap-3">
                {article.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/30 hover:border-primary-500/60 text-primary-500 text-sm font-semibold transition-all"
                  >
                    <FiExternalLink /> {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-border">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
            >
              <FiArrowLeft /> All articles
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default BlogPost

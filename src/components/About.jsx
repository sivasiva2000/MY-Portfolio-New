import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCode, FiDatabase, FiCloud, FiShield } from 'react-icons/fi'

const bugcrowdUrl = 'https://bugcrowd.com/h/sivak08557e93-5289-47fa-bf58-a4d0f066d6d4'

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Quick-scan summary. Every figure is derived from content on this page.
  const stats = [
    { label: 'Years Experience', value: '2+' },
    { label: 'Enterprise Modules', value: '6+' },
    { label: 'Enterprise Connectors', value: '7+' },
    { label: 'Public Repositories', value: '21+' },
    { label: 'Security Recognition', value: 'Okta' },
  ]

  const highlights = [
    {
      icon: FiCode,
      title: 'Backend & API Engineering',
      description: 'Django and Django REST Framework services built around clean data models, serializers, middleware, and well-versioned REST endpoints.',
    },
    {
      icon: FiShield,
      title: 'Identity & Access Governance',
      description: 'JWT authentication, role-based access control, SSO/MFA, and end-to-end audit trails that satisfy enterprise compliance requirements.',
    },
    {
      icon: FiDatabase,
      title: 'Database & Query Optimization',
      description: 'Relational modelling in MySQL for users, roles, groups, and entitlements, with query tuning that keeps sync and reporting fast at scale.',
    },
    {
      icon: FiCloud,
      title: 'Cloud, Docker & CI/CD',
      description: 'Connector-based integrations across AWS, Azure, Active Directory, and Microsoft 365, shipped through Dockerised CI/CD pipelines.',
    },
  ]

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-dark-bg w-full overflow-x-hidden">
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
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-primary-500 mx-auto rounded-full"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="px-4 sm:px-0 lg:col-span-2 max-w-4xl mx-auto text-center"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              I am a backend-focused Python developer who builds secure, scalable web services with Django and Django REST Framework.
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              My day-to-day work is REST API design, relational data modelling in MySQL, JWT authentication, and role-based access control. I have designed, developed, and maintained a full-stack enterprise Identity Governance &amp; Administration (IGA) platform end to end &mdash; owning the data models, serializers, and request/response flows, then wiring it into AWS, Azure, Active Directory, and Microsoft 365 through connector-based integrations.
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              I care about the parts of a system that are easy to get wrong: query performance under real synchronisation load, audit logging that stands up to a compliance review, and event-driven jobs that replace manual processes without silently failing. Everything ships through Docker and CI/CD pipelines so deployments stay repeatable.
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              That same instinct led me into security research. In November 2025 I reported a broken
              access control issue to <span className="font-semibold">Okta</span> &mdash; API access
              that stayed live after trial expiration &mdash; which was accepted as a valid finding
              and rewarded through{' '}
              <a
                href={bugcrowdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary-500 hover:text-primary-600 underline decoration-primary-500/40 hover:decoration-primary-500 transition-colors"
              >
                Bugcrowd
              </a>
              . I enjoy solving hard backend problems and strengthening the systems I work on.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              {['Python', 'Django', 'Django REST Framework', 'REST APIs', 'MySQL', 'JWT & RBAC', 'Okta', 'CyberArk PAM', 'Docker', 'CI/CD', 'AWS', 'Azure', 'Active Directory', 'React'].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="px-4 py-2 rounded-full bg-primary-500/10 text-primary-500 font-medium text-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mb-12 sm:mb-16"
        >
          {/* w-full so the 1fr columns size against the container, not max-content -
              without it this grid overflows (and gets clipped) on narrow screens. */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-5xl w-full">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4 sm:p-6 lg:p-4 rounded-xl bg-white dark:bg-dark-card shadow-lg"
              >
                {/* lg steps back down: six columns leaves each tile narrow */}
                <div className="text-3xl sm:text-4xl lg:text-3xl font-bold gradient-text mb-2 break-words">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-xl bg-white dark:bg-dark-card shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4">
                <highlight.icon className="text-2xl text-primary-500" />
              </div>
              <h4 className="text-lg font-semibold mb-2">{highlight.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default About

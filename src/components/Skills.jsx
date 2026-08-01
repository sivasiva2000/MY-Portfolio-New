import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  SiJavascript, SiReact, SiPython,
  SiAmazonaws, SiDocker, SiDjango,
  SiGit, SiGithub, SiMysql, SiLinux,
  SiMicrosoftazure, SiMicrosoftoffice, SiJsonwebtokens,
  SiHtml5, SiCss3, SiMui, SiFastapi, SiKubernetes, SiOkta,
  SiPodman, SiRedhat
} from 'react-icons/si'

import {
  FiCode, FiKey, FiServer, FiDatabase, FiRefreshCcw, FiShield, FiZap, FiClock,
  FiGitBranch, FiFileText, FiUsers, FiTarget, FiLayers, FiSearch, FiTrendingUp,
  FiLock, FiRepeat, FiCpu, FiActivity, FiMessageSquare, FiLink
} from 'react-icons/fi'

const skillGroups = [
  {
    category: 'Backend',
    skills: [
      { name: 'Python', icon: SiPython, color: 'text-blue-400' },
      { name: 'Django', icon: SiDjango, color: 'text-green-700' },
      { name: 'Django REST Framework', icon: SiDjango, color: 'text-red-500' },
      { name: 'ORM & Serializers', icon: FiCode, color: 'text-emerald-500' },
      { name: 'Middleware & Signals', icon: FiRefreshCcw, color: 'text-teal-500' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React', icon: SiReact, color: 'text-cyan-400' },
      { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
      { name: 'Material UI', icon: SiMui, color: 'text-blue-400' },
      { name: 'HTML5', icon: SiHtml5, color: 'text-orange-500' },
      { name: 'CSS3', icon: SiCss3, color: 'text-blue-500' },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MySQL', icon: SiMysql, color: 'text-blue-500' },
      { name: 'Schema Design', icon: FiDatabase, color: 'text-indigo-400' },
      { name: 'Query Optimization', icon: FiZap, color: 'text-amber-500' },
    ],
  },
  {
    category: 'Cloud',
    skills: [
      { name: 'AWS', icon: SiAmazonaws, color: 'text-orange-400' },
      { name: 'AWS Identity Center', icon: FiUsers, color: 'text-orange-500' },
      { name: 'Azure', icon: SiMicrosoftazure, color: 'text-blue-500' },
      { name: 'Active Directory', icon: FiServer, color: 'text-blue-700' },
      { name: 'Microsoft 365', icon: SiMicrosoftoffice, color: 'text-orange-600' },
    ],
  },
  {
    category: 'DevOps',
    skills: [
      { name: 'Docker', icon: SiDocker, color: 'text-blue-500' },
      { name: 'Podman', icon: SiPodman, color: 'text-purple-600' },
      { name: 'CI/CD Pipelines', icon: FiGitBranch, color: 'text-purple-500' },
    ],
  },
  {
    category: 'IAM & Security',
    skills: [
      { name: 'Okta', icon: SiOkta, color: 'text-blue-600' },
      { name: 'JWT Authentication', icon: SiJsonwebtokens, color: 'text-pink-500' },
      { name: 'RBAC', icon: FiShield, color: 'text-violet-500' },
      { name: 'CyberArk PAM', icon: FiKey, color: 'text-sky-600' },
      { name: 'Identity Lifecycle (JML)', icon: FiRefreshCcw, color: 'text-cyan-600' },
      { name: 'Audit & Compliance', icon: FiFileText, color: 'text-lime-600' },
      { name: 'Vulnerability Research', icon: FiSearch, color: 'text-red-500' },
    ],
  },
  {
    category: 'APIs',
    skills: [
      { name: 'REST API Design', icon: FiCode, color: 'text-gray-500' },
      { name: 'Microsoft Graph API', icon: SiMicrosoftoffice, color: 'text-blue-600' },
      { name: 'LDAP', icon: FiServer, color: 'text-indigo-600' },
      { name: 'API Security', icon: FiKey, color: 'text-rose-500' },
      { name: 'Scheduled Jobs', icon: FiClock, color: 'text-fuchsia-500' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', icon: SiGit, color: 'text-orange-600' },
      { name: 'GitHub', icon: SiGithub, color: 'text-gray-700 dark:text-gray-300' },
      { name: 'Linux', icon: SiLinux, color: 'text-yellow-500' },
      { name: 'Red Hat', icon: SiRedhat, color: 'text-red-600' },
    ],
  },
  {
    category: 'Professional Strengths',
    skills: [
      { name: 'Problem Solving', icon: FiTarget, color: 'text-emerald-500' },
      { name: 'System Design', icon: FiLayers, color: 'text-indigo-500' },
      { name: 'API Design', icon: FiCode, color: 'text-cyan-500' },
      { name: 'Debugging', icon: FiSearch, color: 'text-amber-500' },
      { name: 'Performance Optimization', icon: FiTrendingUp, color: 'text-rose-500' },
      { name: 'Security Best Practices', icon: FiLock, color: 'text-violet-500' },
      { name: 'Team Collaboration', icon: FiUsers, color: 'text-blue-500' },
      { name: 'Agile Development', icon: FiRepeat, color: 'text-teal-500' },
    ],
  },
  {
    category: 'Currently Learning',
    skills: [
      { name: 'Model Context Protocol', icon: FiCpu, color: 'text-purple-500' },
      { name: 'AI Agents', icon: FiActivity, color: 'text-pink-500' },
      { name: 'LangChain', icon: FiLink, color: 'text-green-600' },
      { name: 'LLM Integrations', icon: FiMessageSquare, color: 'text-sky-500' },
      { name: 'FastAPI', icon: SiFastapi, color: 'text-teal-500' },
      { name: 'Kubernetes', icon: SiKubernetes, color: 'text-blue-500' },
    ],
  },
]

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Running index so the entrance stagger keeps cascading across group boundaries
  let cardIndex = -1

  return (
    <section id="skills" className="section-padding bg-white dark:bg-dark-card w-full overflow-x-hidden">
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
            Skills & <span className="gradient-text">Technologies</span>
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
            The technologies and tools I use to build secure, scalable backend systems
          </motion.p>
        </div>

        {/* One panel per category, each holding compact chips. Far denser than a
            grid of large tiles, and long names like "Django REST Framework" sit on
            one line instead of wrapping inside a centred square. */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6 items-start">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: groupIndex * 0.06 }}
              className="p-5 sm:p-6 rounded-2xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-white/5 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center gap-3">
                <span className="w-1.5 h-5 rounded-full bg-primary-500 flex-shrink-0"></span>
                {group.category}
                <span className="ml-auto text-xs font-medium text-gray-400 dark:text-gray-600 tabular-nums">
                  {group.skills.length}
                </span>
              </h3>

              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {group.skills.map((skill) => {
                  cardIndex += 1

                  return (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.3, delay: 0.15 + cardIndex * 0.015 }}
                      whileHover={{ y: -2 }}
                      className="group inline-flex items-center gap-2 pl-2.5 pr-3 py-2 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 hover:border-primary-400/60 hover:bg-primary-500/5 transition-colors cursor-default"
                    >
                      <skill.icon className={`text-lg flex-shrink-0 ${skill.color}`} />
                      <span className="text-xs sm:text-[13px] font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-500 transition-colors whitespace-nowrap">
                        {skill.name}
                      </span>
                    </motion.span>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Skills

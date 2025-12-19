import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  SiJavascript, SiReact, SiNodedotjs, SiPython,
  SiPostgresql, SiAmazonaws, SiDocker,
  SiGit, SiBootstrap, SiGithub, SiMysql,
  SiJenkins, SiLinux, SiHtml5, SiCss3, SiSolidity
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import { FiBox, FiServer, FiCode } from 'react-icons/fi'

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const allSkills = [
    { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
    { name: 'React', icon: SiReact, color: 'text-cyan-400' },
    { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-500' },
    { name: 'Python', icon: SiPython, color: 'text-blue-400' },
    { name: 'Java', icon: FaJava, color: 'text-red-500' },
    { name: 'MySQL', icon: SiMysql, color: 'text-blue-500' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-600' },
    { name: 'AWS', icon: SiAmazonaws, color: 'text-orange-400' },
    { name: 'Docker', icon: SiDocker, color: 'text-blue-500' },
    { name: 'Git', icon: SiGit, color: 'text-orange-600' },
    { name: 'Bootstrap', icon: SiBootstrap, color: 'text-purple-500' },
    { name: 'HTML5', icon: SiHtml5, color: 'text-orange-500' },
    { name: 'CSS3', icon: SiCss3, color: 'text-blue-500' },
    { name: 'C', icon: FiCode, color: 'text-blue-600', isCustom: true },
    { name: 'Solidity', icon: SiSolidity, color: 'text-gray-600' },
    { name: 'GitHub', icon: SiGithub, color: 'text-gray-700 dark:text-gray-300' },
    { name: 'Jenkins', icon: SiJenkins, color: 'text-red-600' },
    { name: 'Linux', icon: SiLinux, color: 'text-yellow-500' },
  ]

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
            Technologies and tools I work with to build exceptional digital experiences
          </motion.p>
        </div>

        {/* Unified Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {allSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.1, y: -10 }}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-dark-bg dark:to-dark-card shadow-lg hover:shadow-2xl transition-all cursor-default border border-gray-100 dark:border-gray-800"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/0 to-purple-500/0 group-hover:from-primary-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
              
              <div className="relative flex flex-col items-center gap-3 text-center">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="relative"
                >
                  {skill.isCustom && skill.name === 'C' ? (
                    <div className={`text-5xl sm:text-6xl font-bold ${skill.color} drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-2xl`}>
                      C
                    </div>
                  ) : (
                    <skill.icon className={`text-5xl sm:text-6xl ${skill.color} drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-2xl`} />
                  )}
                </motion.div>
                <span className="font-semibold text-xs sm:text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300 group-hover:text-primary-500">
                  {skill.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Skills

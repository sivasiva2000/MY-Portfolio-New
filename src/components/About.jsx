import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCode, FiDatabase, FiCloud, FiTool } from 'react-icons/fi'
import profileImage from '../assets/profile.jpg'

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const stats = [
    { label: 'Years Experience', value: '2+' },
    { label: 'Projects Completed', value: '15+' },
    { label: 'Technologies', value: '20+' },
    // { label: 'Happy Clients', value: '30+' },
  ]

  const highlights = [
    {
      icon: FiCode,
      title: 'Full Stack Development',
      description: 'Expertise in building end-to-end applications with modern frameworks and best practices.',
    },
    {
      icon: FiDatabase,
      title: 'Database Design',
      description: 'Proficient in designing scalable database schemas and optimizing query performance.',
    },
    {
      icon: FiCloud,
      title: 'Cloud & Deployment',
      description: 'Experience deploying applications on Vercel, GitHub Pages, and AWS with modern CI/CD practices.',
    },
    {
      icon: FiTool,
      title: 'IGA & Security',
      description: 'Skilled in Identity Governance & Administration (IGA) solutions and security automation to enhance system integrity.',
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
          {/* Left - Image/Illustration */}
          {/* TODO: Uncomment when profile image is available
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <img 
                  src={profileImage} 
                  alt="Jaswanth S - Software Development Engineer" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -z-10 -top-4 -right-4 w-full h-full rounded-2xl bg-primary-500/20 blur-xl"></div>
          </motion.div>
          */}

          {/* Right - Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="px-4 sm:px-0 lg:col-span-2 max-w-4xl mx-auto text-center"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              I am a software developer focused on Identity & Access Management (IAM), API engineering, and security automation. I have hands-on experience working with platforms such as Okta, AWS IAM Identity Center, CyberArk, and ServiceNow.
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Recently, I identified and responsibly disclosed a security issue in Okta related to API behavior beyond the free trial period. The report was accepted and rewarded through the Bugcrowd platform. This success strengthened my interest in security research and encouraged me to blend development with vulnerability discovery.
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              I enjoy building scalable automation solutions, solving complex backend challenges, and improving system security through research and engineering. My goal is to continue growing as an IAM developer and security researcher while contributing to high-impact projects.
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {['Python', 'React.js','MySQL', 'Javascript','Node.js', 'REST API','Django','Docker','AWS','GCP','CyberArk'].map((tech, index) => (
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
          <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-4xl">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4 sm:p-6 rounded-xl bg-white dark:bg-dark-card shadow-lg"
              >
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
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

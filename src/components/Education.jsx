import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiAward, FiCalendar, FiMapPin, FiFileText, FiShield, FiLink, FiCpu, FiExternalLink, FiImage } from 'react-icons/fi'
import { HiAcademicCap } from 'react-icons/hi'
import { asset } from '../lib/asset'

const Education = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const education = [
    {
      degree: 'Bachelor of Engineering in Electrical & Electronics Engineering',
      institution: 'Tamilnadu College of Engineering',
      affiliation: 'Affiliated to Anna University, Chennai · Approved by AICTE',
      location: 'Coimbatore, India',
      period: '2020 - 2023',
      grade: 'CGPA: 8.5/10',
      description: 'Completed the four-year Bachelor of Engineering programme in Electrical & Electronics Engineering, graduating First Class with Honors.',
      // Award plaques presented at the college's 39th Annual Day, 20 May 2023.
      achievements: [
        {
          text: 'Academic Excellence Award — ranked First in IV year Electrical & Electronics Engineering',
          image: asset('/achievements/academic-excellence-award-2023.jpg'),
        },
        {
          text: 'Randeep Memorial Award 2023 — Best Outgoing Student, Electrical & Electronics Engineering',
          image: asset('/achievements/best-outgoing-student-2023.jpg'),
        },
      ],
      color: 'from-blue-500 to-cyan-500'
    },
  ]

  // Only milestones with dates confirmed from the resume are listed here.
  const journey = [
    {
      period: '2020 – 2023',
      title: 'B.E. Electrical & Electronics Engineering',
      detail: 'Tamilnadu College of Engineering, Coimbatore — First Class with Honors, CGPA 8.5',
    },
    {
      period: 'Nov 2022',
      title: 'Python for Data Science — Infosys Springboard',
      detail: 'Completed alongside the degree; first structured Python training',
    },
    {
      period: 'Jan 2024',
      title: 'Joined I Am Logic',
      detail: 'Python Full Stack Developer (Backend-focused), Bangalore',
    },
    {
      period: '2024 – Present',
      title: 'Building enterprise identity governance',
      detail: 'IGA platform, connector framework, and CyberArk entitlement reporting for enterprise clients',
    },
    {
      period: 'Nov 2025',
      title: 'Okta bug bounty recognition',
      detail: 'Broken access control finding accepted and rewarded through Bugcrowd',
    },
  ]

  const achievements = [
    {
      icon: FiAward,
      featured: true,
      title: 'Okta Security Research Recognition',
      description: 'Reported a broken access control issue where API access persisted after trial expiration. Accepted as a valid finding and rewarded by Okta through Bugcrowd (November 2025).',
      meta: 'Broken Access Control → Privilege Escalation · $200 bounty',
      links: [
        { label: 'Bugcrowd Profile', href: 'https://bugcrowd.com/h/sivak08557e93-5289-47fa-bf58-a4d0f066d6d4', external: true },
        { label: 'View Submission', href: asset('/achievements/okta-bugcrowd-submission.jpg'), external: false },
      ],
    },
    {
      icon: FiShield,
      title: 'Built an Enterprise IAM Platform',
      description: 'Owned the Django/DRF backend of a production identity governance platform — data models, secure REST APIs, RBAC, and audit trails — delivered for enterprise clients.',
    },
    {
      icon: FiLink,
      title: 'Developed an Enterprise Connector Framework',
      description: 'Designed a reusable framework carrying 7+ production connectors, including Active Directory, Microsoft Graph, AWS Identity Center, and CyberArk PAM.',
    },
    {
      icon: FiCpu,
      title: 'Built an AI MCP Server',
      description: 'Implemented a Model Context Protocol server with custom tools and resources, exploring emerging AI infrastructure standards.',
    },
  ]

  const certifications = [
    {
      title: 'Python Full Stack Development',
      institution: 'Besant Technologies, Bangalore',
      status: 'Successfully Completed — Certificate of Completion',
      description: 'Comprehensive full stack programme covering backend, frontend, and database development, culminating in real-world web application projects.',
      skills: ['Python', 'Django', 'Django REST Framework', 'React', 'JavaScript', 'HTML', 'CSS', 'MySQL', 'REST APIs', 'Git'],
      credential: asset('/certificates/python-full-stack-besant-technologies.jpg'),
    },
    {
      title: 'Python for Data Science',
      institution: 'Infosys Springboard',
      status: 'Completed 10 November 2022 · Verifiable credential',
      description: 'Applied Python to data manipulation and analysis, worked through core machine learning concepts, and built visualisations for communicating findings from data.',
      skills: ['Python', 'Data Analysis', 'Data Manipulation', 'Machine Learning', 'Data Visualization'],
      credential: asset('/certificates/python-for-data-science-infosys.jpg'),
    },
  ]

  // Workplace security awareness training - secondary to the certification above.
  // Titles are taken verbatim from the certificates.
  const training = [
    {
      title: 'Annual Awareness Training',
      provider: 'KnowBe4',
      date: 'July 2025',
      modules: [
        {
          name: '2025 KnowBe4 Security Awareness Training',
          file: asset('/certificates/knowbe4-security-awareness-training-2025.pdf'),
        },
      ],
    },
    {
      title: 'Phishing Awareness & Reporting',
      provider: 'KnowBe4',
      date: 'July 2025',
      modules: [
        {
          name: 'Using the Phish Alert Button — Basic Use with Microsoft Outlook',
          file: asset('/certificates/phish-alert-button-basic-outlook.pdf'),
        },
        {
          name: 'Using the Phish Alert Button — Report Suspicious Emails Using Microsoft Outlook',
          file: asset('/certificates/phish-alert-button-report-suspicious-emails.pdf'),
        },
        {
          name: 'When You Report, We Get Stronger',
          file: asset('/certificates/when-you-report-we-get-stronger.pdf'),
        },
        {
          name: 'When You Report, We Get Stronger — PAB',
          file: asset('/certificates/when-you-report-we-get-stronger-pab.pdf'),
        },
      ],
    },
    {
      title: 'Secure Remote Working Best Practices',
      provider: 'KnowBe4',
      date: 'July 2025',
      modules: [
        {
          name: 'Internet Security When You Work From Home',
          file: asset('/certificates/internet-security-work-from-home.pdf'),
        },
      ],
    },
  ]

  return (
    <section id="education" className="section-padding bg-gray-50 dark:bg-dark-bg w-full overflow-x-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="container-custom w-full max-w-full"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10 mb-6"
          >
            <HiAcademicCap className="text-4xl text-primary-500" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Education & <span className="gradient-text">Qualifications</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-20 h-1 bg-primary-500 mx-auto rounded-full"
          ></motion.div>
        </div>

        {/* Education Timeline */}
        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              className="relative mb-12 last:mb-0"
            >
              {/* Timeline Line */}
              {index !== education.length - 1 && (
                <div className="absolute left-8 top-24 w-0.5 h-full bg-gradient-to-b from-primary-500 to-transparent hidden md:block"></div>
              )}

              <div className="flex gap-6 items-start">
                {/* Timeline Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.3 + 0.2 }}
                  className={`hidden md:flex flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r ${edu.color} items-center justify-center text-white shadow-lg`}
                >
                  <HiAcademicCap className="text-2xl" />
                </motion.div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ y: -5, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  className="flex-1 p-6 md:p-8 rounded-2xl bg-white dark:bg-dark-card shadow-lg hover:shadow-2xl transition-all"
                >
                  {/* Degree & Institution */}
                  <div className="mb-4">
                    <h3 className={`text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r ${edu.color} bg-clip-text text-transparent`}>
                      {edu.degree}
                    </h3>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      {edu.institution}
                    </p>
                    {edu.affiliation && (
                      <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                        {edu.affiliation}
                      </p>
                    )}
                  </div>

                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-primary-500" />
                      <span>{edu.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-primary-500" />
                      <span>{edu.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiAward className="text-primary-500" />
                      <span className="font-semibold">{edu.grade}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {edu.description}
                  </p>

                  {/* Achievements */}
                  {edu.achievements && (
                    <div>
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Key Achievements:
                      </h4>
                      <ul className="space-y-3">
                        {edu.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, delay: index * 0.3 + i * 0.1 + 0.5 }}
                            className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                          >
                            <span className="text-primary-500 mt-1">▹</span>
                            <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                              <span>{achievement.text}</span>
                              {achievement.image && (
                                <motion.a
                                  href={achievement.image}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  title="View award"
                                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/30 hover:border-primary-500/60 text-primary-500 text-xs font-semibold whitespace-nowrap transition-all"
                                >
                                  <FiImage /> View Award
                                </motion.a>
                              )}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Journey */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Journey</h3>
          <div className="max-w-3xl mx-auto space-y-3">
            {journey.map((milestone, index) => (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 p-4 rounded-xl bg-white dark:bg-dark-card shadow-md"
              >
                <span className="flex-shrink-0 sm:w-36 px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-xs font-semibold text-center">
                  {milestone.period}
                </span>
                <div>
                  <p className="font-semibold text-sm sm:text-base leading-snug">{milestone.title}</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{milestone.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Featured Achievements</h3>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: achievement.featured ? 1.02 : 1.05, y: -5 }}
                className={
                  achievement.featured
                    ? 'sm:col-span-2 relative p-7 rounded-2xl bg-gradient-to-br from-primary-500/10 via-purple-500/10 to-pink-500/10 dark:from-primary-500/15 dark:via-purple-500/10 dark:to-pink-500/10 ring-2 ring-primary-500/50 shadow-xl hover:shadow-2xl hover:ring-primary-500/80 transition-all'
                    : 'p-6 rounded-xl bg-white dark:bg-dark-card shadow-md hover:shadow-lg transition-all'
                }
              >
                {achievement.featured && (
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary-500 text-white text-[10px] font-bold uppercase tracking-wide shadow-lg">
                    Featured
                  </span>
                )}
                <div className="flex flex-col items-center justify-center gap-2 text-center h-full">
                  <achievement.icon
                    className={
                      achievement.featured
                        ? 'text-primary-500 text-4xl flex-shrink-0 drop-shadow-lg'
                        : 'text-primary-500 text-2xl flex-shrink-0'
                    }
                  />
                  <span
                    className={
                      achievement.featured
                        ? 'font-bold text-xl sm:text-2xl leading-snug gradient-text'
                        : 'font-semibold text-base leading-snug'
                    }
                  >
                    {achievement.title}
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {achievement.description}
                  </p>
                  {achievement.meta && (
                    <p className="text-xs font-medium text-primary-500">{achievement.meta}</p>
                  )}
                  {achievement.links && (
                    <div className="flex flex-wrap gap-2 justify-center mt-3">
                      {achievement.links.map((link) => (
                        <motion.a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/30 hover:border-primary-500/60 text-primary-500 text-xs font-semibold transition-all"
                        >
                          {link.external ? <FiExternalLink /> : <FiImage />}
                          {link.label}
                        </motion.a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Certifications</h3>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {certifications.map((certification, index) => (
              <motion.div
                key={certification.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-xl bg-white dark:bg-dark-card shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  <FiAward className="text-primary-500 text-2xl flex-shrink-0" />
                  <span className="font-semibold text-base leading-snug">{certification.title}</span>
                  <p className="text-sm font-medium text-primary-500">{certification.institution}</p>
                  {certification.status && (
                    <p className="text-xs text-gray-500 dark:text-gray-500">{certification.status}</p>
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {certification.description}
                  </p>
                  {certification.skills && (
                    <div className="flex flex-wrap gap-2 justify-center mt-2">
                      {certification.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  {certification.credential && (
                    <motion.a
                      href={certification.credential}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-500 text-white font-medium text-sm hover:bg-primary-600 transition-colors"
                    >
                      <FiFileText /> View Certificate
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Training - secondary to the certification above */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12"
        >
          <h4 className="text-lg font-semibold mb-2 text-center">Security Awareness Training</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
            Completed through KnowBe4
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {training.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-5 rounded-xl bg-white dark:bg-dark-card shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <FiShield className="text-primary-500 flex-shrink-0" />
                  <span className="font-semibold text-sm leading-snug">{item.title}</span>
                </div>
                <p className="text-xs text-primary-500 mb-3">
                  {item.provider} · {item.date}
                </p>
                <ul className="space-y-2">
                  {item.modules.map((module) => (
                    <li key={module.file}>
                      {/* Styled as an obvious link target - colour, border, and an
                          external-link icon so it reads as viewable at a glance. */}
                      <a
                        href={module.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`View certificate: ${module.name}`}
                        className="group flex items-start gap-2 p-2.5 rounded-lg bg-primary-500/5 hover:bg-primary-500/15 border border-primary-500/25 hover:border-primary-500/50 text-primary-500 transition-all"
                      >
                        <FiFileText className="mt-0.5 flex-shrink-0" />
                        <span className="flex-1 text-xs font-medium leading-snug">{module.name}</span>
                        <FiExternalLink className="mt-0.5 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Education

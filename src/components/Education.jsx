import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiAward, FiCalendar, FiMapPin } from 'react-icons/fi'
import { HiAcademicCap } from 'react-icons/hi'

const Education = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const education = [
    {
      degree: 'Master of Technology in Computer Science (Integrated)',
      institution: 'Sri Krishna College of Engineering and Technology - SKCET',
      location: 'Coimbatore, India',
      period: '2021 - 2026',
      grade: 'CGPA: 8.1/10',
      description: 'Executive Member, Dept. of M.Tech CSE – organized workshops, technical events, and coding competitions.',
      achievements: [
        'Participated in various national and intra-college hackathons, with wins and finalist positions',
        'Contributed to successful execution of department symposiums and coding events',
        'Gained hands-on experience in real-world problem solving and collaborative team projects',
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    // {
    //   degree: 'Higher Secondary Education',
    //   institution: 'Velammal Vidyalaya',
    //   location: 'Madurai, India',
    //   period: '2019 - 2021',
    //   grade: 'Percentage: 83%',
    //   description: 'Specialized in Mathematics, Physics, and Computer Science.',
    //   achievements: [
    //     'School topper in Computer Science',
    //     'Participated in national coding competitions',
    //   ],
    //   color: 'from-purple-500 to-pink-500'
    // },
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
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {edu.institution}
                    </p>
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
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, delay: index * 0.3 + i * 0.1 + 0.5 }}
                            className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                          >
                            <span className="text-primary-500 mt-1">▹</span>
                            <span>{achievement}</span>
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

        {/* Certifications Section (Optional) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Certifications & Courses</h3>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              'Oracle Cloud Infrastructure 2025 Certified Multicloud Architect Professional',
              'Problem solving - HackerRank',
              'Generative AI Professional - Oracle',
            ].map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-4 rounded-xl bg-white dark:bg-dark-card shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  <FiAward className="text-primary-500 text-2xl flex-shrink-0" />
                  <span className="font-medium text-sm leading-snug">{cert}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Education

import { motion } from 'framer-motion'
import React from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import zohoLogo from '../assets/zoho_logo.png'

const experiences = [
  {
    title: 'Technical Trainee',
    company_name: 'Zoho Corp',
    location: 'Chennai, India',
    iconBg: '#667eea',
    date: 'December 2025 - Present',
    subtitle: 'Zoho ManageEngine',
    points: [
      'Backend training in Core Java, SQL, JDBC, Servlets, JSP, Struts2, JavaScript, and Apache Tomcat with hands-on MVC and CRUDapplication development.',
      'Built and deployed database-driven applications using JSP, Servlets, JDBC, and MySQL with optimized queries, transactions, and authentication workflows.',
      'Applied OOP principles, clean coding standards, debugging, exception handling, performance tuning, Git, and Agile development practices.',
    ],
    technologies: ['Core Java', 'SQL', 'JDBC', 'Servlets', 'JSP', 'Struts2', 'JavaScript'],
  },
  {
    title: 'Intern',
    company_name: 'Zoho Corp',
    location: 'Madurai, India',
    iconBg: '#8b5cf6',
    date: 'May 2025 - June 2025',
    subtitle: 'Zoho Analytics - Client Framework',
    points: [
      'Engineered Java-based data extraction tools to parse and derive insights from complex key-value structures and deeply nested directories',
      'Implemented CI/CD pipelines via Jenkins and GitHub, and containerized environments with Docker',
      'Architected full-stack SQL query interface leveraging Monaco Editor for frontend and Trino CLI for distributed query execution across large-scale datasets',
    ],
    technologies: ['Java', 'JavaScript', 'Jenkins', 'Docker', 'Zoho Analytics'],
  },
]

const ExperienceCard = ({ experience }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: isHovered ? "rgba(30, 30, 30, 0.9)" : "rgba(20, 20, 20, 0.8)",
        color: "#fff",
        borderRadius: "12px",
        border: isHovered ? "1px solid rgba(102, 126, 234, 0.5)" : "1px solid rgba(102, 126, 234, 0.15)",
        boxShadow: isHovered 
          ? "0 0 30px rgba(102, 126, 234, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)"
          : "0 8px 32px rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      contentArrowStyle={{ borderRight: "7px solid rgba(20, 20, 20, 0.8)" }}
      date={experience.date}
      iconStyle={{ 
        background: "#ffffff",
        boxShadow: "0 0 0 4px rgba(10, 10, 10, 0.8)"
      }}
      icon={
        <div className='flex justify-center items-center w-full h-full overflow-hidden rounded-full'>
          <img src={zohoLogo} alt="Zoho Corp" className="w-[95%] h-[95%] object-contain" />
        </div>
      }
    >
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Role and Company - Compact Header */}
      <div className="mb-4" style={{ lineHeight: 0 }}>
        <h3 className='text-white text-[20px] font-bold block m-0 p-0' style={{ lineHeight: '20px' }}>
          {experience.title}
        </h3>
        <p className='text-[16px] font-semibold text-gray-200 block m-0 p-0' style={{ lineHeight: '16px' }}>
          {experience.company_name}
        </p>
        {experience.location && (
          <p className='text-gray-400 text-[14px] block m-0 p-0' style={{ lineHeight: '14px' }}>
            {experience.location}
          </p>
        )}
        {experience.subtitle && (
          <p className='text-gray-400 text-[14px] leading-relaxed mt-3 mb-0'>
            {experience.subtitle}
          </p>
        )}
      </div>

      {/* Achievements */}
      <ul className='space-y-2 mb-3'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-gray-300 text-[14px] leading-relaxed pl-4 relative'
          >
            <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
            {point}
          </li>
        ))}
      </ul>

      {/* Technologies */}
      {experience.technologies && (
        <div className='flex flex-wrap gap-2 pt-3 border-t border-white/10'>
          {experience.technologies.map((tech, index) => (
            <span
              key={`tech-${index}`}
              className='px-3 py-1.5 text-[12px] font-semibold rounded-lg border border-primary-400/40 hover:border-primary-400/70 transition-all duration-300 bg-gradient-to-r from-primary-500/15 to-purple-500/15'
              style={{
                color: '#a78bfa'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      </div>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="section-padding bg-white dark:bg-dark-card w-full overflow-x-hidden">
      <div className="container-custom w-full max-w-full">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Work <span className="gradient-text">Experience</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-primary-500 mx-auto rounded-full"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            My professional journey and career highlights
          </motion.p>
        </div>

        <div className='mt-20 flex flex-col'>
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={`experience-${index}`}
                experience={experience}
              />
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  )
}

export default Experience

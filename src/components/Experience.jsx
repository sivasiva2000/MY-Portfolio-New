import { motion } from 'framer-motion'
import React from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  FiShield, FiExternalLink, FiLink, FiKey,
  FiRefreshCcw, FiCheckSquare, FiPieChart, FiBriefcase
} from 'react-icons/fi'

const role = {
  title: 'Python Full Stack Developer (Backend-focused)',
  company_name: 'I Am Logic',
  company_url: 'https://iamlogic.com/',
  location: 'Bangalore, India',
  icon: FiBriefcase,
  date: 'January 2024 - Present',
  summary:
    'Design and build enterprise Identity Governance & Administration (IGA) solutions — secure REST APIs, workflow automation, system integrations, and cloud-based identity management applications.',
  environment: [
    'Python', 'Django', 'Django REST Framework', 'React', 'Material UI', 'MySQL',
    'Docker', 'Git', 'CI/CD', 'JWT', 'RBAC', 'Microsoft Graph API',
    'Active Directory', 'AWS Identity Center', 'CyberArk PAM', 'REST APIs',
    'HTML', 'CSS', 'JavaScript',
  ],
}

const projects = [
  {
    name: 'Enterprise Identity Governance (IGA) Platform',
    featured: true,
    period: 'Jan 2024 – Present',
    role: 'Backend Developer',
    icon: FiShield,
    technologies: ['Python', 'Django', 'DRF', 'React', 'MySQL', 'Docker'],
    responsibilities: [
      'Developed scalable REST APIs for identity governance and administration.',
      'Designed database schemas for identities, applications, roles, groups, and entitlements.',
      'Built the access request, approval workflow, and identity management modules.',
      'Implemented RBAC, JWT authentication, and secure authorization mechanisms.',
      'Developed certification campaigns and access review workflows.',
      'Built audit logging and compliance reporting features.',
      'Optimised backend performance through bulk operations and query tuning.',
    ],
  },
  {
    name: 'Enterprise Connector Framework',
    period: 'Jun 2024 – Present',
    role: 'Backend Developer',
    icon: FiLink,
    technologies: ['Python', 'Django', 'Microsoft Graph API', 'LDAP', 'boto3', 'CyberArk REST API'],
    responsibilities: [
      'Developed a reusable connector framework for enterprise integrations.',
      'Built 7+ production connectors, including Active Directory, Microsoft Graph, AWS Identity Center, and CyberArk PAM.',
      'Implemented user provisioning and de-provisioning.',
      'Developed entitlement synchronisation across connected systems.',
      'Created scheduled synchronisation jobs.',
      'Added retry mechanisms, structured logging, and error handling.',
      'Optimised connector performance for large enterprise environments.',
    ],
  },
  {
    name: 'CyberArk Entitlement Management & Reporting',
    client: 'NSE (National Stock Exchange)',
    period: 'Jan 2025 – Present',
    role: 'Backend Developer',
    icon: FiKey,
    technologies: ['Python', 'Django', 'CyberArk REST API', 'React', 'MySQL'],
    responsibilities: [
      'Integrated CyberArk PAM with the IGA platform.',
      'Retrieved safes, privileged accounts, users, and groups.',
      'Developed entitlement review functionality.',
      'Built compliance and audit reports.',
      'Developed React UI screens for entitlement review.',
      'Implemented CSV and Excel export functionality.',
      'Improved reporting performance for enterprise-scale datasets.',
    ],
  },
  {
    name: 'Identity Lifecycle Automation (JML)',
    role: 'Backend Developer',
    icon: FiRefreshCcw,
    technologies: ['Django', 'Python', 'MySQL'],
    responsibilities: [
      'Automated Joiner, Mover, and Leaver processes.',
      'Built lifecycle workflows for onboarding and offboarding.',
      'Implemented approval routing.',
      'Automated account provisioning.',
      'Integrated lifecycle events with the enterprise connectors.',
      'Reduced manual identity administration effort.',
    ],
  },
  {
    name: 'Access Request & Approval Workflow Engine',
    role: 'Backend Developer',
    icon: FiCheckSquare,
    technologies: ['Django', 'DRF', 'React'],
    responsibilities: [
      'Developed configurable approval workflows.',
      'Built multi-level approval routing.',
      'Implemented email notifications.',
      'Added SLA tracking.',
      'Developed approval history and audit functionality.',
      'Integrated workflow execution with the provisioning connectors.',
    ],
  },
  {
    name: 'Role Mining & Access Certification',
    role: 'Backend Developer',
    icon: FiPieChart,
    technologies: ['Python', 'Django', 'MySQL'],
    responsibilities: [
      'Developed role mining using the FP-Growth algorithm.',
      'Built certification campaign management.',
      'Developed reviewer dashboards.',
      'Automated certification scheduling.',
      'Generated governance reports.',
      'Improved entitlement review efficiency.',
    ],
  },
]

const TechChips = ({ items, prefix, small }) => (
  <div className='flex flex-wrap gap-2'>
    {items.map((tech, index) => (
      <span
        key={`${prefix}-${index}`}
        className={`${small ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-[12px]'} font-semibold rounded-lg border border-primary-400/40 hover:border-primary-400/70 transition-all duration-300 bg-gradient-to-r from-primary-500/15 to-purple-500/15`}
        style={{ color: '#a78bfa' }}
      >
        {tech}
      </span>
    ))}
  </div>
)

// Shared card chrome so every timeline entry keeps the same hover treatment.
const useTimelineStyles = (isHovered) => ({
  contentStyle: {
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
  },
  contentArrowStyle: { borderRight: "7px solid rgba(20, 20, 20, 0.8)" },
  iconStyle: {
    background: "#ffffff",
    boxShadow: "0 0 0 4px rgba(10, 10, 10, 0.8)",
  },
})

const RoleCard = ({ role }) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const styles = useTimelineStyles(isHovered)

  return (
    <VerticalTimelineElement
      {...styles}
      date={role.date}
      icon={
        <div className='flex justify-center items-center w-full h-full overflow-hidden rounded-full'>
          {/* The library forces position/left/top/margin on any svg in this slot,
              which knocks the icon off-centre - reset it and let flex centre it. */}
          <role.icon className="!static !m-0 w-6 h-6 text-primary-500" />
        </div>
      }
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="mb-4" style={{ lineHeight: 0 }}>
          <h3 className='text-white text-[20px] font-bold block m-0 p-0' style={{ lineHeight: '24px' }}>
            {role.title}
          </h3>
          <a
            href={role.company_url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-[16px] font-semibold text-gray-200 hover:text-primary-400 transition-colors inline-flex items-center gap-1.5 m-0 p-0'
            style={{ lineHeight: '20px' }}
          >
            {role.company_name}
            <FiExternalLink className='text-[13px]' />
          </a>
          <p className='text-gray-400 text-[14px] block m-0 p-0' style={{ lineHeight: '18px' }}>
            {role.location}
          </p>
          <p className='text-gray-400 text-[14px] leading-relaxed mt-3 mb-0'>
            {role.summary}
          </p>
        </div>

        <div className='pt-4 border-t border-white/10'>
          <p className='text-gray-400 text-[13px] font-semibold mb-2.5'>Technology Stack</p>
          <TechChips items={role.environment} prefix='env-tech' />
        </div>
      </div>
    </VerticalTimelineElement>
  )
}

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const styles = useTimelineStyles(isHovered)

  // Prefer the project period in the timeline's date slot; fall back to the role
  // for the platform modules that don't have their own start date yet.
  const timelineDate = project.period || project.role

  return (
    <VerticalTimelineElement
      {...styles}
      date={timelineDate}
      icon={
        <div className='flex justify-center items-center w-full h-full overflow-hidden rounded-full'>
          {/* See RoleCard: reset the library's forced svg positioning. */}
          <project.icon className="!static !m-0 w-6 h-6 text-primary-500" />
        </div>
      }
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h3 className='text-white text-[17px] font-bold mb-1'>
          {project.name}
          {project.featured && <span className='ml-1.5 text-primary-400'>★</span>}
        </h3>
        <p className='text-gray-500 text-[12px] mb-3'>
          {project.role}
          {project.client && ` · ${project.client}`}
        </p>

        <ul className='space-y-1.5 mb-4'>
          {project.responsibilities.map((responsibility, i) => (
            <li
              key={`responsibility-${i}`}
              className='text-gray-300 text-[13px] leading-relaxed pl-4 relative'
            >
              <span className="absolute left-0 top-1.5 w-1 h-1 bg-primary-500 rounded-full"></span>
              {responsibility}
            </li>
          ))}
        </ul>

        <div className='pt-3 border-t border-white/10'>
          <TechChips items={project.technologies} prefix='p-tech' small />
        </div>
      </div>
    </VerticalTimelineElement>
  )
}

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

        {/* Role first, then each project alternating left and right down the timeline */}
        <div className='mt-20 flex flex-col'>
          <VerticalTimeline>
            <RoleCard role={role} />
            {projects.map((project, index) => (
              <ProjectCard key={`project-${index}`} project={project} />
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  )
}

export default Experience

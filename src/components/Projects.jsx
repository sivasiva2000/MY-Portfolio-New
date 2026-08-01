import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Tilt from 'react-parallax-tilt'
import { FiGithub, FiExternalLink, FiChevronDown, FiCalendar } from 'react-icons/fi'

const projects = [
  {
    name: 'Enterprise Identity Governance (IGA) Platform',
    badge: 'Professional',
    date: 'Jan 2024 – Present',
    description:
      'A full-stack Identity Governance & Administration platform that centralises who has access to what, why they have it, and whether that access is still justified.',
    highlights: [
      'Identity lifecycle automation (Joiner, Mover, Leaver)',
      'Access request and multi-level approval workflows',
      'Role mining and certification campaigns',
      'RBAC with JWT authentication and secure authorization',
      'Audit logging and compliance reporting',
      'Scalable REST APIs over a normalised entitlement schema',
    ],
    tags: [
      { name: 'Django', color: 'blue-text-gradient' },
      { name: 'DRF', color: 'green-text-gradient' },
      { name: 'MySQL', color: 'pink-text-gradient' },
      { name: 'React', color: 'blue-text-gradient' },
      { name: 'Docker', color: 'green-text-gradient' },
      { name: 'JWT', color: 'pink-text-gradient' },
    ],
    image: '🔐',
    details: {
      overview:
        'The flagship platform I build at I Am Logic. It gives enterprises a single place to model identities, applications, roles, groups, and entitlements, then govern them through request workflows, automated lifecycle events, and periodic access certification.',
      problem:
        'Access administration was manual and spread across AWS, Azure, Active Directory, and Microsoft 365. Joiner-mover-leaver changes were slow and error-prone, accounts lingered after employees left, and proving compliance meant assembling evidence by hand before every audit.',
      architecture: `React UI
     │
Django REST API
     │
MySQL
     │
Connector Framework
     ├── Active Directory
     ├── Microsoft Graph
     ├── AWS Identity Center
     └── CyberArk PAM`,
      challenges:
        'Synchronisation and reporting had to stay responsive as directory volumes grew. Entitlements also had to be modelled generically enough to describe very different target systems, while every access decision still produced an audit record complete enough for an enterprise compliance review.',
      solutions:
        'A normalised relational schema with tuned queries and bulk operations kept synchronisation and reporting fast. A pluggable connector interface absorbed each system’s quirks so they never reached core business logic, and audit logging was built into the service layer rather than bolted on afterwards.',
      outcomes:
        'Manual access administration was replaced by automated, auditable workflows. Reliable de-provisioning closed the orphaned-account gap, and compliance reporting became a query instead of a fire drill. Running in production for enterprise clients, including NSE.',
    },
  },
  {
    name: 'Enterprise Connector Framework',
    badge: 'Professional',
    date: 'Jun 2024 – Present',
    description:
      'A reusable connector framework that normalises identity data across enterprise systems behind one common interface, so provisioning logic stays free of provider-specific quirks.',
    highlights: [
      '7+ connectors, including Active Directory, Microsoft Graph, AWS Identity Center, and CyberArk',
      'User and group synchronisation with entitlement discovery',
      'Automated provisioning and de-provisioning',
      'Scheduled synchronisation jobs',
      'Retry, logging, and error handling for unreliable upstreams',
      'Tuned for large enterprise directory volumes',
    ],
    tags: [
      { name: 'Python', color: 'blue-text-gradient' },
      { name: 'Django', color: 'green-text-gradient' },
      { name: 'Microsoft Graph', color: 'pink-text-gradient' },
      { name: 'LDAP', color: 'blue-text-gradient' },
      { name: 'boto3', color: 'green-text-gradient' },
      { name: 'CyberArk API', color: 'pink-text-gradient' },
    ],
    image: '🔗',
    details: {
      overview:
        'The integration layer underneath the IGA platform. One connector contract defines how the platform reads and writes identity data, and each target system is implemented as an adapter behind it.',
      problem:
        'Every enterprise system exposes a different identity model, API style, pagination scheme, and rate limit. Writing bespoke integrations per system does not scale, and provider-specific quirks leak into core provisioning logic where they are expensive to maintain.',
      architecture: `Connector Interface (common contract)
     ├── Active Directory  (LDAP)
     ├── Microsoft Graph   (REST)
     ├── AWS Identity Center (boto3)
     └── CyberArk PAM      (REST)
     │
Scheduler + retry / logging layer
     │
IGA entitlement model (MySQL)`,
      challenges:
        'Upstream systems fail intermittently and behave inconsistently under load, and full synchronisation across large directories is expensive to run repeatedly.',
      solutions:
        'Retry mechanisms with structured logging and explicit error handling made partial failures recoverable rather than silent. Scheduled synchronisation jobs moved the work off the request path, and connector performance was tuned specifically for large enterprise environments.',
      outcomes:
        '7+ production connectors now run on a single interface. Provisioning and de-provisioning are automated, entitlement discovery is consistent across systems, and adding a new target system no longer requires touching core business logic.',
    },
  },
  {
    name: 'CyberArk Entitlement Management & Reporting',
    badge: 'Professional · NSE',
    date: 'Jan 2025 – Present',
    description:
      'An integration that brings CyberArk PAM privileged-access data into the governance platform so privileged accounts can be reviewed and reported on alongside standard entitlements.',
    highlights: [
      'Retrieves safes, privileged accounts, users, and groups',
      'Entitlement review functionality for reviewers',
      'Compliance and audit report generation',
      'React UI screens for entitlement review',
      'CSV and Excel export',
      'Reporting tuned for enterprise-scale datasets',
    ],
    tags: [
      { name: 'Python', color: 'blue-text-gradient' },
      { name: 'Django', color: 'green-text-gradient' },
      { name: 'CyberArk REST API', color: 'pink-text-gradient' },
      { name: 'React', color: 'blue-text-gradient' },
      { name: 'MySQL', color: 'green-text-gradient' },
    ],
    image: '🗝️',
    details: {
      overview:
        'Delivered for NSE (National Stock Exchange). Privileged access is the highest-risk access in an enterprise, and this work brought it under the same governance and review process as everything else.',
      problem:
        'Safes and privileged accounts lived only inside CyberArk, outside the governance platform. Reviewers could not see or certify them, and producing audit evidence for privileged access was a manual exercise.',
      architecture: `CyberArk PAM (REST API)
     │
Django integration services
     │
Normalised into IGA entitlement model
     │
MySQL ──> React review screens
     └──> Compliance reports (CSV / Excel)`,
      challenges:
        'Enterprise-scale privileged-account datasets made straightforward reporting queries too slow to be usable by reviewers, and exports had to stay reliable at that volume.',
      solutions:
        'Reporting queries and export paths were optimised for the data volumes actually present, so review screens stayed responsive and CSV/Excel exports completed dependably.',
      outcomes:
        'Privileged access became reviewable next to standard entitlements, and compliance and audit reporting moved from manual assembly to self-serve export.',
    },
  },
  {
    name: 'AI MCP Server',
    badge: 'Personal Project',
    date: '2026',
    description:
      'A Model Context Protocol server demonstrating AI tool integration, custom resources, and an extensible architecture for building intelligent applications on top of MCP.',
    highlights: [
      'MCP server exposing custom tools and resources',
      'Extensible architecture for adding new capabilities',
      'Explores emerging AI infrastructure standards',
    ],
    tags: [
      { name: 'Python', color: 'blue-text-gradient' },
      { name: 'MCP', color: 'green-text-gradient' },
      { name: 'AI Tooling', color: 'pink-text-gradient' },
    ],
    image: '🧩',
    source_code_link: 'https://github.com/sivasiva2000/AI_MCP_PROJECT',
    details: {
      overview:
        'A personal project exploring the Model Context Protocol — the emerging standard for how AI models discover and call external tools and read external resources.',
      problem:
        'Language models need a consistent way to reach tools and data. Hand-rolled, per-application integrations do not compose and have to be rewritten for every new host application.',
      architecture: `MCP Client / host application
     │  (Model Context Protocol)
MCP Server
     ├── Tool registry
     └── Resource registry`,
      challenges:
        'MCP is a young specification, so conventions are still settling and the surface can shift between revisions.',
      solutions:
        'Tool and resource registration were kept modular and separated from the transport layer, so new capabilities can be added without reworking how the server communicates.',
      outcomes:
        'A working MCP server with custom tools and resources, and a base to build further AI tooling on. Source is public on GitHub.',
    },
  },
  {
    name: 'AI Agent Server',
    badge: 'Personal Project',
    date: '2026',
    description:
      'An AI agent server built on the Google Gemini API, implementing AI-powered tools and resources with a modular architecture for conversational and task-oriented applications.',
    highlights: [
      'Agent server wrapping the Google Gemini API',
      'Modular tool and resource registration',
      'Supports conversational and task-oriented flows',
    ],
    tags: [
      { name: 'Python', color: 'blue-text-gradient' },
      { name: 'Gemini API', color: 'green-text-gradient' },
      { name: 'AI Agents', color: 'pink-text-gradient' },
    ],
    image: '🤖',
    source_code_link: 'https://github.com/sivasiva2000/AI_project',
    details: {
      overview:
        'A personal project turning a raw LLM API into something that behaves like an agent — able to use tools and carry out tasks, not just answer prompts.',
      problem:
        'A bare model endpoint gives you text completion. Getting dependable task execution out of it needs structure around tool definitions, orchestration, and conversation state.',
      architecture: `Client request
     │
Agent server (Python)
     ├── Tool / resource modules
     └── Google Gemini API`,
      challenges:
        'Conversational flows and task-oriented flows pull in different directions — one wants flexibility, the other wants determinism.',
      solutions:
        'A modular architecture separated tool implementations from orchestration, so both interaction styles could be supported without special-casing throughout the codebase.',
      outcomes:
        'A functioning Gemini-backed agent server with AI-powered tools and resources. Source is public on GitHub.',
    },
  },
  {
    name: 'QR Generator',
    badge: 'Personal Project',
    date: '2026',
    description:
      'A web application that turns text, URLs, and contact details into downloadable QR codes, with input validation and error handling so every generated code scans correctly.',
    highlights: [
      'Instant QR generation from arbitrary user input',
      'Download generated codes as PNG images',
      'Input validation and error handling',
      'Clean, responsive interface',
      'Lightweight and easy to extend with new data formats',
    ],
    tags: [
      { name: 'Python', color: 'blue-text-gradient' },
      { name: 'QR Code Library', color: 'green-text-gradient' },
      { name: 'JavaScript', color: 'pink-text-gradient' },
      { name: 'HTML', color: 'blue-text-gradient' },
      { name: 'CSS', color: 'green-text-gradient' },
    ],
    image: '🔳',
    source_code_link: 'https://github.com/sivasiva2000/QR_PROJECT',
    details: {
      overview:
        'A small, focused Python web app that generates QR codes from whatever the user pastes in — text, a URL, or contact details — and hands back a downloadable PNG.',
      problem:
        'Generating a QR code usually means trusting a random website with your data or installing something. A lightweight self-hosted tool avoids both.',
      architecture: `Browser form (HTML / CSS / JS)
     │
Python web app
     │
QR code library ──> PNG download`,
      challenges:
        'Malformed or edge-case input can produce a QR code that renders but does not scan, which fails silently for the user.',
      solutions:
        'Input validation and error handling run before generation, so bad input is rejected with a clear message instead of producing an unscannable image.',
      outcomes:
        'A fast, lightweight generator that is easy to extend with additional QR data formats. Published on GitHub as a demonstration of Python web development.',
    },
  },
]

const DetailBlock = ({ label, children }) => (
  <div className='mt-4'>
    <h4 className='text-white font-semibold text-[14px] mb-1.5'>{label}</h4>
    {children}
  </div>
)

const ProjectCard = ({ index, name, badge, date, description, highlights, details, tags, image, source_code_link, live_link }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, type: 'spring' }}
    >
      <Tilt
        tiltEnable={!expanded}
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        scale={1}
        transitionSpeed={450}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full h-full'
      >
        <div className='relative w-full h-[230px]'>
          <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl'>
            <span className='text-8xl'>{image}</span>
          </div>

          {/* Colour-coded so company work and personal work are distinguishable at a glance */}
          {badge && (
            <span
              className={`absolute top-3 left-3 px-3 py-1 text-[11px] font-semibold rounded-full backdrop-blur-sm ${
                badge.startsWith('Professional')
                  ? 'bg-black/60 text-white ring-1 ring-white/25'
                  : 'bg-purple-600/70 text-white ring-1 ring-purple-300/40'
              }`}
            >
              {badge}
            </span>
          )}

          {date && (
            <span className='absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold rounded-full bg-black/50 text-white backdrop-blur-sm'>
              <FiCalendar className='text-[11px]' /> {date}
            </span>
          )}
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        {highlights && (
          <div className='mt-4'>
            <h4 className='text-white font-semibold text-[14px] mb-2'>Key Features</h4>
            <ul className='space-y-2'>
              {highlights.map((highlight, i) => (
                <li key={`${name}-highlight-${i}`} className='text-secondary text-[14px] pl-4 relative'>
                  <span className='absolute left-0 top-1.5 w-1.5 h-1.5 bg-primary-500 rounded-full'></span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Full case study, revealed in place - no routing needed */}
        {details && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              className='mt-4 inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 text-[13px] font-semibold transition-colors'
            >
              {expanded ? 'Hide Details' : 'View Details'}
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <FiChevronDown />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key='details'
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className='overflow-hidden'
                >
                  <div className='pt-1'>
                    <DetailBlock label='Overview'>
                      <p className='text-secondary text-[13px] leading-relaxed'>{details.overview}</p>
                    </DetailBlock>

                    <DetailBlock label='Problem Statement'>
                      <p className='text-secondary text-[13px] leading-relaxed'>{details.problem}</p>
                    </DetailBlock>

                    <DetailBlock label='Architecture'>
                      <pre className='text-secondary text-[11px] leading-[1.5] font-mono bg-black/30 rounded-lg p-3 overflow-x-auto'>
                        {details.architecture}
                      </pre>
                    </DetailBlock>

                    <DetailBlock label='Challenges'>
                      <p className='text-secondary text-[13px] leading-relaxed'>{details.challenges}</p>
                    </DetailBlock>

                    <DetailBlock label='Solutions'>
                      <p className='text-secondary text-[13px] leading-relaxed'>{details.solutions}</p>
                    </DetailBlock>

                    <DetailBlock label='Outcomes'>
                      <p className='text-secondary text-[13px] leading-relaxed'>{details.outcomes}</p>
                    </DetailBlock>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Real anchors: middle-clickable, crawlable, and visible without hovering */}
        {(source_code_link || live_link) && (
          <div className='mt-4 flex flex-wrap gap-2'>
            {source_code_link && (
              <motion.a
                href={source_code_link}
                target='_blank'
                rel='noopener noreferrer'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white text-[13px] font-medium hover:bg-primary-600 transition-colors'
              >
                <FiGithub /> GitHub Repository
              </motion.a>
            )}
            {live_link && (
              <motion.a
                href={live_link}
                target='_blank'
                rel='noopener noreferrer'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500/20 text-white text-[13px] font-medium hover:bg-primary-500/30 transition-colors'
              >
                <FiExternalLink /> Live Demo
              </motion.a>
            )}
          </div>
        )}

        <div className='mt-4 pt-4 border-t border-white/10'>
          <h4 className='text-white font-semibold text-[14px] mb-2'>Tech Stack</h4>
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[14px] ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  )
}

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-dark-bg w-full overflow-x-hidden">
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
            Featured <span className="gradient-text">Projects</span>
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
            Where innovation meets implementation
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className='mt-8 text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-4xl mx-auto text-center leading-relaxed'
        >
          Enterprise identity platforms I build professionally, alongside personal work exploring
          modern AI infrastructure and Python web development. Open <strong>View Details</strong> on
          any card for the full case study. The professional projects are proprietary, so no public
          repository is linked.
        </motion.p>

        <div className='mt-20 flex flex-wrap gap-7 justify-center items-start'>
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects

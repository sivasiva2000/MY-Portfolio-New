import { motion } from 'framer-motion'
import { FiDownload, FiAward, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { ComputersCanvas } from './canvas'
import { asset } from '../lib/asset'

const resumeUrl = asset('Siva_K_Backend_Developer_Resume.pdf')
const bugcrowdUrl = 'https://bugcrowd.com/h/sivak08557e93-5289-47fa-bf58-a4d0f066d6d4'

const openTo = ['Python Backend', 'Django', 'IAM/IGA', 'API Development', 'AI Engineering']

const socials = [
  { icon: FiGithub, href: 'https://github.com/siva-k-dev', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/siva-k6369739883/', label: 'LinkedIn' },
  { icon: FiMail, href: 'mailto:sivakandhasami01@gmail.com', label: 'Email' },
]

const Home = () => {
  return (
    <section id="home" className="relative w-full h-screen mx-auto">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-32 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* z-30 keeps the copy and CTAs above the 3D canvas (z-20) - otherwise the
          model paints over the buttons on narrow screens. */}
      <div className="absolute inset-0 top-[120px] max-w-7xl mx-auto px-6 sm:px-16 flex flex-row items-start gap-5 z-30 pointer-events-none">
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-primary-500' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        {/* The hero copy sits in a flex row that will not shrink on its own, so cap it
            against the viewport (the section clips overflow); on lg the fixed cap also
            keeps the text clear of the 3D model on the right. */}
        <div className="min-w-0 max-w-[calc(100vw_-_5.5rem)] sm:max-w-[calc(100vw_-_10rem)] lg:max-w-[560px]">
          <h1 className="font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2">
            Hi, I'm <span className='bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>Siva K</span>
          </h1>
          <p className="text-[#dfd9ff] font-semibold lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2">
            Python Backend Developer
          </p>
          <p className="text-[#dfd9ff]/80 font-light lg:text-[24px] sm:text-[20px] xs:text-[16px] text-[14px] lg:leading-[36px] mt-3">
            I build secure, scalable backend services and REST APIs with Python,
            Django, and DRF &mdash; powering enterprise identity governance.
          </p>

          {/* Roles I'm targeting - a quiet signal for recruiters */}
          <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[#dfd9ff]/70 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1.5 font-semibold text-primary-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400"></span>
              </span>
              Open to:
            </span>
            <span>{openTo.join(' • ')}</span>
          </p>

          {/* Inline row so the CTAs cost no extra height on wide screens */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <motion.a
              href={resumeUrl}
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-500 text-white font-medium text-sm hover:bg-primary-600 transition-colors"
            >
              <FiDownload /> Download Resume
            </motion.a>

            <motion.a
              href={bugcrowdUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Okta bug bounty recognition on Bugcrowd"
              className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-primary-400/50 bg-primary-500/10 text-white/90 font-medium text-sm hover:bg-primary-500/25 hover:border-primary-400/80 transition-colors"
            >
              <FiAward className="text-primary-400" /> View Bugcrowd Recognition
            </motion.a>

            {/* Direct contact routes, kept icon-only so they add no extra row on desktop */}
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  title={social.label}
                  className="pointer-events-auto w-10 h-10 rounded-lg border border-white/15 bg-white/5 flex items-center justify-center text-white/80 hover:text-white hover:bg-primary-500/25 hover:border-primary-400/60 transition-colors"
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden on phones: the hero copy plus CTAs now fill that height, and the model
          would paint over them. It returns from sm up, sitting below the copy, then
          moves to the right half on lg. */}
      <div className="hidden sm:flex absolute top-[470px] left-0 w-full h-[calc(100%-470px)] lg:right-[5%] lg:top-0 lg:left-auto lg:w-1/2 lg:h-full items-start pt-6 lg:pt-0 lg:items-center justify-center z-20">
        <div className="w-full h-full max-h-[500px] lg:max-h-none">
          <ComputersCanvas />
        </div>
      </div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-primary-500/50 flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-primary-500 mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Home

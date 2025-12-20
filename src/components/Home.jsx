import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { ComputersCanvas } from './canvas'

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

      <div className="absolute inset-0 top-[120px] max-w-7xl mx-auto px-6 sm:px-16 flex flex-row items-start gap-5 z-10 pointer-events-none">
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-primary-500' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className="font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2">
            Hi, I'm <span className='bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>Siva</span>
          </h1>
          <p className="text-[#dfd9ff] font-semibold lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2">
            Software Development Engineer
          </p>
          <p className="text-[#dfd9ff]/80 font-light lg:text-[24px] sm:text-[20px] xs:text-[16px] text-[14px] lg:leading-[36px] mt-3">
            Passionate about building secure and scalable software solutions.
          </p>
        </div>
      </div>

      <div className="absolute top-[320px] left-0 w-full h-[calc(100%-320px)] lg:absolute lg:right-[5%] lg:top-0 lg:left-auto lg:w-1/2 lg:h-full flex items-start pt-10 lg:pt-0 lg:items-center justify-center z-20">
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

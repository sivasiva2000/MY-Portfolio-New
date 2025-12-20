import { motion } from 'framer-motion'
import { FiHeart, FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/sivasiva2000', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/siva-k6369739883/', label: 'LinkedIn' },
    // { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiMail, href: 'mailto:sivakandhasami01@gmail.com', label: 'Email' },
  ]

  return (
    <footer className="bg-white dark:bg-dark-card border-t border-gray-200 dark:border-dark-border w-full overflow-x-hidden">
      <div className="container-custom py-12 w-full max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <motion.a
              href="#home"
              className="text-2xl font-bold gradient-text font-mono inline-block mb-4"
              whileHover={{ scale: 1.05 }}
            >
              &lt;S/&gt;
            </motion.a>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Building secure and scalable software solutions with passion and dedication.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-dark-bg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-500 hover:bg-primary-500/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors inline-block"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter/Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Interested in collaborating or have any questions? Let's connect!
            </p>
            <motion.a
              href="https://www.linkedin.com/in/siva-k6369739883/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
            >
              Follow on linkedin →
            </motion.a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-dark-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              © {currentYear} portfolio made with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="inline-block text-red-500"
              >
              <FiHeart className="inline" />
            </motion.span>{' '}
              by Siva K.
            </p>
            <div className="flex gap-6">
              <motion.a
                href="#"
                whileHover={{ y: -2 }}
                className="hover:text-primary-500 transition-colors"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -2 }}
                className="hover:text-primary-500 transition-colors"
              >
                Terms of Service
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.a
        href="#home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-40"
        aria-label="Back to top"
      >
        ↑
      </motion.a>
    </footer>
  )
}

export default Footer

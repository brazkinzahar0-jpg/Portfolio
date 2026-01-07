'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com', icon: 'GitHub' },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'LinkedIn' },
  { name: 'Behance', href: 'https://behance.net', icon: 'Behance' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white/60 text-sm"
          >
            © {currentYear} Portfolio. Все права защищены.
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-neon-cyan transition-colors duration-300 text-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          {/* Made with love */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white/60 text-sm flex items-center gap-2"
          >
            Сделано с
            <motion.span
              className="text-neon-cyan"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ❤
            </motion.span>
          </motion.div>

          {/* Admin link (скрыто по умолчанию, можно показать добавив класс) */}
          <a
            href="/admin/login"
            className="hidden text-white/20 hover:text-white/40 text-xs transition-colors"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  )
}


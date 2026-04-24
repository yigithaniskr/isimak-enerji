import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-accepted')
    if (!accepted) setShow(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-accepted', 'true')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-[90] p-4"
        >
          <div className="max-w-4xl mx-auto bg-dark border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <p className="text-white text-sm leading-relaxed">
                Bu web sitesi, size en iyi deneyimi sunmak için çerezleri kullanmaktadır. Siteyi kullanmaya devam ederek{' '}
                <Link to="/gizlilik-politikasi" className="text-accent underline hover:text-accent-light">
                  Gizlilik Politikası
                </Link>
                'nı kabul etmiş olursunuz.
              </p>
            </div>
            <button
              onClick={accept}
              className="bg-primary hover:bg-primary-light text-white font-medium px-6 py-2.5 rounded-xl transition-all shrink-0"
            >
              Kabul Et
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

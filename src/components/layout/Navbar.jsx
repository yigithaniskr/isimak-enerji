import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineMenuAlt3, HiX, HiChevronDown } from 'react-icons/hi'
import { FaWhatsapp, FaInstagram, FaPhone } from 'react-icons/fa'
import { useCategories } from '../../hooks/useCategories'
import { useSettings } from '../../hooks/useSettings'
import { useWhatsAppUrl } from '../../hooks/useWhatsAppUrl'

const navLinks = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'Hakkımızda', path: '/hakkimizda' },
  { name: 'Hizmetlerimiz', path: '/hizmetlerimiz' },
  { name: 'Ürünler', path: '/urunler' },
  { name: 'İletişim', path: '/iletisim' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const location = useLocation()
  const { categories } = useCategories()
  const { settings } = useSettings()
  const whatsappUrl = useWhatsAppUrl()
  const waPhone = settings.whatsappNumber || '905348821572'
  const waLocal = waPhone.startsWith('90') ? waPhone.slice(2) : waPhone
  const waDisplay = `(0${waLocal.slice(0, 3)}) ${waLocal.slice(3, 6)} ${waLocal.slice(6, 8)} ${waLocal.slice(8)}`

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setShowCategories(false)
    setMobileProductsOpen(false)
  }, [location])

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary-dark text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+904440386" className="flex items-center gap-1 hover:text-accent-light transition-colors">
              <FaPhone className="text-xs" /> 444 0 386
            </a>
            <a href={`tel:+${waPhone}`} className="flex items-center gap-1 hover:text-accent-light transition-colors">
              <FaWhatsapp /> {waDisplay}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/isimak_enerji" target="_blank" rel="noopener noreferrer" className="hover:text-accent-light transition-colors">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <motion.nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="/images/logo.jpg" alt="ISIMAK Enerji Sistemleri" className="h-12 md:h-16 w-[180px] md:w-[280px] object-cover object-center" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => link.path === '/urunler' && setShowCategories(true)}
                  onMouseLeave={() => link.path === '/urunler' && setShowCategories(false)}
                >
                  <Link
                    to={link.path}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      location.pathname === link.path
                        ? 'text-primary bg-primary/5'
                        : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {link.name}
                  </Link>

                  {/* Categories dropdown */}
                  {link.path === '/urunler' && (
                    <AnimatePresence>
                      {showCategories && categories.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[220px] max-h-[360px] overflow-y-auto"
                        >
                          <Link
                            to="/urunler"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                          >
                            Tüm Ürünler
                          </Link>
                          {categories.map((cat) => (
                            <Link
                              key={cat.id}
                              to={`/urunler?kategori=${cat.id}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25"
            >
              <FaWhatsapp /> Bize Ulaşın
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <HiX className="text-2xl" /> : <HiOutlineMenuAlt3 className="text-2xl" />}
            </button>
          </div>
        </div>

      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-dark/40 backdrop-blur-sm z-[60] md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-dark z-[70] md:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-white font-bold text-lg">Menü</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <HiX className="text-xl" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 overflow-y-auto py-6 px-6">
                <div className="space-y-1">
                  {navLinks.map((link, i) => (
                    <div key={link.path}>
                      {link.path === '/urunler' && categories.length > 0 ? (
                        <>
                          <motion.button
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07 }}
                            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                            className={`w-full flex items-center justify-between py-4 text-lg font-medium border-b border-white/5 transition-colors ${
                              location.pathname === link.path ? 'text-accent' : 'text-white hover:text-accent'
                            }`}
                          >
                            {link.name}
                            <HiChevronDown className={`transition-transform duration-300 ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                          </motion.button>
                          <AnimatePresence>
                            {mobileProductsOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <Link to="/urunler" className="block pl-4 py-3 text-gray-400 hover:text-accent transition-colors text-sm border-b border-white/5">
                                  Tüm Ürünler
                                </Link>
                                {categories.map((cat) => (
                                  <Link
                                    key={cat.id}
                                    to={`/urunler?kategori=${cat.id}`}
                                    className="block pl-4 py-3 text-gray-400 hover:text-accent transition-colors text-sm border-b border-white/5"
                                  >
                                    {cat.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                        >
                          <Link
                            to={link.path}
                            className={`block py-4 text-lg font-medium border-b border-white/5 transition-colors ${
                              location.pathname === link.path ? 'text-accent' : 'text-white hover:text-accent'
                            }`}
                          >
                            {link.name}
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 space-y-3 border-t border-white/10">
                <a href={`tel:+${waPhone}`} className="flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-medium w-full">
                  <FaPhone /> {waDisplay}
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 text-white py-3.5 rounded-xl font-medium w-full"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
                <a href="https://instagram.com/isimak_enerji" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-gray-400 hover:text-white py-2 transition-colors text-sm">
                  <FaInstagram /> isimak_enerji
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { useProjects } from '../../hooks/useProjects'

export default function Hero() {
  const { projects } = useProjects()
  const [activeImage, setActiveImage] = useState(0)

  const slides = useMemo(() => {
    const items = []
    projects.forEach((p) => {
      if (p.images?.[0]) {
        items.push({ src: p.images[0].url, label: p.name })
      }
    })
    return items.slice(0, 6)
  }, [projects])

  useEffect(() => {
    if (slides.length === 0) return
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-dark">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0,89,167,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,89,167,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Animated gradient orbs - hidden on mobile for performance */}
      <motion.div
        className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] hidden md:block"
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] hidden md:block"
        animate={{ scale: [1.2, 1, 1.2], x: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
            >
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-accent text-sm font-medium">30+ Yıllık Deneyim</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Mekanik Tesisat
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-accent">
                Çözüm Ortağınız
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-gray-400 text-lg md:text-xl mb-8 max-w-xl leading-relaxed"
            >
              Isıtma, soğutma, havalandırma ve tesisat sistemlerinde profesyonel mühendislik hizmeti. Kalite, güven ve zamanında teslimat.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/urunler"
                className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/25"
              >
                Ürünleri İncele
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/iletisim"
                className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/5 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              >
                İletişime Geç
              </Link>
            </motion.div>
          </div>

          {/* Right - Animated Project Showcase */}
          {slides.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={slides[activeImage]?.src}
                    alt={slides[activeImage]?.label}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7 }}
                  />
                </AnimatePresence>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeImage}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-white font-semibold text-lg"
                    >
                      {slides[activeImage]?.label}
                    </motion.p>
                  </AnimatePresence>
                  <p className="text-white/60 text-sm">ISIMAK Enerji Sistemleri</p>
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mt-4">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                    style={{ width: i === activeImage ? 32 : 12 }}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full" />
                    {i === activeImage && (
                      <motion.div
                        className="absolute inset-0 bg-accent rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 4, ease: 'linear' }}
                        style={{ transformOrigin: 'left' }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Floating stat card */}
              <motion.div
                className="absolute -left-2 lg:-left-4 top-4 lg:top-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 lg:px-4 lg:py-3"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-white font-bold text-xl">500+</p>
                <p className="text-white/60 text-xs">Tamamlanan Proje</p>
              </motion.div>
            </div>
          </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/40 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function GalleryModal({ isOpen, project, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!project) return null
  const images = project.images || []

  const next = () => setActiveIndex((prev) => (prev + 1) % images.length)
  const prev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-dark/90 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-bold text-xl">{project.name}</h3>
                {project.description && (
                  <p className="text-white/60 text-sm mt-1">{project.description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Main image */}
            <div className="relative h-[60vh] bg-dark-light rounded-2xl overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={images[activeIndex]?.url}
                  alt={project.name}
                  className="max-w-full max-h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark/60 hover:bg-dark/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark/60 hover:bg-dark/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaChevronRight />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-dark/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                    {activeIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      i === activeIndex ? 'border-accent opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-contain p-0.5 bg-dark-light" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

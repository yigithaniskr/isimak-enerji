import { motion } from 'framer-motion'
import { FaWhatsapp, FaPhone } from 'react-icons/fa'
import AnimatedSection from '../ui/AnimatedSection'

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-accent" />
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Projeniz İçin Teklif Alın
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Isıtma, soğutma ve tesisat ihtiyaçlarınız için hemen bizimle iletişime geçin. Size en uygun çözümü birlikte bulalım.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/905322917062?text=${encodeURIComponent('Merhaba, projem için teklif almak istiyorum.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-green-500/25 hover:scale-105"
            >
              <FaWhatsapp className="text-xl" /> WhatsApp ile Ulaşın
            </a>
            <a
              href="tel:+902122129696"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl border border-white/20 transition-all duration-300"
            >
              <FaPhone /> Hemen Arayın
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

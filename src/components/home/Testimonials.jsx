import { motion } from 'framer-motion'
import { FaStar, FaQuoteLeft, FaGoogle } from 'react-icons/fa'
import AnimatedSection from '../ui/AnimatedSection'

const testimonials = [
  {
    name: 'Ömer Faruk',
    text: 'Komşum tavsiye etmişti, müstakil villama komple mekanik işlerimi yaptırdım. Kombi, klima, doğalgaz, kalorifer, sıhhi tesisat... On numara 5 yıldız bir firma. Kurumsal, güvenilir, kaliteli ve uygun fiyat. Konuşulan ile uygulama birebir aynı. Çok memnun kaldım, kendilerine teşekkür ediyorum.',
    rating: 5,
  },
  {
    name: 'Mehmet Y.',
    text: 'Profesyonel ekip, zamanında teslim ve kaliteli işçilik. Isıtma sistemi kurulumu için tercih ettik, çok memnun kaldık. Kesinlikle tavsiye ediyorum.',
    rating: 5,
  },
  {
    name: 'Ayşe K.',
    text: 'Klima montajı için çağırdık, hem hızlı hem temiz bir iş çıkardılar. Fiyatları da piyasaya göre çok uygun. Tekrar tercih ederim.',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Müşteri Yorumları</span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2 mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <FaGoogle className="text-[#4285F4]" />
            <span className="text-sm">Google Yorumları</span>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
              >
                <FaQuoteLeft className="text-primary/20 text-3xl mb-4" />
                <p className="text-gray-600 leading-relaxed flex-1 mb-6">
                  "{item.text}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">{item.name.charAt(0)}</span>
                    </div>
                    <span className="font-semibold text-dark">{item.name}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(item.rating)].map((_, j) => (
                      <FaStar key={j} className="text-amber-400 text-sm" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

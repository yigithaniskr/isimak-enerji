import { motion } from 'framer-motion'
import AnimatedSection from '../ui/AnimatedSection'

const services = [
  { image: '/images/services/isitma.jpg', title: 'Isıtma Sistemleri', desc: 'Kombi, kalorifer ve yerden ısıtma sistemleri kurulumu ve bakımı' },
  { image: '/images/services/sogutma.jpg', title: 'Soğutma & Klima', desc: 'Klima, VRF ve merkezi soğutma sistemleri montajı ve servisi' },
  { image: '/images/services/dogalgaz.jpg', title: 'Doğalgaz Tesisatı', desc: 'Doğalgaz iç tesisat ve dönüşüm projeleri' },
  { image: '/images/services/yangin.jpg', title: 'Yangın Söndürme', desc: 'Yangın söndürme tesisatı kurulumu ve periyodik bakım hizmeti' },
  { image: '/images/services/sihhi-tesisat.jpg', title: 'Sıhhi Tesisat', desc: 'Temiz su, pis su ve yağmur suyu tesisat sistemleri' },
  { image: '/images/services/havalandirma.webp', title: 'Havalandırma', desc: 'Mekanik ve tıbbi havalandırma sistemlerinin projelendirmesi' },
]

export default function Services() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Hizmetlerimiz</span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2 mb-4">
            Ne Yapıyoruz?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Mekanik tesisat sektöründe 30 yılı aşkın tecrübemizle geniş yelpazede profesyonel hizmet sunuyoruz.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-default h-full"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark mb-2">{service.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{service.desc}</p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

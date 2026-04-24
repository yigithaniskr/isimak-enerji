import { motion } from 'framer-motion'
import { FaFire, FaSnowflake, FaWind, FaShieldAlt, FaWater, FaTools } from 'react-icons/fa'
import AnimatedSection from '../ui/AnimatedSection'

const services = [
  { icon: FaFire, title: 'Isıtma Sistemleri', desc: 'Kombi, kalorifer ve yerden ısıtma sistemleri kurulumu ve bakımı', color: 'from-orange-500 to-red-500' },
  { icon: FaSnowflake, title: 'Soğutma & Klima', desc: 'Klima, VRF ve merkezi soğutma sistemleri montajı ve servisi', color: 'from-blue-400 to-cyan-500' },
  { icon: FaTools, title: 'Doğalgaz Tesisatı', desc: 'Doğalgaz iç tesisat ve dönüşüm projeleri', color: 'from-amber-500 to-orange-500' },
  { icon: FaShieldAlt, title: 'Yangın Söndürme', desc: 'Yangın söndürme tesisatı kurulumu ve periyodik bakım hizmeti', color: 'from-red-500 to-pink-500' },
  { icon: FaWater, title: 'Sıhhi Tesisat', desc: 'Temiz su, pis su ve yağmur suyu tesisat sistemleri', color: 'from-blue-500 to-indigo-500' },
  { icon: FaWind, title: 'Havalandırma', desc: 'Mekanik ve tıbbi havalandırma sistemlerinin projelendirmesi', color: 'from-teal-400 to-green-500' },
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
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-default h-full"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed">{service.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { FaFire, FaSnowflake, FaWind, FaShieldAlt, FaWater, FaTools, FaArrowRight, FaWhatsapp } from 'react-icons/fa'
import AnimatedSection from '../components/ui/AnimatedSection'

const services = [
  {
    id: 'isitma',
    icon: FaFire,
    title: 'Isıtma Sistemleri',
    color: 'from-orange-500 to-red-500',
    image: '/images/services/isitma.jpg',
    summary: 'Evinizi veya iş yerinizi en verimli şekilde ısıtan modern sistemler.',
    description: 'Yaşam ve çalışma alanlarınız için en uygun ısıtma çözümlerini sunuyoruz. Enerji verimliliği yüksek, çevre dostu ve uzun ömürlü sistemlerle konforunuzu en üst düzeye çıkarıyoruz. Projelendirmeden montaja, devreye almadan periyodik bakıma kadar tüm süreçlerde yanınızdayız.',
    items: [
      { name: 'Kombi Satış, Montaj ve Bakım', desc: 'Yoğuşmalı ve hermetik kombi sistemlerinin satışı, profesyonel montajı ve düzenli bakım hizmeti.' },
      { name: 'Kalorifer Tesisatı', desc: 'Panel radyatör, döküm radyatör ve havlupan dahil tüm kalorifer tesisatı projelendirme ve kurulumu.' },
      { name: 'Yerden Isıtma Sistemleri', desc: 'Homojen ısı dağılımı sağlayan, enerji tasarruflu yerden ısıtma sistemi kurulumu.' },
      { name: 'VRF Sistemleri', desc: 'Büyük ölçekli binalar için değişken debili soğutucu akışkanlı merkezi ısıtma çözümleri.' },
      { name: 'Merkezi Isıtma Sistemleri', desc: 'Apartman ve siteler için merkezi kazan dairesi projelendirme, kurulum ve işletme.' },
    ],
  },
  {
    id: 'sogutma',
    icon: FaSnowflake,
    title: 'Soğutma & Klima',
    color: 'from-blue-400 to-cyan-500',
    image: '/images/services/sogutma.jpg',
    summary: 'Yaz sıcaklarında ferah bir ortam için profesyonel klima çözümleri.',
    description: 'Ev, ofis ve ticari alanlar için en uygun soğutma sistemlerini projelendirip kuruyoruz. Enerji sınıfı yüksek, sessiz çalışan ve uzun ömürlü klimalarla yazın bile konforlu bir ortam sağlıyoruz. Tüm önde gelen markaların yetkili satış ve servis hizmetini sunuyoruz.',
    items: [
      { name: 'Split Klima Satış ve Montaj', desc: 'Duvar tipi split klimaların satışı ve uzman ekibimiz tarafından profesyonel montajı.' },
      { name: 'Multi Split Sistemler', desc: 'Tek dış ünite ile birden fazla iç ünite bağlantılı, esnek soğutma çözümleri.' },
      { name: 'VRF Soğutma Sistemleri', desc: 'Otel, plaza ve AVM gibi büyük yapılar için merkezi VRF soğutma projelendirme ve kurulumu.' },
      { name: 'Merkezi Soğutma', desc: 'Chiller ve fan-coil sistemleri ile büyük ölçekli merkezi soğutma tesisatı.' },
    ],
  },
  {
    id: 'dogalgaz',
    icon: FaTools,
    title: 'Doğalgaz Tesisatı',
    color: 'from-amber-500 to-orange-500',
    image: '/images/services/dogalgaz.jpg',
    summary: 'Güvenli ve standartlara uygun doğalgaz iç tesisat hizmeti.',
    description: 'Doğalgaz tesisatı, güvenlik ve uzmanlık gerektiren kritik bir alandır. Yetkili ve deneyimli ekibimizle, mevzuata tam uyumlu doğalgaz iç tesisat projelendirme, montaj ve dönüşüm hizmetleri sunuyoruz. Güvenliğiniz bizim önceliğimizdir.',
    items: [
      { name: 'İç Tesisat Projelendirme ve Montaj', desc: 'Konut ve iş yerleri için doğalgaz iç tesisat projesi çizimi ve güvenli montajı.' },
      { name: 'Doğalgaz Dönüşüm', desc: 'Mevcut ısıtma sistemlerinin doğalgaza dönüştürülmesi ve cihaz uyumlandırması.' },
      { name: 'Gaz Kaçak Tespit ve Onarım', desc: 'Profesyonel cihazlarla gaz kaçağı tespiti ve acil onarım hizmeti.' },
    ],
  },
  {
    id: 'sihhi-tesisat',
    icon: FaWater,
    title: 'Sıhhi Tesisat',
    color: 'from-blue-500 to-indigo-500',
    image: '/images/services/sihhi-tesisat.jpg',
    summary: 'Temiz su, pis su ve yağmur suyu sistemlerinde komple çözüm.',
    description: 'Binaların su altyapısı, yaşam kalitesinin temel taşıdır. Temiz su hattından atık su sistemine, yağmur suyu drenajından su arıtma ünitelerine kadar tüm sıhhi tesisat ihtiyaçlarınızı karşılıyoruz. Kaliteli malzeme ve işçilikle uzun ömürlü sistemler kuruyoruz.',
    items: [
      { name: 'Temiz Su Tesisatı', desc: 'Bakır, PPR ve kompozit borularla hijyenik ve dayanıklı temiz su hattı döşemesi.' },
      { name: 'Pis Su Tesisatı', desc: 'Atık su ve kanalizasyon bağlantılarının projeye uygun, sızdırmaz montajı.' },
      { name: 'Yağmur Suyu Sistemi', desc: 'Çatı ve teras yağmur suyu toplama ve drenaj sistemleri kurulumu.' },
      { name: 'Su Arıtma Sistemleri', desc: 'Konut ve ticari alanlar için su arıtma cihazı kurulumu ve bakımı.' },
    ],
  },
  {
    id: 'havalandirma',
    icon: FaWind,
    title: 'Havalandırma Sistemleri',
    color: 'from-teal-400 to-green-500',
    image: '/images/services/havalandirma.jpg',
    summary: 'Temiz ve sağlıklı hava için mekanik havalandırma çözümleri.',
    description: 'Kapalı mekanlarda temiz hava sirkülasyonu sağlamak hayati önem taşır. Mekanik havalandırma sistemleri ile iç ortam hava kalitesini en üst seviyeye çıkarıyoruz. Hastane, otel, restoran, fabrika ve ofis gibi farklı ihtiyaçlara özel çözümler üretiyoruz.',
    items: [
      { name: 'Mekanik Havalandırma', desc: 'Taze hava besleme ve kirli hava tahliye sistemlerinin projelendirmesi ve montajı.' },
      { name: 'Tıbbi Havalandırma', desc: 'Ameliyathane, yoğun bakım ve steril alanlar için özel basınçlı ve filtreli havalandırma sistemleri.' },
      { name: 'Mutfak Havalandırma', desc: 'Restoran ve endüstriyel mutfaklar için davlumbaz, hava perdesi ve egzoz sistemleri.' },
      { name: 'Endüstriyel Havalandırma', desc: 'Fabrika, atölye ve depo gibi büyük hacimli alanlar için güçlü havalandırma tesisatı.' },
    ],
  },
  {
    id: 'yangin',
    icon: FaShieldAlt,
    title: 'Yangın Söndürme Sistemleri',
    color: 'from-red-500 to-pink-500',
    image: '/images/services/yangin.jpg',
    summary: 'Can ve mal güvenliğiniz için yangın söndürme tesisatı.',
    description: 'Yangın güvenliği, bir binanın en kritik altyapı unsurlarından biridir. Yönetmeliklere ve standartlara tam uyumlu yangın söndürme sistemleri projelendiriyor, kuruyoruz ve periyodik bakımlarını gerçekleştiriyoruz. Güvende olmanız için çalışıyoruz.',
    items: [
      { name: 'Sprinkler Sistemleri', desc: 'Otomatik yağmurlama (sprinkler) sistemi projelendirme, montaj ve test hizmeti.' },
      { name: 'Yangın Dolabı Tesisatı', desc: 'İtfaiye bağlantısı, yangın dolapları ve hortum sistemlerinin kurulumu.' },
      { name: 'Periyodik Bakım ve Test', desc: 'Mevcut yangın söndürme sistemlerinin düzenli kontrol, bakım ve basınç testleri.' },
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Quick Nav */}
      <section className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5 transition-all whitespace-nowrap shrink-0"
              >
                <s.icon className="text-xs" /> {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      {services.map((service, i) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-24 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Visual */}
              <AnimatedSection direction={i % 2 === 0 ? 'left' : 'right'} className={i % 2 !== 0 ? 'lg:order-2' : ''}>
                <div className="relative">
                  <div className={`aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br ${service.color} flex flex-col relative`}>
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                        backgroundSize: '30px 30px',
                      }} />
                    </div>
                    <div className="flex-1 flex items-center justify-center relative">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1], rotate: [0, 3, -3, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <service.icon className="text-white text-[80px] md:text-[120px] opacity-90 drop-shadow-lg" />
                      </motion.div>
                    </div>
                    <div className="relative bg-white/10 backdrop-blur-md p-4 border-t border-white/20">
                      <p className="text-white font-bold text-sm md:text-lg">{service.title}</p>
                      <p className="text-white/70 text-xs md:text-sm">{service.summary}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Content */}
              <AnimatedSection direction={i % 2 === 0 ? 'right' : 'left'} className={i % 2 !== 0 ? 'lg:order-1' : ''}>
                <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${service.color} bg-clip-text`}>
                  <span className="text-transparent font-semibold text-sm uppercase tracking-wider">{service.title}</span>
                </div>
                <h2 className="text-3xl font-bold text-dark mt-2 mb-4">{service.summary}</h2>
                <p className="text-gray-500 leading-relaxed mb-8">{service.description}</p>

                <div className="space-y-4">
                  {service.items.map((item, j) => (
                    <motion.div
                      key={j}
                      whileHover={{ x: 5 }}
                      className="flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all cursor-default"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center shrink-0 opacity-80`}>
                        <FaArrowRight className="text-white text-xs" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark mb-1">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="py-20 bg-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Projeniz İçin Teklif Alın
            </h2>
            <p className="text-gray-400 mb-8">
              İhtiyacınıza uygun hizmeti belirleyelim, size en doğru çözümü sunalım.
            </p>
            <a
              href={`https://wa.me/905322917062?text=${encodeURIComponent('Merhaba, hizmetleriniz hakkında bilgi almak istiyorum.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-green-500/25 hover:scale-105"
            >
              <FaWhatsapp className="text-xl" /> WhatsApp ile Ulaşın
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

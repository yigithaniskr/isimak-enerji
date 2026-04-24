import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaClock, FaHandshake, FaAward, FaImages } from 'react-icons/fa'
import AnimatedSection from '../components/ui/AnimatedSection'
import GalleryModal from '../components/ui/GalleryModal'
import Loading from '../components/ui/Loading'
import { useProjects } from '../hooks/useProjects'

const values = [
  { icon: FaAward, title: 'Kalite', desc: 'Her projede en yüksek kalite standartlarını hedefliyoruz.' },
  { icon: FaHandshake, title: 'Güven', desc: 'Dürüst ve şeffaf iş anlayışımızla müşterilerimizin güvenini kazanıyoruz.' },
  { icon: FaClock, title: 'Zamanında Teslim', desc: 'Projelerimizi belirlenen süre içerisinde eksiksiz teslim ediyoruz.' },
  { icon: FaCheckCircle, title: 'Uygun Fiyat', desc: 'Kaliteden ödün vermeden en rekabetçi fiyatları sunuyoruz.' },
]

export default function About() {
  const { projects, loading: projectsLoading } = useProjects()
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,89,167,0.4) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>
        <motion.div
          className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <div className="relative max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Hakkımızda</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">
              30 Yılı Aşan
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-accent">
                Bilgi ve Tecrübe
              </span>
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center p-12">
                  <img src="/images/logo.jpg" alt="ISIMAK Enerji Sistemleri" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-primary text-white rounded-2xl p-6 shadow-xl">
                  <div className="text-3xl font-bold">30+</div>
                  <div className="text-sm opacity-80">Yıllık Deneyim</div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <h2 className="text-3xl font-bold text-dark mb-6">Hikayemiz</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  ISIMAK Mühendislik, 30 yılı aşkın bilgi ve tecrübesini siz değerli müşterileriyle paylaşmanın heyecanını yaşamaktadır. Kurulduğu günden itibaren mekanik tesisat alanında uzman kadrosuyla hizmet veren firmamız; sıhhi tesisat, havalandırma, klima, doğalgaz, yangın söndürme, su arıtma, havuz, tıbbi havalandırma, ısıtma, VRF ve havalandırma sistemleri konularında faaliyet göstermektedir.
                </p>
                <p>
                  Kurulduğu ilk günden itibaren kaliteye verdiği önem ve zoru başarma azmi sayesinde kısa sürede mekanik tesisat sektöründe tanınan firmamız, bu ilkelerinden asla vazgeçmemiştir.
                </p>
                <p>
                  Değişmez prensiplerimiz daima kalite, hizmet, zamanında teslim ve uygun fiyat olmuştur. "Üretimde başarı ve sürekliliğin teminatı, hizmette dürüstlük ve kalitedir" ilkesiyle çalışan ISIMAK Mühendislik, gösterdiğiniz yakın ilgi ve destekten güç alarak, bugün ve gelecekte sizlere hizmet vermeye devam edecektir.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Değerlerimiz</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2">
              Neden ISIMAK?
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 h-full"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <item.icon className="text-primary text-2xl" />
                  </div>
                  <h3 className="font-bold text-dark text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Başarılarımız</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2 mb-4">
              Ödüllerimiz
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Sektördeki başarılarımız ve iş ortaklarımızdan aldığımız ödüller, kalitemizin en büyük kanıtıdır.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { src: '/images/awards/airfel-birincilik.jpeg', title: 'Airfel Ciro Birincisi', desc: '2018 İstanbul Avrupa Bölge Birincisi' },
              { src: '/images/awards/plaket.jpeg', title: 'Airfel Başarı Ödülü', desc: 'ISIMAK Tesisat - Birlikten Gelecek Doğar' },
              { src: '/images/awards/oduller-1.jpeg', title: 'Sektör Ödülleri', desc: 'Katre ISI, Vaillant, Airfel ve daha fazlası' },
              { src: '/images/awards/oduller-2.jpeg', title: 'Başarı Ödüllerimiz', desc: '30 yıllık tecrübenin takdiri' },
            ].map((award, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group h-full"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={award.src}
                      alt={award.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-dark mb-1">{award.title}</h3>
                    <p className="text-gray-500 text-sm">{award.desc}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <AnimatedSection className="text-center mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Referanslarımız</span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2 mb-4">
                Saha Çalışmalarımız
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Tamamladığımız projelerden ve saha çalışmalarımızdan kareler.
              </p>
            </AnimatedSection>

            {projectsLoading ? <Loading /> : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project, i) => (
                  <AnimatedSection key={project.id} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedProject(project)}
                      className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group relative cursor-pointer"
                    >
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        {project.images?.[0] ? (
                          <img
                            src={project.images[0].url}
                            alt={project.name}
                            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            <FaImages className="text-4xl" />
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/80 to-transparent p-4 pt-12">
                        <p className="text-white font-medium text-sm">{project.name}</p>
                        {project.images?.length > 1 && (
                          <p className="text-white/60 text-xs mt-1">{project.images.length} fotoğraf</p>
                        )}
                      </div>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>

          <GalleryModal
            isOpen={!!selectedProject}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </section>
      )}

    </>
  )
}

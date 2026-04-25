import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaInstagram, FaClock } from 'react-icons/fa'
import AnimatedSection from '../components/ui/AnimatedSection'

export default function Contact() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,89,167,0.4) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">İletişim</h1>
            <p className="text-gray-400 max-w-2xl">
              Sorularınız, projeleriniz ve talepleriniz için bize ulaşın.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Contact Info */}
            <AnimatedSection direction="left" className="flex flex-col">
              <h2 className="text-2xl font-bold text-dark mb-8">Bize Ulaşın</h2>
              <div className="space-y-6">
                <a
                  href="https://maps.app.goo.gl/GFcAUVyCXQQtRjHq7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-primary/5 transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                    <FaMapMarkerAlt className="text-primary group-hover:text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-1">Adres</h3>
                    <p className="text-gray-500">Mecidiyeköy Mah. Mehmetçik Cd. No:8/B<br />Şişli / İstanbul</p>
                  </div>
                </a>

                <a
                  href="tel:+904440386"
                  className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-primary/5 transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                    <FaPhone className="text-primary group-hover:text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-1">Telefon</h3>
                    <p className="text-gray-500">444 0 386</p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/905348821572?text=${encodeURIComponent('Merhaba, bilgi almak istiyorum.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-green-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-500 transition-all">
                    <FaWhatsapp className="text-green-600 group-hover:text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-1">WhatsApp</h3>
                    <p className="text-gray-500">(0534) 882 15 72</p>
                  </div>
                </a>

                <a
                  href="mailto:yusuf@isimakenerji.com"
                  className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-primary/5 transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                    <FaEnvelope className="text-primary group-hover:text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-1">E-posta</h3>
                    <p className="text-gray-500">yusuf@isimakenerji.com</p>
                  </div>
                </a>

                <a
                  href="https://instagram.com/isimak_enerji"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-pink-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500 transition-all">
                    <FaInstagram className="text-pink-600 group-hover:text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-1">Instagram</h3>
                    <p className="text-gray-500">@isimak_enerji</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <FaClock className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-1">Çalışma Saatleri</h3>
                    <p className="text-gray-500">Pazartesi - Cumartesi: 09:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Map */}
            <AnimatedSection direction="right" className="flex flex-col">
              <h2 className="text-2xl font-bold text-dark mb-8">Konumumuz</h2>
              <a
                href="https://maps.app.goo.gl/GFcAUVyCXQQtRjHq7"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl overflow-hidden shadow-lg flex-1 min-h-[400px]"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d751.8!2d29.0055!3d41.0625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a3a1c4248d%3A0x5a0e3c8f9e8b1d2a!2sMecidiyek%C3%B6y%2C+Mehmet%C3%A7ik+Cd.+No%3A8%2FB%2C+34387+%C5%9Ei%C5%9Fli%2F%C4%B0stanbul!5e0!3m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: 'none' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ISIMAK Mühendislik Konum"
                />
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}

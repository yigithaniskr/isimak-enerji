import { Link } from 'react-router-dom'
import { FaInstagram, FaWhatsapp, FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock } from 'react-icons/fa'
import { useSettings } from '../../hooks/useSettings'

export default function Footer() {
  const { settings } = useSettings()
  const phone = settings.whatsappNumber || '905348821572'
  const local = phone.startsWith('90') ? phone.slice(2) : phone
  const displayPhone = `(0${local.slice(0, 3)}) ${local.slice(3, 6)} ${local.slice(6, 8)} ${local.slice(8)}`

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-4">
              <div className="bg-white rounded-xl p-4 inline-block">
                <img src="/images/logo.jpg" alt="ISIMAK Enerji Sistemleri" className="h-16 w-[260px] object-cover object-center" />
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              30 yılı aşan bilgi ve tecrübesiyle mekanik tesisat sektöründe güvenilir çözüm ortağınız.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Hızlı Erişim</h3>
            <ul className="space-y-2">
              {[
                { name: 'Ana Sayfa', path: '/' },
                { name: 'Hakkımızda', path: '/hakkimizda' },
                { name: 'Hizmetlerimiz', path: '/hizmetlerimiz' },
                { name: 'Ürünler', path: '/urunler' },
                { name: 'İletişim', path: '/iletisim' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Hizmetlerimiz</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Isıtma Sistemleri', id: 'isitma' },
                { name: 'Soğutma & Klima', id: 'sogutma' },
                { name: 'Havalandırma', id: 'havalandirma' },
                { name: 'Doğalgaz Tesisatı', id: 'dogalgaz' },
                { name: 'Sıhhi Tesisat', id: 'sihhi-tesisat' },
                { name: 'Yangın Söndürme', id: 'yangin' },
              ].map((s) => (
                <li key={s.id}>
                  <Link to={`/hizmetlerimiz#${s.id}`} className="text-gray-400 hover:text-white transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://maps.app.goo.gl/GFcAUVyCXQQtRjHq7" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                  <FaMapMarkerAlt className="mt-0.5 shrink-0" />
                  Mecidiyeköy Mah. Mehmetçik Cd. No:8/B Şişli / İstanbul
                </a>
              </li>
              <li>
                <a href="tel:+904440386" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                  <FaPhone className="shrink-0" />
                  444 0 386
                </a>
              </li>
              <li>
                <a href={`tel:+${phone}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                  <FaWhatsapp className="shrink-0" />
                  {displayPhone}
                </a>
              </li>
              <li>
                <a href="mailto:yusuf@isimakenerji.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                  <FaEnvelope className="shrink-0" />
                  yusuf@isimakenerji.com
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <FaClock className="shrink-0" />
                  Pazartesi - Cumartesi: 09:00 - 18:00
                </div>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="https://instagram.com/isimak_enerji" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <FaInstagram />
              </a>
              <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-green-500 transition-colors">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ISIMAK Mühendislik. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/gizlilik-politikasi" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">
              Gizlilik Politikası & KVKK
            </Link>
            <Link to="/admin" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">
              Yönetim Paneli
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { FaWhatsapp } from 'react-icons/fa'
import { useSettings } from '../../hooks/useSettings'

export default function WhatsAppButton({ productName = '', className = '' }) {
  const { settings } = useSettings()
  const phone = settings.whatsappNumber || '905348821572'
  const message = productName
    ? `Merhaba, "${productName}" ürünüyle ilgileniyorum. Bilgi alabilir miyim?`
    : 'Merhaba, ürünleriniz hakkında bilgi almak istiyorum.'
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 ${className}`}
    >
      <FaWhatsapp className="text-xl" />
      Bilgi Al
    </a>
  )
}

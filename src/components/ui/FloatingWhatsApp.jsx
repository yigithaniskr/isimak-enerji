import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function FloatingWhatsApp() {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '905322917062'
  const message = 'Merhaba, bilgi almak istiyorum.'
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title="WhatsApp ile iletişime geç"
    >
      <FaWhatsapp className="text-3xl" />
    </motion.a>
  )
}

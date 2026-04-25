import { useSettings } from './useSettings'

export function useWhatsAppUrl(message = 'Merhaba, bilgi almak istiyorum.') {
  const { settings } = useSettings()
  const phone = settings.whatsappNumber || '905348821572'
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

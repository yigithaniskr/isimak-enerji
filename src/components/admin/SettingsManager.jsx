import { useState, useEffect } from 'react'
import { FaSave, FaWhatsapp, FaLock } from 'react-icons/fa'
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { useSettings } from '../../hooks/useSettings'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function SettingsManager() {
  const { settings, loading, updateSettings } = useSettings()
  const { user } = useAuth()
  const [whatsapp, setWhatsapp] = useState('')
  const [saving, setSaving] = useState(false)

  // Şifre değiştirme
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [changingPassword, setChangingPassword] = useState(false)


  useEffect(() => {
    if (settings.whatsappNumber) {
      const clean = settings.whatsappNumber.replace(/\D/g, '')
      const local = clean.startsWith('90') ? clean.slice(2) : clean
      setWhatsapp(local)
    }
  }, [settings.whatsappNumber])

  const formatDisplay = (num) => {
    if (!num) return ''
    const clean = num.replace(/\D/g, '')
    const local = clean.startsWith('90') ? clean.slice(2) : clean
    if (local.length === 10) {
      return `0${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6, 8)} ${local.slice(8)}`
    }
    return `0${local}`
  }

  const handleWhatsappChange = (e) => {
    const val = e.target.value.replace(/\D/g, '')
    if (val.length <= 10) setWhatsapp(val)
  }

  const handleWhatsappSave = async () => {
    const clean = whatsapp.replace(/\D/g, '')
    if (clean.length !== 10) {
      toast.error('10 haneli numara giriniz')
      return
    }
    setSaving(true)
    try {
      await updateSettings({ whatsappNumber: `90${clean}` })
      toast.success('WhatsApp numarası güncellendi')
    } catch (err) {
      toast.error('Bir hata oluştu')
    }
    setSaving(false)
  }

  const handlePasswordChange = async () => {
    if (!currentPassword) {
      toast.error('Mevcut şifrenizi giriniz')
      return
    }
    if (newPassword.length < 6) {
      toast.error('Yeni şifre en az 6 karakter olmalı')
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('Yeni şifreler eşleşmiyor')
      return
    }

    setChangingPassword(true)
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword)
      await reauthenticateWithCredential(user, credential)
      await updatePassword(user, newPassword)
      toast.success('Şifre başarıyla güncellendi')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        toast.error('Mevcut şifre yanlış')
      } else {
        toast.error('Şifre güncellenemedi')
      }
    }
    setChangingPassword(false)
  }

  if (loading) return <div className="text-center py-10 text-gray-500">Yükleniyor...</div>

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-dark">Ayarlar</h2>

      {/* WhatsApp */}
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <FaWhatsapp className="text-green-600 text-xl" />
          </div>
          <div>
            <h3 className="font-bold text-dark">WhatsApp Numarası</h3>
            <p className="text-xs text-gray-400">Sitedeki tüm WhatsApp butonları bu numaraya yönlendirir</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mevcut numara: <span className="text-primary font-bold">{formatDisplay(settings.whatsappNumber)}</span>
          </label>
          <div className="flex gap-3">
            <div className="flex-1 flex rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
              <span className="bg-gray-100 text-gray-500 font-medium px-4 py-2.5 border-r border-gray-200 select-none">0</span>
              <input
                type="text"
                value={whatsapp}
                onChange={handleWhatsappChange}
                className="flex-1 px-3 py-2.5 focus:outline-none"
                placeholder="534 882 15 72"
                maxLength={10}
              />
            </div>
            <button
              onClick={handleWhatsappSave}
              disabled={saving}
              className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-5 py-2.5 rounded-xl font-medium transition-all disabled:opacity-50 shrink-0"
            >
              <FaSave /> {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </div>
      </div>

      {/* Şifre Değiştirme */}
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
            <FaLock className="text-amber-600 text-xl" />
          </div>
          <div>
            <h3 className="font-bold text-dark">Şifre Değiştir</h3>
            <p className="text-xs text-gray-400">Yönetim paneli giriş şifrenizi güncelleyin</p>
          </div>
        </div>
        <div className="space-y-3">
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Mevcut şifre"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Yeni şifre (en az 6 karakter)"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Yeni şifre tekrar"
          />
          <button
            onClick={handlePasswordChange}
            disabled={changingPassword}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all disabled:opacity-50"
          >
            <FaLock /> {changingPassword ? 'Şifre değiştiriliyor...' : 'Şifreyi Güncelle'}
          </button>
        </div>
      </div>
    </div>
  )
}

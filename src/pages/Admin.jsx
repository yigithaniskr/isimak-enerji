import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import CategoriesAndBrands from '../components/admin/CategoriesAndBrands'
import ProductManager from '../components/admin/ProductManager'
import ProjectManager from '../components/admin/ProjectManager'
import SettingsManager from '../components/admin/SettingsManager'
import { FaBoxes, FaTags, FaSignOutAlt, FaHome, FaImages, FaCog } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Admin() {
  const { user, login, logout, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('products')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin w-8 h-8 border-3 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  // Login form
  if (!user) {
    const handleLogin = async (e) => {
      e.preventDefault()
      setError('')
      setLoginLoading(true)
      try {
        await login(email, password)
      } catch (err) {
        setError('E-posta veya şifre hatalı.')
      }
      setLoginLoading(false)
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-dark">Yönetim Paneli</h1>
            <p className="text-gray-500 text-sm mt-1">ISIMAK Mühendislik</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50"
            >
              {loginLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          <Link to="/" className="block text-center text-sm text-gray-500 hover:text-primary mt-6 transition-colors">
            Siteye Dön
          </Link>
        </div>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top bar */}
      <div className="bg-dark text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-semibold">ISIMAK Admin</span>
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <FaHome /> Siteye Git
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
            >
              <FaSignOutAlt /> Çıkış
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shrink-0 ${
              activeTab === 'products'
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaBoxes /> Ürünler
          </button>
          <button
            onClick={() => setActiveTab('catbrand')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shrink-0 ${
              activeTab === 'catbrand'
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaTags /> Kategoriler & Markalar
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shrink-0 ${
              activeTab === 'projects'
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaImages /> Projeler
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all shrink-0 ${
              activeTab === 'settings'
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FaCog /> Ayarlar
          </button>
        </div>

        {/* Content */}
        {activeTab === 'catbrand' && <CategoriesAndBrands />}
        {activeTab === 'products' && <ProductManager />}
        {activeTab === 'projects' && <ProjectManager />}
        {activeTab === 'settings' && <SettingsManager />}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { FaChevronDown, FaTags, FaBuilding } from 'react-icons/fa'
import CategoryManager from './CategoryManager'
import BrandManager from './BrandManager'
import { useCategories } from '../../hooks/useCategories'
import { useBrands } from '../../hooks/useBrands'

export default function CategoriesAndBrands() {
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [brandsOpen, setBrandsOpen] = useState(false)
  const { categories } = useCategories()
  const { brands } = useBrands()

  return (
    <div className="space-y-4">
      {/* Kategoriler */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <button
          onClick={() => setCategoriesOpen(!categoriesOpen)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <FaTags className="text-primary" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-dark">Kategoriler ({categories.length})</h3>
              <p className="text-xs text-gray-400">Ürün kategorilerini yönetin</p>
            </div>
          </div>
          <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${categoriesOpen ? 'rotate-180' : ''}`} />
        </button>
        <div
          className="grid transition-all duration-500 ease-in-out"
          style={{ gridTemplateRows: categoriesOpen ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <div className="px-6 pb-6 border-t border-gray-100 pt-4">
              <CategoryManager />
            </div>
          </div>
        </div>
      </div>

      {/* Markalar */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <button
          onClick={() => setBrandsOpen(!brandsOpen)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <FaBuilding className="text-primary" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-dark">Markalar ({brands.length})</h3>
              <p className="text-xs text-gray-400">Ürün markalarını yönetin</p>
            </div>
          </div>
          <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${brandsOpen ? 'rotate-180' : ''}`} />
        </button>
        <div
          className="grid transition-all duration-500 ease-in-out"
          style={{ gridTemplateRows: brandsOpen ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <div className="px-6 pb-6 border-t border-gray-100 pt-4">
              <BrandManager />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

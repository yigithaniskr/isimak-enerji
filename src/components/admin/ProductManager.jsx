import { useState, useMemo } from 'react'
import { FaPlus, FaEdit, FaTrash, FaEye, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import { useCategories } from '../../hooks/useCategories'
import { useBrands } from '../../hooks/useBrands'
import ProductForm from './ProductForm'
import ConfirmModal from '../ui/ConfirmModal'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import SearchableSelect from '../ui/SearchableSelect'
import toast from 'react-hot-toast'

export default function ProductManager() {
  const { products, loading, deleteProduct, deleteImage, updateProduct } = useProducts()
  const { categories } = useCategories()
  const { brands } = useBrands()
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [filterCategory, setFilterCategory] = useState('')
  const [filterBrand, setFilterBrand] = useState('')

  const featuredCount = products.filter(p => p.featured).length

  const filtered = useMemo(() => {
    let result = products
    if (filterCategory) result = result.filter(p => p.categoryId === filterCategory)
    if (filterBrand) result = result.filter(p => p.brand === filterBrand)
    return result
  }, [products, filterCategory, filterBrand])

  const { visibleItems, hasMore, loaderRef } = useInfiniteScroll(filtered, 20)

  const getCategoryName = (id) => {
    return categories.find(c => c.id === id)?.name || '-'
  }

  const toggleFeatured = async (product) => {
    if (!product.featured && featuredCount >= 6) {
      toast.error('En fazla 6 ürün öne çıkarılabilir')
      return
    }
    await updateProduct(product.id, { featured: !product.featured })
    toast.success(product.featured ? 'Öne çıkarma kaldırıldı' : 'Ürün öne çıkarıldı')
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      if (deleteTarget.images) {
        for (const img of deleteTarget.images) {
          await deleteImage(img.path)
        }
      }
      await deleteProduct(deleteTarget.id)
      toast.success('Ürün silindi')
    } catch (err) {
      toast.error('Silinemedi')
    }
    setDeleting(false)
    setDeleteTarget(null)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  if (loading) return <div className="text-center py-10 text-gray-500">Yükleniyor...</div>

  if (showForm) {
    return (
      <ProductForm
        product={editingProduct}
        onClose={handleFormClose}
      />
    )
  }

  return (
    <div className="space-y-6">
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Ürünü Sil"
        message={`"${deleteTarget?.name}" ürününü silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-dark">Ürünler ({filtered.length}/{products.length})</h2>
          <p className="text-sm text-gray-400">Öne çıkan: {featuredCount}/6</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-4 py-2.5 rounded-xl font-medium transition-all"
        >
          <FaPlus /> Yeni Ürün
        </button>
      </div>

      {/* Filtreler */}
      {products.length > 0 && (
        <div className="flex flex-wrap gap-3 items-center">
          <div className="w-48">
            <SearchableSelect
              options={[
                { value: '', label: 'Tüm Kategoriler' },
                ...categories.map(c => ({ value: c.id, label: c.name }))
              ]}
              value={filterCategory}
              onChange={(val) => setFilterCategory(val)}
              placeholder="Kategori Seç"
            />
          </div>
          <div className="w-48">
            <SearchableSelect
              options={[
                { value: '', label: 'Tüm Markalar' },
                ...brands.map(b => ({ value: b.name, label: b.name }))
              ]}
              value={filterBrand}
              onChange={(val) => setFilterBrand(val)}
              placeholder="Marka Seç"
            />
          </div>
          {(filterCategory || filterBrand) && (
            <button
              onClick={() => { setFilterCategory(''); setFilterBrand('') }}
              className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              Filtreleri Temizle
            </button>
          )}
        </div>
      )}

      {products.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center">
          <p className="text-gray-400">Henüz ürün eklenmemiş.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Görsel</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600">Ürün Adı</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600 hidden md:table-cell">Marka</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600 hidden md:table-cell">Kategori</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600 hidden sm:table-cell">Fiyat</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {visibleItems.map((product) => (
                  <tr key={product.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-white border border-gray-100">
                        {product.images?.[0] ? (
                          <img src={product.images[0].url} alt="" className="w-full h-full object-contain p-1" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">
                            📦
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-dark">{product.name}</div>
                      {product.model && <div className="text-xs text-gray-400">{product.model}</div>}
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{product.brand || '-'}</td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{getCategoryName(product.categoryId)}</td>
                    <td className="px-4 py-3 font-medium text-primary hidden sm:table-cell">
                      {product.price ? `${Number(product.price).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} TL` : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 justify-end">
                        <button
                          onClick={() => toggleFeatured(product)}
                          className={`p-2 rounded-lg transition-all ${
                            product.featured
                              ? 'text-amber-400 hover:text-amber-500 bg-amber-50'
                              : 'text-gray-400 hover:text-amber-400 hover:bg-amber-50'
                          }`}
                          title={product.featured ? 'Öne çıkarmayı kaldır' : 'Öne çıkar'}
                        >
                          <FaStar />
                        </button>
                        <Link
                          to={`/urun/${product.id}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-all"
                          title="Görüntüle"
                        >
                          <FaEye />
                        </Link>
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                          title="Düzenle"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(product)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="Sil"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-6">
          <p className="text-sm text-gray-400">Daha fazla yükleniyor...</p>
        </div>
      )}
    </div>
  )
}

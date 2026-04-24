import { useState } from 'react'
import { FaSave, FaTimes, FaTrash, FaCloudUploadAlt } from 'react-icons/fa'
import { useProducts } from '../../hooks/useProducts'
import { useCategories } from '../../hooks/useCategories'
import { useBrands } from '../../hooks/useBrands'
import SearchableSelect from '../ui/SearchableSelect'
import toast from 'react-hot-toast'

export default function ProductForm({ product, onClose }) {
  const { addProduct, updateProduct, uploadImage, deleteImage } = useProducts()
  const { categories } = useCategories()
  const { brands } = useBrands()
  const isEditing = !!product

  const [form, setForm] = useState({
    brand: product?.brand || '',
    model: product?.model || '',
    categoryId: product?.categoryId || '',
    price: product?.price || '',
    description: product?.description || '',
  })
  const [images, setImages] = useState(product?.images || [])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})
  const [dragging, setDragging] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null })
    }
  }

  const processFiles = async (files) => {
    if (files.length === 0) return
    if (errors.images) setErrors({ ...errors, images: null })

    setUploading(true)
    try {
      const uploaded = []
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} dosyası 5MB sınırını aşıyor`)
          continue
        }
        const result = await uploadImage(file)
        uploaded.push(result)
      }
      if (uploaded.length > 0) {
        setImages([...images, ...uploaded])
        toast.success(`${uploaded.length} görsel yüklendi`)
      }
    } catch (err) {
      toast.error('Görsel yüklenemedi')
    }
    setUploading(false)
  }

  const handleImageUpload = async (e) => {
    await processFiles(Array.from(e.target.files))
    e.target.value = ''
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    setDragging(false)
    await processFiles(Array.from(e.dataTransfer.files))
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragging(false)
  }

  const removeImage = async (index) => {
    const img = images[index]
    await deleteImage(img.path)
    setImages(images.filter((_, i) => i !== index))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.brand) newErrors.brand = 'Lütfen marka seçiniz'
    if (!form.model.trim()) newErrors.model = 'Lütfen model giriniz'
    if (!form.categoryId) newErrors.categoryId = 'Lütfen kategori seçiniz'
    if (!form.price) newErrors.price = 'Lütfen fiyat giriniz'
    if (images.length === 0) newErrors.images = 'Lütfen en az bir görsel yükleyiniz'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSaving(true)
    try {
      const data = {
        ...form,
        name: `${form.brand} ${form.model}`,
        price: Number(form.price),
        images,
      }

      if (isEditing) {
        await updateProduct(product.id, data)
        toast.success('Ürün güncellendi')
      } else {
        await addProduct(data)
        toast.success('Ürün eklendi')
      }
      onClose()
    } catch (err) {
      toast.error('Bir hata oluştu')
    }
    setSaving(false)
  }

  const inputClass = (field) =>
    `w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
      errors[field]
        ? 'border-red-400 focus:ring-red-200 focus:border-red-400 bg-red-50/50'
        : 'border-gray-200 focus:ring-primary/20 focus:border-primary'
    }`

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-dark">
          {isEditing ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
        </h2>
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FaTimes /> Kapat
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Basic Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-dark">Temel Bilgiler</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marka *</label>
              <SearchableSelect
                options={brands.map(b => ({ value: b.name, label: b.name }))}
                value={form.brand}
                onChange={(val) => { setForm({ ...form, brand: val }); if (errors.brand) setErrors({ ...errors, brand: null }) }}
                placeholder="Marka Seç"
                error={errors.brand}
              />
              {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
              <input
                type="text"
                name="model"
                value={form.model}
                onChange={handleChange}
                className={inputClass('model')}
                placeholder="Örn: Confeo Premix 24 HM"
              />
              {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori *</label>
              <SearchableSelect
                options={categories.map(c => ({ value: c.id, label: c.name }))}
                value={form.categoryId}
                onChange={(val) => { setForm({ ...form, categoryId: val }); if (errors.categoryId) setErrors({ ...errors, categoryId: null }) }}
                placeholder="Kategori Seç"
                error={errors.categoryId}
              />
              {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (TL) *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={inputClass('price')}
                placeholder="Örn: 25000"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              placeholder="Ürün açıklaması (opsiyonel)"
            />
          </div>
        </div>

        {/* Images */}
        <div className={`bg-white rounded-xl p-6 shadow-sm space-y-4 ${errors.images ? 'ring-2 ring-red-300' : ''}`}>
          <h3 className="font-bold text-dark">Görseller *</h3>

          {/* Yüklenen görseller */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {images.map((img, i) => (
                <div key={i} className="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-gray-200 group bg-white">
                  <img src={img.url} alt="" className="w-full h-full object-contain p-1" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute inset-0 bg-red-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash className="text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Drag & Drop alanı */}
          <label
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`block w-full py-10 rounded-xl border-2 border-dashed cursor-pointer transition-all text-center ${
              uploading ? 'opacity-50 pointer-events-none' : ''
            } ${
              dragging
                ? 'border-primary bg-primary/10 scale-[1.02]'
                : errors.images
                  ? 'border-red-400 bg-red-50/50 hover:border-red-500'
                  : 'border-gray-300 hover:border-primary hover:bg-primary/5'
            }`}
          >
            <FaCloudUploadAlt className={`text-4xl mx-auto mb-3 ${dragging ? 'text-primary' : errors.images ? 'text-red-400' : 'text-gray-300'}`} />
            {uploading ? (
              <p className="text-gray-500 font-medium">Yükleniyor...</p>
            ) : dragging ? (
              <p className="text-primary font-medium">Bırakın, yükleniyor...</p>
            ) : (
              <>
                <p className={`font-medium ${errors.images ? 'text-red-500' : 'text-gray-600'}`}>
                  Görselleri buraya sürükleyin
                </p>
                <p className="text-gray-400 text-sm mt-1">veya tıklayarak seçin</p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {errors.images ? (
            <p className="text-red-500 text-xs">{errors.images}</p>
          ) : (
            <p className="text-xs text-gray-400">Maks. 5MB / görsel. Birden fazla görsel yükleyebilirsiniz.</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50"
          >
            <FaSave /> {saving ? 'Kaydediliyor...' : isEditing ? 'Güncelle' : 'Kaydet'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3 rounded-xl font-medium transition-all"
          >
            <FaTimes /> İptal
          </button>
        </div>
      </form>
    </div>
  )
}

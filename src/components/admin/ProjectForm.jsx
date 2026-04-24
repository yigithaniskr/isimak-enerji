import { useState } from 'react'
import { FaSave, FaTimes, FaTrash, FaCloudUploadAlt } from 'react-icons/fa'
import { useProjects } from '../../hooks/useProjects'
import toast from 'react-hot-toast'

export default function ProjectForm({ project, onClose }) {
  const { addProject, updateProject, uploadImage, deleteImage } = useProjects()
  const isEditing = !!project

  const [name, setName] = useState(project?.name || '')
  const [description, setDescription] = useState(project?.description || '')
  const [images, setImages] = useState(project?.images || [])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [errors, setErrors] = useState({})

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

  const removeImage = async (index) => {
    const img = images[index]
    await deleteImage(img.publicId)
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!name.trim()) newErrors.name = 'Lütfen proje adı giriniz'
    if (images.length === 0) newErrors.images = 'Lütfen en az bir görsel yükleyiniz'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setSaving(true)
    try {
      const data = { name: name.trim(), description: description.trim(), images }
      if (isEditing) {
        await updateProject(project.id, data)
        toast.success('Proje güncellendi')
      } else {
        await addProject(data)
        toast.success('Proje eklendi')
      }
      onClose()
    } catch (err) {
      toast.error('Bir hata oluştu')
    }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-dark">
          {isEditing ? 'Proje Düzenle' : 'Yeni Proje Ekle'}
        </h2>
        <button onClick={onClose} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors">
          <FaTimes /> Kapat
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-dark">Proje Bilgileri</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Proje Adı *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: null }) }}
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                errors.name ? 'border-red-400 bg-red-50/50 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'
              }`}
              placeholder="Örn: Fulya Balçık Camii Isıtma Sistemi"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              placeholder="Proje açıklaması (opsiyonel)"
            />
          </div>
        </div>

        <div className={`bg-white rounded-xl p-6 shadow-sm space-y-4 ${errors.images ? 'ring-2 ring-red-300' : ''}`}>
          <h3 className="font-bold text-dark">Proje Görselleri *</h3>

          {images.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {images.map((img, i) => (
                <div key={i} className="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-gray-200 group bg-white">
                  <img src={img.url} alt="" className="w-full h-full object-contain p-1 bg-gray-50" />
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

          <label
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={(e) => { e.preventDefault(); setDragging(false) }}
            className={`block w-full py-10 rounded-xl border-2 border-dashed cursor-pointer transition-all text-center ${
              uploading ? 'opacity-50 pointer-events-none' : ''
            } ${
              dragging ? 'border-primary bg-primary/10 scale-[1.02]'
                : errors.images ? 'border-red-400 bg-red-50/50'
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
                <p className={`font-medium ${errors.images ? 'text-red-500' : 'text-gray-600'}`}>Görselleri buraya sürükleyin</p>
                <p className="text-gray-400 text-sm mt-1">veya tıklayarak seçin</p>
              </>
            )}
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
          </label>
          {errors.images && <p className="text-red-500 text-xs">{errors.images}</p>}
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50">
            <FaSave /> {saving ? 'Kaydediliyor...' : isEditing ? 'Güncelle' : 'Kaydet'}
          </button>
          <button type="button" onClick={onClose} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3 rounded-xl font-medium transition-all">
            <FaTimes /> İptal
          </button>
        </div>
      </form>
    </div>
  )
}

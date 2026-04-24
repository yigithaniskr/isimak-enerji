import { useState } from 'react'
import { FaPlus, FaEdit, FaTrash, FaSave } from 'react-icons/fa'
import { useBrands } from '../../hooks/useBrands'
import ConfirmModal from '../ui/ConfirmModal'
import FormModal from '../ui/FormModal'
import toast from 'react-hot-toast'

export default function BrandManager() {
  const { brands, loading, addBrand, updateBrand, deleteBrand } = useBrands()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [name, setName] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const resetForm = () => {
    setName('')
    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setSaving(true)
    const formatted = name.trim().charAt(0).toUpperCase() + name.trim().slice(1)
    try {
      if (editingId) {
        await updateBrand(editingId, { name: formatted })
        toast.success('Marka güncellendi')
      } else {
        await addBrand({ name: formatted })
        toast.success('Marka eklendi')
      }
      resetForm()
    } catch (err) {
      toast.error('Bir hata oluştu')
    }
    setSaving(false)
  }

  const handleEdit = (brand) => {
    setName(brand.name)
    setEditingId(brand.id)
    setShowForm(true)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteBrand(deleteTarget.id)
      toast.success('Marka silindi')
    } catch (err) {
      toast.error('Silinemedi')
    }
    setDeleting(false)
    setDeleteTarget(null)
  }

  if (loading) return <div className="text-center py-10 text-gray-500">Yükleniyor...</div>

  return (
    <div className="space-y-6">
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Markayı Sil"
        message={`"${deleteTarget?.name}" markasını silmek istediğinize emin misiniz?`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />

      <FormModal
        isOpen={showForm}
        title={editingId ? 'Marka Düzenle' : 'Yeni Marka'}
        onClose={resetForm}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marka Adı *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Örn: Buderus"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white px-5 py-3 rounded-xl font-medium transition-all disabled:opacity-50"
          >
            <FaSave /> {saving ? (editingId ? 'Güncelleniyor...' : 'Ekleniyor...') : (editingId ? 'Güncelle' : 'Kaydet')}
          </button>
        </form>
      </FormModal>

      <div className="flex justify-end">
        <button
          onClick={() => { setEditingId(null); setName(''); setShowForm(true) }}
          className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-4 py-2.5 rounded-xl font-medium transition-all"
        >
          <FaPlus /> Yeni Marka
        </button>
      </div>

      {brands.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center">
          <p className="text-gray-400">Henüz marka eklenmemiş.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {brands.map((brand, i) => (
            <div
              key={brand.id}
              className={`flex items-center justify-between p-4 ${
                i < brands.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <h3 className="font-semibold text-dark">{brand.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(brand)}
                  className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => setDeleteTarget(brand)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { FaPlus, FaEdit, FaTrash, FaImages } from 'react-icons/fa'
import { useProjects } from '../../hooks/useProjects'
import ProjectForm from './ProjectForm'
import ConfirmModal from '../ui/ConfirmModal'
import toast from 'react-hot-toast'

export default function ProjectManager() {
  const { projects, loading, deleteProject } = useProjects()
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const handleEdit = (project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteProject(deleteTarget.id)
      toast.success('Proje silindi')
    } catch (err) {
      toast.error('Silinemedi')
    }
    setDeleting(false)
    setDeleteTarget(null)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProject(null)
  }

  if (loading) return <div className="text-center py-10 text-gray-500">Yükleniyor...</div>

  if (showForm) {
    return <ProjectForm project={editingProject} onClose={handleFormClose} />
  }

  return (
    <div className="space-y-6">
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Projeyi Sil"
        message={`"${deleteTarget?.name}" projesini silmek istediğinize emin misiniz?`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-dark">Projeler ({projects.length})</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-4 py-2.5 rounded-xl font-medium transition-all"
        >
          <FaPlus /> Yeni Proje
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center">
          <p className="text-gray-400">Henüz proje eklenmemiş.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                {project.images?.[0] ? (
                  <img src={project.images[0].url} alt={project.name} className="w-full h-full object-contain p-2 bg-gray-50" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
                    <FaImages />
                  </div>
                )}
                {project.images?.length > 1 && (
                  <span className="absolute top-2 right-2 bg-dark/70 text-white text-xs px-2 py-1 rounded-lg">
                    {project.images.length} fotoğraf
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-dark mb-1">{project.name}</h3>
                {project.description && (
                  <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
                )}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 flex items-center justify-center gap-1 text-sm py-2 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                  >
                    <FaEdit /> Düzenle
                  </button>
                  <button
                    onClick={() => setDeleteTarget(project)}
                    className="flex-1 flex items-center justify-center gap-1 text-sm py-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <FaTrash /> Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase/config'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false)
      return
    }
    try {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setProjects(items)
        setLoading(false)
      }, () => {
        setLoading(false)
      })
      return unsubscribe
    } catch {
      setLoading(false)
    }
  }, [])

  const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('folder', 'isimak-projects')

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error?.message || 'Upload failed')
    return { url: data.secure_url, publicId: data.public_id }
  }

  const deleteImage = async () => {}

  const addProject = async (data) => {
    return addDoc(collection(db, 'projects'), {
      ...data,
      createdAt: serverTimestamp(),
    })
  }

  const updateProject = async (id, data) => {
    return updateDoc(doc(db, 'projects', id), data)
  }

  const deleteProject = async (id) => {
    return deleteDoc(doc(db, 'projects', id))
  }

  return { projects, loading, addProject, updateProject, deleteProject, uploadImage, deleteImage }
}

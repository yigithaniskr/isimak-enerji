import { useData } from '../context/DataContext'
import { addDoc, updateDoc, deleteDoc, doc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export function useProducts() {
  const { products, loading } = useData()

  const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('folder', 'isimak-products')

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error?.message || 'Upload failed')
    return { url: data.secure_url, publicId: data.public_id }
  }

  const deleteImage = async () => {}

  const addProduct = async (data) => {
    return addDoc(collection(db, 'products'), { ...data, createdAt: serverTimestamp() })
  }

  const updateProduct = async (id, data) => {
    return updateDoc(doc(db, 'products', id), data)
  }

  const deleteProduct = async (id) => {
    return deleteDoc(doc(db, 'products', id))
  }

  return { products, loading, addProduct, updateProduct, deleteProduct, uploadImage, deleteImage }
}

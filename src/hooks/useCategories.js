import { useData } from '../context/DataContext'
import { addDoc, updateDoc, deleteDoc, doc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

export function useCategories() {
  const { categories, loading } = useData()

  const addCategory = async (data) => {
    return addDoc(collection(db, 'categories'), { ...data, order: categories.length, createdAt: serverTimestamp() })
  }

  const updateCategory = async (id, data) => {
    return updateDoc(doc(db, 'categories', id), data)
  }

  const deleteCategory = async (id) => {
    return deleteDoc(doc(db, 'categories', id))
  }

  return { categories, loading, addCategory, updateCategory, deleteCategory }
}

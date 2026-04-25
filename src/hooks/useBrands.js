import { useData } from '../context/DataContext'
import { addDoc, updateDoc, deleteDoc, doc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

export function useBrands() {
  const { brands, loading } = useData()

  const addBrand = async (data) => {
    return addDoc(collection(db, 'brands'), { ...data, createdAt: serverTimestamp() })
  }

  const updateBrand = async (id, data) => {
    return updateDoc(doc(db, 'brands', id), data)
  }

  const deleteBrand = async (id) => {
    return deleteDoc(doc(db, 'brands', id))
  }

  return { brands, loading, addBrand, updateBrand, deleteBrand }
}

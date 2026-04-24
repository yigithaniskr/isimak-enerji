import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase/config'

export function useBrands() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false)
      return
    }
    try {
      const q = query(collection(db, 'brands'), orderBy('name', 'asc'))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setBrands(items)
        setLoading(false)
      }, () => {
        setLoading(false)
      })
      return unsubscribe
    } catch {
      setLoading(false)
    }
  }, [])

  const addBrand = async (data) => {
    return addDoc(collection(db, 'brands'), {
      ...data,
      createdAt: serverTimestamp(),
    })
  }

  const updateBrand = async (id, data) => {
    return updateDoc(doc(db, 'brands', id), data)
  }

  const deleteBrand = async (id) => {
    return deleteDoc(doc(db, 'brands', id))
  }

  return { brands, loading, addBrand, updateBrand, deleteBrand }
}

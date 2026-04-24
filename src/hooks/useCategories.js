import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase/config'

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false)
      return
    }
    try {
      const q = query(collection(db, 'categories'), orderBy('order', 'asc'))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setCategories(cats)
        setLoading(false)
      }, () => {
        setLoading(false)
      })
      return unsubscribe
    } catch {
      setLoading(false)
    }
  }, [])

  const addCategory = async (data) => {
    return addDoc(collection(db, 'categories'), {
      ...data,
      order: categories.length,
      createdAt: serverTimestamp(),
    })
  }

  const updateCategory = async (id, data) => {
    return updateDoc(doc(db, 'categories', id), data)
  }

  const deleteCategory = async (id) => {
    return deleteDoc(doc(db, 'categories', id))
  }

  return { categories, loading, addCategory, updateCategory, deleteCategory }
}

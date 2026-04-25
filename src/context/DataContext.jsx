import { createContext, useContext, useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { doc } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase/config'

const DataContext = createContext()

export function useData() {
  return useContext(DataContext)
}

export function DataProvider({ children }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [projects, setProjects] = useState([])
  const [settings, setSettings] = useState({ whatsappNumber: '905348821572' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false)
      return
    }

    let loaded = 0
    const checkDone = () => { loaded++; if (loaded >= 5) setLoading(false) }

    const unsubs = []

    try {
      unsubs.push(onSnapshot(
        query(collection(db, 'products'), orderBy('createdAt', 'desc')),
        (snap) => { setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() }))); checkDone() },
        () => checkDone()
      ))

      unsubs.push(onSnapshot(
        query(collection(db, 'categories'), orderBy('order', 'asc')),
        (snap) => { setCategories(snap.docs.map(d => ({ id: d.id, ...d.data() }))); checkDone() },
        () => checkDone()
      ))

      unsubs.push(onSnapshot(
        query(collection(db, 'brands'), orderBy('name', 'asc')),
        (snap) => { setBrands(snap.docs.map(d => ({ id: d.id, ...d.data() }))); checkDone() },
        () => checkDone()
      ))

      unsubs.push(onSnapshot(
        query(collection(db, 'projects'), orderBy('createdAt', 'desc')),
        (snap) => { setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() }))); checkDone() },
        () => checkDone()
      ))

      unsubs.push(onSnapshot(
        doc(db, 'settings', 'general'),
        (snap) => { if (snap.exists()) setSettings(prev => ({ ...prev, ...snap.data() })); checkDone() },
        () => checkDone()
      ))
    } catch {
      setLoading(false)
    }

    return () => unsubs.forEach(u => u())
  }, [])

  return (
    <DataContext.Provider value={{ products, categories, brands, projects, settings, loading }}>
      {children}
    </DataContext.Provider>
  )
}

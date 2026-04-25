import { useData } from '../context/DataContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

export function useSettings() {
  const { settings, loading } = useData()

  const updateSettings = async (data) => {
    return setDoc(doc(db, 'settings', 'general'), data, { merge: true })
  }

  return { settings, loading, updateSettings }
}

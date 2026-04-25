import { useState, useEffect } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase/config'

const DEFAULT_SETTINGS = {
  whatsappNumber: '905348821572',
}

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false)
      return
    }
    try {
      const unsubscribe = onSnapshot(doc(db, 'settings', 'general'), (snap) => {
        if (snap.exists()) {
          setSettings({ ...DEFAULT_SETTINGS, ...snap.data() })
        }
        setLoading(false)
      }, () => {
        setLoading(false)
      })
      return unsubscribe
    } catch {
      setLoading(false)
    }
  }, [])

  const updateSettings = async (data) => {
    return setDoc(doc(db, 'settings', 'general'), data, { merge: true })
  }

  return { settings, loading, updateSettings }
}

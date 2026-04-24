import { motion, AnimatePresence } from 'framer-motion'
import { FaExclamationTriangle } from 'react-icons/fa'

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, loading }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={!loading ? onCancel : undefined} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
          >
            {loading ? (
              <div className="py-4">
                <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Siliniyor...</p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <FaExclamationTriangle className="text-red-500 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-2">{title}</h3>
                <p className="text-gray-500 mb-8">{message}</p>
                <div className="flex gap-3">
                  <button
                    onClick={onCancel}
                    className="flex-1 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all"
                  >
                    Vazgeç
                  </button>
                  <button
                    onClick={onConfirm}
                    className="flex-1 px-5 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-all"
                  >
                    Sil
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

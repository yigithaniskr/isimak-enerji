import { useState, useRef, useEffect } from 'react'
import { FaChevronDown } from 'react-icons/fa'

export default function SearchableSelect({ options, value, onChange, placeholder, error }) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef(null)
  const inputRef = useRef(null)

  const selectedLabel = options.find(o => o.value === value)?.label || ''

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleOpen = () => {
    setIsOpen(true)
    setSearch('')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleSelect = (val) => {
    onChange(val)
    setIsOpen(false)
    setSearch('')
  }

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={handleOpen}
        className={`w-full px-4 py-2.5 border rounded-xl text-left flex items-center justify-between transition-all ${
          error
            ? 'border-red-400 bg-red-50/50 focus:ring-red-200'
            : isOpen
              ? 'border-primary ring-2 ring-primary/20'
              : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <span className={value ? 'text-dark' : 'text-gray-400'}>
          {selectedLabel || placeholder}
        </span>
        <FaChevronDown className={`text-xs text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-gray-100">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ara..."
              className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:bg-gray-100 transition-colors"
            />
          </div>

          {/* Options */}
          <div className="max-h-48 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-sm text-gray-400 text-center">Sonuç bulunamadı</p>
            ) : (
              filtered.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                    option.value === value
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

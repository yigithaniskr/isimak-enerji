import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '../components/ui/AnimatedSection'
import WhatsAppButton from '../components/ui/WhatsAppButton'
import Loading from '../components/ui/Loading'
import { useProducts } from '../hooks/useProducts'
import { useCategories } from '../hooks/useCategories'
import { useBrands } from '../hooks/useBrands'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import SearchableSelect from '../components/ui/SearchableSelect'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('kategori') || ''
  const [activeBrand, setActiveBrand] = useState('')
  const [search, setSearch] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const { products, loading: productsLoading } = useProducts()
  const { categories, loading: categoriesLoading } = useCategories()
  const { brands } = useBrands()

  const availableBrands = useMemo(() => {
    let pool = products
    if (activeCategory) {
      pool = pool.filter(p => p.categoryId === activeCategory)
    }
    const brandNames = [...new Set(pool.map(p => p.brand).filter(Boolean))]
    return brands.filter(b => brandNames.includes(b.name))
  }, [products, brands, activeCategory])

  const filtered = useMemo(() => {
    let result = products
    if (activeCategory) {
      result = result.filter(p => p.categoryId === activeCategory)
    }
    if (activeBrand) {
      result = result.filter(p => p.brand === activeBrand)
    }
    if (minPrice) {
      result = result.filter(p => p.price && Number(p.price) >= Number(minPrice))
    }
    if (maxPrice) {
      result = result.filter(p => p.price && Number(p.price) <= Number(maxPrice))
    }
    if (search) {
      const s = search.toLowerCase()
      result = result.filter(p =>
        p.name?.toLowerCase().includes(s) ||
        p.brand?.toLowerCase().includes(s) ||
        p.model?.toLowerCase().includes(s)
      )
    }
    return result
  }, [products, activeCategory, activeBrand, minPrice, maxPrice, search])

  const { visibleItems, hasMore, loaderRef } = useInfiniteScroll(filtered, 20)

  const setCategory = (catId) => {
    setActiveBrand('')
    if (catId) {
      setSearchParams({ kategori: catId })
    } else {
      setSearchParams({})
    }
  }

  if (productsLoading || categoriesLoading) return <Loading />

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,89,167,0.4) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Ürünlerimiz</h1>
            <p className="text-gray-400 max-w-2xl">
              Isıtma, soğutma ve tesisat alanında geniş ürün yelpazemizi keşfedin.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            {/* Category dropdown */}
            <div className="w-full md:w-52">
              <SearchableSelect
                options={[
                  { value: '', label: 'Tüm Kategoriler' },
                  ...categories.map(c => ({ value: c.id, label: c.name }))
                ]}
                value={activeCategory}
                onChange={(val) => setCategory(val)}
                placeholder="Kategori Seç"
              />
            </div>

            {/* Brand dropdown */}
            <div className="w-full md:w-52">
              <SearchableSelect
                options={[
                  { value: '', label: 'Tüm Markalar' },
                  ...availableBrands.map(b => ({ value: b.name, label: b.name }))
                ]}
                value={activeBrand}
                onChange={(val) => setActiveBrand(val)}
                placeholder="Marka Seç"
              />
            </div>

            {/* Price range */}
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="Min TL"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-24 md:w-28 text-sm"
              />
              <span className="text-gray-400 text-sm">-</span>
              <input
                type="number"
                placeholder="Max TL"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-24 md:w-28 text-sm"
              />
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Ürün ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-full md:w-64"
            />
          </div>

          {/* Products grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">📦</p>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Ürün Bulunamadı</h3>
              <p className="text-gray-500">
                {search ? 'Arama kriterlerinize uygun ürün bulunamadı.' : 'Bu kategoride henüz ürün bulunmuyor.'}
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-4">{filtered.length} ürün bulundu</p>
              <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {visibleItems.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group h-full flex flex-col"
                    >
                      <Link to={`/urun/${product.id}`} className="block">
                        <div className="relative overflow-hidden aspect-[4/3] bg-white">
                          {product.images?.[0] ? (
                            <img
                              src={product.images[0].url}
                              alt={product.name}
                              className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <span className="text-5xl">📦</span>
                            </div>
                          )}
                          {product.brand && (
                            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 px-3 py-1 rounded-full">
                              {product.brand}
                            </span>
                          )}
                        </div>
                      </Link>
                      <div className="p-4 flex flex-col flex-1">
                        <Link to={`/urun/${product.id}`}>
                          <h3 className="font-bold text-dark group-hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">{product.model || '\u00A0'}</p>
                        <p className="text-primary font-bold text-lg mt-2">
                          {product.price ? `${Number(product.price).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} TL` : '\u00A0'}
                        </p>
                        <div className="mt-auto pt-3">
                          <WhatsAppButton productName={product.name} className="w-full justify-center text-sm px-4 py-2" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Infinite scroll loader */}
              {hasMore && (
                <div ref={loaderRef} className="flex justify-center py-10">
                  <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 bg-primary rounded-full"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}

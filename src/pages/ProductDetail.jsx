import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaArrowLeft } from 'react-icons/fa'
import { db } from '../firebase/config'
import WhatsAppButton from '../components/ui/WhatsAppButton'
import Loading from '../components/ui/Loading'
import AnimatedSection from '../components/ui/AnimatedSection'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'products', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() }
        setProduct(data)
        if (data.categoryId) {
          const catDoc = await getDoc(doc(db, 'categories', data.categoryId))
          if (catDoc.exists()) setCategory({ id: catDoc.id, ...catDoc.data() })
        }
      }
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  if (loading) return <Loading />
  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🔍</p>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Ürün Bulunamadı</h2>
          <Link to="/urunler" className="text-primary font-medium hover:underline">
            Ürünlere Dön
          </Link>
        </div>
      </div>
    )
  }

  const images = product.images || []
  const specs = product.specs || []

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length)

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary transition-colors">Ana Sayfa</Link>
            <span className="text-gray-300">/</span>
            <Link to="/urunler" className="text-gray-500 hover:text-primary transition-colors">Ürünler</Link>
            {category && (
              <>
                <span className="text-gray-300">/</span>
                <Link to={`/urunler?kategori=${category.id}`} className="text-gray-500 hover:text-primary transition-colors">
                  {category.name}
                </Link>
              </>
            )}
            <span className="text-gray-300">/</span>
            <span className="text-gray-700 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/urunler" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8 group">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Ürünlere Dön
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <AnimatedSection direction="left">
              <div className="space-y-4">
                {/* Main image */}
                <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                  {images.length > 0 ? (
                    <>
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeImage}
                          src={images[activeImage].url}
                          alt={product.name}
                          className="w-full h-full object-contain p-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </AnimatePresence>
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                          >
                            <FaChevronLeft />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                          >
                            <FaChevronRight />
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <span className="text-8xl">📦</span>
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                          i === activeImage ? 'border-primary shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Product Info */}
            <AnimatedSection direction="right">
              <div className="space-y-6">
                {product.brand && (
                  <span className="inline-block bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full">
                    {product.brand}
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-dark">{product.name}</h1>
                {product.model && (
                  <p className="text-gray-500 text-lg">Model: {product.model}</p>
                )}

                {product.price && (
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <p className="text-sm text-gray-500 mb-1">Fiyat</p>
                    <p className="text-primary font-bold text-3xl">
                      {Number(product.price).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} TL
                    </p>
                  </div>
                )}

                {product.description && (
                  <div>
                    <h3 className="font-bold text-dark text-lg mb-2">Ürün Açıklaması</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line break-words overflow-hidden">{product.description}</p>
                  </div>
                )}

                <WhatsAppButton productName={product.name} className="w-full justify-center text-lg py-4" />
              </div>
            </AnimatedSection>
          </div>

          {/* Technical Specs */}
          {specs.length > 0 && (
            <AnimatedSection className="mt-16">
              <h2 className="text-2xl font-bold text-dark mb-6">Teknik Özellikler</h2>
              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {specs.map((spec, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 font-medium text-dark w-1/3">{spec.key}</td>
                        <td className="px-6 py-4 text-gray-600">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  )
}

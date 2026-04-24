import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import AnimatedSection from '../ui/AnimatedSection'
import WhatsAppButton from '../ui/WhatsAppButton'
import { useProducts } from '../../hooks/useProducts'
import Loading from '../ui/Loading'

export default function FeaturedProducts() {
  const { products, loading } = useProducts()
  const featured = products.filter(p => p.featured).slice(0, 6)

  if (loading) return <Loading />
  if (featured.length === 0) return null

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Ürünlerimiz</span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2">
              Öne Çıkan Ürünler
            </h2>
          </div>
          <Link
            to="/urunler"
            className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Tümünü Gör <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <AnimatedSection key={product.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
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
                        <span className="text-6xl">📦</span>
                      </div>
                    )}
                    {product.brand && (
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 px-3 py-1 rounded-full">
                        {product.brand}
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <Link to={`/urun/${product.id}`}>
                    <h3 className="font-bold text-dark text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-400 mb-2 line-clamp-1">{product.model || '\u00A0'}</p>
                  <p className="text-primary font-bold text-xl mb-3">
                    {product.price ? `${Number(product.price).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} TL` : '\u00A0'}
                  </p>
                  <div className="mt-auto">
                    <WhatsAppButton productName={product.name} className="w-full justify-center text-sm px-4 py-2.5" />
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

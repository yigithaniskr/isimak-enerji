import Hero from '../components/home/Hero'
import Services from '../components/home/Services'
import FeaturedProducts from '../components/home/FeaturedProducts'
import Testimonials from '../components/home/Testimonials'
import CTA from '../components/home/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProducts />
      <Testimonials />
      <CTA />
    </>
  )
}

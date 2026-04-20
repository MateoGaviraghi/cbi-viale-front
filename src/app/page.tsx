import { Hero } from '@/components/marketing/Hero'
import { FeaturesBanner } from '@/components/marketing/FeaturesBanner'
import { ServiceGrid } from '@/components/marketing/ServiceGrid'
import { AboutPreview } from '@/components/marketing/AboutPreview'
import { LocationSection } from '@/components/marketing/LocationSection'
import { FinalCTA } from '@/components/marketing/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesBanner />
      <ServiceGrid />
      <AboutPreview />
      <LocationSection />
      <FinalCTA />
    </>
  )
}

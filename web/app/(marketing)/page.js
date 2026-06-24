import Hero from "@/components/landing/Hero"
import Features from "@/components/landing/Features"
import FAQ from "@/components/landing/FAQ"
import Waitlist from "@/components/landing/Waitlist"
import config from "@/config"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <FAQ />
      {config.features.waitlist && <Waitlist />}
    </>
  )
}

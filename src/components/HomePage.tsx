import type React from "react"
import Hero from "../components/Hero"
import Services from "../components/Services"
import About from "../components/About"
import Footer from "../components/Footer"
import Contact from "./ContactPage"
import Header from "./Header"
import Team from "./Team"
import ScrollToTop from "./ScrollToTop"
import { useEffect, useState } from "react"

const Home: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return (
    <div className="font-sans text-gray-800">
    <Header scrolled={scrolled} />
    <main>
      <Hero />
      <Services />
      <About />
      <Team />
      <Contact />
    </main>
    <Footer />
    <ScrollToTop />
  </div>
  )
}

export default Home

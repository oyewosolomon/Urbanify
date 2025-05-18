import type React from "react"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Services from "../components/Services"
import About from "../components/About"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"
import Contact from "./ContactPage"
import SecurityModels3D from "./SecurityModels3D"
import Header from "./Header"
import Projects from "./Projects"
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
      {/* <Projects /> */}
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

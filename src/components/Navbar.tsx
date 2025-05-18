import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

interface NavLinksProps {
  mobile?: boolean
  setIsOpen?: (isOpen: boolean) => void
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-slate-900/90 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-emerald-400"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="font-bold text-xl">CipherNest</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLinks />
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition-colors">
            Get Started
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-800 px-4 py-2"
        >
          <div className="flex flex-col gap-4 py-4">
            <NavLinks mobile setIsOpen={setIsOpen} />
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white w-full py-2 rounded-md transition-colors">
              Get Started
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

const NavLinks: React.FC<NavLinksProps> = ({ mobile = false, setIsOpen = () => {} }) => {
  interface NavLink {
    name: string
    href: string
  }

  const links: NavLink[] = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className={`text-gray-200 hover:text-emerald-400 transition-colors ${
            mobile ? "block py-2 border-b border-slate-700" : ""
          }`}
          onClick={() => mobile && setIsOpen(false)}
        >
          {link.name}
        </a>
      ))}
    </>
  )
}

export default Navbar

"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"

const Hero = () => {
  const cityRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cityRef.current) {
      gsap.to(".city-light", {
        opacity: 0.8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      })
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-teal-900 opacity-90"></div>

      {/* Animated city lights */}
      <div ref={cityRef} className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="city-light absolute rounded-full bg-yellow-300"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5,
            }}
          ></div>
        ))}
      </div>

      {/* Connected dots animation */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.3)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Smart Cities, <br />
            <span className="text-teal-400">Smarter Communities</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We partner with municipalities and local communities to develop smart city initiatives, integrating IoT and
            AI technologies to improve urban living.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="#services"
              className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-center"
            >
              Our Solutions
            </a>
            <a
              href="#contact"
              className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-center"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero

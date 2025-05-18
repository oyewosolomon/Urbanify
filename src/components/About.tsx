"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const About = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const stats = [
    { value: "50+", label: "Cities Transformed" },
    { value: "200+", label: "Projects Completed" },
    { value: "5M+", label: "Lives Improved" },
    { value: "30%", label: "Average Resource Savings" },
  ]

  return (
    <section id="about" className="py-20 bg-teal-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-teal-400">Urbanify</span>
            </h2>
            <div className="w-20 h-1 bg-teal-400 mb-6"></div>
            <p className="text-gray-300 mb-6">
              Founded in 2015, Urban Technologies has been at the forefront of the smart city revolution. We believe
              that technology should serve people and communities, not the other way around.
            </p>
            <p className="text-gray-300 mb-6">
              Our team of engineers, data scientists, urban planners, and community engagement specialists work together
              to create holistic solutions that address real urban challenges.
            </p>
            <p className="text-gray-300 mb-8">
              We partner with municipalities of all sizes, from small towns to major metropolitan areas, to implement
              sustainable, scalable, and people-centered smart city initiatives.
            </p>
            <a
              href="#"
              className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Learn More About Us
            </a>
          </motion.div>

          <div ref={ref}>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-teal-800 p-6 rounded-lg text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="text-4xl font-bold text-teal-400 mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

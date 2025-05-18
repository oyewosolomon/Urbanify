"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const projects = [
    {
      title: "Smart Traffic Management",
      location: "Metropolis City",
      image: "/placeholder.svg?height=400&width=600",
      description: "AI-powered traffic light system that reduced congestion by 35% and commute times by 28%.",
    },
    {
      title: "Public Safety Network",
      location: "Coastal Harbor",
      image: "/placeholder.svg?height=400&width=600",
      description: "Integrated emergency response system with 99.9% uptime and 45% faster response times.",
    },
    {
      title: "Energy Efficient Lighting",
      location: "Green Valley",
      image: "/placeholder.svg?height=400&width=600",
      description:
        "Smart street lighting that reduced energy consumption by 60% while improving visibility and safety.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Our <span className="text-teal-600">Success Stories</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-teal-500 mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          <motion.p
            className="max-w-2xl mx-auto text-gray-600"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Explore our portfolio of successful smart city implementations that have transformed urban environments and
            improved quality of life.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <p className="text-teal-300">{project.location}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">{project.description}</p>
                <a href="#" className="inline-block mt-4 text-teal-600 hover:text-teal-800 font-medium">
                  View Case Study →
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a
            href="#"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300"
          >
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Cpu, Wifi, BarChart3, Lightbulb, Shield, Users, X } from "lucide-react"

const Services = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([])
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const networkRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      icon: <Cpu className="w-full h-full p-4" />,
      title: "IoT Infrastructure",
      description:
        "Comprehensive IoT networks that connect urban infrastructure for real-time monitoring and management.",
      color: "bg-teal-600",
      textColor: "text-teal-600",
      borderColor: "border-teal-600",
      connections: [1, 2, 3], // Connected to Smart Connectivity, Data Analytics, Energy Management
    },
    {
      icon: <Wifi className="w-full h-full p-4" />,
      title: "Smart Connectivity",
      description: "High-speed, reliable connectivity solutions that form the backbone of smart city initiatives.",
      color: "bg-blue-600",
      textColor: "text-blue-600",
      borderColor: "border-blue-600",
      connections: [0, 2, 4], // Connected to IoT Infrastructure, Data Analytics, Public Safety
    },
    {
      icon: <BarChart3 className="w-full h-full p-4" />,
      title: "Data Analytics",
      description: "Advanced analytics platforms that transform urban data into actionable insights for city planners.",
      color: "bg-purple-600",
      textColor: "text-purple-600",
      borderColor: "border-purple-600",
      connections: [0, 1, 4, 5], // Connected to IoT, Smart Connectivity, Public Safety, Community
    },
    {
      icon: <Lightbulb className="w-full h-full p-4" />,
      title: "Energy Management",
      description: "Intelligent systems that optimize energy usage across public infrastructure and residential areas.",
      color: "bg-amber-600",
      textColor: "text-amber-600",
      borderColor: "border-amber-600",
      connections: [0, 5], // Connected to IoT Infrastructure, Community Engagement
    },
    {
      icon: <Shield className="w-full h-full p-4" />,
      title: "Public Safety",
      description: "AI-powered surveillance and emergency response systems that enhance urban security.",
      color: "bg-red-600",
      textColor: "text-red-600",
      borderColor: "border-red-600",
      connections: [1, 2, 5], // Connected to Smart Connectivity, Data Analytics, Community
    },
    {
      icon: <Users className="w-full h-full p-4" />,
      title: "Community Engagement",
      description: "Digital platforms that facilitate citizen participation in urban development and governance.",
      color: "bg-green-600",
      textColor: "text-green-600",
      borderColor: "border-green-600",
      connections: [2, 3, 4], // Connected to Data Analytics, Energy Management, Public Safety
    },
  ]

  // Calculate node positions based on window size
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Initial size
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update positions when window size changes
  useEffect(() => {
    if (windowSize.width === 0 || !networkRef.current) return

    const containerWidth = networkRef.current.clientWidth
    const containerHeight = Math.min(600, windowSize.height * 0.6)

    // For mobile, arrange in a vertical pattern
    if (windowSize.width < 768) {
      const newPositions = services.map((_, index) => {
        return {
          x: containerWidth / 2,
          y: 100 + index * 120,
        }
      })
      setPositions(newPositions)
      return
    }

    // For larger screens, create a network pattern
    const centerX = containerWidth / 2
    const centerY = containerHeight / 2
    const radius = Math.min(centerX, centerY) * 0.7

    // Calculate positions in a circle
    const newPositions = services.map((_, index) => {
      const angle = (index / services.length) * Math.PI * 2
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      }
    })

    setPositions(newPositions)
  }, [windowSize, services.length])

  // Draw connections between nodes
  const renderConnections = () => {
    if (positions.length === 0) return null

    return services.map((service, serviceIndex) => {
      return service.connections.map((connectedIndex) => {
        // Only draw each connection once (avoid duplicates)
        if (serviceIndex < connectedIndex) {
          const start = positions[serviceIndex]
          const end = positions[connectedIndex]

          // Skip if positions aren't calculated yet
          if (!start || !end) return null

          const isHighlighted = selectedService === serviceIndex || selectedService === connectedIndex

          return (
            <motion.line
              key={`${serviceIndex}-${connectedIndex}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke={isHighlighted ? "#0d9488" : "#e2e8f0"}
              strokeWidth={isHighlighted ? 2 : 1}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          )
        }
        return null
      })
    })
  }

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Our Smart City <span className="text-teal-600">Ecosystem</span>
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
            Our interconnected technologies work together to create comprehensive smart city solutions. Explore each
            service to learn how they integrate with one another.
          </motion.p>
        </div>

        <div ref={ref} className="relative">
          {/* Network Visualization */}
          <div ref={networkRef} className="relative h-[600px] md:h-[500px] mb-8">
            <svg className="w-full h-full absolute top-0 left-0">{renderConnections()}</svg>

            {positions.map((position, index) => (
              <motion.div
                key={index}
                className={`absolute cursor-pointer`}
                style={{
                  left: position.x - 40,
                  top: position.y - 40,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelectedService(index)}
              >
                <div
                  className={`w-20 h-20 rounded-full ${
                    selectedService === index ? services[index].color : "bg-white"
                  } ${
                    selectedService === index ? "text-white" : services[index].textColor
                  } shadow-lg flex items-center justify-center border-2 ${services[index].borderColor}`}
                >
                  {services[index].icon}
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <p className="font-medium text-sm">{services[index].title}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Service Detail Panel */}
          <AnimatePresence>
            {selectedService !== null && (
              <motion.div
                className="bg-white rounded-xl shadow-xl p-6 max-w-2xl mx-auto border-l-4 relative"
                style={{
                  borderLeftColor:
                    selectedService !== null
                      ? services[selectedService].color.replace("bg-", "rgb(")
                      : "rgb(13, 148, 136)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                <div className="flex items-start mb-4">
                  <div
                    className={`w-12 h-12 rounded-full ${
                      services[selectedService].color
                    } text-white flex items-center justify-center mr-4 flex-shrink-0`}
                  >
                    {services[selectedService].icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{services[selectedService].title}</h3>
                    <p className="text-gray-600">{services[selectedService].description}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Integrates with:</h4>
                  <div className="flex flex-wrap gap-2">
                    {services[selectedService].connections.map((connectedIndex) => (
                      <button
                        key={connectedIndex}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          services[connectedIndex].borderColor
                        } border text-gray-700 hover:bg-gray-50`}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedService(connectedIndex)
                        }}
                      >
                        {services[connectedIndex].title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-semibold mb-2">Key Benefits:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Enhanced operational efficiency</li>
                    <li>Reduced resource consumption</li>
                    <li>Improved quality of urban life</li>
                    <li>Data-driven decision making</li>
                  </ul>
                </div>

                <div className="mt-6 text-right">
                  <a
                    href="#contact"
                    className={`inline-block px-4 py-2 rounded-lg text-white ${
                      services[selectedService].color
                    } hover:opacity-90 transition-opacity`}
                  >
                    Learn More
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Service List (for smaller screens) */}
          <div className="md:hidden mt-16">
            <h3 className="text-xl font-bold mb-4 text-center">All Services</h3>
            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 flex items-center cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedService(index)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <div
                    className={`w-12 h-12 rounded-full ${service.color} text-white flex items-center justify-center mr-4 flex-shrink-0`}
                  >
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{service.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-1">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a
              href="#contact"
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 inline-flex items-center"
            >
              <span>Discuss Your Smart City Project</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Services

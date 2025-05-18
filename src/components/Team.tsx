"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Linkedin, Twitter, Mail } from "lucide-react"

const Team = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & Founder",
      image: "/assets/team-1.jpg",
      bio: "Former urban planning professor with 15+ years of experience in smart city development.",
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      image: "/assets/team-1.jpg",
      bio: "IoT specialist with background in developing large-scale sensor networks for urban environments.",
    },
    {
      name: "Aisha Patel",
      role: "Head of AI Research",
      image: "/assets/team-1.jpg",
      bio: "AI researcher focused on applying machine learning to solve complex urban challenges.",
    },
    {
      name: "David Kim",
      role: "Community Engagement Director",
      image: "/assets/team-1.jpg",
      bio: "Specializes in creating inclusive technology solutions that serve diverse urban populations.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Meet Our <span className="text-teal-600">Team</span>
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
            Our diverse team of experts combines technical expertise with urban planning knowledge to create innovative
            smart city solutions.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="relative overflow-hidden group">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-80 object-cover object-center"
                />
                <div className="absolute inset-0 bg-teal-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <a href="#" className="text-white hover:text-teal-200 transition-colors">
                      <Linkedin size={24} />
                    </a>
                    <a href="#" className="text-white hover:text-teal-200 transition-colors">
                      <Twitter size={24} />
                    </a>
                    <a href="#" className="text-white hover:text-teal-200 transition-colors">
                      <Mail size={24} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-teal-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Team

"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface Testimonial {
  quote: string
  author: string
  position: string
  image: string
}

const Testimonials: React.FC = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const testimonials: Testimonial[] = [
    {
      quote:
        "CipherNest transformed our security posture. Their comprehensive audit identified critical vulnerabilities we weren't aware of, and their remediation plan was clear and effective.",
      author: "Sarah Johnson",
      position: "CTO, TechVision Inc.",
      image: "https://via.placeholder.com/80",
    },
    {
      quote:
        "Working with CipherNest has been a game-changer for our compliance strategy. They simplified complex regulations and provided a roadmap that was easy to implement and maintain.",
      author: "Michael Chen",
      position: "CISO, FinanceHub",
      image: "https://via.placeholder.com/80",
    },
    {
      quote:
        "The team at CipherNest doesn't just solve problems; they anticipate them. Their proactive approach to security has saved us from potential breaches multiple times.",
      author: "Alex Rodriguez",
      position: "VP of Engineering, DataSphere",
      image: "https://via.placeholder.com/80",
    },
  ]

  const nextTestimonial = (): void => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = (): void => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-slate-800" id="testimonials" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-emerald-400">Clients Say</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Hear from organizations that have strengthened their security posture with our services
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900 p-8 md:p-10 rounded-lg border border-slate-700 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12 text-emerald-400/30 mb-6"
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>

            <p className="text-lg md:text-xl text-gray-200 mb-8 italic">"{testimonials[activeIndex].quote}"</p>

            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img
                  src={testimonials[activeIndex].image || "/placeholder.svg"}
                  alt={testimonials[activeIndex].author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-white">{testimonials[activeIndex].author}</h4>
                <p className="text-gray-400 text-sm">{testimonials[activeIndex].position}</p>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevTestimonial}
              className="rounded-full border border-slate-600 hover:bg-emerald-500/10 hover:border-emerald-500 p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span className="sr-only">Previous testimonial</span>
            </button>

            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === activeIndex ? "bg-emerald-400" : "bg-slate-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="rounded-full border border-slate-600 hover:bg-emerald-500/10 hover:border-emerald-500 p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="sr-only">Next testimonial</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

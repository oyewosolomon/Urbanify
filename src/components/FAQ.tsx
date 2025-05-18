"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronDown, MessageCircle, Clock, Shield, Zap, BarChart, Users } from "lucide-react"

const FAQ = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  // FAQ categories with icons
  const categories = [
    {
      name: "General",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "text-teal-600",
      bgColor: "bg-teal-100",
    },
    {
      name: "Implementation",
      icon: <Clock className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      name: "Security",
      icon: <Shield className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      name: "Technology",
      icon: <Zap className="w-5 h-5" />,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      name: "Data",
      icon: <BarChart className="w-5 h-5" />,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      name: "Community",
      icon: <Users className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ]

  // FAQ questions organized by category
  const faqsByCategory = [
    // General
    [
      {
        question: "What is a smart city?",
        answer:
          "A smart city uses information and communication technologies (ICT) to enhance quality, performance, and interactivity of urban services, reduce costs and resource consumption, and improve contact between citizens and government. Smart cities collect data from citizens, devices, buildings, and assets to monitor and manage traffic and transportation systems, power plants, utilities, water supply networks, waste management, crime detection, information systems, schools, libraries, hospitals, and other community services.",
      },
      {
        question: "How does Urban Technologies approach smart city development?",
        answer:
          "Urban Technologies takes a holistic, people-centered approach to smart city development. We believe technology should serve communities, not the other way around. We work closely with municipalities and local stakeholders to understand specific urban challenges, then develop integrated solutions that address these challenges while creating sustainable, inclusive, and efficient urban environments. Our approach combines cutting-edge IoT infrastructure, data analytics, and community engagement to create truly smart cities.",
      },
      {
        question: "What size cities do you work with?",
        answer:
          "We work with municipalities of all sizes, from small towns to major metropolitan areas. Our solutions are scalable and can be tailored to meet the specific needs and budgets of communities of any size. We believe every community deserves access to smart city technologies that can improve quality of life and operational efficiency.",
      },
    ],
    // Implementation
    [
      {
        question: "How long does it typically take to implement a smart city solution?",
        answer:
          "Implementation timelines vary based on the scope and complexity of the project. Small-scale implementations, such as smart lighting for a specific district, might take 3-6 months. Comprehensive city-wide solutions typically require 12-24 months for full implementation. We use a phased approach, delivering value at each stage rather than waiting for complete deployment before seeing benefits.",
      },
      {
        question: "What is the typical return on investment for smart city initiatives?",
        answer:
          "ROI varies by project type, but our clients typically see returns through efficiency gains, resource savings, and improved service delivery. For example, smart lighting projects often achieve 30-50% energy savings with ROI in 3-5 years. Smart water management can reduce leakage by 20-30%. Beyond direct financial returns, there are significant quality-of-life improvements and environmental benefits that, while harder to quantify, represent substantial value to communities.",
      },
      {
        question: "How do you handle the transition from traditional to smart systems?",
        answer:
          "We design transition plans that minimize disruption to existing services. This typically involves parallel operation during transition periods, comprehensive training for municipal staff, and clear communication with residents. Our solutions can often integrate with existing infrastructure, allowing for gradual modernization rather than wholesale replacement. We provide ongoing support throughout the transition to ensure smooth operations.",
      },
    ],
    // Security
    [
      {
        question: "How do you address privacy concerns in smart city implementations?",
        answer:
          "Privacy is a foundational consideration in all our solutions. We implement privacy-by-design principles, ensuring data collection is purposeful, transparent, and consent-based. We use anonymization and aggregation techniques to protect individual privacy while still enabling valuable insights. All our solutions comply with relevant data protection regulations, and we work with municipalities to develop clear data governance policies that protect citizen privacy.",
      },
      {
        question: "What security measures do you implement to protect smart city infrastructure?",
        answer:
          "We implement multi-layered security approaches including encryption for data in transit and at rest, secure authentication mechanisms, regular security audits, and continuous monitoring for threats. Our systems are designed with segmentation to contain potential breaches, and we maintain incident response plans for rapid mitigation of any security events. We also provide regular security updates and work closely with cybersecurity experts to stay ahead of emerging threats.",
      },
      {
        question: "How do you ensure resilience in smart city systems during emergencies?",
        answer:
          "Resilience is built into our system architecture through redundancy, distributed processing, and fallback mechanisms. Critical systems have offline capabilities to maintain essential functions during connectivity disruptions. We implement robust backup systems and disaster recovery protocols. Additionally, we design emergency response features into our solutions, such as priority communications channels and emergency resource allocation tools that activate during crisis situations.",
      },
    ],
    // Technology
    [
      {
        question: "What technologies do you use in your smart city solutions?",
        answer:
          "We utilize a range of technologies including IoT sensors and devices, advanced networking (5G, LoRaWAN, etc.), cloud and edge computing, artificial intelligence and machine learning, data analytics platforms, digital twins, blockchain for secure transactions, and mobile applications for citizen engagement. The specific technologies deployed depend on the particular challenges and goals of each municipality, as we believe in using the right tools for each unique situation rather than a one-size-fits-all approach.",
      },
      {
        question: "How do you ensure your technology solutions remain future-proof?",
        answer:
          "We design with modularity and interoperability as core principles, using open standards and APIs wherever possible. This allows components to be upgraded or replaced without overhauling entire systems. We build in scalability to accommodate growth and new use cases. Our ongoing R&D keeps us at the forefront of emerging technologies, and we provide regular updates and upgrade paths for our solutions. We also focus on sustainable technologies that will remain viable as environmental standards evolve.",
      },
      {
        question: "Can your solutions integrate with existing city infrastructure?",
        answer:
          "Yes, our solutions are designed to integrate with existing infrastructure wherever possible. We use middleware and adapters to connect with legacy systems, reducing the need for complete replacement. Our approach minimizes disruption and maximizes the value of existing investments while providing a path to modernization. We conduct thorough assessments of existing infrastructure before implementation to identify integration points and potential challenges.",
      },
    ],
    // Data
    [
      {
        question: "How do you help cities make sense of the data collected?",
        answer:
          "We provide comprehensive data analytics platforms that transform raw data into actionable insights. These include intuitive dashboards for operational monitoring, advanced analytics for trend identification, predictive models for forecasting, and decision support tools for resource allocation. We also offer training for municipal staff to build data literacy and analytical capabilities. Our goal is not just to collect data, but to enable data-driven decision making that improves city operations and services.",
      },
      {
        question: "Who owns the data collected by smart city systems?",
        answer:
          "We firmly believe that the data collected belongs to the municipality and its citizens. Our contracts clearly establish municipal ownership of all data. We act as stewards of this data, helping to collect, process, and analyze it, but ultimate control remains with the municipality. We support open data initiatives where appropriate, enabling transparency and innovation while respecting privacy considerations.",
      },
      {
        question: "How do you handle data storage and management?",
        answer:
          "We implement comprehensive data management solutions that address the entire data lifecycle. This includes secure storage with appropriate redundancy, data classification systems to manage access controls, retention policies that balance analytical needs with storage efficiency, and archiving or deletion protocols for outdated information. We comply with all relevant data protection regulations and help municipalities develop robust data governance frameworks.",
      },
    ],
    // Community
    [
      {
        question: "How do you ensure smart city solutions benefit all residents equally?",
        answer:
          "Equity is a core consideration in our design process. We conduct inclusive stakeholder engagement to understand diverse community needs, implement universal design principles to ensure accessibility, and develop metrics to track benefit distribution across demographic groups. We work with municipalities to develop digital inclusion programs that address potential barriers like digital literacy or access to devices. Our community engagement platforms are designed to reach all segments of the population, not just the technologically savvy.",
      },
      {
        question: "How do you engage citizens in the smart city development process?",
        answer:
          "We employ multiple engagement strategies including public forums, digital participation platforms, citizen advisory committees, and co-design workshops. We believe that successful smart cities must reflect the needs and priorities of their residents. Our engagement processes are designed to be inclusive, accessible, and meaningful, ensuring diverse voices are heard. We also develop feedback mechanisms that allow for continuous improvement based on resident experiences after implementation.",
      },
      {
        question: "What training do you provide for municipal staff and citizens?",
        answer:
          "We provide comprehensive training programs tailored to different stakeholder groups. For municipal staff, this includes technical training on system operation, data analysis skills, and change management support. For citizens, we offer digital literacy programs, user guides for public-facing applications, and workshops on how to engage with new services. Our training approach emphasizes practical skills development and is delivered through multiple channels to accommodate different learning preferences.",
      },
    ],
  ]

  const [selectedCategory, setSelectedCategory] = useState(0)

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked <span className="text-teal-600">Questions</span>
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
            Find answers to common questions about smart city technologies and our approach to urban innovation.
          </motion.p>
        </div>

        <div ref={ref} className="max-w-4xl mx-auto">
          {/* Category tabs */}
          <motion.div
            className="flex flex-wrap justify-center mb-8 gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((category, index) => (
              <button
                key={index}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === index
                    ? `${category.color} ${category.bgColor}`
                    : "text-gray-600 bg-white hover:bg-gray-100"
                }`}
                onClick={() => setSelectedCategory(index)}
              >
                <span className={`mr-2 ${selectedCategory === index ? "" : category.color}`}>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* FAQ accordion */}
          <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {faqsByCategory[selectedCategory].map((faq, index) => (
              <div key={index} className="border-b border-gray-100 last:border-b-0">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`ml-2 flex-shrink-0 ${activeIndex === index ? "text-teal-600" : "text-gray-400"}`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-600 bg-gray-50">
                        <div className="border-l-4 border-teal-500 pl-4 py-2">{faq.answer}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>

          {/* Still have questions */}
          <motion.div
            className="mt-12 text-center bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl p-8 text-white shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="mb-6">
              Our team is here to help you understand how our smart city solutions can address your specific urban
              challenges.
            </p>
            <a
              href="#contact"
              className="inline-block bg-white text-teal-600 font-medium py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FAQ

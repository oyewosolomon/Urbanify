import type React from "react"
import { useRef, useState, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float, PresentationControls, Line } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"

// Define the model types we'll display
type ModelType = "shield" | "lock" | "network" | "data"

// Component for the Shield model
function ShieldModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const mesh = useRef<THREE.Mesh>(null!)

  // Animate the shield
  useFrame((state) => {
    if (mesh.current) {
      // Use state.delta for frame-rate independent animation
      mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
      // Use state.camera position to add subtle responsiveness
      const distanceFromCamera = state.camera.position.z / 5
      mesh.current.scale.setScalar(0.9 + 0.1 * distanceFromCamera)
    }
  })

  return (
    <group position={position as any} rotation={rotation as any} scale={scale}>
      <mesh ref={mesh} castShadow receiveShadow>
        <cylinderGeometry args={[0, 1.5, 0.2, 6]} />
        <meshStandardMaterial color="#34d399" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.15]} castShadow>
        <cylinderGeometry args={[0, 1.2, 0.1, 6]} />
        <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.3]}>
        <boxGeometry args={[0.3, 0.8, 0.1]} />
        <meshStandardMaterial color="#34d399" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.3]}>
        <boxGeometry args={[0.8, 0.3, 0.1]} />
        <meshStandardMaterial color="#34d399" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Component for the Lock model
function LockModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const lockBody = useRef<THREE.Mesh>(null!)
  const lockShackle = useRef<THREE.Group>(null!)
  const [hover, setHover] = useState(false)

  // Animate the lock
  useFrame((state:any) => {
    if (lockShackle.current) {
      // Use state.delta for smoother transitions
      const targetY = hover ? 0.6 : 0.3
      const speed = 1.5 * state.delta
      lockShackle.current.position.y = THREE.MathUtils.lerp(
        lockShackle.current.position.y, 
        targetY, 
        Math.min(speed, 0.1)
      )
      
      // Add subtle breathing animation based on viewport aspect
      const breatheAmount = 0.02 * Math.sin(state.clock.getElapsedTime())
      if (lockBody.current) {
        lockBody.current.scale.y = 1 + breatheAmount
      }
    }
  })

  return (
    <group
      position={position as any}
      rotation={rotation as any}
      scale={scale}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Lock body */}
      <mesh ref={lockBody} castShadow receiveShadow>
        <boxGeometry args={[1, 1.2, 0.5]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Lock keyhole */}
      <mesh position={[0, 0, 0.26]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Lock shackle */}
      <group ref={lockShackle} position={[0, 0.3, 0]}>
        <mesh castShadow>
          <torusGeometry args={[0.3, 0.1, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[-0.3, 0, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.6, 16]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.3, 0, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.6, 16]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  )
}

// Component for the Network model
function NetworkModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const group = useRef<THREE.Group>(null!)
  const nodesRef = useRef<(THREE.Mesh | null)[]>([])
  const linesRef = useRef<(THREE.Line | null)[]>([])

  // Create nodes and connections
  const nodePositions = [
    [-1, 1, 0],
    [1, 1, 0],
    [0, -1, 0],
    [-1, -0.5, 1],
    [1, -0.5, 1],
    [0, 0.5, -1],
  ]

  // Connections between nodes
  const connections = [
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 3],
    [2, 4],
    [3, 4],
    [0, 5],
    [1, 5],
    [5, 3],
    [5, 4],
  ]

  // Animate the network
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2

      // Pulse the nodes
      nodesRef.current.forEach((node, i) => {
        if (node) {
          node.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 2 + i) * 0.1)
        }
      })

      // Animate the lines
      linesRef.current.forEach((line, i) => {
        if (line && line.material) {
          const material = line.material as THREE.LineBasicMaterial
          const h = (state.clock.getElapsedTime() * 0.1 + i * 0.05) % 1
          material.color.setHSL(h, 0.8, 0.5)
        }
      })
    }
  })

  return (
    <group ref={group} position={position as any} rotation={rotation as any} scale={scale}>
      {/* Create nodes */}
      {nodePositions.map((pos, i) => (
        <mesh
          key={`node-${i}`}
          position={pos as any}
          ref={(el) => {
            nodesRef.current[i] = el
          }}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color={i === 0 ? "#34d399" : "#64748b"}
            emissive={i === 0 ? "#34d399" : "#64748b"}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Create connections using drei's Line component */}
      {connections.map((conn, i) => {
        const points = [
          new THREE.Vector3(...(nodePositions[conn[0]] as [number, number, number])),
          new THREE.Vector3(...(nodePositions[conn[1]] as [number, number, number])),
        ]

        return (
          <Line
            key={`line-${i}`}
            points={points}
            color="#64748b"
            lineWidth={1}
            ref={(el) => {
              linesRef.current[i] = el as unknown as THREE.Line | null
            }}
          />
        )
      })}
    </group>
  )
}

// Component for the Data Protection model
function DataModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const outerShield = useRef<THREE.Mesh>(null!)
  const dataBlocks = useRef<THREE.Group>(null!)

  // Animate the data protection model
  useFrame((state) => {
    if (outerShield.current) {
      outerShield.current.rotation.y = state.clock.getElapsedTime() * 0.5
    }

    if (dataBlocks.current && dataBlocks.current.children) {
      dataBlocks.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.getElapsedTime() * 2 + i) * 0.05
      })
    }
  })

  return (
    <group position={position as any} rotation={rotation as any} scale={scale}>
      {/* Data blocks */}
      <group ref={dataBlocks} position={[0, 0, 0]}>
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.25 - 0.5, 0]} castShadow>
            <boxGeometry args={[0.8, 0.2, 0.5]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#0f172a" : "#1e293b"} metalness={0.5} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Protective shield */}
      <mesh ref={outerShield} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#34d399" transparent opacity={0.3} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Base */}
      <mesh position={[0, -0.7, 0]} receiveShadow>
        <cylinderGeometry args={[0.9, 0.9, 0.1, 32]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Model selector component
interface ModelSelectorProps {
  activeModel: ModelType
  setActiveModel: (model: ModelType) => void
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ activeModel, setActiveModel }) => {
  const models = [
    { id: "shield" as ModelType, name: "Firewall Protection", icon: "🛡️" },
    { id: "lock" as ModelType, name: "Data Encryption", icon: "🔒" },
    { id: "network" as ModelType, name: "Secure Network", icon: "🌐" },
    { id: "data" as ModelType, name: "Data Protection", icon: "💾" },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {models.map((model) => (
        <button
          key={model.id}
          onClick={() => setActiveModel(model.id)}
          className={`px-4 py-3 rounded-lg transition-all duration-300 flex items-center ${
            activeModel === model.id
              ? "bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-medium"
              : "bg-slate-800 text-gray-300 hover:bg-slate-700"
          }`}
        >
          <span className="mr-2 text-xl">{model.icon}</span>
          {model.name}
        </button>
      ))}
    </div>
  )
}

// Model description component
interface ModelDescriptionProps {
  activeModel: ModelType
}

const ModelDescription: React.FC<ModelDescriptionProps> = ({ activeModel }) => {
  const descriptions = {
    shield: {
      title: "Firewall Protection",
      description:
        "A robust firewall acts as the first line of defense against unauthorized access, filtering network traffic based on predetermined security rules to protect your systems from external threats.",
      features: ["Network traffic filtering", "Intrusion prevention", "Application control", "Real-time monitoring"],
    },
    lock: {
      title: "Data Encryption",
      description:
        "Encryption transforms sensitive data into an unreadable format that can only be deciphered with the correct encryption key, ensuring that even if data is intercepted, it remains secure and private.",
      features: ["End-to-end encryption", "AES-256 bit encryption", "Secure key management", "Encrypted data storage"],
    },
    network: {
      title: "Secure Network Architecture",
      description:
        "A properly designed network architecture segments critical systems, implements multiple layers of security, and ensures that even if one area is compromised, the entire network remains protected.",
      features: ["Network segmentation", "Zero-trust architecture", "Secure access controls", "Continuous monitoring"],
    },
    data: {
      title: "Data Protection",
      description:
        "Comprehensive data protection strategies safeguard your valuable information throughout its lifecycle, from creation and storage to transmission and eventual deletion.",
      features: ["Data classification", "Access controls", "Backup and recovery", "Data loss prevention"],
    },
  }

  const current = descriptions[activeModel]

  return (
    <motion.div
      key={activeModel}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800 p-6 rounded-lg border border-slate-700 max-w-2xl mx-auto"
    >
      <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
        {current.title}
      </h3>
      <p className="text-gray-300 mb-4">{current.description}</p>
      <div className="grid grid-cols-2 gap-3">
        {current.features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-emerald-400 mr-2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span className="text-gray-300 text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// Main component
const SecurityModels3D: React.FC = () => {
  const [activeModel, setActiveModel] = useState<ModelType>("shield")

  // Render the active model
  const renderModel = () => {
    switch (activeModel) {
      case "shield":
        return <ShieldModel position={[0, 0, 0]} />
      case "lock":
        return <LockModel position={[0, 0, 0]} />
      case "network":
        return <NetworkModel position={[0, 0, 0]} />
      case "data":
        return <DataModel position={[0, 0, 0]} />
      default:
        return <ShieldModel position={[0, 0, 0]} />
    }
  }

  return (
    <section className="py-20 bg-slate-900" id="security-models">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Security <span className="text-emerald-400">Visualized</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore interactive 3D models of key cybersecurity concepts that protect your digital assets. Interact with
            the models by dragging to rotate and scrolling to zoom.
          </p>
        </div>

        <ModelSelector activeModel={activeModel} setActiveModel={setActiveModel} />

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="bg-slate-800/50 rounded-lg overflow-hidden h-[400px] md:h-[500px] border border-slate-700">
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />

              <Suspense fallback={null}>
                <PresentationControls
                  global
                  rotation={[0, 0, 0]}
                  polar={[-Math.PI / 4, Math.PI / 4]}
                  azimuth={[-Math.PI / 4, Math.PI / 4]}
                  speed={1.5}
                  zoom={0.7}
                  snap
                >
                  <Float rotationIntensity={0.5} floatIntensity={0.5}>
                    {renderModel()}
                  </Float>
                </PresentationControls>
                <Environment preset="city" />
              </Suspense>

              <OrbitControls enableZoom={true} enablePan={false} />
            </Canvas>
          </div>

          <ModelDescription activeModel={activeModel} />
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-xl border border-slate-700 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready for a personalized security assessment?</h3>
            <p className="text-gray-300 mb-6">
              Our security experts can help you identify the right security solutions for your specific needs.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-1">
              Get Your Free Assessment
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SecurityModels3D
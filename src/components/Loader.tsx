import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"

// Sand Grain Particle Component
const SandGrain = () => {
  // Randomize initial position more towards the center where the content is
  const initialX = useMemo(() => 40 + Math.random() * 20, [])
  const initialY = useMemo(() => 40 + Math.random() * 20, [])
  
  // Randomize dispersal target (simulating wind blowing to the top-right)
  const targetX = useMemo(() => 100 + Math.random() * 400, [])
  const targetY = useMemo(() => -200 - Math.random() * 300, [])
  
  // Randomize size and colors for "sand" variety
  const size = useMemo(() => Math.random() * 1.5 + 0.5, [])
  const color = useMemo(() => {
    const colors = ['rgba(255,255,255,0.4)', 'rgba(59,130,246,0.3)', 'rgba(255,255,255,0.1)']
    return colors[Math.floor(Math.random() * colors.length)]
  }, [])
  
  const delay = useMemo(() => Math.random() * 0.4, [])
  
  return (
    <motion.div
      initial={{ x: `${initialX}%`, y: `${initialY}%`, opacity: 0, scale: 1 }}
      exit={{ 
        x: `${initialX + targetX}%`, 
        y: `${initialY + targetY}%`, 
        opacity: 0,
        scale: 0.2,
        rotate: Math.random() * 360,
        transition: { 
          duration: 1.2, 
          delay: delay,
          ease: [0.23, 1, 0.32, 1] // Organic deceleration
        } 
      }}
      className="absolute rounded-full pointer-events-none"
      style={{ 
        width: size, 
        height: size,
        backgroundColor: color,
        filter: 'blur(0.5px)'
      }}
    />
  )
}

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0)

  const loadingMessages = [
    "INITIALIZING ODYSSEY // 0x2A4",
    "SYNCING NEURAL INTERFACE...",
    "CALIBRATING VISUAL ASSETS... OK",
    "AESTHETIC PROTOCOLS ENGAGED",
    "SYSTEM READY."
  ]

  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 1500) // Longer delay to appreciate the sand dispersal
          return 100
        }
        
        const msgIndex = Math.floor((prev / 100) * loadingMessages.length)
        setCurrentMessage(loadingMessages[Math.min(msgIndex, loadingMessages.length - 1)])

        const diff = Math.random() * (prev > 80 ? 2 : 12)
        return Math.min(prev + diff, 100)
      })
    }, 120)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        key="loader-container"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          filter: "url(#sand-noise)",
          transition: { duration: 1.2, ease: "easeInOut" }
        }}
        className="fixed inset-0 z-[100] bg-[#020a13] flex flex-col items-center justify-center p-6 overflow-hidden"
      >
        {/* Background Video Layer */}
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-110 blur-[3px] opacity-30 grayscale-[0.5]">
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#020a13]/70 film-grain" />
        </div>

        {/* Sand Dispersal Grains (250+ particles) */}
        <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
          {Array.from({ length: 250 }).map((_, i) => (
            <SandGrain key={i} />
          ))}
        </div>

        <div className="relative z-20 w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ 
              opacity: 0, 
              y: -50,
              filter: "blur(4px)",
              transition: { duration: 0.8, ease: "easeIn" }
            }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-6 mb-8 opacity-40">
              <div className="h-[1px] w-12 bg-blue-500/50" />
              <span className="text-[10px] uppercase tracking-[1em] text-white">Initialization</span>
              <div className="h-[1px] w-12 bg-blue-500/50" />
            </div>
            
            <h2 className="text-6xl md:text-8xl tracking-tight mb-8" style={{ fontFamily: "'Instrument Serif', serif" }}>
              PROJECT <em className="not-italic text-blue-400/30 italic">ODYSSEY</em>
            </h2>
            
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-medium">
                {currentMessage}
              </p>
            </div>
          </motion.div>

          {/* Minimalist Progress Line */}
          <div className="relative h-[2px] w-full bg-white/5 overflow-hidden mb-8">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              exit={{ opacity: 0, x: 100, transition: { duration: 0.5 } }}
              className="absolute inset-0 bg-blue-500/60 shadow-[0_0_15px_rgba(59,130,246,0.2)] origin-left"
            />
          </div>

          <div className="flex justify-between items-end opacity-20">
            <div className="flex flex-col gap-1">
              <span className="text-[8px] uppercase tracking-[0.2em] font-light">Status: Synchronized</span>
              <span className="text-[8px] uppercase tracking-[0.2em] font-light">Protocol: cinematic_v9</span>
            </div>
            <span className="text-2xl tabular-nums tracking-tighter font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Dynamic Meta Elements */}
        <motion.div 
          exit={{ opacity: 0, scale: 1.1 }}
          className="absolute inset-x-12 bottom-12 flex justify-between items-end pointer-events-none opacity-10"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-widest text-white italic">Design Engineering Spec</span>
            <span className="text-[9px] uppercase tracking-widest text-white">Build ID: 0x93FA2</span>
          </div>
          <div className="text-right">
            <span className="text-[9px] uppercase tracking-[0.5em] text-white">Automated Aesthetic Repository</span>
          </div>
        </motion.div>

        {/* Sand Noise Displacement Filter */}
        <svg className="absolute w-0 h-0">
          <filter id="sand-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" />
          </filter>
        </svg>

        {/* Ambient Corner Glows */}
        <div className="absolute -bottom-40 -left-40 w-[800px] h-[800px] bg-blue-600/5 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-indigo-600/5 blur-[180px] rounded-full pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  )
}

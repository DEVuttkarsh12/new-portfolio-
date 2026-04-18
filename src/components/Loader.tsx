import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"

// Grid Tile Component for Disintegration
const Tile = ({ i }: { i: number }) => {
  const delay = (i % 10) * 0.05 + Math.floor(i / 10) * 0.05
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 0,
        rotateY: 90,
        rotateX: -45,
        transition: { 
          duration: 0.8, 
          delay: delay,
          ease: [0.76, 0, 0.24, 1] 
        } 
      }}
      className="bg-[#020a13] w-full h-full"
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
          setTimeout(onComplete, 2200) // Longer delay to allow for the grid tiles to finish
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
    <motion.div
      key="loader-container"
      initial={{ opacity: 1 }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6 overflow-hidden"
    >
        {/* Atmosphere: Neutralized Background Video Layer */}
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-110 blur-[4px] opacity-40 grayscale-[0.6]">
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
          {/* Neutral Charcoal Overlay (Reduced Blue) */}
          <div className="absolute inset-0 bg-[#080808]/80 mix-blend-multiply" />
          
          {/* NOTICEABLE GRAINY BLUR LAYER */}
          <div className="absolute inset-0 backdrop-blur-[10px] film-grain opacity-60 pointer-events-none" />
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay film-grain pointer-events-none" />
        </div>

        {/* HIGH-IMPACT GRID DISINTEGRATION LAYER (10x10) - Now behind content */}
        <div className="absolute inset-0 z-10 grid grid-cols-10 grid-rows-10 pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <Tile key={i} i={i} />
          ))}
        </div>

        <div className="relative z-20 w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ 
              opacity: 0, 
              scale: 0.9,
              filter: "blur(10px)",
              transition: { duration: 0.5, ease: "easeIn" }
            }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-6 mb-8 opacity-40">
              <div className="h-[1px] w-12 bg-white/20" />
              <span className="text-[10px] uppercase tracking-[1em] text-white">Initialization</span>
              <div className="h-[1px] w-12 bg-white/20" />
            </div>
            
            <h2 className="text-6xl md:text-8xl tracking-tight mb-8" style={{ fontFamily: "'Instrument Serif', serif" }}>
              PROJECT <em className="not-italic text-white/20 italic">ODYSSEY</em>
            </h2>
            
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/5 bg-white/[0.04] backdrop-blur-3xl">
              <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-medium">
                {currentMessage}
              </p>
            </div>
          </motion.div>

          {/* Minimalist Progress Line */}
          <div className="relative h-[1px] w-full bg-white/5 overflow-hidden mb-8">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="absolute inset-0 bg-white/40 shadow-[0_0_20px_rgba(255,255,255,0.2)] origin-left"
            />
          </div>

          <div className="flex justify-between items-end opacity-20">
            <div className="flex flex-col gap-1">
              <span className="text-[8px] uppercase tracking-[0.2em] font-light">Status: Synchronized</span>
              <span className="text-[8px] uppercase tracking-[0.2em] font-light">Protocol: cinematic_v11.x</span>
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

        {/* Ambient Corner Glows - Desaturated */}
        <div className="absolute -bottom-40 -left-40 w-[800px] h-[800px] bg-white/5 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-white/5 blur-[180px] rounded-full pointer-events-none" />
      </motion.div>
  )
}

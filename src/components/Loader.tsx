import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"

// High-Density Pixel Component for Scattered Reveal
const Pixel = ({ i }: { i: number }) => {
  const columns = 20
  const rows = 20
  const col = i % columns
  const row = Math.floor(i / columns)
  
  // Calculate center of the grid
  const centerX = columns / 2
  const centerY = rows / 2
  
  // Calculate vector from center to this pixel (for outward scatter)
  const vecX = col - centerX
  const vecY = row - centerY
  
  // Normalize and scale the vector for randomized "explosive" movement
  const magnitude = Math.sqrt(vecX * vecX + vecY * vecY) || 1
  const scatterDist = 200 + Math.random() * 600
  
  const exitX = (vecX / magnitude) * scatterDist
  const exitY = (vecY / magnitude) * scatterDist
  
  const delay = Math.random() * 0.4 // Randomized delay for "disintegration" look
  
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ 
        opacity: 0, 
        scale: Math.random() * 0.5,
        x: exitX,
        y: exitY,
        rotate: Math.random() * 720 - 360,
        transition: { 
          duration: 1.2, 
          delay: delay,
          ease: [0.16, 1, 0.3, 1] // Cinematic deceleration
        } 
      }}
      className="bg-[#050505] w-full h-full border-[0.2px] border-white/5"
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
          onComplete()
          return 100
        }
        
        const msgIndex = Math.floor((prev / 100) * loadingMessages.length)
        setCurrentMessage(loadingMessages[Math.min(msgIndex, loadingMessages.length - 1)])

        const diff = Math.random() * (prev > 80 ? 3 : 15)
        return Math.min(prev + diff, 100)
      })
    }, 110)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      key="loader-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.4 } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 overflow-hidden pointer-events-none bg-background"
    >
      {/* BASE LAYER: Restored Cinematic Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover scale-110 blur-[4px] opacity-40 grayscale-[0.6]"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        {/* Neutral dark wash behind everything */}
        <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
      </div>

      {/* TEXTURE LAYER: Noticeable grainy blur overlay */}
      <div className="absolute inset-0 z-10 backdrop-blur-[12px] film-grain opacity-50 pointer-events-none" />

      {/* PIXEL SCATTERED LAYER (20x20 Grid) - Provides the solid disintegrating background */}
      <div className="absolute inset-0 z-20 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)]">
        {Array.from({ length: 400 }).map((_, i) => (
          <Pixel key={i} i={i} />
        ))}
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-30 w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ 
            opacity: 0, 
            scale: 0.9,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: "easeIn" }
          }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-6 mb-10 opacity-40">
            <div className="h-[1px] w-12 bg-white/20" />
            <span className="text-[10px] uppercase tracking-[1em] text-white">Initialization</span>
            <div className="h-[1px] w-12 bg-white/20" />
          </div>
          
          <h2 className="text-6xl md:text-9xl tracking-tighter mb-10" style={{ fontFamily: "'Instrument Serif', serif" }}>
            PROJECT <em className="not-italic text-white/20 italic">ODYSSEY</em>
          </h2>
          
          <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full border border-white/5 bg-white/[0.04] backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
            <span className="w-2 h-2 bg-white/60 rounded-full animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/50 font-medium whitespace-nowrap">
              {currentMessage}
            </p>
          </div>
        </motion.div>

        {/* Minimalist Progress System */}
        <div className="max-w-md mx-auto">
          <div className="relative h-[1.5px] w-full bg-white/5 overflow-hidden mb-8 shadow-sm">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="absolute inset-0 bg-white/50 shadow-[0_0_20px_rgba(255,255,255,0.3)] origin-left"
            />
          </div>

          <div className="flex justify-between items-end opacity-20">
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] uppercase tracking-[0.3em] font-light">Status: Synchronized</span>
              <span className="text-[9px] uppercase tracking-[0.3em] font-light">Protocol: cinematic_v14.x</span>
            </div>
            <span className="text-3xl tabular-nums tracking-tighter font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Metadata Layers */}
      <motion.div 
        exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
        className="absolute inset-x-12 bottom-12 flex justify-between items-end pointer-events-none opacity-20 z-40"
      >
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] uppercase tracking-widest text-white italic">Design Engineering Spec</span>
          <span className="text-[10px] uppercase tracking-widest text-white">System ID: 0x93FA2</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white font-medium">EST. 2024</span>
        </div>
      </motion.div>

      {/* Ambient Depth Glows */}
      <div className="absolute -bottom-60 -left-60 w-[1000px] h-[1000px] bg-white/[0.03] blur-[200px] rounded-full pointer-events-none z-10" />
      <div className="absolute -top-60 -right-60 w-[1000px] h-[1000px] bg-white/[0.03] blur-[200px] rounded-full pointer-events-none z-10" />
    </motion.div>
  )
}

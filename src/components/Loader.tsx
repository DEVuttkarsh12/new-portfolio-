import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"

// High-Density Pixel Component for True Digital Reveal
const Pixel = () => {
  const delay = Math.random() * 0.6 // Staggered random dissolve
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 0,
        transition: { 
          duration: 0.7, 
          delay: delay,
          ease: "easeInOut"
        } 
      }}
      className="bg-[#050505] w-full h-full border-[0.1px] border-white/5"
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

        const diff = Math.random() * (prev > 80 ? 3 : 18)
        return Math.min(prev + diff, 100)
      })
    }, 100)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      key="loader-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2 } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 overflow-hidden pointer-events-none bg-background shadow-2xl"
    >
      {/* BASE LAYER: Restored Cinematic Video with Clarity */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover scale-110 blur-[2px] opacity-50 grayscale-[0.2]"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
      </div>

      {/* TEXTURE LAYER: Noticeable grainy blur overlay */}
      <div className="absolute inset-0 z-10 backdrop-blur-[10px] film-grain opacity-40 pointer-events-none" />

      {/* TRUE PIXEL REVEAL LAYER (30x30 Grid = 900 pieces) */}
      <div className="absolute inset-0 z-20 grid grid-cols-[repeat(30,1fr)] grid-rows-[repeat(30,1fr)]">
        {Array.from({ length: 900 }).map((_, i) => (
          <Pixel key={i} />
        ))}
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-30 w-full max-w-2xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ 
            opacity: 0, 
            scale: 0.95,
            filter: "blur(20px)",
            transition: { duration: 0.6, ease: "easeIn" }
          }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-8 mb-12 opacity-30">
            <div className="h-[1px] w-16 bg-white/20" />
            <span className="text-[11px] uppercase tracking-[1em] text-white">Initialization</span>
            <div className="h-[1px] w-16 bg-white/20" />
          </div>
          
          <h2 className="text-6xl md:text-9xl tracking-tighter mb-12" style={{ fontFamily: "'Instrument Serif', serif" }}>
            PROJECT <em className="not-italic text-white/20 italic">ODYSSEY</em>
          </h2>
          
          <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-[0_8px_48px_rgba(0,0,0,0.9)]">
            <span className="w-2 h-2 bg-white/60 rounded-full animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
            <p className="text-[12px] uppercase tracking-[0.4em] text-white/50 font-medium whitespace-nowrap">
              {currentMessage}
            </p>
          </div>
        </motion.div>

        {/* Minimalist Progress System */}
        <div className="max-w-md mx-auto">
          <div className="relative h-[1px] w-full bg-white/5 overflow-hidden mb-10 shadow-sm">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="absolute inset-0 bg-white/40 shadow-[0_0_30px_rgba(255,255,255,0.2)] origin-left"
            />
          </div>

          <div className="flex justify-between items-end opacity-20">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] font-light italic">Spec: digital_dissolve_v2</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-light">Status: Synchronized</span>
            </div>
            <span className="text-4xl tabular-nums tracking-tighter font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Global Metadata */}
      <motion.div 
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        className="absolute inset-x-12 bottom-12 flex justify-between items-end pointer-events-none opacity-20 z-40"
      >
        <div className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-widest text-white italic">Design Engineering Spec</span>
          <span className="text-[11px] uppercase tracking-widest text-white">System ID: {Math.random().toString(16).slice(2, 10).toUpperCase()}</span>
        </div>
        <div className="text-right">
          <span className="text-[11px] uppercase tracking-[0.5em] text-white font-medium italic">EST. 2024</span>
        </div>
      </motion.div>

      {/* Depth Layer */}
      <div className="absolute -bottom-60 -left-60 w-[1200px] h-[1200px] bg-white/[0.02] blur-[220px] rounded-full pointer-events-none z-10" />
      <div className="absolute -top-60 -right-60 w-[1200px] h-[1200px] bg-white/[0.02] blur-[220px] rounded-full pointer-events-none z-10" />
    </motion.div>
  )
}

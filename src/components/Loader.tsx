import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"

// Micro-Pixel Component for slow-burn digital reveal
// Using 40x40 grid density (1,600 bits)
const Pixel = () => {
  const delay = Math.random() * 1.2 // Spread delays for a slow-burn effect
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 0.8,
        transition: { 
          duration: 1.8, 
          delay: delay,
          ease: "easeInOut"
        } 
      }}
      className="bg-[#050505] w-full h-full"
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

        const diff = Math.random() * (prev > 90 ? 2 : 15)
        return Math.min(prev + diff, 100)
      })
    }, 110)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      key="loader-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 2.2 } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 overflow-hidden pointer-events-none bg-background shadow-2xl"
    >
      {/* 
        ATMOSPHERE LAYER: Restored Cinematic Video 
        Layered above the pixels so it is clear as the background of the loader
      */}
      <motion.div 
        exit={{ opacity: 0, transition: { duration: 1.0 } }}
        className="absolute inset-0 z-30"
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover scale-110 blur-[2px] opacity-60 grayscale-[0.2]"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        
        {/* TEXTURE LAYER: Noticeable grainy blur overlay inside the video atmosphere */}
        <div className="absolute inset-0 backdrop-blur-[10px] film-grain opacity-40 pointer-events-none" />
      </motion.div>

      {/* 
        MICRO-PIXEL REVEAL VEIL (40x40 Grid = 1,600 pieces) 
        This layer hides the site. When the video above fades, this dissolves.
      */}
      <div className="absolute inset-0 z-10 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] bg-[#050505]">
        {Array.from({ length: 1600 }).map((_, i) => (
          <Pixel key={i} />
        ))}
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-40 w-full max-w-3xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ 
            opacity: 0, 
            scale: 0.9,
            filter: "blur(20px)",
            transition: { duration: 1.0, ease: "easeIn" }
          }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-10 mb-14 opacity-20">
            <div className="h-[1px] w-20 bg-white/20" />
            <span className="text-[11px] uppercase tracking-[1.2em] text-white font-light">Initialization</span>
            <div className="h-[1px] w-20 bg-white/20" />
          </div>
          
          <h2 className="text-7xl md:text-[10rem] tracking-tighter mb-14 leading-none" style={{ fontFamily: "'Instrument Serif', serif" }}>
            PROJECT <em className="not-italic text-white/30 italic">ODYSSEY</em>
          </h2>
          
          <div className="inline-flex items-center gap-5 px-10 py-4 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-[0_8px_48px_rgba(0,0,0,1)]">
            <span className="w-2.5 h-2.5 bg-white/60 rounded-full animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
            <p className="text-[13px] uppercase tracking-[0.5em] text-white/40 font-medium whitespace-nowrap">
              {currentMessage}
            </p>
          </div>
        </motion.div>

        {/* Minimalist Progress System */}
        <div className="max-w-md mx-auto">
          <div className="relative h-[1px] w-full bg-white/5 overflow-hidden mb-12 shadow-sm">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="absolute inset-0 bg-white/40 shadow-[0_0_35px_rgba(255,255,255,0.25)] origin-left"
            />
          </div>

          <div className="flex justify-between items-end opacity-20">
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] uppercase tracking-[0.4em] font-light italic">Spec: micro_grain_v4.2</span>
              <span className="text-[10px] uppercase tracking-[0.4em] font-light">Status: Synchronized</span>
            </div>
            <span className="text-5xl tabular-nums tracking-tighter font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Global Metadata */}
      <motion.div 
        exit={{ opacity: 0, scale: 1.1, filter: "blur(15px)", transition: { duration: 1.2 } }}
        className="absolute inset-x-16 bottom-16 flex justify-between items-end pointer-events-none opacity-20 z-50"
      >
        <div className="flex flex-col gap-3">
          <span className="text-[12px] uppercase tracking-[0.3em] text-white font-light italic">Design Engineering Spec</span>
          <span className="text-[12px] uppercase tracking-[0.3em] text-white font-mono">BUILD_SEQUENCE::0x{Math.random().toString(16).slice(2, 8).toUpperCase()}</span>
        </div>
        <div className="text-right">
          <span className="text-[12px] uppercase tracking-[0.7em] text-white font-medium italic opacity-60">EST. 2024</span>
        </div>
      </motion.div>

      {/* Ambient Depth Layer */}
      <div className="absolute -bottom-80 -left-80 w-[1400px] h-[1400px] bg-white/[0.02] blur-[250px] rounded-full pointer-events-none z-10" />
      <div className="absolute -top-80 -right-80 w-[1400px] h-[1400px] bg-white/[0.02] blur-[250px] rounded-full pointer-events-none z-10" />
    </motion.div>
  )
}

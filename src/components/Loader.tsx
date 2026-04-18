import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Grid Tile Component for Disintegration
const Tile = ({ i }: { i: number }) => {
  const delay = (i % 10) * 0.05 + Math.floor(i / 10) * 0.05
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
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
      className="bg-[#050505] w-full h-full border-[0.5px] border-white/5"
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
          onComplete() // Trigger site reveal immediately when logic is done
          return 100
        }
        
        const msgIndex = Math.floor((prev / 100) * loadingMessages.length)
        setCurrentMessage(loadingMessages[Math.min(msgIndex, loadingMessages.length - 1)])

        const diff = Math.random() * (prev > 80 ? 3 : 15)
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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 overflow-hidden pointer-events-none"
    >
      {/* 
        TEXTURE LAYER: 
        Noticeable grainy blur that stays while tiles disintegrate 
      */}
      <div className="absolute inset-0 z-20 backdrop-blur-[12px] film-grain opacity-40 pointer-events-none" />

      {/* HIGH-IMPACT GRID DISINTEGRATION LAYER (10x10) - Provides the solid background */}
      <div className="absolute inset-0 z-0 grid grid-cols-10 grid-rows-10">
        {Array.from({ length: 100 }).map((_, i) => (
          <Tile key={i} i={i} />
        ))}
      </div>

      <div className="relative z-30 w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ 
            opacity: 0, 
            scale: 0.95,
            filter: "blur(15px)",
            transition: { duration: 0.6, ease: "easeIn" }
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
          
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/5 bg-white/[0.04] backdrop-blur-3xl shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
            <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-medium">
              {currentMessage}
            </p>
          </div>
        </motion.div>

        {/* Minimalist Progress Line */}
        <div className="relative h-[2px] w-full bg-white/5 overflow-hidden mb-8 shadow-sm">
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
            <span className="text-[8px] uppercase tracking-[0.2em] font-light">Protocol: cinematic_v12.o</span>
          </div>
          <span className="text-2xl tabular-nums tracking-tighter font-light" style={{ fontFamily: "'Instrument Serif', serif" }}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Dynamic Meta Elements */}
      <motion.div 
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        className="absolute inset-x-12 bottom-12 flex justify-between items-end pointer-events-none opacity-10 z-30"
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
      <div className="absolute -bottom-40 -left-40 w-[800px] h-[800px] bg-white/5 blur-[180px] rounded-full pointer-events-none z-10" />
      <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-white/5 blur-[180px] rounded-full pointer-events-none z-10" />
    </motion.div>
  )
}

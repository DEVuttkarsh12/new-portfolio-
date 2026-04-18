import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"

// Grain Particle Component for the disintegration effect
const GrainParticle = () => {
  const angle = useMemo(() => Math.random() * Math.PI * 2, [])
  const distance = useMemo(() => 100 + Math.random() * 400, [])
  const size = useMemo(() => Math.random() * 2 + 1, [])
  
  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 0 }}
      exit={{ 
        x: Math.cos(angle) * distance, 
        y: Math.sin(angle) * distance, 
        opacity: 0,
        scale: 0,
        transition: { duration: 0.8, ease: "easeOut" } 
      }}
      className="absolute w-1 h-1 bg-white/40 rounded-full"
      style={{ 
        width: size, 
        height: size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }}
    />
  )
}

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0)
  const [, setPhase] = useState<'loading' | 'syncing' | 'complete'>('loading')

  const loadingMessages = [
    "Initializing Repository // 0x2A4",
    "Calibrating Neural Interface...",
    "Synchronizing Visual Systems... OK",
    "Loading Aesthetic Assets...",
    "Connection Established."
  ]

  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setPhase('complete')
          setTimeout(onComplete, 1200) // Slightly longer to allow for grain effect
          return 100
        }
        
        // Update message based on progress
        const msgIndex = Math.floor((prev / 100) * loadingMessages.length)
        setCurrentMessage(loadingMessages[Math.min(msgIndex, loadingMessages.length - 1)])

        const diff = Math.random() * (prev > 80 ? 3 : 18)
        return Math.min(prev + diff, 100)
      })
    }, 180)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        key="loader-container"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          filter: "url(#noise-disintegration)",
          transition: { duration: 1, ease: "easeInOut" }
        }}
        className="fixed inset-0 z-[100] bg-[#020a13] flex flex-col items-center justify-center p-6 overflow-hidden"
      >
        {/* Background Video with Noise Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110 blur-[2px] opacity-40 grayscale-[0.4]"
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#020a13]/70 film-grain" />
        </div>

        {/* Scattered Grain Particles (Visible only during exit phase) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <GrainParticle key={i} />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-8 h-px bg-blue-500/30" />
              <span className="text-[10px] uppercase tracking-[0.6em] text-blue-400/60 font-medium">System Entry</span>
              <span className="w-8 h-px bg-blue-500/30" />
            </div>
            
            <h2 
              className="text-5xl md:text-7xl tracking-tighter mb-4"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              PROJECT <em className="not-italic text-muted-foreground/40 italic">ODYSSEY</em>
            </h2>
            
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-light flex items-center justify-center gap-3">
              <span className="w-1 h-1 bg-emerald-500 animate-pulse rounded-full" />
              {currentMessage}
            </p>
          </motion.div>

          {/* Cinematic Line Loader */}
          <div className="relative h-px w-full bg-white/5 overflow-hidden mb-6">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/80 to-transparent origin-left"
            />
          </div>

          <div className="flex justify-between items-center px-1">
            <div className="flex gap-4">
              <span className="text-[9px] uppercase tracking-widest text-white/20 font-light">Status: {progress === 100 ? 'READY' : 'SYNCING'}</span>
            </div>
            <span className="text-[11px] tabular-nums tracking-widest text-blue-400 font-medium">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Branding Meta */}
        <div className="absolute bottom-12 left-12 flex flex-col gap-1">
          <span className="text-[8px] uppercase tracking-[0.3em] text-white/10">Kernel Version 0.9.4a</span>
          <span className="text-[8px] uppercase tracking-[0.3em] text-white/10">Automated Aesthetic Protocol</span>
        </div>

        <div className="absolute bottom-12 right-12 text-right">
          <span className="text-[8px] uppercase tracking-[0.3em] text-white/10">© 2024 DEVOPS</span>
        </div>

        {/* Disintegration Filter Definition */}
        <svg className="absolute w-0 h-0">
          <filter id="noise-disintegration">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
          </filter>
        </svg>

        {/* Ambient glows */}
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  )
}

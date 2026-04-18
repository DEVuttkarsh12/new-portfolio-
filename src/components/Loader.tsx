import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 800)
          return 100
        }
        // Accelerating progress bar
        const diff = Math.random() * (prev > 80 ? 2 : 15)
        return Math.min(prev + diff, 100)
      })
    }, 150)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      exit={{ y: '-100%', transition: { duration: 1, ease: [0.7, 0, 0.3, 1] } }}
      className="fixed inset-0 z-[100] bg-[#020a13] flex flex-col items-center justify-center p-6 overflow-hidden"
    >
      {/* Background Video with Noise Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-110 blur-[2px] opacity-40 grayscale-[0.2]"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#020a13]/60 film-grain" />
      </div>

      <div className="relative z-10 w-full max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-12"
        >
          <span className="text-[10px] uppercase tracking-[0.8em] text-blue-400/60 mb-2 block font-medium">System Initialization</span>
          <h2 
            className="text-4xl md:text-6xl tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Project <em className="not-italic text-muted-foreground/50">Odyssey</em>
          </h2>
        </motion.div>

        {/* Cinematic Line Loader */}
        <div className="relative h-px w-full bg-white/5 rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent origin-left"
          />
        </div>

        <div className="flex justify-between items-center px-1">
          <span className="text-[9px] uppercase tracking-widest text-white/20 font-light">Loading Interface Assets</span>
          <span className="text-[9px] tabular-nums tracking-widest text-blue-400/40 font-medium">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Ambient corner glows */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </motion.div>
  )
}

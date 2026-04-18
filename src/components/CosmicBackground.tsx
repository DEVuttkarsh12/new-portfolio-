import { motion, useScroll, useTransform } from 'framer-motion'
import { useMemo } from 'react'

// Regular small twinkling stars
const Star = () => {
  const size = useMemo(() => Math.random() * 1.8 + 0.5, [])
  const top = useMemo(() => Math.random() * 100, [])
  const left = useMemo(() => Math.random() * 100, [])
  const delay = useMemo(() => Math.random() * 8, [])
  const duration = useMemo(() => 2.5 + Math.random() * 4, [])
  const minOpacity = useMemo(() => 0.15 + Math.random() * 0.2, [])
  const maxOpacity = useMemo(() => 0.5 + Math.random() * 0.5, [])

  return (
    <motion.div
      animate={{
        opacity: [minOpacity, maxOpacity, minOpacity],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      className="absolute bg-white rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top: `${top}%`,
        left: `${left}%`,
        boxShadow: `0 0 ${size * 3}px rgba(255, 255, 255, 0.9)`,
      }}
    />
  )
}

// Larger bokeh/glow stars scattered around
const BokehStar = () => {
  const size = useMemo(() => 2.5 + Math.random() * 2, [])
  const top = useMemo(() => Math.random() * 100, [])
  const left = useMemo(() => Math.random() * 100, [])
  const delay = useMemo(() => Math.random() * 10, [])
  const duration = useMemo(() => 5 + Math.random() * 8, [])
  const hue = useMemo(() => {
    const hues = ['rgba(147,197,253,', 'rgba(196,181,253,', 'rgba(255,255,255,', 'rgba(165,243,252,']
    return hues[Math.floor(Math.random() * hues.length)]
  }, [])

  return (
    <motion.div
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0.8, 1.4, 0.8],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top: `${top}%`,
        left: `${left}%`,
        background: `${hue}1)`,
        boxShadow: `0 0 ${size * 6}px ${hue}0.6), 0 0 ${size * 12}px ${hue}0.3)`,
      }}
    />
  )
}

export const CosmicBackground = () => {
  const { scrollYProgress } = useScroll()

  // Slow parallax on all background layers
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"])
  const nebulaY1 = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"])
  const nebulaY2 = useTransform(scrollYProgress, [0, 1], ["0%", "8%"])

  const stars = useMemo(() => Array.from({ length: 280 }), [])
  const bokehStars = useMemo(() => Array.from({ length: 25 }), [])

  return (
    <div className="fixed inset-0 z-[-1] bg-[#020a13] overflow-hidden pointer-events-none">
      {/* Star layer with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
        {stars.map((_, i) => (
          <Star key={i} />
        ))}
        {bokehStars.map((_, i) => (
          <BokehStar key={`bokeh-${i}`} />
        ))}
      </motion.div>

      {/* Nebula Layer 1 - Deep Blue (top-left drift) */}
      <motion.div
        style={{ y: nebulaY1 }}
        animate={{
          scale: [1, 1.12, 1],
          x: [0, 60, 0],
          rotate: [0, 6, 0],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] left-[-15%] w-[85%] h-[85%] bg-blue-600 blur-[160px] rounded-full"
      />

      {/* Nebula Layer 2 - Indigo/Violet (bottom-right drift) */}
      <motion.div
        style={{ y: nebulaY2 }}
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -50, 0],
          rotate: [0, -4, 0],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-[-15%] right-[-15%] w-[75%] h-[75%] bg-indigo-600 blur-[180px] rounded-full"
      />

      {/* Nebula Layer 3 - Cyan center pulse */}
      <motion.div
        animate={{
          opacity: [0.05, 0.14, 0.05],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 8 }}
        className="absolute top-[35%] left-[25%] w-[55%] h-[45%] bg-cyan-800 blur-[150px] rounded-full"
      />

      {/* Extra nebula mid-page - ensures stars aren't alone in lower sections */}
      <motion.div
        animate={{
          opacity: [0.06, 0.13, 0.06],
          x: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 10 }}
        className="absolute top-[60%] left-[-10%] w-[60%] h-[50%] bg-blue-700 blur-[160px] rounded-full"
      />
    </div>
  )
}

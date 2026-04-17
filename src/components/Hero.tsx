import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown, Globe, GitBranch, ExternalLink } from 'lucide-react'

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const videoBlur = useTransform(scrollYProgress, [0, 0.8], [0, 10])

  const stats = [
    { label: "Years Experience", value: "4+" },
    { label: "Projects Shipped", value: "20+" },
    { label: "Tech Stack", value: "Full-Stack" },
  ]

  return (
    <section ref={containerRef} className="relative min-h-[120vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-background">
      {/* Background Video with Parallax Blur */}
      <motion.div 
        style={{ filter: `blur(${videoBlur}px)` }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/20" />
      </motion.div>

      {/* Decorative vertical lines */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: 'top' }}
        className="absolute left-8 top-1/4 w-px h-48 bg-gradient-to-b from-transparent via-white/15 to-transparent hidden md:block z-10"
      />
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
        style={{ transformOrigin: 'top' }}
        className="absolute right-8 top-1/4 w-px h-48 bg-gradient-to-b from-transparent via-white/15 to-transparent hidden md:block z-10"
      />

      {/* Hero Content with Scroll Fade */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto flex flex-col items-center pt-32 pb-40"
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-2.5 liquid-glass rounded-full px-5 py-2.5 mb-10 border border-white/5"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Available for Work</span>
        </motion.div>

        <h1 
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] font-normal animate-fade-rise max-w-7xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Engineering high-end <br className="hidden sm:block" />
          <em className="not-italic text-muted-foreground">user experiences.</em>
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
          A frontend-specialized full-stack engineer focused on crafting polished, <br className="hidden sm:block" />
          interactive interfaces. I bridge the gap between meticulous design and <br className="hidden sm:block" />
          efficient backend systems to build complete digital products.
        </p>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-12 animate-fade-rise-delay-2">
          <a href="#projects" className="liquid-glass rounded-full px-14 py-5 text-base text-foreground hover:scale-[1.03] transition-transform flex items-center gap-2">
            Explore Projects
          </a>
          <a href="#contact" className="rounded-full px-10 py-5 text-base text-muted-foreground hover:text-foreground transition-colors border border-white/5 hover:border-white/15">
            Get in Touch
          </a>
        </div>

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-3 mt-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 liquid-glass rounded-2xl px-6 py-3 border border-white/5">
              <span className="text-lg font-light tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>{stat.value}</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center gap-6 mt-10"
        >
          <div className="h-px w-12 bg-white/10" />
          <a href="#" aria-label="GitHub" className="text-muted-foreground/50 hover:text-white transition-colors">
            <GitBranch size={16} />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-muted-foreground/50 hover:text-white transition-colors">
            <Globe size={16} />
          </a>
          <a href="#" aria-label="Portfolio/CV" className="text-muted-foreground/50 hover:text-white transition-colors">
            <ExternalLink size={16} />
          </a>
          <div className="h-px w-12 bg-white/10" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={12} className="text-muted-foreground/30" />
        </motion.div>
      </motion.div>

      {/* Atmospheric Transition Mask — fades to CosmicBackground base color */}
      <div className="absolute bottom-0 left-0 right-0 h-80 z-20" style={{ background: 'linear-gradient(to top, #020a13 0%, #020a1380 50%, transparent 100%)' }} />
    </section>
  )
}

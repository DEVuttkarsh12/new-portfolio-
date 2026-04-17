import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const orbY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])
  const orbX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])

  return (
    <section ref={sectionRef} id="experience" className="py-32 px-6 relative overflow-hidden">
      {/* Cinematic parallax orb */}
      <motion.div
        style={{ y: orbY, x: orbX }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600 blur-[160px] rounded-full pointer-events-none"
      />

      {/* Horizontal accent lines */}
      <motion.div
        animate={{ opacity: [0, 0.6, 0], scaleX: [0.8, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0, 0.4, 0], scaleX: [1, 0.8, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2
            className="text-4xl md:text-6xl mb-12 tracking-tight leading-[0.9]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Engineering with <br />
            <em className="not-italic text-muted-foreground">Purpose & Precision.</em>
          </h2>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              With over 4 years of experience crafting digital products, I've learned that exceptional software lies at the intersection of technical excellence and human-centric design.
            </p>
            <p>
              I specialize in frontend engineering but approach every project with a full-stack mindset. My goal is to build interfaces that aren't just visually stunning, but are backed by robust, scalable architectures that can handle the complexities of the modern web.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col justify-end"
        >
          <div className="liquid-glass p-10 rounded-3xl border border-white/5 space-y-8 relative group overflow-hidden">
            {/* Animated inner glow */}
            <motion.div
              animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-40 h-40 bg-white blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
            />

            <div>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 block">Current Focus</span>
              <p className="text-xl font-light">Intersection of Generative AI & Creative Development</p>
            </div>
            <div className="h-px bg-white/5" />
            <div>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 block">Available For</span>
              <p className="text-xl font-light">Senior Frontend Roles & High-End Freelance Projects</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

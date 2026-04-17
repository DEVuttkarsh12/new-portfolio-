import { motion, useScroll, useTransform } from 'framer-motion'
import { Terminal, Cpu, Sparkles } from 'lucide-react'
import { useRef } from 'react'

const categories = [
  {
    title: "Frontend Engineering",
    icon: <Terminal className="w-5 h-5" />,
    description: "Crafting fluid, high-performance interfaces with modern frameworks.",
    skills: ["JavaScript (ES6+)", "TypeScript", "React", "Next.js", "HTML5", "CSS3/Tailwind"]
  },
  {
    title: "Creative Development",
    icon: <Sparkles className="w-5 h-5" />,
    description: "Bringing designs to life through motion and immersive interactivity.",
    skills: ["Framer Motion", "GSAP", "Three.js", "React Three Fiber", "GLSL Shaders", "UI Design"]
  },
  {
    title: "Systems & Architecture",
    icon: <Cpu className="w-5 h-5" />,
    description: "Building robust foundations and scalable backend solutions.",
    skills: ["Node.js", "Firebase", "Supabase", "Git", "Vite", "REST/GraphQL"]
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
  }
}

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  }
}

export const Stack = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const orb1Y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"])
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  const orb1X = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])

  return (
    <section ref={sectionRef} id="stack" className="py-40 px-6 relative overflow-hidden">
      {/* Cinematic parallax orbs */}
      <motion.div
        style={{ y: orb1Y, x: orb1X }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-indigo-500 blur-[160px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: orb2Y }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-700 blur-[140px] rounded-full pointer-events-none"
      />

      {/* Diagonal light line accent */}
      <motion.div
        animate={{ opacity: [0, 0.4, 0], x: ["-5%", "5%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 4 }}
        className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/8 to-transparent pointer-events-none hidden md:block"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-24 text-center md:text-left"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60 mb-4 block">System Capabilities</span>
          <h2
            className="text-5xl md:text-7xl tracking-tighter mb-6"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Technical <em className="not-italic text-muted-foreground">Arsenal</em>
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg opacity-70 font-light">
            A curated selection of tools and technologies I use to bridge the gap between complex engineering and human-centric design.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="liquid-glass p-8 md:p-10 rounded-[2rem] border border-white/5 flex flex-col group hover:border-white/10 transition-colors duration-500 relative"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-white/5 text-white/70 group-hover:text-white transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground/80 font-medium">
                  {category.title}
                </h3>
              </div>

              <p className="text-muted-foreground text-sm mb-10 leading-relaxed font-light">
                {category.description}
              </p>

              <div className="mt-auto">
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={skillVariants}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                      className="px-4 py-2 rounded-xl border border-white/5 bg-white/[0.02] text-[13px] font-light tracking-tight text-white/60 hover:text-white transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Card corner accent */}
              <div className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute bottom-6 right-6 w-[1px] h-6 bg-white/10" />
                <div className="absolute bottom-6 right-6 h-[1px] w-6 bg-white/10" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

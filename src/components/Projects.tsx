import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'

const projects = [
  {
    title: "Lumina Financial",
    category: "Scalable Architecture",
    description: "High-performance financial analytics dashboard featuring real-time data visualization and complex filtering systems.",
    stack: ["Next.js", "TypeScript", "D3.js", "Tailwind"],
    links: { github: "#", external: "#" }
  },
  {
    title: "Aether Lens",
    category: "AI Interaction",
    description: "Intuitive interface for generative AI models, featuring drag-and-drop composition and seamless API integration.",
    stack: ["React", "Zustand", "OpenAI", "Framer Motion"],
    links: { github: "#", external: "#" }
  },
  {
    title: "Orbit Commerce",
    category: "Immersive Web",
    description: "Headless e-commerce frontend with immersive 3D product previews and ultra-smooth state transitions.",
    stack: ["React Three Fiber", "Shopify API", "Tailwind", "Vite"],
    links: { github: "#", external: "#" }
  },
  {
    title: "Nexus System",
    category: "Design Engineering",
    description: "Comprehensive component library and documentation system for standardizing UI patterns across platforms.",
    stack: ["Storybook", "React", "Rollup", "Lerna"],
    links: { github: "#", external: "#" }
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.215, 0.61, 0.355, 1] }
  }
}

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const orb1Y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])

  return (
    <section ref={sectionRef} id="projects" className="py-40 px-6 relative overflow-hidden">
      {/* Top seamless fade — continues from Hero's bottom gradient */}
      <div className="absolute top-0 left-0 right-0 h-40 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #020a13 0%, transparent 100%)' }} />

      {/* Cinematic animated orbs */}
      <motion.div
        style={{ y: orb1Y }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500 blur-[140px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: orb2Y }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.04, 0.09, 0.04] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600 blur-[160px] rounded-full pointer-events-none"
      />

      {/* Horizontal light sweep */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatDelay: 6 }}
        className="absolute top-1/3 left-0 w-[30%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-24"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 mb-4 block">Archive 2024</span>
          <h2
            className="text-5xl md:text-7xl tracking-tighter"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Selected <em className="not-italic text-muted-foreground">Projects</em>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
              className="group relative p-10 md:p-14 flex flex-col bg-background/40 backdrop-blur-md transition-colors duration-500"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
                  {project.category}
                </span>
                <motion.div
                  whileHover={{ rotate: 45 }}
                  className="p-2 rounded-full border border-white/10 group-hover:border-white/30 transition-colors"
                >
                  <ArrowUpRight size={18} className="text-muted-foreground group-hover:text-white" />
                </motion.div>
              </div>

              <h3
                className="text-3xl md:text-4xl mb-6 group-hover:text-primary transition-colors"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {project.title}
              </h3>

              <p className="text-muted-foreground text-base leading-relaxed max-w-md mb-10 opacity-70 group-hover:opacity-100 transition-opacity">
                {project.description}
              </p>

              <div className="mt-auto flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">
                {project.stack.map((tech) => (
                  <span key={tech} className="group-hover:text-muted-foreground transition-colors">{tech}</span>
                ))}
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-4 right-4 w-[1px] h-4 bg-white/20" />
                <div className="absolute top-4 right-4 h-[1px] w-4 bg-white/20" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
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

const itemVariants: Variants = {
  hidden: (isRight: boolean) => ({
    opacity: 0,
    x: isRight ? 40 : -40,
    y: 20
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { 
      duration: 1.2, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
}

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Vertical line growth animation
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"])
  const lineGlowOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} id="projects" className="py-40 px-6 relative overflow-hidden bg-background">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 right-0 h-40 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #020a13 0%, transparent 100%)' }} />
      
      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-32 text-center md:text-left"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground/60 mb-4 block">Selected Works</span>
          <h2
            className="text-6xl md:text-8xl tracking-tighter"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Project <em className="not-italic text-muted-foreground/40 italic">Ladder</em>
          </h2>
        </motion.div>

        {/* The Ladder System */}
        <div className="relative">
          {/* Central Vertical Spine (Desktop) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/5 hidden md:block" />
          
          {/* Animated Glow Spine */}
          <motion.div 
            style={{ height: lineHeight, opacity: lineGlowOpacity }}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent hidden md:block z-10 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          />

          {/* Spine for Mobile (Left-aligned) */}
          <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-white/5 md:hidden" />

          {/* Project Steps */}
          <div className="flex flex-col gap-24 md:gap-40 lg:gap-56">
            {projects.map((project, index) => {
              const isRight = index % 2 === 0
              
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center w-full">
                  {/* The Project Rung (Horizontal Connector) */}
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`absolute top-1/2 -translate-y-1/2 h-px bg-white/10 hidden md:block origin-${isRight ? 'left' : 'right'}`}
                    style={{ 
                      left: isRight ? '50%' : 'auto', 
                      right: isRight ? 'auto' : '50%',
                      width: '12%'
                    }}
                  />

                  {/* Project Container */}
                  <div className={`w-full flex ${isRight ? 'md:justify-end' : 'md:justify-start'}`}>
                    <motion.div
                      variants={itemVariants}
                      custom={isRight}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      className={`
                        w-full md:w-[45%] group relative
                        p-8 md:p-12 
                        bg-white/[0.03] backdrop-blur-3xl 
                        border border-white/5 rounded-3xl
                        hover:border-white/15 transition-all duration-700
                        shadow-[0_8px_32px_rgba(0,0,0,0.5)]
                      `}
                    >
                      {/* Floating Index Node */}
                      <div className={`
                        absolute top-0 md:top-1/2 -translate-y-1/2 
                        hidden md:flex items-center justify-center
                        w-10 h-10 rounded-full bg-background border border-white/10
                        text-[10px] text-white/40 font-mono z-20
                        ${isRight ? '-left-[20%] lg:-left-[15%]' : '-right-[20%] lg:-right-[15%]'}
                      `}>
                        0{index + 1}
                      </div>

                      <div className="flex justify-between items-start mb-10">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">
                          {project.category}
                        </span>
                        <div className="flex gap-4">
                          <motion.a 
                            href={project.links.external}
                            whileHover={{ scale: 1.1, color: "#fff" }}
                            className="text-white/30 transition-colors"
                          >
                            <ExternalLink size={18} />
                          </motion.a>
                        </div>
                      </div>

                      <h3
                        className="text-4xl md:text-5xl mb-8 group-hover:text-white transition-colors tracking-tight"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        {project.title}
                      </h3>

                      <p className="text-white/50 text-base md:text-lg leading-relaxed mb-12 opacity-80 group-hover:opacity-100 transition-opacity">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        {project.stack.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/5 text-[9px] uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Visual Flourish: Glass Reflection */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      
                      {/* Bottom Reveal Arrow */}
                      <div className="absolute bottom-8 right-8 text-white/0 group-hover:text-white/40 transition-all transform translate-y-2 group-hover:translate-y-0 duration-500">
                        <ArrowUpRight size={24} />
                      </div>
                    </motion.div>
                  </div>

                  {/* Connecting Node on the Spine */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white/10 border border-white/20 hidden md:block z-20 overflow-hidden"
                  >
                    <motion.div 
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-x-0 bottom-0 h-full bg-blue-500/50"
                    />
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Decorative Light Elements */}
      <div className="absolute -top-40 left-0 w-full h-96 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
      <div className="absolute -bottom-40 left-0 w-full h-96 bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none" />
    </section>
  )
}

import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { useRef } from 'react'

const projects = [
  {
    title: "Lumina Financial",
    category: "Scalable Architecture",
    description: "High-performance financial analytics dashboard featuring real-time data visualization and complex filtering systems.",
    stack: ["Next.js", "TypeScript", "D3.js", "Tailwind"],
    links: { external: "#" }
  },
  {
    title: "Aether Lens",
    category: "AI Interaction",
    description: "Intuitive interface for generative AI models, featuring drag-and-drop composition and seamless API integration.",
    stack: ["React", "Zustand", "OpenAI", "Framer Motion"],
    links: { external: "#" }
  },
  {
    title: "Orbit Commerce",
    category: "Immersive Web",
    description: "Headless e-commerce frontend with immersive 3D product previews and ultra-smooth state transitions.",
    stack: ["React Three Fiber", "Shopify API", "Tailwind", "Vite"],
    links: { external: "#" }
  },
  {
    title: "Nexus System",
    category: "Design Engineering",
    description: "Comprehensive component library and documentation system for standardizing UI patterns across platforms.",
    stack: ["Storybook", "React", "Rollup", "Lerna"],
    links: { external: "#" }
  }
]

const itemVariants: Variants = {
  hidden: (isRight: boolean) => ({
    opacity: 0,
    x: isRight ? 30 : -30,
    y: 15
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { 
      duration: 1, 
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

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"])
  const lineGlowOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} id="projects" className="py-24 md:py-32 px-6 relative overflow-hidden bg-transparent">
      {/* Top seamless transition fade — matches Hero's bottom atmosphere */}
      <div className="absolute top-0 left-0 right-0 h-40 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #020a13 0%, transparent 100%)' }} />
      
      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 text-center md:text-left"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60 mb-4 block">Archive 2024</span>
          <h2
            className="text-5xl md:text-7xl tracking-tighter"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            My <em className="not-italic text-muted-foreground/40 italic">Projects</em>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Ladder Spine: Central Rail (Desktop) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/5 hidden md:block" />
          
          {/* Animated Glow Spine */}
          <motion.div 
            style={{ height: lineHeight, opacity: lineGlowOpacity }}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent hidden md:block z-10"
          />

          {/* Spine for Mobile (Left-aligned) */}
          <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-white/5 md:hidden" />

          {/* Project Steps - Denser Gaps */}
          <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
            {projects.map((project, index) => {
              const isRight = index % 2 === 0
              
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center w-full">
                  {/* The Project Rung */}
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className={`absolute top-1/2 -translate-y-1/2 h-px bg-white/10 hidden md:block origin-${isRight ? 'left' : 'right'}`}
                    style={{ 
                      left: isRight ? '50%' : 'auto', 
                      right: isRight ? 'auto' : '50%',
                      width: '6%' 
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
                        w-full md:w-[46%] group lg:w-[44%]
                        liquid-glass p-8 md:p-11 rounded-[2rem]
                        border border-white/5 flex flex-col
                        hover:border-white/10 transition-all duration-700
                        relative shadow-2xl
                      `}
                    >
                      {/* Index Circle */}
                      <div className={`
                        absolute top-0 md:top-1/2 -translate-y-1/2 
                        hidden md:flex items-center justify-center
                        w-9 h-9 rounded-full bg-background/80 backdrop-blur-xl border border-white/10
                        text-[9px] text-white/40 font-mono z-20 transition-all group-hover:border-white/30
                        ${isRight ? '-left-[11%] lg:-left-[9%]' : '-right-[11%] lg:-right-[9%]'}
                      `}>
                        0{index + 1}
                      </div>

                      <div className="flex justify-between items-start mb-8">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">
                          {project.category}
                        </span>
                        <div className="flex gap-4">
                          <motion.a 
                            href={project.links.external}
                            whileHover={{ scale: 1.1, color: "#fff" }}
                            className="text-white/20 transition-colors"
                          >
                            <ExternalLink size={17} />
                          </motion.a>
                        </div>
                      </div>

                      <h3
                        className="text-3xl md:text-4xl mb-6 group-hover:text-white transition-colors tracking-tight"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        {project.title}
                      </h3>

                      <p className="text-white/40 text-base leading-relaxed mb-10 opacity-80 group-hover:opacity-100 transition-opacity font-light">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2.5 mt-auto">
                        {project.stack.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-[9px] uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors font-light"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Side Reveal Arrow */}
                      <div className="absolute bottom-10 right-10 text-white/0 group-hover:text-white/30 transition-all transform translate-y-2 group-hover:translate-y-0 duration-500">
                        <ArrowUpRight size={22} />
                      </div>
                    </motion.div>
                  </div>

                  {/* Active Node on Spine */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/5 border border-white/10 hidden md:block z-20">
                    <motion.div 
                      whileInView={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-white/20 blur-[2px]"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

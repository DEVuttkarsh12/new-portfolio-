import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { useRef } from 'react'

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  detailedDescription?: string;
  stack: string[];
  links: { external: string; github?: string };
  year: string;
  role: string;
}

export const projects: Project[] = [
  {
    id: "lumina",
    title: "Lumina Financial",
    category: "Scalable Architecture",
    year: "2024",
    role: "Lead Frontend Engineer",
    description: "High-performance financial analytics dashboard featuring real-time data visualization and complex filtering systems.",
    detailedDescription: "Lumina Financial was designed to handle massive data streams from global markets. The core challenge was maintaining 60fps performance while rendering thousands of live data points. We implemented a custom WebWorker-based data processing layer and a specialized D3.js visualization suite to ensure precision and speed.",
    stack: ["Next.js", "TypeScript", "D3.js", "Tailwind", "WebWorkers"],
    links: { external: "#" }
  },
  {
    id: "aether",
    title: "Aether Lens",
    category: "AI Interaction",
    year: "2023",
    role: "Full-Stack Developer",
    description: "Intuitive interface for generative AI models, featuring drag-and-drop composition and seamless API integration.",
    detailedDescription: "Aether Lens bridges the gap between complex AI parameters and creative intuition. By abstracting prompt engineering into a visual workspace, we allowed designers to compose AI outputs with spatial logic. The platform handles distributed GPU tasks via a robust Node.js backend while providing a fluid, React-based creative canvas.",
    stack: ["React", "Zustand", "OpenAI", "Node.js", "Framer Motion"],
    links: { external: "#" }
  },
  {
    id: "orbit",
    title: "Orbit Commerce",
    category: "Immersive Web",
    year: "2023",
    role: "Creative Developer",
    description: "Headless e-commerce frontend with immersive 3D product previews and ultra-smooth state transitions.",
    detailedDescription: "Orbit redefines digital shopfronts by replacing flat images with interactive 3D randerings. Using React Three Fiber, we created a lightweight product viewer that works seamlessly across mobile and desktop. Combined with a headless Shopify backend, it provides a lightning-fast shopping experience that feels like a native application.",
    stack: ["React Three Fiber", "Shopify API", "Three.js", "Tailwind", "Vite"],
    links: { external: "#" }
  },
  {
    id: "nexus",
    title: "Nexus System",
    category: "Design Engineering",
    year: "2022",
    role: "Design Systems Lead",
    description: "Comprehensive component library and documentation system for standardizing UI patterns across platforms.",
    detailedDescription: "Nexus was built to scale design across three different engineering teams. We developed a token-first approach using Style Dictionary and implemented a comprehensive React-based UI library. The system includes a custom Storybook environment that acts as the single source of truth for both designers and developers.",
    stack: ["Storybook", "React", "Rollup", "Lerna", "Style Dictionary"],
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

export const Projects = ({ onSelectProject }: { onSelectProject: (p: Project) => void }) => {
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
                <div key={project.id} className="relative flex flex-col md:flex-row items-center w-full">
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
                      layoutId={`card-${project.id}`}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      onClick={() => onSelectProject(project)}
                      className={`
                        w-full md:w-[46%] group lg:w-[44%]
                        liquid-glass p-8 md:p-11 rounded-[2rem]
                        border border-white/5 flex flex-col
                        hover:border-white/10 transition-all duration-700
                        relative shadow-2xl cursor-pointer
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
                        <motion.span 
                          layoutId={`category-${project.id}`}
                          className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium"
                        >
                          {project.category}
                        </motion.span>
                        <div className="flex gap-4">
                          <motion.div 
                            whileHover={{ scale: 1.1, color: "#fff" }}
                            className="text-white/20 transition-colors"
                          >
                            <ExternalLink size={17} />
                          </motion.div>
                        </div>
                      </div>

                      <motion.h3
                        layoutId={`title-${project.id}`}
                        className="text-3xl md:text-4xl mb-6 group-hover:text-white transition-colors tracking-tight"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        {project.title}
                      </motion.h3>

                      <motion.p 
                        layoutId={`description-${project.id}`}
                        className="text-white/40 text-base leading-relaxed mb-10 opacity-80 group-hover:opacity-100 transition-opacity font-light"
                      >
                        {project.description}
                      </motion.p>

                      <motion.div 
                        layoutId={`stack-${project.id}`}
                        className="flex flex-wrap gap-2.5 mt-auto"
                      >
                        {project.stack.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-[9px] uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors font-light"
                          >
                            {tech}
                          </span>
                        ))}
                      </motion.div>

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

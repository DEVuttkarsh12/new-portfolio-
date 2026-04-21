import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Calendar, User, Globe, ArrowRight } from 'lucide-react'
import { projects, type Project } from './Projects'

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (p: Project) => void;
}

export const ProjectDetail = ({ project, onBack, onSelectProject }: ProjectDetailProps) => {
  const currentIndex = projects.findIndex(p => p.id === project.id)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#020a13] overflow-y-auto"
    >
      {/* Floating Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onBack}
        className="fixed top-12 left-12 z-50 flex items-center gap-3 px-6 py-3 liquid-glass rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs uppercase tracking-[0.2em] font-medium">Back to Ladder</span>
      </motion.button>

      <div className="max-w-7xl mx-auto px-6 pt-40 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left Column: Essential Info */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <motion.span 
              layoutId={`category-${project.id}`}
              className="text-xs uppercase tracking-[0.4em] text-blue-400 mb-8 block font-medium"
            >
              {project.category}
            </motion.span>
            
            <motion.h2 
              layoutId={`title-${project.id}`}
              className="text-6xl md:text-8xl tracking-tighter mb-12 leading-[0.9]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {project.title}
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-10 border-t border-white/5 pt-12"
            >
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white/20 mb-1">
                    <Calendar size={14} />
                    <span className="text-[10px] uppercase tracking-widest">Year</span>
                  </div>
                  <span className="text-sm text-white/70 font-light">{project.year}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white/20 mb-1">
                    <User size={14} />
                    <span className="text-[10px] uppercase tracking-widest">Role</span>
                  </div>
                  <span className="text-sm text-white/70 font-light">{project.role}</span>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 text-white/20">
                  <Globe size={14} />
                  <span className="text-[10px] uppercase tracking-widest">Links</span>
                </div>
                <div className="flex gap-4">
                  <motion.a 
                    href={project.links.external}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] uppercase tracking-widest text-white/60 hover:text-white transition-all"
                  >
                    Live Demo <ExternalLink size={14} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Narrative Detail */}
          <div className="lg:col-span-7">
            <motion.div 
              layoutId={`card-${project.id}`}
              className="liquid-glass p-12 md:p-16 rounded-[3rem] border border-white/5 relative overflow-hidden"
            >
              {/* Internal Atmosphere */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="relative z-10">
                <motion.p 
                  layoutId={`description-${project.id}`}
                  className="text-2xl md:text-3xl text-white/80 leading-relaxed mb-16 font-light italic"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  "{project.description}"
                </motion.p>

                <div className="space-y-12 text-white/50 leading-relaxed font-light text-lg">
                  <p>{project.detailedDescription}</p>
                  
                  <div className="pt-8 flex flex-col gap-8">
                    <h4 className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold">Engineering Stack</h4>
                    <motion.div 
                      layoutId={`stack-${project.id}`}
                      className="flex flex-wrap gap-3"
                    >
                      {project.stack.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/5 text-[11px] uppercase tracking-widest text-white/40 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Aesthetic Rungs (Visual connection to origin) */}
                <div className="absolute left-0 bottom-12 w-12 h-px bg-white/10" />
              </div>
            </motion.div>

            {/* Next Project Teaser (Now Functional) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              whileHover={{ opacity: 1 }}
              onClick={() => {
                onSelectProject(nextProject)
                document.querySelector('.fixed.inset-0.overflow-y-auto')?.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="mt-20 border-t border-white/5 pt-12 flex justify-between items-center group cursor-pointer transition-all"
            >
              <div className="flex flex-col gap-2 transition-transform group-hover:translate-x-2">
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/40">Next Project</span>
                <span className="text-3xl md:text-4xl font-light tracking-tighter" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {nextProject.title}
                </span>
              </div>
              <div className="p-4 rounded-full border border-white/10 group-hover:bg-white/5 group-hover:border-white/30 transition-all">
                <ArrowRight size={24} className="text-white/20 group-hover:text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 blur-[200px] rounded-full pointer-events-none -z-10" />
    </motion.div>
  )
}

import { motion, useScroll, useTransform, AnimatePresence, type Variants } from 'framer-motion'
import { useRef, useState } from 'react'
import { GitBranch, Globe, ExternalLink, Send, CheckCircle, Mail, MessageSquare, User, Briefcase } from 'lucide-react'

const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=mailto:devuttkarsh@gmail.com&bgcolor=020a13&color=ffffff&qzone=2&margin=0`

const inputClass = `
  w-full bg-white/[0.03] border border-white/8 rounded-2xl px-5 py-4 text-sm text-white
  placeholder:text-muted-foreground/30 focus:outline-none focus:border-blue-500/30 focus:bg-white/[0.06]
  focus:ring-1 focus:ring-blue-500/20 transition-all duration-500 ease-out
`

export const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Parallax for ambient background
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"])

  const formVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, type, message } = form
    const subject = encodeURIComponent(`[${type || 'Inquiry'}] from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nType: ${type}\n\n${message}`)
    window.location.href = `mailto:devuttkarsh@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }



  return (
    <footer ref={sectionRef} id="contact" className="py-40 px-6 relative overflow-hidden">


      {/* Cinematic ambient orbs */}
      <motion.div
        style={{ y: orb1Y }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-blue-600 blur-[180px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: orb2Y }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.04, 0.1, 0.04] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-indigo-600 blur-[160px] rounded-full pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-20">
        {/* Headline Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center mb-24"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-blue-400/60 mb-6 block font-medium">Available for new opportunities</span>
          <h2
            className="text-6xl md:text-9xl tracking-tighter mb-8 leading-[0.85]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Let's build something <br />
            <em className="not-italic text-muted-foreground/60">legendary.</em>
          </h2>
          <p className="text-muted-foreground text-xl font-light max-w-xl mx-auto opacity-70 leading-relaxed">
            Have a project in mind or just want to chat? Fill out the form below or scan the QR code for a direct line.
          </p>
        </motion.div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* --- Polished Query Form (Col 7) --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-7"
          >
            <div className="liquid-glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
              {/* Animated Inner Background Sparkle */}
              <motion.div 
                animate={{ opacity: [0.03, 0.08, 0.03] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 pointer-events-none"
              />

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center min-h-[400px] text-center gap-6"
                    >
                      <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <CheckCircle size={36} className="text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-light mb-2">Message Prepared</h3>
                        <p className="text-muted-foreground/60 max-w-xs mx-auto">
                          Your mail app should be open now. Click send there to finalize our connection!
                        </p>
                      </div>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-[11px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors border-b border-white/10 pb-1"
                      >
                        Send another query
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      onSubmit={handleSubmit} 
                      className="flex flex-col gap-8"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <motion.div custom={0} variants={formVariants} initial="hidden" animate="visible" className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 flex items-center gap-2">
                            <User size={12} className="text-blue-500/50" /> Name
                          </label>
                          <input
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={inputClass}
                          />
                        </motion.div>
                        <motion.div custom={1} variants={formVariants} initial="hidden" animate="visible" className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 flex items-center gap-2">
                            <Mail size={12} className="text-blue-500/50" /> Email
                          </label>
                          <input
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className={inputClass}
                          />
                        </motion.div>
                      </div>

                      <motion.div custom={2} variants={formVariants} initial="hidden" animate="visible" className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 flex items-center gap-2">
                          <Briefcase size={12} className="text-blue-500/50" /> Project Type
                        </label>
                        <div className="relative">
                          <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            className={inputClass + ' cursor-pointer appearance-none pr-10'}
                          >
                            <option value="" disabled className="bg-[#020a13]">Select a project type</option>
                            <option value="Frontend Engineering" className="bg-[#020a13]">Frontend Engineering</option>
                            <option value="Full-Stack Product" className="bg-[#020a13]">Full-Stack Product</option>
                            <option value="Visual & Motion Design" className="bg-[#020a13]">Visual & Motion Design</option>
                            <option value="AI Implementation" className="bg-[#020a13]">AI Implementation</option>
                            <option value="Just Saying Hi" className="bg-[#020a13]">Just Saying Hi 👋</option>
                          </select>
                          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                            <ExternalLink size={14} />
                          </div>
                        </div>
                      </motion.div>

                      <motion.div custom={3} variants={formVariants} initial="hidden" animate="visible" className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 flex items-center gap-2">
                          <MessageSquare size={12} className="text-blue-500/50" /> Message
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="What can we create together?"
                          className={inputClass + ' resize-none min-h-[140px]'}
                        />
                      </motion.div>

                      <motion.button
                        custom={4}
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        type="submit"
                        whileHover={{ scale: 1.01, boxShadow: "0 0 20px rgba(59, 130, 246, 0.1)" }}
                        whileTap={{ scale: 0.99 }}
                        className="mt-4 flex items-center justify-center gap-3 rounded-2xl px-10 py-5 text-sm font-medium text-white bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/20 hover:border-blue-500/40 transition-all group overflow-hidden relative"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                        />
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <span className="tracking-[0.1em] uppercase">Initialize Connection</span>
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* --- Right Info Block (Col 5) --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1], delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-8 h-full"
          >
            {/* Highly Polished QR Card */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="liquid-glass p-10 rounded-[2.5rem] border border-white/5 flex flex-col items-center gap-8 text-center relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Globe size={40} className="text-white" />
              </div>
              
              <div className="relative">
                {/* Floating Glow Effect behind QR */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"
                />
                <div className="liquid-glass p-6 rounded-[2rem] border border-white/10 relative z-10">
                  <img
                    src={QR_URL}
                    alt="Direct contact QR code"
                    width={180}
                    height={180}
                    className="rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-2xl"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-light mb-2">Feeling Lazy?</h4>
                <p className="text-sm text-muted-foreground/60 leading-relaxed max-w-[240px]">
                  Scan to instantly open your mail app with my address pre-filled.
                </p>
              </div>
            </motion.div>

            {/* Direct Connect & Socials */}
            <div className="liquid-glass p-10 rounded-[2.5rem] border border-white/5 flex-grow">
              <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/40 mb-4 block">Direct Connect</span>
              <motion.a
                href="mailto:devuttkarsh@gmail.com"
                whileHover={{ x: 10 }}
                className="text-2xl md:text-3xl font-light hover:text-blue-400 transition-all duration-300 group block mb-10"
              >
                devuttkarsh<span className="text-muted-foreground/40">@</span>gmail.com
                <motion.span className="inline-block ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                   <ArrowDownLeft size={20} className="inline rotate-180" />
                </motion.span>
              </motion.a>

              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/40 mb-4 block">Digital Presence</span>
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'GitHub', icon: <GitBranch size={16} />, href: '#' },
                    { label: 'LinkedIn', icon: <Globe size={16} />, href: '#' },
                    { label: 'Twitter', icon: <ExternalLink size={16} />, href: '#' }
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 text-muted-foreground/60 hover:text-white transition-colors"
                    >
                      <div className="p-2 rounded-xl bg-white/5">{social.icon}</div>
                      <span className="text-sm tracking-widest uppercase font-light">{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Branding Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-32 pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40 font-medium">Designed & Engineered by</span>
            <span className="text-xs tracking-tighter font-medium underline underline-offset-4 decoration-blue-500/30">Uttkarsh</span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/20 flex gap-8">
            <span>© 2024 Project Odyssey</span>
            <span className="hidden md:inline">V0.9.4a Cinematic Release</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

const ArrowDownLeft = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="17" y1="7" x2="7" y2="17"></line>
    <polyline points="17 17 7 17 7 7"></polyline>
  </svg>
)

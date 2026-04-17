import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { GitBranch, Globe, ExternalLink, Send, CheckCircle } from 'lucide-react'

const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=mailto:devuttkarsh@gmail.com&bgcolor=020a13&color=ffffff&qzone=2&margin=0`

const inputClass = `
  w-full bg-white/[0.03] border border-white/8 rounded-2xl px-5 py-4 text-sm text-white
  placeholder:text-muted-foreground/40 focus:outline-none focus:border-white/20 focus:bg-white/[0.05]
  transition-all duration-300
`

export const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const orb1Y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"])

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
      {/* Cosmic ambient orbs */}
      <motion.div
        style={{ y: orb1Y }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600 blur-[160px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: orb2Y }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-indigo-600 blur-[140px] rounded-full pointer-events-none"
      />

      <div className="max-w-5xl mx-auto relative z-20">

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60 mb-6 block">
            Let's Collaborate
          </span>
          <h2
            className="text-5xl md:text-8xl tracking-tighter mb-6 leading-[0.9]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Let's build something <br />
            <em className="not-italic text-muted-foreground">legendary.</em>
          </h2>
          <p className="text-muted-foreground text-lg font-light max-w-md mx-auto opacity-70">
            Have a project in mind? Let's talk. Whether it's a quick idea or a full product build — I'm all ears.
          </p>
        </motion.div>

        {/* Two-column: Query Form + QR / Email */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">

          {/* --- Query Form --- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="liquid-glass p-8 md:p-10 rounded-[2rem] border border-white/5 h-full">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 mb-6 block">
                Send a Query
              </span>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-64 gap-4 text-center"
                >
                  <CheckCircle size={40} className="text-emerald-400" />
                  <p className="text-lg font-light">Your mail app should be open.</p>
                  <p className="text-sm text-muted-foreground/60">Hit send and I'll get back to you soon!</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-[11px] uppercase tracking-widest text-muted-foreground/50 hover:text-white transition-colors"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground/50">Name</label>
                      <input
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground/50">Email</label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground/50">Project Type</label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className={inputClass + ' cursor-pointer appearance-none'}
                    >
                      <option value="" disabled className="bg-[#020a13]">Select a type</option>
                      <option value="Frontend Development" className="bg-[#020a13]">Frontend Development</option>
                      <option value="Full-Stack Project" className="bg-[#020a13]">Full-Stack Project</option>
                      <option value="UI/UX Design" className="bg-[#020a13]">UI/UX Design</option>
                      <option value="Creative / Motion" className="bg-[#020a13]">Creative / Motion</option>
                      <option value="Freelance Collab" className="bg-[#020a13]">Freelance Collab</option>
                      <option value="Just Saying Hi" className="bg-[#020a13]">Just Saying Hi 👋</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground/50">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      className={inputClass + ' resize-none'}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="liquid-glass mt-2 flex items-center justify-center gap-3 rounded-2xl px-8 py-4 text-sm text-white border border-white/10 hover:border-white/20 transition-colors group"
                  >
                    <Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <span className="tracking-wide">Send Message</span>
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* --- QR + Email block --- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-8"
          >
            {/* QR Card */}
            <div className="liquid-glass p-8 rounded-[2rem] border border-white/5 flex flex-col items-center gap-6 text-center">
              <div className="relative group">
                <motion.div
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-2xl border border-blue-500/20 pointer-events-none"
                />
                <img
                  src={QR_URL}
                  alt="QR code — scan to email devuttkarsh@gmail.com"
                  width={160}
                  height={160}
                  className="rounded-xl opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-light mb-1">Feeling lazy? Just scan 📩</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground/40">Opens your mail app directly</p>
              </div>
            </div>

            {/* Direct email */}
            <div className="liquid-glass p-8 rounded-[2rem] border border-white/5">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50 mb-3 block">Or drop a line</span>
              <motion.a
                href="mailto:devuttkarsh@gmail.com"
                whileHover={{ letterSpacing: "0.02em" }}
                className="text-xl font-light hover:text-muted-foreground transition-all duration-300 underline underline-offset-8 decoration-white/15 hover:decoration-white/40 block mb-6"
              >
                devuttkarsh@gmail.com
              </motion.a>
              <div className="flex items-center gap-6">
                <a href="#" aria-label="GitHub" className="flex items-center gap-2 text-muted-foreground/50 hover:text-white transition-colors">
                  <GitBranch size={14} />
                  <span className="text-[10px] uppercase tracking-widest">GitHub</span>
                </a>
                <a href="#" aria-label="LinkedIn" className="flex items-center gap-2 text-muted-foreground/50 hover:text-white transition-colors">
                  <Globe size={14} />
                  <span className="text-[10px] uppercase tracking-widest">LinkedIn</span>
                </a>
                <a href="#" aria-label="Resume" className="flex items-center gap-2 text-muted-foreground/50 hover:text-white transition-colors">
                  <ExternalLink size={14} />
                  <span className="text-[10px] uppercase tracking-widest">Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground/30 border-t border-white/5 pt-8 gap-4"
        >
          <span>Uttkarsh © 2024</span>
          <span>Built with React + Vite + Framer Motion</span>
        </motion.div>
      </div>
    </footer>
  )
}

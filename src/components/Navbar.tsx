export const Navbar = () => {
  return (
    <nav className="relative z-10 max-w-7xl mx-auto px-8 py-6 flex flex-row justify-between items-center text-foreground">
      <div className="text-3xl tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
        Uttkarsh<sup className="text-xs">®</sup>
      </div>
      
      <div className="hidden md:flex gap-10 items-center">
        <a href="#projects" className="text-sm text-foreground transition-colors">Projects</a>
        <a href="#stack" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Arsenal</a>
        <a href="#experience" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Experience</a>
        <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
      </div>

      <a href="#contact" className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform">
        Hire Me
      </a>
    </nav>
  )
}

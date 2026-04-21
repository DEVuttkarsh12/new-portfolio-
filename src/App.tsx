import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Projects, type Project } from "./components/Projects"
import { Stack } from "./components/Stack"
import { About } from "./components/About"
import { Footer } from "./components/Footer"
import { CosmicBackground } from "./components/CosmicBackground"
import { Loader } from "./components/Loader"
import { CustomCursor } from "./components/CustomCursor"
import { ProjectDetail } from "./components/ProjectDetail"

function App() {
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence>
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <main key="main" className="min-h-screen relative overflow-x-hidden film-grain cinematic-vignette">
            <CosmicBackground />
            
            <div className="fixed top-0 left-0 right-0 z-50">
              <Navbar />
            </div>

            <AnimatePresence mode="sync">
              <Hero />
              <Projects onSelectProject={setSelectedProject} />
              <Stack />
              <About />
              <Footer />
            </AnimatePresence>

            <AnimatePresence>
              {selectedProject && (
                <ProjectDetail 
                  project={selectedProject} 
                  onBack={() => setSelectedProject(null)} 
                  onSelectProject={setSelectedProject}
                  key="project-detail"
                />
              )}
            </AnimatePresence>
          </main>
        )}
      </AnimatePresence>
    </>
  )
}

export default App

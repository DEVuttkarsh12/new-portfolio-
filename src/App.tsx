import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Projects } from "./components/Projects"
import { Stack } from "./components/Stack"
import { About } from "./components/About"
import { Footer } from "./components/Footer"
import { CosmicBackground } from "./components/CosmicBackground"

function App() {
  return (
    <main className="min-h-screen relative overflow-x-hidden film-grain cinematic-vignette">
      <CosmicBackground />
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <Hero />
      <Projects />
      <Stack />
      <About />
      <Footer />
    </main>
  )
}

export default App

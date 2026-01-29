import {
  Navigation,
  Hero,
  Projects,
  Experience,
  Contact,
  Footer,
  GlobeScene,
} from "@/components";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050506] text-white">
      <GlobeScene />
      <Navigation />
      <Projects />
      <Hero />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}

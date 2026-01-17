import { Navigation, Hero, Projects, Experience, Contact, Footer } from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050506] text-white">
      <Navigation />
      <Hero />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}

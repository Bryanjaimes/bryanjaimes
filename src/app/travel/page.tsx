"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const TravelGoogleEarth = dynamic(() => import("@/components/TravelGoogleEarth"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] md:h-[700px] flex items-center justify-center">
      <div className="text-zinc-400">Loading globe...</div>
    </div>
  ),
});

// Countries organized by region
const travelData = {
  visited: [
    { name: "United States", flag: "🇺🇸" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "South Korea", flag: "🇰🇷" },
    { name: "Japan", flag: "🇯🇵" },
    { name: "Puerto Rico", flag: "🇵🇷" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "France", flag: "🇫🇷" },
    { name: "Luxembourg", flag: "🇱🇺" },
    { name: "El Salvador", flag: "🇸🇻" },
    { name: "Guatemala", flag: "🇬🇹" },
  ],
};

export default function TravelPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0a1628] to-[#0a0a0a]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-white hover:text-emerald-400 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portfolio
          </Link>
          <h1 className="text-white font-semibold">Travel Map</h1>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </nav>

      {/* Globe Section */}
      <section className="pt-32 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass-card rounded-3xl overflow-hidden"
          >
            <TravelGoogleEarth />
          </motion.div>
        </div>
      </section>

      {/* Country Lists */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          {/* Visited Countries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-4 h-4 rounded-full bg-emerald-500" />
              <h2 className="text-2xl font-bold text-white">Places I&apos;ve Been</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {travelData.visited.map((country) => (
                <div
                  key={country.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <span className="text-white">{country.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-zinc-500 text-sm">
        </div>
      </footer>
    </main>
  );
}

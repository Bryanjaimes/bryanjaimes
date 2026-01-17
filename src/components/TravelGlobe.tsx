"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Countries you've visited
const visitedCountries = [
  "United States",
  "Mexico",
  "Canada",
];

// Country data with coordinates
const countries = [
  { name: "United States", lat: 39.8, lng: -98.5, region: "North America" },
  { name: "Canada", lat: 56.1, lng: -106.3, region: "North America" },
  { name: "Mexico", lat: 23.6, lng: -102.5, region: "North America" },
  { name: "Costa Rica", lat: 9.7, lng: -83.8, region: "Central America" },
  { name: "Cuba", lat: 21.5, lng: -77.8, region: "Caribbean" },
  { name: "Brazil", lat: -14.2, lng: -51.9, region: "South America" },
  { name: "Argentina", lat: -38.4, lng: -63.6, region: "South America" },
  { name: "Colombia", lat: 4.6, lng: -74.3, region: "South America" },
  { name: "Peru", lat: -9.2, lng: -75.0, region: "South America" },
  { name: "Chile", lat: -35.7, lng: -71.5, region: "South America" },
  { name: "United Kingdom", lat: 55.4, lng: -3.4, region: "Europe" },
  { name: "France", lat: 46.2, lng: 2.2, region: "Europe" },
  { name: "Germany", lat: 51.2, lng: 10.4, region: "Europe" },
  { name: "Spain", lat: 40.5, lng: -3.7, region: "Europe" },
  { name: "Italy", lat: 41.9, lng: 12.6, region: "Europe" },
  { name: "Portugal", lat: 39.4, lng: -8.2, region: "Europe" },
  { name: "Netherlands", lat: 52.1, lng: 5.3, region: "Europe" },
  { name: "Switzerland", lat: 46.8, lng: 8.2, region: "Europe" },
  { name: "Norway", lat: 60.5, lng: 8.5, region: "Europe" },
  { name: "Sweden", lat: 60.1, lng: 18.6, region: "Europe" },
  { name: "Iceland", lat: 65.0, lng: -19.0, region: "Europe" },
  { name: "Greece", lat: 39.1, lng: 21.8, region: "Europe" },
  { name: "Turkey", lat: 39.0, lng: 35.2, region: "Middle East" },
  { name: "UAE", lat: 23.4, lng: 53.8, region: "Middle East" },
  { name: "Israel", lat: 31.0, lng: 34.9, region: "Middle East" },
  { name: "Japan", lat: 36.2, lng: 138.3, region: "Asia" },
  { name: "South Korea", lat: 35.9, lng: 127.8, region: "Asia" },
  { name: "China", lat: 35.9, lng: 104.2, region: "Asia" },
  { name: "Thailand", lat: 15.9, lng: 100.9, region: "Asia" },
  { name: "Vietnam", lat: 14.1, lng: 108.3, region: "Asia" },
  { name: "Singapore", lat: 1.4, lng: 103.8, region: "Asia" },
  { name: "India", lat: 20.6, lng: 79.0, region: "Asia" },
  { name: "Australia", lat: -25.3, lng: 133.8, region: "Oceania" },
  { name: "New Zealand", lat: -40.9, lng: 174.9, region: "Oceania" },
  { name: "South Africa", lat: -30.6, lng: 22.9, region: "Africa" },
  { name: "Egypt", lat: 26.8, lng: 30.8, region: "Africa" },
  { name: "Morocco", lat: 31.8, lng: -7.1, region: "Africa" },
  { name: "Kenya", lat: -0.02, lng: 37.9, region: "Africa" },
  { name: "Russia", lat: 61.5, lng: 105.3, region: "Asia" },
];

// Prepare marker data
const markerData = countries.map(c => ({
  ...c,
  visited: visitedCountries.includes(c.name),
  color: visitedCountries.includes(c.name) ? "#10b981" : "#3b82f6",
  size: 0.5,
}));

export default function TravelGlobe() {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [Globe, setGlobe] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<typeof markerData[0] | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 700 });

  // Dynamically import react-globe.gl (client-side only)
  useEffect(() => {
    import("react-globe.gl").then((mod) => {
      setGlobe(() => mod.default);
    });
  }, []);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.pointOfView({ lat: 20, lng: -30, altitude: 2.5 });
    }
  }, [Globe]);

  const visitedCount = visitedCountries.length;
  const percentVisited = Math.round((visitedCount / 195) * 100);

  return (
    <div ref={containerRef} className="relative w-full h-[650px] md:h-[750px] bg-[#000510]">
      {Globe && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          pointsData={markerData}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude={0.01}
          pointRadius={0.5}
          pointLabel={(d: any) => `
            <div style="background: rgba(0,0,0,0.85); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2);">
              <b style="color: white;">${d.name}</b>
              <span style="color: ${d.visited ? '#10b981' : '#3b82f6'}; margin-left: 8px;">
                ${d.visited ? '✓ Visited' : '○ Bucket List'}
              </span>
            </div>
          `}
          onPointClick={(point: any) => setSelectedCountry(point)}
          atmosphereColor="#4da6ff"
          atmosphereAltitude={0.15}
          enablePointerInteraction={true}
        />
      )}

      {!Globe && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-zinc-400">Loading Globe...</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="absolute top-6 left-6 glass-card rounded-2xl p-5">
        <h3 className="text-base font-semibold text-white mb-3">🌍 Travel Stats</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-zinc-400">Countries</span>
              <span className="text-emerald-400 font-mono font-semibold">{visitedCount} / 195</span>
            </div>
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                style={{ width: `${Math.max(percentVisited, 2)}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-zinc-500">{percentVisited}% explored</p>
        </div>
      </div>

      {selectedCountry && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-card rounded-2xl px-6 py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${selectedCountry.visited ? "bg-emerald-500" : "bg-blue-500"}`} />
              <span className="text-white text-lg font-semibold">{selectedCountry.name}</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-zinc-400">{selectedCountry.region}</span>
              <span className={selectedCountry.visited ? "text-emerald-400" : "text-blue-400"}>
                {selectedCountry.visited ? "✓ Visited" : "○ Bucket List"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-6 right-6 glass-card rounded-2xl p-4">
        <div className="space-y-2.5 text-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-zinc-300">Visited</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-zinc-300">Bucket List</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 text-xs text-zinc-500 text-right">
        <p>Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
}

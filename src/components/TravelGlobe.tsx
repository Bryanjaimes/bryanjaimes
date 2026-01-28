"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { GlobeMethods } from "react-globe.gl";

// Extract the type of the default export from react-globe.gl
type GlobeComponent = typeof import("react-globe.gl")["default"];

interface CountryProperties {
  NAME: string;
  ISO_A2?: string;
  [key: string]: unknown;
}

interface GeoJsonFeature {
  type: string;
  properties: CountryProperties;
  geometry: unknown;
}


// Countries you've visited
const visitedCountries = [
  "United States of America",
  "Canada",
  "South Korea",
  "Japan",
  "Puerto Rico",
  "Germany",
  "France",
  "Luxembourg",
  "El Salvador",
  "Guatemala",
];

const cities = [
  { name: "Boston", lat: 42.3601, lng: -71.0589 },
  { name: "New York City", lat: 40.7128, lng: -74.0060 },
  { name: "Mexico City", lat: 19.4326, lng: -99.1332 },
  { name: "Seoul", lat: 37.5665, lng: 126.9780 },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { name: "San Juan", lat: 18.4655, lng: -66.1057 },
  { name: "Berlin", lat: 52.5200, lng: 13.4050 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Luxembourg City", lat: 49.6116, lng: 6.1319 },
  { name: "San Salvador", lat: 13.6929, lng: -89.2182 },
  { name: "Guatemala City", lat: 14.6349, lng: -90.5069 },
];

export default function TravelGlobe() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [Globe, setGlobe] = useState<GlobeComponent | null>(null);
  const [hoveredPolygon, setHoveredPolygon] = useState<GeoJsonFeature | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 700 });
  const [countriesGeoJson, setCountriesGeoJson] = useState({ features: [] });

  const handlePolygonHover = (polygon: object | null) => {
    setHoveredPolygon(polygon as GeoJsonFeature | null);
  };

  // Dynamically import react-globe.gl (client-side only)
  useEffect(() => {
    import("react-globe.gl").then((mod) => {
      setGlobe(() => mod.default);
    });

    // Fetch countries GeoJSON
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountriesGeoJson);
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

  // Auto-rotate and Clouds
  useEffect(() => {
    if (globeRef.current) {
      // Config initial view
      globeRef.current.pointOfView({ lat: 20, lng: -30, altitude: 2.5 });
      globeRef.current.controls().autoRotate = false;
      globeRef.current.controls().autoRotateSpeed = 0.5;

      // Add Clouds Sphere
      const globeRadius = globeRef.current.getGlobeRadius();
      const cloudsRadius = globeRadius * 1.02; // Slightly larger than globe

      new THREE.TextureLoader().load(
        "//unpkg.com/three-globe/example/img/earth-clouds.png",
        (cloudsTexture) => {
          const clouds = new THREE.Mesh(
            new THREE.SphereGeometry(cloudsRadius, 75, 75),
            new THREE.MeshPhongMaterial({
              map: cloudsTexture,
              transparent: true,
              opacity: 0.8,
              blending: THREE.AdditiveBlending,
              side: THREE.DoubleSide
            })
          );
          
          if (globeRef.current) {
            globeRef.current.scene().add(clouds);
          }

          // Animate clouds (Removed to stop spinning)
          // (function animate() {
          //   clouds.rotation.y += 0.0002; 
          //   requestAnimationFrame(animate);
          // })();
        }
      );
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
          // specularImageUrl="//unpkg.com/three-globe/example/img/earth-water.png" 
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          
          pointsData={cities}
          pointLat="lat"
          pointLng="lng"
          pointColor={() => "#ffffff"}
          pointAltitude={0.02}
          pointRadius={0.4}
          pointLabel="name"
          
          polygonsData={countriesGeoJson.features}
          polygonAltitude={0.01}
          polygonCapColor={(obj: unknown) => {
             const d = obj as GeoJsonFeature;
             const isVisited = visitedCountries.includes(d.properties.NAME);
             const isHovered = d === hoveredPolygon;
             
             if (isHovered) return "rgba(255, 255, 255, 0.3)";
             if (isVisited) return "rgba(16, 185, 129, 0.6)"; // Emerald for visited
             return "rgba(255, 255, 255, 0)"; // Transparent for others
          }}
          polygonSideColor={() => "rgba(0, 0, 0, 0)"}
          polygonStrokeColor={() => "rgba(255, 255, 255, 0.1)"}
          polygonLabel={(obj: unknown) => {
            const d = (obj as GeoJsonFeature).properties;
            return `
            <div style="background: rgba(0,0,0,0.85); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2);">
              <b style="color: white; font-family: sans-serif;">${d.NAME}</b>
              ${visitedCountries.includes(d.NAME) ? 
                '<br><span style="color: #10b981; font-family: sans-serif; font-size: 0.8em;">✓ Visited</span>' : 
                ''}
            </div>
          `}}
          onPolygonHover={handlePolygonHover}
          
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

      {/* Legend */}
      <div className="absolute top-6 right-6 glass-card rounded-2xl p-4">
        <div className="space-y-2.5 text-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-zinc-300">Visited</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 text-xs text-zinc-500 text-right">
        <p>Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
}

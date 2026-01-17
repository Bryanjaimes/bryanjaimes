"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Simplified continent coordinates [lat, lon] - major landmass outlines
const continentData = {
  // North America
  northAmerica: [
    [60, -140], [70, -140], [70, -100], [60, -80], [50, -60], [45, -65],
    [40, -75], [30, -85], [25, -80], [25, -100], [30, -115], [35, -120],
    [45, -125], [55, -130], [60, -140]
  ],
  // South America
  southAmerica: [
    [10, -75], [5, -80], [-5, -80], [-15, -75], [-25, -65], [-35, -55],
    [-55, -70], [-55, -75], [-45, -75], [-35, -70], [-25, -70], [-15, -75],
    [-5, -70], [0, -50], [5, -60], [10, -75]
  ],
  // Europe
  europe: [
    [35, -10], [40, -5], [45, 0], [50, 5], [55, 10], [60, 10], [70, 25],
    [70, 30], [60, 30], [55, 20], [50, 15], [45, 15], [40, 20], [35, 25],
    [35, -10]
  ],
  // Africa
  africa: [
    [35, -5], [35, 10], [30, 30], [20, 40], [10, 50], [0, 45], [-10, 40],
    [-25, 35], [-35, 20], [-35, 15], [-25, 15], [-15, 10], [-5, 10],
    [5, -5], [15, -15], [25, -15], [35, -5]
  ],
  // Asia
  asia: [
    [70, 30], [75, 100], [70, 140], [60, 160], [50, 140], [40, 130],
    [35, 120], [25, 120], [20, 110], [10, 105], [5, 100], [10, 80],
    [25, 65], [35, 45], [40, 35], [50, 40], [60, 30], [70, 30]
  ],
  // Australia
  australia: [
    [-15, 130], [-20, 115], [-30, 115], [-35, 140], [-40, 145], [-35, 150],
    [-25, 155], [-15, 145], [-10, 140], [-15, 130]
  ]
};

// Convert lat/lon to 3D position on sphere
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return new THREE.Vector3(x, y, z);
}

function ContinentDots({ radius = 2.01 }: { radius?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const points = useMemo(() => {
    const allPoints: THREE.Vector3[] = [];
    
    // Generate dots along continent outlines
    Object.values(continentData).forEach(coords => {
      for (let i = 0; i < coords.length - 1; i++) {
        const start = coords[i];
        const end = coords[i + 1];
        
        // Interpolate points between each coordinate pair
        const steps = 8;
        for (let j = 0; j <= steps; j++) {
          const t = j / steps;
          const lat = start[0] + (end[0] - start[0]) * t;
          const lon = start[1] + (end[1] - start[1]) * t;
          allPoints.push(latLonToVector3(lat, lon, radius));
        }
      }
    });
    
    // Add fill dots for landmass
    Object.values(continentData).forEach(coords => {
      const minLat = Math.min(...coords.map(c => c[0]));
      const maxLat = Math.max(...coords.map(c => c[0]));
      const minLon = Math.min(...coords.map(c => c[1]));
      const maxLon = Math.max(...coords.map(c => c[1]));
      
      // Generate random points within bounding box
      for (let i = 0; i < 50; i++) {
        const lat = minLat + Math.random() * (maxLat - minLat);
        const lon = minLon + Math.random() * (maxLon - minLon);
        allPoints.push(latLonToVector3(lat, lon, radius));
      }
    });
    
    return allPoints;
  }, [radius]);
  
  const positions = useMemo(() => {
    const arr = new Float32Array(points.length * 3);
    points.forEach((point, i) => {
      arr[i * 3] = point.x;
      arr[i * 3 + 1] = point.y;
      arr[i * 3 + 2] = point.z;
    });
    return arr;
  }, [points]);
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });
  
  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <pointsMaterial
          transparent
          color="#10b981"
          size={0.03}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
        />
      </points>
    </group>
  );
}

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshBasicMaterial
        color="#3b82f6"
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  );
}

function GlobeGlow() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.03;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.1, 32, 32]} />
      <meshBasicMaterial
        color="#06b6d4"
        wireframe
        transparent
        opacity={0.05}
      />
    </mesh>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.5 + Math.random() * 2;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particles, 3));
    return geo;
  }, [particles]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
      ref.current.rotation.x = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        transparent
        color="#3b82f6"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </points>
  );
}

function NeuralNetwork() {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particles, 3));
    return geo;
  }, [particles]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        transparent
        color="#10b981"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
      />
    </points>
  );
}

export default function GlobeScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <Globe />
        <ContinentDots />
        <GlobeGlow />
        <ParticleField />
        <NeuralNetwork />
      </Canvas>
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050506]/80 via-transparent to-[#050506]/80" />
    </div>
  );
}

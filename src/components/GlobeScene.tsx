"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

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
        opacity={0.15}
      />
    </mesh>
  );
}

function Continents() {
  const groupRef = useRef<THREE.Group>(null);
  
  const continentLines = useMemo(() => {
    const radius = 2.01; // Slightly larger than globe radius
    const lines: THREE.Line[] = [];
    
    // Helper function to convert lat/lon to 3D coordinates
    const latLonToVector3 = (lat: number, lon: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };
    
    // Simplified continent outlines (lat, lon pairs)
    const continents = [
      // North America (simplified)
      [
        [70, -170], [70, -140], [60, -130], [50, -125], [40, -125], 
        [35, -120], [32, -115], [25, -110], [20, -105], [15, -95],
        [10, -85], [15, -80], [25, -80], [30, -85], [35, -90],
        [40, -95], [45, -95], [50, -100], [55, -105], [60, -110],
        [65, -120], [70, -130], [70, -140]
      ],
      // South America (simplified)
      [
        [10, -80], [5, -75], [0, -70], [-5, -75], [-10, -75],
        [-20, -70], [-30, -70], [-40, -72], [-50, -70], [-55, -68],
        [-55, -65], [-50, -60], [-40, -60], [-30, -55], [-20, -50],
        [-10, -50], [0, -55], [5, -60], [10, -70]
      ],
      // Europe (simplified)
      [
        [70, 20], [65, 10], [60, 5], [55, 5], [50, 0], [45, 5],
        [40, 10], [35, 15], [35, 25], [40, 30], [45, 35], [50, 30],
        [55, 25], [60, 30], [65, 40], [70, 50], [70, 30]
      ],
      // Africa (simplified)
      [
        [35, 10], [30, 5], [20, 10], [10, 15], [0, 20], [-10, 20],
        [-20, 25], [-30, 30], [-35, 25], [-35, 20], [-30, 15],
        [-20, 15], [-10, 10], [0, 10], [10, 5], [20, 0], [30, -5],
        [35, 0]
      ],
      // Asia (simplified)
      [
        [70, 60], [65, 50], [60, 60], [55, 70], [50, 80], [45, 90],
        [40, 100], [35, 110], [30, 120], [25, 125], [20, 120],
        [15, 110], [10, 100], [15, 95], [20, 90], [25, 85],
        [30, 80], [35, 75], [40, 70], [45, 65], [50, 60],
        [55, 55], [60, 50], [65, 55], [70, 65]
      ],
      // Australia (simplified)
      [
        [-10, 115], [-15, 120], [-20, 125], [-25, 130], [-30, 135],
        [-35, 140], [-38, 145], [-38, 150], [-35, 150], [-30, 145],
        [-25, 140], [-20, 135], [-15, 130], [-10, 125]
      ],
    ];
    
    continents.forEach((continent) => {
      const points: THREE.Vector3[] = [];
      continent.forEach(([lat, lon]) => {
        points.push(latLonToVector3(lat, lon));
      });
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: '#3b82f6',
        transparent: true,
        opacity: 0.4,
        linewidth: 2,
      });
      const line = new THREE.Line(geometry, material);
      lines.push(line);
    });
    
    return lines;
  }, []);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });
  
  return (
    <group ref={groupRef}>
      {continentLines.map((line, index) => (
        <primitive key={index} object={line} />
      ))}
    </group>
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
        <Continents />
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

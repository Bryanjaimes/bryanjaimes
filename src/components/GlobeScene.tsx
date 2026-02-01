"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TEXTURE_WIDTH = 2048;
const TEXTURE_HEIGHT = 1024;
const GLOBE_RADIUS = 2;
const WIREFRAME_OFFSET = 0.02;
const WIREFRAME_OPACITY = 0.08;

function createEarthTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = TEXTURE_WIDTH;
  canvas.height = TEXTURE_HEIGHT;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    // Fallback: return empty canvas if context creation fails
    return canvas;
  }
  
  // Ocean background - very dark, almost black
  ctx.fillStyle = '#050a14';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw simplified continents with bright, vivid green
  ctx.fillStyle = '#22ff88';
  
  // North America
  ctx.beginPath();
  ctx.ellipse(300, 280, 220, 280, 0.3, 0, Math.PI * 2);
  ctx.fill();
  
  // Greenland
  ctx.beginPath();
  ctx.ellipse(550, 150, 80, 90, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // South America
  ctx.beginPath();
  ctx.ellipse(420, 650, 140, 230, 0.2, 0, Math.PI * 2);
  ctx.fill();
  
  // Europe
  ctx.beginPath();
  ctx.ellipse(1020, 230, 180, 120, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Africa
  ctx.beginPath();
  ctx.ellipse(1120, 520, 200, 280, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Asia
  ctx.beginPath();
  ctx.ellipse(1520, 280, 340, 240, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // India subcontinent
  ctx.beginPath();
  ctx.ellipse(1420, 450, 90, 120, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Australia
  ctx.beginPath();
  ctx.ellipse(1680, 720, 150, 120, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Antarctica (bottom edge)
  ctx.beginPath();
  ctx.ellipse(1024, 950, 800, 100, 0, 0, Math.PI * 2);
  ctx.fill();
  
  return canvas;
}

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => {
    const canvas = createEarthTexture();
    return new THREE.CanvasTexture(canvas);
  }, []);

  useEffect(() => {
    // Cleanup texture on unmount
    return () => {
      texture.dispose();
    };
  }, [texture]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <>
      {/* Textured globe with continents */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshBasicMaterial
          map={texture}
        />
      </mesh>
      {/* Wireframe overlay for the tech aesthetic */}
      <mesh ref={wireframeRef}>
        <sphereGeometry args={[GLOBE_RADIUS + WIREFRAME_OFFSET, 64, 64]} />
        <meshBasicMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={WIREFRAME_OPACITY}
        />
      </mesh>
    </>
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

export default function GlobeScene() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/carina_nebula~orig.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.16), transparent 55%), radial-gradient(circle at 80% 30%, rgba(168,85,247,0.18), transparent 60%), linear-gradient(180deg, rgba(5,5,6,0.2) 0%, rgba(5,5,6,0.65) 70%, rgba(5,5,6,0.9) 100%)",
          backgroundBlendMode: "screen, screen, normal",
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
      </Canvas>
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050506]/80 via-transparent to-[#050506]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,5,6,0)_40%,rgba(5,5,6,0.75)_100%)]" />
    </div>
  );
}

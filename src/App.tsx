import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Fondo360() {
  const texture = useTexture('/360.jpg');
  
  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

function EsferaFlotante() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5; // Gira
      ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.5; // Flota
    }
  });

  return (
    <mesh ref={ref} position={[-2, 0, -3]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="hotpink" roughness={0.2} metalness={0.4} />
    </mesh>
  );
}

function ConoFlotante() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.5;
      ref.current.rotation.y += delta * 0.5;
      ref.current.position.y = Math.cos(state.clock.getElapsedTime() * 2) * 0.5; // Flota desfasado
    }
  });

  return (
    <mesh ref={ref} position={[2, 0, -3]}>
      <coneGeometry args={[1, 2, 32]} />
      <meshStandardMaterial color="cyan" roughness={0.2} metalness={0.4} />
    </mesh>
  );
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        
        {/* Luces */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1} />

        {/* Objetos en escena */}
        <Fondo360 />
        <EsferaFlotante />
        <ConoFlotante />

        {/* Control de cámara */}
        <OrbitControls enableZoom={true} />
        
      </Canvas>
    </div>
  );
}

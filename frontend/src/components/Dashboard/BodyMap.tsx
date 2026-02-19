import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

// A simple placeholder geometric human representation if a real GLTF is not available
// In a real app, we'd load a .gltf model of a human body
const HumanModel = () => {
    return (
        <group>
            {/* Head */}
            <mesh position={[0, 1.6, 0]}>
                <sphereGeometry args={[0.25, 32, 32]} />
                <meshStandardMaterial color="#38bdf8" roughness={0.3} />
            </mesh>
            {/* Torso */}
            <mesh position={[0, 0.8, 0]}>
                <cylinderGeometry args={[0.25, 0.15, 1.2, 32]} />
                <meshStandardMaterial color="#0ea5e9" roughness={0.3} transparent opacity={0.8} />
            </mesh>
             {/* Ribs Wireframe Hint */}
             <mesh position={[0, 1.0, 0]}>
                 <cylinderGeometry args={[0.26, 0.20, 0.6, 16]} />
                 <meshBasicMaterial color="white" wireframe opacity={0.3} transparent />
             </mesh>
        </group>
    );
};

export const BodyMap = () => {
  return (
    <div style={{ position: 'relative', height: '100%', minHeight: '400px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
          <Canvas camera={{ position: [0, 1, 4], fov: 40 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
                <HumanModel />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Suspense>
          </Canvas>
      </div>
      
      {/* Floating Labels matching reference */}

    </div>
  );
};

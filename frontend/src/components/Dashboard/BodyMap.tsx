import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
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
      <div style={{ position: 'absolute', top: '20%', right: '10%', background: 'white', padding: '0.5rem 1rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>Chest X-ray Analysis</div>
        <div style={{ fontSize: '0.7rem', color: '#22c55e', background: '#dcfce7', width: 'fit-content', padding: '2px 4px', borderRadius: '4px', marginTop: '2px' }}>Normal</div>
      </div>
    </div>
  );
};

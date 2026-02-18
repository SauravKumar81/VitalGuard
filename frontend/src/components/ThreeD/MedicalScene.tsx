import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import DNAHelix from './DNAHelix';
import { Suspense } from 'react';

const MedicalScene = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '500px' }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          <DNAHelix position={[0, 0, 0]} rotation={[0, 0, Math.PI / 6]} />
          
          <ContactShadows 
            position={[0, -5, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2} 
            far={4.5} 
          />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MedicalScene;

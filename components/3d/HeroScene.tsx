import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Stars, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingShard({ position, rotation, scale, speed = 1, thickness = 0.5 }: any) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.2;
      ref.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.1 * speed;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.5;
    }
  });

  return (
    <Float floatIntensity={2} rotationIntensity={1} speed={speed}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={thickness}
          thickness={thickness}
          chromaticAberration={2}
          anisotropy={1}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.5}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#f3e8ff"
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#030014"]} />
      <ambientLight intensity={0.5} />
      
      {/* Cinematic Spotlights */}
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        color="#7C3AED" /* Purple */
      />
      <spotLight
        position={[-10, -10, -10]}
        angle={0.15}
        penumbra={1}
        intensity={2}
        color="#EC4899" /* Pink */
      />
      <spotLight
        position={[0, 10, -10]}
        angle={0.2}
        penumbra={1}
        intensity={1.5}
        color="#3B5BDB" /* Blue */
      />

      {/* Abstract Glass Shards */}
      <FloatingShard position={[-3, 1, -2]} rotation={[0.5, 1, 0.2]} scale={1.5} speed={0.8} thickness={2} />
      <FloatingShard position={[3, -1, -3]} rotation={[-0.5, -1, -0.2]} scale={2} speed={0.6} thickness={1.5} />
      <FloatingShard position={[0, -2, -1]} rotation={[1, 0.5, 0.8]} scale={1} speed={1.2} thickness={1} />
      <FloatingShard position={[-4, -2, -5]} rotation={[0.1, 0.2, 0.3]} scale={2.5} speed={0.5} thickness={3} />
      <FloatingShard position={[4, 2, -4]} rotation={[0.8, -0.5, 0.1]} scale={1.2} speed={1.5} thickness={0.8} />

      {/* Atmospheric Dust / Stars */}
      <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={15} size={2} speed={0.4} opacity={0.5} color="#c4b5fd" />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <Scene />
      </Canvas>
      {/* Vignette fade over the 3D scene so text remains legible */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at center, transparent 0%, #030014 90%)'
      }} />
    </div>
  );
}

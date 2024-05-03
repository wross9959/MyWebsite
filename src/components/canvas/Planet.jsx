import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, MeshStandardMaterial } from "three";
import { OrbitControls, Preload, Html } from "@react-three/drei";
import CanvasLoader from "../Loader"; // Make sure the path is correct

const SpinningPlanet = ({ isMobile }) => {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, 'earth_texture.jpg'); // Path to your planet texture

  // Rotate the planet
  useFrame(() => {
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} scale={isMobile ? 0.5 : 1}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 3, 5]} intensity={1.5} />
    </mesh>
  );
};

const PlanetCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [10, 10, 10], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={true} maxPolarAngle={Math.PI} minPolarAngle={0} />
        <SpinningPlanet isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default PlanetCanvas;

import React, { useRef, useLayoutEffect } from 'react';
import { useScroll, Environment, ContactShadows, Float, Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Keyboard } from './Keyboard';
import gsap from 'gsap';

export function Scene() {
  const keyboardRef = useRef();
  const scroll = useScroll(); 
  const tl = useRef();

  useLayoutEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    // Initial positioning is left to Float container, but we move it visually using GSAP to right side
    keyboardRef.current.position.set(3.5, -0.5, 2.5);
    keyboardRef.current.rotation.set(0.5, -0.4, 0);

    // Transition 1: Page 1 -> Page 2 (T=0 to T=1) - Hot Swap
    // Rotate to show the exact side profile prominently.
    tl.current.to(keyboardRef.current.position, { x: -3.5, y: -0.5, z: 2, duration: 1, ease: "power2.inOut" }, 0);
    tl.current.to(keyboardRef.current.rotation, { x: 0.1, y: -1.6, z: 0.1, duration: 1, ease: "power2.inOut" }, 0);

    // Transition 2: Page 2 -> Page 3 (T=1 to T=2) - 16.8M Colors (Text Left = Keyboard Right)
    tl.current.to(keyboardRef.current.position, { x: 3, y: -1, z: 2, duration: 1, ease: "power3.inOut" }, 1);
    tl.current.to(keyboardRef.current.rotation, { x: 0.3, y: -0.8, z: 0.2, duration: 1, ease: "power3.inOut" }, 1);

    // Transition 3: Page 3 -> Page 4 (T=2 to T=3) - Aircraft Grade
    // The keyboard now explodes horizontally/diagonally and takes up more space, so we center it and move it back slightly.
    tl.current.to(keyboardRef.current.position, { x: -1, y: 0.5, z: -4, duration: 1, ease: "power2.inOut" }, 2);
    tl.current.to(keyboardRef.current.rotation, { x: 0.9, y: -0.1, z: 0.1, duration: 1, ease: "power2.inOut" }, 2);

    // Transition 4: Page 4 -> Page 5 (T=3 to T=4) - Zero Latency (Text Left = Keyboard Right)
    tl.current.to(keyboardRef.current.position, { x: 3, y: -2, z: 3, duration: 1, ease: "power3.inOut" }, 3);
    tl.current.to(keyboardRef.current.rotation, { x: 0.6, y: -0.6, z: -0.3, duration: 1, ease: "power3.inOut" }, 3);

    // Transition 5: Page 5 -> Page 6 (T=4 to T=5) - CTA (Text Center Bottom = Keyboard Center Top)
    tl.current.to(keyboardRef.current.position, { x: 0, y: 1.5, z: 0, duration: 1, ease: "power2.inOut" }, 4);
    tl.current.to(keyboardRef.current.rotation, { x: 0.8, y: Math.PI * 2.1, z: 0, duration: 1, ease: "power2.inOut" }, 4);

  }, []);

  useFrame(() => {
    if (tl.current) {
      tl.current.seek(scroll.offset * tl.current.duration());
    }
  });

  return (
    <>
      {/* VIBRANT GAMING LIGHTING */}
      <ambientLight intensity={1.5} color="#1a0033" />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={3} 
        color="#eefc54" 
        castShadow 
      />
      <directionalLight 
        position={[-10, 5, -5]} 
        intensity={2.5} 
        color="#9d4edd" 
      />
      {/* Multi-colored RGB Lighting to simulate the 16.8M Colors active glow */}
      <pointLight 
        position={[0, 1, 3]} 
        intensity={2.5} 
        color="#00ffff"
        distance={8}
      />
      <pointLight 
        position={[-3, 1, 2]} 
        intensity={2.5} 
        color="#ff00ff"
        distance={8}
      />
      <pointLight 
        position={[3, 1, 2]} 
        intensity={2.5} 
        color="#eefc54"
        distance={8}
      />

      {/* Cyberpunk/Gaming floating stars */}
      <Stars radius={50} depth={50} count={2000} factor={4} saturation={1} fade speed={2} />

      <group>
        <Float floatIntensity={1} rotationIntensity={0.5} speed={2}>
          <group ref={keyboardRef}>
            <Keyboard />
          </group>
        </Float>
      </group>
      
      {/* Intense dark shadow */}
      <ContactShadows 
        position={[0, -4, 0]} 
        opacity={0.9} 
        scale={30} 
        blur={2} 
        far={15} 
        resolution={1024} 
        color="#eefc54" /* neon shadow base */
      />
      
      {/* Studio Environment Map for reflections */}
      <Environment preset="city" />
    </>
  );
}

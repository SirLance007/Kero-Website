import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Box, useScroll, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const keyboardLayout = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
  [1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.2],
  [2.3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.7],
  [1.5, 1.5, 1.5, 6, 1.5, 1.5, 1.5],
];

export function Keyboard(props) {
  const group = useRef();
  const keycapsRef = useRef();
  const switchesRef = useRef();
  const plateRef = useRef();
  const plateFoamRef = useRef();
  const pcbRef = useRef();
  const caseFoamRef = useRef();
  const caseRef = useRef();
  
  const scroll = useScroll();

  // Audio Context for synthetic mechanical clicks
  const audioCtxRef = useRef(null);
  const lastClickTimeRef = useRef(0);

  useEffect(() => {
    // Only init inside an event listener to comply with Browser Autoplay rules
    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    };
    
    window.addEventListener('scroll', initAudio, { passive: true });
    window.addEventListener('pointerdown', initAudio);
    window.addEventListener('keydown', initAudio);
    
    return () => {
      window.removeEventListener('scroll', initAudio);
      window.removeEventListener('pointerdown', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
  }, []);
  
  const keys = useMemo(() => {
    const k = [];
    let zOffset = -2; // Start row from top
    const spacing = 0.55;
    
    keyboardLayout.forEach((row) => {
      let xOffset = -3.5; 
      row.forEach((width) => {
        k.push({
          position: [xOffset + (width * spacing) / 2 - 0.25, 0, zOffset],
          width: width * 0.45 + (width - 1) * 0.1, 
        });
        xOffset += width * spacing;
      });
      zOffset += spacing;
    });

    return k;
  }, []);

  const baseKeyMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    roughness: 0.2,
    metalness: 0.1,
  }), []);

  const lightPurpleMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#8a4baf',
    roughness: 0.2,
    metalness: 0.1,
  }), []);

  const darkPurpleMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#2a1142',
    roughness: 0.2,
    metalness: 0.1,
  }), []);

  const switchStemMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#8a4baf',  // purple stem
    transparent: true,
    opacity: 0.9,
    metalness: 0.1,
    roughness: 0.2,
    transmission: 0.5,
  }), []);

  const switchHousingMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.5,
    roughness: 0.1,
    transmission: 0.9,
    thickness: 0.5,
  }), []);

  const plateMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#dddddd', // silver/white plate
    metalness: 0.8,
    roughness: 0.4,
  }), []);

  const plateFoamMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#333333', // dark grey poron foam
    roughness: 0.9,
    metalness: 0,
  }), []);

  const pcbMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#ffffff', // white PCB
    metalness: 0.2,
    roughness: 0.8,
  }), []);

  const caseFoamMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#8a4baf', // Gamer purple dampening pad
    roughness: 0.7,
    metalness: 0.1,
  }), []);

  const caseMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#f8f8f8', // Off-white case
    roughness: 0.5,
    metalness: 0.1,
  }), []);

  const batteryMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#222222', // Dark battery block
    roughness: 0.5,
  }), []);

  const knobMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#eeeeee',
    metalness: 0.9,
    roughness: 0.2,
    clearcoat: 0.5,
  }), []);

  useFrame((state) => {
    if (!scroll) return;
    
    // Page 2: Hot Swap (offset ~0.2)
    let hotSwapIntensity = 0;
    if (scroll.offset > 0.05 && scroll.offset < 0.35) {
      hotSwapIntensity = 1 - (Math.abs(scroll.offset - 0.2) / 0.15); // max 1 at 0.2
    }

    // Page 3: 16.8M Colors Wave (offset ~0.4)
    let waveIntensity = 0;
    if (scroll.offset > 0.25 && scroll.offset < 0.55) {
      waveIntensity = 1 - (Math.abs(scroll.offset - 0.4) / 0.15); // max 1 at 0.4
    }

    // Page 4: Aircraft Grade Explosion (offset ~0.6)
    let explodeIntensity = 0;
    if (scroll.offset > 0.45 && scroll.offset < 0.75) {
      explodeIntensity = 1 - (Math.abs(scroll.offset - 0.6) / 0.15); // max 1 at 0.6
    }
    
    // Smooth the intensities
    hotSwapIntensity = THREE.MathUtils.smoothstep(hotSwapIntensity, 0, 1);
    waveIntensity = THREE.MathUtils.smoothstep(waveIntensity, 0, 1);
    explodeIntensity = THREE.MathUtils.smoothstep(explodeIntensity, 0, 1);

    const lerpFactor = 0.08;

    const lerpPos = (ref, tX, tY, tZ) => {
      if(!ref.current) return;
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, tX, lerpFactor);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, tY, lerpFactor);
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, tZ, lerpFactor);
    };

    const spread = explodeIntensity * 1.5;

    if (keycapsRef.current) {
      lerpPos(keycapsRef, -spread * 2.5, (hotSwapIntensity * 1.5) + (spread * 2.5), -spread * 1.0);
      
      // Individual key wave animation
      for (let i = 1; i < keycapsRef.current.children.length; i++) {
         const keycap = keycapsRef.current.children[i];
         const keyData = keys[i - 1]; // Offset by 1 because knob is child 0
         if (keyData) {
            // Typing effect wave (pushing down)
            const wave = Math.sin(state.clock.elapsedTime * 8 + keyData.position[0] * 1.5 - keyData.position[2] * 0.5) * 0.15;
            const downwardWave = Math.min(0, wave); // keys only press downwards
            const targetKeyY = downwardWave * waveIntensity;
            keycap.position.y = THREE.MathUtils.lerp(keycap.position.y, targetKeyY, 0.2);

            // Animate the switch stem underneath so they don't overlap!
            if (switchesRef.current && switchesRef.current.children[i - 1]) {
                const switchAssembly = switchesRef.current.children[i - 1];
                if (switchAssembly.children.length > 1) {
                    const stem = switchAssembly.children[1];
                    // Base stem position is 0.05
                    stem.position.y = THREE.MathUtils.lerp(stem.position.y, 0.05 + targetKeyY, 0.2);
                }
            }
         }
      }
      
      // Play synthetic mechanical clicks during the wave animation typing effect
      if (waveIntensity > 0.05 && audioCtxRef.current && audioCtxRef.current.state === 'running') {
          const now = state.clock.elapsedTime;
          // Trigger clicks at randomized mechanical-speed intervals
          if (now - lastClickTimeRef.current > (0.04 + Math.random() * 0.06)) {
              lastClickTimeRef.current = now;
              
              const osc = audioCtxRef.current.createOscillator();
              const gain = audioCtxRef.current.createGain();
              
              // Thocky/clicky mechanical sound parameters
              osc.type = 'sine'; // 'sine' provides a solid 'thud/thock' while 'square' is a sharper 'click'
              osc.frequency.setValueAtTime(600 + Math.random() * 200, audioCtxRef.current.currentTime);
              osc.frequency.exponentialRampToValueAtTime(50, audioCtxRef.current.currentTime + 0.03);
              
              gain.gain.setValueAtTime(0.08 * waveIntensity, audioCtxRef.current.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.03);
              
              osc.connect(gain);
              gain.connect(audioCtxRef.current.destination);
              
              osc.start();
              osc.stop(audioCtxRef.current.currentTime + 0.03);
          }
      }
    }

    lerpPos(switchesRef, -spread * 1.5, (hotSwapIntensity * 0.5) + (spread * 1.5), -spread * 0.5);
    lerpPos(plateRef, -spread * 0.5, spread * 0.5, 0);
    lerpPos(plateFoamRef, spread * 0.2, 0, spread * 0.3);
    lerpPos(pcbRef, spread * 1.0, -spread * 0.5, spread * 0.6);
    lerpPos(caseFoamRef, spread * 1.8, -spread * 1.0, spread * 0.9);
    lerpPos(caseRef, spread * 2.5, (hotSwapIntensity * -0.5) + (-spread * 1.5), spread * 1.2);
  });

  return (
    <group ref={group} {...props}>
      <group ref={keycapsRef}>
        {/* The Knob cap sits on the top layer with the keycaps */}
        <Cylinder args={[0.3, 0.3, 0.25, 32]} position={[4.0, -0.1, -2.0]} rotation={[0, 0, 0]} castShadow receiveShadow material={knobMaterial} />
        
        {keys.map((keyData, i) => {
          const darkPurpleIndices = [0, 5, 7, 26, 39, 51, 52, 55, 58];
          const lightPurpleIndices = [6, 8, 13, 27, 40, 53, 54, 56, 57];
          
          let mat = baseKeyMaterial;
          if (darkPurpleIndices.includes(i)) mat = darkPurpleMaterial;
          else if (lightPurpleIndices.includes(i)) mat = lightPurpleMaterial;

          return (
            <RoundedBox 
              key={`keycap-${i}`} 
              args={[keyData.width, 0.25, 0.45]} 
              position={keyData.position}
              radius={0.05}
              smoothness={4}
              material={mat}
              castShadow
              receiveShadow
            />
          );
        })}
      </group>

      <group ref={switchesRef}>
        {keys.map((keyData, i) => {
           return (
             <group key={`switch-${i}`} position={[keyData.position[0], -0.225, keyData.position[2]]}>
               <Box args={[0.35, 0.2, 0.35]} material={switchHousingMaterial} castShadow receiveShadow />
               <Cylinder args={[0.08, 0.08, 0.25, 16]} position={[0, 0.05, 0]} material={switchStemMaterial} castShadow />
             </group>
           )
        })}
        {/* Rotary encoder sitting below the knob */}
        <group position={[4.0, -0.225, -2.0]}>
           <Box args={[0.4, 0.2, 0.4]} material={switchHousingMaterial} castShadow receiveShadow />
           <Cylinder args={[0.08, 0.08, 0.3, 16]} position={[0, 0.05, 0]} material={plateMaterial} castShadow />
        </group>
      </group>

      <group ref={plateRef}>
        <RoundedBox args={[8.2, 0.05, 2.8]} position={[0.2, -0.35, -0.9]} radius={0.02} smoothness={2} castShadow receiveShadow material={plateMaterial} />
        {/* Standard plate mount screws */}
        {[[-3.5, -2], [3.5, -2], [-3.5, 0], [3.5, 0], [-1, -1]].map((pos, i) => (
          <Cylinder key={`screw-${i}`} args={[0.04, 0.04, 0.06, 16]} position={[pos[0], -0.35, pos[1]]}>
             <meshStandardMaterial color="#888" metalness={0.8} />
          </Cylinder>
        ))}
      </group>

      <group ref={plateFoamRef}>
        <RoundedBox args={[8.15, 0.05, 2.75]} position={[0.2, -0.4, -0.9]} radius={0.02} smoothness={2} castShadow receiveShadow material={plateFoamMaterial} />
      </group>

      <group ref={pcbRef}>
        <RoundedBox args={[8.2, 0.05, 2.8]} position={[0.2, -0.45, -0.9]} radius={0.02} smoothness={2} castShadow receiveShadow material={pcbMaterial} />
        {keys.map((keyData, i) => (
          <Cylinder 
            key={`pcb-pad-${i}`} 
            args={[0.1, 0.1, 0.055, 16]} 
            position={[keyData.position[0], -0.45, keyData.position[2]]}
            rotation={[0, 0, 0]}
          >
            <meshStandardMaterial color="#dddddd" metalness={0.8} roughness={0.4} />
          </Cylinder>
        ))}
        {/* Knob PCB pad */}
        <Cylinder args={[0.2, 0.2, 0.055, 16]} position={[4.0, -0.45, -2.0]} rotation={[0, 0, 0]}>
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.4} />
        </Cylinder>
      </group>

      <group ref={caseFoamRef}>
        <RoundedBox args={[8.1, 0.15, 2.7]} position={[0.2, -0.55, -0.9]} radius={0.05} smoothness={2} castShadow receiveShadow material={caseFoamMaterial} />
      </group>

      <group ref={caseRef}>
        {/* Main case bottom without the overlapping detached walls */}
        <RoundedBox args={[8.5, 0.4, 3]} position={[0.2, -0.65, -0.9]} radius={0.15} smoothness={4} castShadow receiveShadow material={caseMaterial} />
        {/* Central battery / weight pack */}
        <Box args={[3.0, 0.1, 1.0]} position={[0.2, -0.6, -0.9]} castShadow receiveShadow material={batteryMaterial} />
      </group>
    </group>
  );
}

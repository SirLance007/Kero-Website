import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Loader } from '@react-three/drei';
import { Scene } from './components/Scene';
import { Overlay } from './components/Overlay';
import { Header } from './components/Header';
import './index.css';

function App() {
  return (
    <>
      <Header />
      
      {/* 3D Canvas Context */}
      <Canvas shadows camera={{ position: [0, 0, 15], fov: 30 }}>
        <color attach="background" args={['#09090b']} />
        
        {/* Fog to blend the floor/background */}
        <fog attach="fog" args={['#09090b', 10, 40]} />
        
        <Suspense fallback={null}>
          <ScrollControls pages={6} damping={0.25} distance={1.5}>
            <Scene />
            <Overlay />
          </ScrollControls>
        </Suspense>
      </Canvas>

      {/* Cyberpunk Loading Screen */}
      <Loader
        containerStyles={{ background: '#09090b' }}
        innerStyles={{ width: '300px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(238, 252, 84, 0.2)' }}
        barStyles={{ background: '#eefc54', height: '4px' }}
        dataStyles={{ color: '#eefc54', fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}
      />
    </>
  );
}

export default App;

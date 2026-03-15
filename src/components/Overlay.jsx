import React from 'react';
import { Scroll } from '@react-three/drei';

export function Overlay() {
  return (
    <Scroll html style={{ width: '100vw' }}>
      {/* Page 1 (0) */}
      <section className="overlay-page">
        <div className="title-container" style={{ alignItems: 'flex-start' }}>
          <h1 className="title" data-text="DOMINATE">DOMINATE</h1>
          <h1 className="title" data-text="THE GAME" style={{ color: 'var(--accent)', textShadow: 'none' }}>THE GAME</h1>
          <p className="subtitle">
            Next-gen mechanical switches. Aerospace-grade build. <br/>
            Unleash your true potential with KREO.
          </p>
          <a href="https://kreo-tech.com/collections/mechanical-keyboards" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ display: 'inline-block', textDecoration: 'none' }}>Buy Now</a>
        </div>
        
        <div className="scroll-indicator">
          <span>SCROLL</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Page 2 (1) */}
      <section className="overlay-page align-right">
        <div className="title-container">
          <h2 className="title" data-text="HOT-SWAP">HOT-SWAP</h2>
          <h2 className="title" data-text="SWITCHES" style={{ fontSize: '4rem', WebkitTextStroke: 'none' }}>SWITCHES</h2>
          <p className="subtitle">
            Customize your feel on the fly. Swap out switches without soldering. Red, Blue, or Brown - it's your battlefield.
          </p>
        </div>
      </section>

      {/* Page 3 (2) */}
      <section className="overlay-page align-left">
        <div className="title-container">
          <h2 className="title" data-text="16.8M">16.8M</h2>
          <h2 className="title" data-text="COLORS" style={{ color: 'var(--accent)', fontSize: '5rem' }}>COLORS</h2>
          <p className="subtitle">
            Per-key RGB lighting. Sync with your setup. Light up your victories with dynamic, customizable effects.
          </p>
        </div>
      </section>

      {/* Page 4 (3) */}
      <section className="overlay-page align-right">
        <div className="title-container">
          <h2 className="title" data-text="AIRCRAFT">AIRCRAFT</h2>
          <h2 className="title" data-text="GRADE" style={{ fontSize: '4.5rem' }}>GRADE</h2>
          <p className="subtitle">
            Machined from a solid block of aluminum. Zero flex. Absolute precision. Built to survive intense gaming sessions.
          </p>
          <div className="feature-grid">
            <div className="feature-box">
              <h4>Weight</h4>
              <p>1.24 kg</p>
            </div>
            <div className="feature-box">
              <h4>Material</h4>
              <p>Alu 6063</p>
            </div>
          </div>
        </div>
      </section>

      {/* Page 5 (4) */}
      <section className="overlay-page align-left">
        <div className="title-container">
          <h2 className="title" data-text="ZERO">ZERO</h2>
          <h2 className="title" data-text="LATENCY" style={{ color: 'var(--secondary)' }}>LATENCY</h2>
          <p className="subtitle">
            Tri-mode connectivity. 2.4GHz wireless for 1ms response time, Bluetooth 5.0, or wired USB-C for the ultimate edge.
          </p>
        </div>
      </section>

      {/* Page 6 (5) */}
      <section className="overlay-page align-center">
        <div className="title-container" style={{ alignItems: 'center' }}>
          <h2 className="title" data-text="JOIN THE">JOIN THE</h2>
          <h2 className="title" data-text="KREO ARMY" style={{ color: 'var(--accent)', paddingBottom: '2rem' }}>KREO ARMY</h2>
          <a href="https://kreo-tech.com/collections/mechanical-keyboards" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ display: 'inline-block', transform: 'scale(1.2)', textDecoration: 'none' }}>SECURE YOURS</a>
        </div>
      </section>
    </Scroll>
  );
}

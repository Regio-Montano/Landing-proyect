import React, { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 60;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

const ParticleField = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);

  const COLORS = [
    'rgba(0,102,255,',
    'rgba(0,163,255,',
    'rgba(212,175,55,',
    'rgba(255,215,0,',
    'rgba(255,255,255,',
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnParticle = () => ({
      x: randomBetween(0, canvas.width),
      y: canvas.height + 10,
      r: randomBetween(1, 3.5),
      speed: randomBetween(0.3, 1.2),
      drift: randomBetween(-0.4, 0.4),
      opacity: randomBetween(0.3, 0.8),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: randomBetween(0, Math.PI * 2),
    });

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      ...spawnParticle(),
      y: randomBetween(0, canvas.height),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.y -= p.speed;
        p.x += p.drift;
        p.pulse += 0.02;
        const alpha = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.shadowColor = `${p.color}0.8)`;
        ctx.shadowBlur = p.r * 4;
        ctx.fill();

        if (p.y < -20) {
          particlesRef.current[i] = spawnParticle();
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}
    />
  );
};

export default ParticleField;

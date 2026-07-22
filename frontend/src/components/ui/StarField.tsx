import React, { useEffect, useRef } from 'react';
import { useUIStore } from '../../store/uiStore';

interface Star {
  x: number;
  y: number;
  radius: number;
  color: string;
  glowColor: string;
  phase: number;
  speed: number;
  vx: number;
  vy: number;
  glow: boolean;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const starCount = 140; // Dense and rich particle count

    // Premium glowing colors: Cream sage, white, soft ice-blue, and violet/purple
    const colors = [
      { rgb: '230, 242, 221', hex: '#e6f2dd' }, // sage
      { rgb: '255, 255, 255', hex: '#ffffff' }, // white
      { rgb: '147, 197, 253', hex: '#93c5fd' }, // ice blue
      { rgb: '196, 181, 253', hex: '#c4b5fd' }  // violet
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        const colorObj = colors[Math.floor(Math.random() * colors.length)];
        const radius = 0.6 + Math.random() * 1.6; // Variety of sizes (0.6px to 2.2px)
        
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          color: colorObj.rgb,
          glowColor: colorObj.hex,
          phase: Math.random() * Math.PI * 2,
          speed: 0.01 + Math.random() * 0.02,
          vx: (Math.random() - 0.5) * 0.15, // Slow horizontal drift
          vy: -(0.08 + Math.random() * 0.15), // Slow upward vertical drift
          glow: Math.random() > 0.65 // 35% stars have glow
        });
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');
      const opacityScale = isDark ? 0.85 : 0.35; // Soften in light mode

      stars.forEach((star) => {
        // Animate drift & wrap around edges
        if (!prefersReducedMotion) {
          star.x += star.vx;
          star.y += star.vy;
          star.phase += star.speed;

          if (star.y < -10) {
            star.y = canvas.height + 10;
            star.x = Math.random() * canvas.width;
          }
          if (star.x < -10) star.x = canvas.width + 10;
          if (star.x > canvas.width + 10) star.x = -10;
        }

        const opacity = (0.15 + (Math.sin(star.phase) + 1) * 0.3) * opacityScale;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${opacity})`;

        if (star.glow && isDark) {
          ctx.shadowBlur = 3 + (Math.sin(star.phase) + 1) * 1.5;
          ctx.shadowColor = star.glowColor;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      mediaQuery.removeEventListener('change', handleMotionChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

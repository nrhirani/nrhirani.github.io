"use client";

import { useEffect, useRef } from "react";

// Matches the previous bg-hero-lines repeating-linear-gradient:
// repeating-linear-gradient(115deg, line 0-1px, transparent 1px-90px)
const ANGLE_DEG = 115;
const SPACING = 90; // px between lines, along the gradient axis
const SPEED = 14; // px/sec drift along the gradient axis
const LINE_COLOR = "rgba(255, 255, 255, 0.045)";

export default function HeroLines() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");

    const angleRad = (ANGLE_DEG * Math.PI) / 180;
    // Gradient direction vector (CSS angle convention: 0deg = up, clockwise)
    const gx = Math.sin(angleRad);
    const gy = -Math.cos(angleRad);
    // Stripe direction, perpendicular to the gradient axis
    const px = -gy;
    const py = gx;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = null;
    let start = null;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const draw = (offset) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 1;

      const cx = width / 2;
      const cy = height / 2;
      const half = Math.sqrt(width * width + height * height);

      // Project the four corners onto the gradient axis to find the
      // range of lines needed to fully cover the canvas.
      const corners = [
        [-cx, -cy],
        [width - cx, -cy],
        [-cx, height - cy],
        [width - cx, height - cy],
      ];
      const projections = corners.map(([x, y]) => x * gx + y * gy);
      const minProj = Math.min(...projections);
      const maxProj = Math.max(...projections);

      const kMin = Math.floor((minProj - offset) / SPACING) - 1;
      const kMax = Math.ceil((maxProj - offset) / SPACING) + 1;

      for (let k = kMin; k <= kMax; k++) {
        const d = k * SPACING + offset;
        const bx = cx + d * gx;
        const by = cy + d * gy;
        ctx.beginPath();
        ctx.moveTo(bx - px * half, by - py * half);
        ctx.lineTo(bx + px * half, by + py * half);
        ctx.stroke();
      }
    };

    const loop = (timestamp) => {
      if (start === null) start = timestamp;
      const elapsed = (timestamp - start) / 1000;
      const offset = (elapsed * SPEED) % SPACING;
      draw(offset);
      rafId = requestAnimationFrame(loop);
    };

    const handleResize = () => {
      resize();
      if (prefersReducedMotion) draw(0);
    };

    resize();
    window.addEventListener("resize", handleResize);

    if (prefersReducedMotion) {
      draw(0);
    } else {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

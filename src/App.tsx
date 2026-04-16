/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "motion/react";
import {
  Cpu,
  Code2,
  Globe,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ChevronRight,
  Terminal,
  Layers,
  Zap,
  Monitor,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";

// ─── USER DATA ───
const USER_DATA = {
  name: "Kartikey Singh",
  role: "AI/ML Engineer & Full-Stack Developer",
  bio: "B.Tech CSE student specializing in Artificial Intelligence and Machine Learning. Experienced in building Python-based tools and robust web applications with a focus on RESTful architectures and data-driven systems.",
  profileImage: "/profile.jpg",
  hardware: {
    primary: "High-Performance Workstation",
    specs: "Optimized for AI/ML Workloads",
    description: "Configured for local model training, data analysis using NumPy/Pandas, and full-stack backend development."
  },
  skills: [
    { name: "Machine Learning", icon: <Cpu className="w-4 h-4" />, level: "Specialist" },
    { name: "Backend Architecture", icon: <Terminal className="w-4 h-4" />, level: "Expert" },
    { name: "Full-Stack Dev", icon: <Code2 className="w-4 h-4" />, level: "Proficient" },
    { name: "Network Engineering", icon: <Zap className="w-4 h-4" />, level: "Certified" },
  ],
  projects: [
    {
      title: "NotaLink",
      desc: "A web-based academic note-sharing portal featuring REST API endpoints for secure file management and subject-based categorization.",
      tech: ["Flask", "SQLite", "JavaScript", "REST"],
      link: "https://github.com/kartikey-singh",
      featured: true
    },
    {
      title: "StegoSafe",
      desc: "An advanced information-hiding tool utilizing LSB steganography to securely embed and extract data within image payloads.",
      tech: ["Python", "Steganography", "Security"],
      link: "https://github.com/kartikey-singh"
    },
    {
      title: "ExamPrepBuddy",
      desc: "A modular CLI-based study optimization tool that automates plan organization and tracks completion metrics across multiple subjects.",
      tech: ["Python", "File I/O", "Modular Design"],
      link: "https://github.com/kartikey-singh"
    }
  ],
  contact: {
    email: "kartikeysingh2007@gmail.com",
    socials: [
      { name: "GitHub", icon: <Github className="w-5 h-5" />, link: "https://github.com/kartikey-singh" },
      { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, link: "https://linkedin.com/in/kartikey-singh" }
    ]
  }
};

// ─── CUSTOM CURSOR ───
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const followerX = useMotionValue(-100);
  const followerY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const followerConfig = { damping: 15, stiffness: 100 };

  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  const fx = useSpring(followerX, followerConfig);
  const fy = useSpring(followerY, followerConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
      followerX.set(e.clientX - 20);
      followerY.set(e.clientY - 20);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      <motion.div className="custom-cursor" style={{ x, y }} />
      <motion.div className="custom-cursor-follower" style={{ x: fx, y: fy }} />
    </>
  );
}

// ─── MAGNETIC WRAPPER ───
function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 40, stiffness: 80 });
  const springY = useSpring(y, { damping: 40, stiffness: 80 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((clientX - left - width / 2) * 0.35);
    y.set((clientY - top - height / 2) * 0.35);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }} className={cn("magnetic-area", className)}>
      {children}
    </motion.div>
  );
}

// ─── 3D TILT PROFILE PHOTO ───
function ProfilePhoto({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springRotateX = useSpring(rotateX, { damping: 20, stiffness: 150 });
  const springRotateY = useSpring(rotateY, { damping: 20, stiffness: 150 });
  const springScale = useSpring(scale, { damping: 20, stiffness: 200 });

  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, oklch(0.72 0.14 175 / 0.25) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const cx = (e.clientX - left) / width;
    const cy = (e.clientY - top) / height;
    rotateX.set((cy - 0.5) * -25);
    rotateY.set((cx - 0.5) * 25);
    glowX.set(cx * 100);
    glowY.set(cy * 100);
    scale.set(1.05);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <div className="relative" style={{ perspective: "1200px" }}>
      <div className="profile-glow" />
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          scale: springScale,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-[2rem] overflow-hidden group"
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-[2rem] z-10 pointer-events-none"
          style={{ background: glowBackground }}
        />

        {/* Shine effect on hover */}
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, oklch(1 0 0 / 0.06) 45%, oklch(1 0 0 / 0.12) 50%, oklch(1 0 0 / 0.06) 55%, transparent 60%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s ease-in-out infinite",
          }}
        />

        {/* The image */}
        <img
          src={src}
          alt="Profile"
          className="w-full h-full object-cover rounded-[2rem] relative z-0"
          style={{ transform: "translateZ(20px)" }}
        />

        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-background/80 to-transparent z-10 pointer-events-none" />
      </motion.div>

      {/* Floating decoration elements */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 z-30 flex items-center justify-center"
      >
        <Sparkles className="w-3.5 h-3.5 text-primary" />
      </motion.div>
      <motion.div
        animate={{ y: [6, -6, 6], rotate: [0, -3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/20 z-30"
      />
    </div>
  );
}

// ─── INTERACTIVE PARTICLE + ORB BACKGROUND ───
interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; baseSize: number; alpha: number; baseAlpha: number;
  color: string; life: number; maxLife: number;
}

interface Orb {
  x: number; y: number; baseX: number; baseY: number;
  vx: number; vy: number; radius: number; baseRadius: number;
  color: string; alpha: number; baseAlpha: number;
  pulseSpeed: number; pulsePhase: number;
  driftSpeed: number; driftAngle: number; driftRadius: number;
  mass: number; glowIntensity: number;
}

function InteractiveOrbBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, prevX: -1000, prevY: -1000 });
  const scrollRef = useRef(0);
  const orbsRef = useRef<Orb[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    // Soothing teal/emerald/deep blue palette
    const orbColors = [
      "0, 180, 160",    // teal
      "16, 185, 129",   // emerald
      "6, 182, 212",    // cyan
      "20, 184, 166",   // teal-400
      "45, 212, 191",   // teal-300
      "34, 197, 94",    // green-500
      "8, 145, 178",    // cyan-700
      "15, 118, 110",   // teal-700
      "22, 78, 99",     // cyan-900
      "4, 120, 87",     // emerald-800
    ];

    const particleColors = [
      "0, 180, 160",
      "16, 185, 129",
      "6, 182, 212",
      "45, 212, 191",
      "167, 243, 208",
    ];

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const createOrbs = (): Orb[] => {
      const orbs: Orb[] = [];
      const count = Math.min(20, Math.floor((width * height) / 60000));
      for (let i = 0; i < count; i++) {
        const baseRadius = 60 + Math.random() * 180;
        orbs.push({
          x: Math.random() * width, y: Math.random() * height,
          baseX: Math.random() * width, baseY: Math.random() * height,
          vx: 0, vy: 0, radius: baseRadius, baseRadius,
          color: orbColors[i % orbColors.length],
          alpha: 0.03 + Math.random() * 0.06,
          baseAlpha: 0.03 + Math.random() * 0.06,
          pulseSpeed: 0.2 + Math.random() * 0.6, pulsePhase: Math.random() * Math.PI * 2,
          driftSpeed: 0.1 + Math.random() * 0.25, driftAngle: Math.random() * Math.PI * 2,
          driftRadius: 40 + Math.random() * 120, mass: 0.5 + Math.random() * 1.5,
          glowIntensity: 0.4 + Math.random() * 0.4,
        });
      }
      // Large ambient orbs
      for (let i = 0; i < 5; i++) {
        const baseRadius = 250 + Math.random() * 350;
        orbs.push({
          x: Math.random() * width, y: Math.random() * height,
          baseX: Math.random() * width, baseY: Math.random() * height,
          vx: 0, vy: 0, radius: baseRadius, baseRadius,
          color: orbColors[Math.floor(Math.random() * orbColors.length)],
          alpha: 0.012 + Math.random() * 0.02,
          baseAlpha: 0.012 + Math.random() * 0.02,
          pulseSpeed: 0.08 + Math.random() * 0.15, pulsePhase: Math.random() * Math.PI * 2,
          driftSpeed: 0.04 + Math.random() * 0.08, driftAngle: Math.random() * Math.PI * 2,
          driftRadius: 20 + Math.random() * 60, mass: 2 + Math.random() * 2,
          glowIntensity: 0.25 + Math.random() * 0.25,
        });
      }
      return orbs;
    };

    const spawnParticles = (mx: number, my: number, speed: number) => {
      const count = Math.min(3, Math.floor(speed / 8));
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: mx + (Math.random() - 0.5) * 20,
          y: my + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: 1 + Math.random() * 2.5,
          baseSize: 1 + Math.random() * 2.5,
          alpha: 0.4 + Math.random() * 0.4,
          baseAlpha: 0.4 + Math.random() * 0.4,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          life: 0,
          maxLife: 60 + Math.random() * 80,
        });
      }
      // Cap particles
      if (particlesRef.current.length > 200) {
        particlesRef.current = particlesRef.current.slice(-150);
      }
    };

    // Ambient floating particles
    const createAmbientParticles = () => {
      for (let i = 0; i < 60; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -0.1 - Math.random() * 0.3,
          size: 0.5 + Math.random() * 1.5,
          baseSize: 0.5 + Math.random() * 1.5,
          alpha: 0.15 + Math.random() * 0.25,
          baseAlpha: 0.15 + Math.random() * 0.25,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          life: Math.random() * 200,
          maxLife: 200 + Math.random() * 300,
        });
      }
    };

    resize();
    orbsRef.current = createOrbs();
    createAmbientParticles();

    const onMouseMove = (e: MouseEvent) => {
      const prev = { ...mouseRef.current };
      mouseRef.current = { x: e.clientX, y: e.clientY, prevX: prev.x, prevY: prev.y };
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      if (speed > 3) spawnParticles(e.clientX, e.clientY, speed);
    };

    const onScroll = () => { scrollRef.current = window.scrollY; };
    const onMouseLeave = () => { mouseRef.current = { x: -1000, y: -1000, prevX: -1000, prevY: -1000 }; };

    const drawOrb = (orb: Orb) => {
      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
      gradient.addColorStop(0, `rgba(${orb.color}, ${orb.alpha * 2.2 * orb.glowIntensity})`);
      gradient.addColorStop(0.25, `rgba(${orb.color}, ${orb.alpha * 1.1})`);
      gradient.addColorStop(0.55, `rgba(${orb.color}, ${orb.alpha * 0.35})`);
      gradient.addColorStop(1, `rgba(${orb.color}, 0)`);
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      timeRef.current += 0.006;
      const t = timeRef.current;
      const mouse = mouseRef.current;
      const scroll = scrollRef.current;
      ctx.clearRect(0, 0, width, height);

      // Subtle ambient gradient
      const ambientGradient = ctx.createRadialGradient(width * 0.3, height * 0.3, 0, width * 0.5, height * 0.5, width * 0.7);
      ambientGradient.addColorStop(0, `rgba(0, 180, 160, 0.015)`);
      ambientGradient.addColorStop(0.5, `rgba(6, 182, 212, 0.008)`);
      ambientGradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
      ctx.fillStyle = ambientGradient;
      ctx.fillRect(0, 0, width, height);

      // Update & draw orbs
      for (const orb of orbsRef.current) {
        const driftX = Math.cos(t * orb.driftSpeed + orb.driftAngle) * orb.driftRadius;
        const driftY = Math.sin(t * orb.driftSpeed * 0.7 + orb.driftAngle + 1.5) * orb.driftRadius;
        const scrollOffset = scroll * (0.04 + orb.mass * 0.025);
        let targetX = orb.baseX + driftX;
        let targetY = orb.baseY + driftY - scrollOffset % (height * 2);
        if (targetY < -orb.radius * 2) targetY += height + orb.radius * 4;
        if (targetY > height + orb.radius * 2) targetY -= height + orb.radius * 4;

        const dx = mouse.x - orb.x;
        const dy = mouse.y - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 450;
        if (dist < interactionRadius && dist > 0) {
          const force = (1 - dist / interactionRadius);
          const forceStrength = force * force * 70;
          if (orb.baseRadius < 200) {
            targetX += (dx / dist) * forceStrength;
            targetY += (dy / dist) * forceStrength;
          } else {
            targetX -= (dx / dist) * forceStrength * 0.25;
            targetY -= (dy / dist) * forceStrength * 0.25;
          }
          orb.alpha = orb.baseAlpha + force * 0.06;
          orb.radius = orb.baseRadius + force * 50;
          orb.glowIntensity = 0.4 + force * 1.8;
        } else {
          orb.alpha += (orb.baseAlpha - orb.alpha) * 0.015;
          orb.radius += (orb.baseRadius - orb.radius) * 0.015;
          orb.glowIntensity += ((0.4 + Math.random() * 0.4) - orb.glowIntensity) * 0.008;
        }
        const pulse = Math.sin(t * orb.pulseSpeed + orb.pulsePhase) * 0.12 + 1;
        orb.radius *= pulse;
        orb.alpha *= (0.88 + pulse * 0.12);
        orb.vx += (targetX - orb.x) * 0.006;
        orb.vy += (targetY - orb.y) * 0.006;
        orb.vx *= 0.96;
        orb.vy *= 0.96;
        orb.x += orb.vx;
        orb.y += orb.vy;
        drawOrb(orb);
      }

      // Draw connections between nearby orbs
      ctx.lineWidth = 1;
      for (let i = 0; i < orbsRef.current.length; i++) {
        for (let j = i + 1; j < orbsRef.current.length; j++) {
          const a = orbsRef.current[i]; const b = orbsRef.current[j];
          const ddx = a.x - b.x; const ddy = a.y - b.y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < 380) {
            const opacity = (1 - dist / 380) * 0.05;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0, 180, 160, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      // Update & draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life++;
        if (p.life > p.maxLife) {
          // Respawn ambient particle
          p.x = Math.random() * width;
          p.y = height + 10;
          p.life = 0;
          p.maxLife = 200 + Math.random() * 300;
          p.vx = (Math.random() - 0.5) * 0.3;
          p.vy = -0.1 - Math.random() * 0.3;
          continue;
        }
        const lifeRatio = p.life / p.maxLife;
        const fadeIn = Math.min(1, p.life / 20);
        const fadeOut = lifeRatio > 0.7 ? 1 - ((lifeRatio - 0.7) / 0.3) : 1;
        const currentAlpha = p.baseAlpha * fadeIn * fadeOut;

        // Mouse attraction for particles
        if (mouse.x > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200 && dist > 0) {
            const force = (1 - dist / 200) * 0.02;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap around
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseSize * (0.5 + fadeOut * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.fill();
      }

      // Cursor glow
      if (mouse.x > 0 && mouse.y > 0) {
        const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 280);
        cursorGlow.addColorStop(0, `rgba(45, 212, 191, 0.04)`);
        cursorGlow.addColorStop(0.4, `rgba(0, 180, 160, 0.015)`);
        cursorGlow.addColorStop(1, `rgba(0, 0, 0, 0)`);
        ctx.fillStyle = cursorGlow;
        ctx.fillRect(mouse.x - 280, mouse.y - 280, 560, 560);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    const onResize = () => { resize(); orbsRef.current = createOrbs(); };
    window.addEventListener("resize", onResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "linear-gradient(145deg, #030712 0%, #041e1e 35%, #020c1b 65%, #030712 100%)" }} />
  );
}

// ─── SOFT REVEAL ANIMATION ───
function SoftReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", damping: 30, stiffness: 50, delay }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

// ─── FLOATING ACCENT SHAPES ───
function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-5 overflow-hidden">
      <motion.div
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[15%] right-[10%] w-32 h-32 border border-primary/5 rounded-full"
      />
      <motion.div
        animate={{ y: [15, -15, 15], x: [8, -8, 8] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[25%] left-[5%] w-20 h-20 border border-primary/8 rounded-2xl rotate-45"
      />
      <motion.div
        animate={{ y: [-12, 12, -12], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[60%] right-[20%] w-16 h-16 bg-primary/3 rounded-full blur-xl"
      />
    </div>
  );
}

// ─── MAIN APPLICATION ───
export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY, scrollYProgress } = useScroll();

  const navOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const navY = useTransform(scrollY, [0, 150], [0, -50]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative min-h-screen selection:bg-primary/30 selection:text-primary">
      <CustomCursor />
      <div className="grain" />
      <InteractiveOrbBackground />
      <FloatingShapes />

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-5 bg-primary/40 z-50 origin-left" style={{ scaleX }} />

      {/* Top Nav */}
      <motion.nav style={{ opacity: navOpacity, y: navY }}
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 pointer-events-auto">
        {["home", "projects", "skills", "contact"].map((section, i) => (
          <div key={section}>
            <Magnetic>
              <motion.button
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.1 * i }}
                onClick={() => { setActiveSection(section); document.getElementById(section)?.scrollIntoView({ behavior: "smooth" }); }}
                className={cn(
                  "glass px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.3em] font-black transition-all hover:scale-110 active:scale-95",
                  activeSection === section ? "bg-primary/15 text-primary border-primary/30" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {section}
              </motion.button>
            </Magnetic>
          </div>
        ))}
      </motion.nav>

      <main className="max-w-5xl mx-auto px-6 pt-48 pb-48">

        {/* ════════ HERO SECTION WITH PHOTO ════════ */}
        <motion.section
          id="home"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="min-h-[70vh] flex flex-col md:flex-row items-center justify-between gap-12 mb-32"
        >
          {/* Left Column: Text */}
          <SoftReveal>
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-primary/40" />
                <span className="text-xs uppercase tracking-[0.4em] text-primary/60 font-black">
                  Digital Sanctuary
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-foreground">
                {USER_DATA.name.split(" ").map((word, i) => (
                  <span key={i} className="block overflow-hidden">
                    <motion.span
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ type: "spring", damping: 40, stiffness: 50, delay: 0.2 + i * 0.1 }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed mb-12">
                {USER_DATA.bio}
              </p>

              <div className="flex flex-wrap gap-6">
                <Magnetic>
                  <motion.div whileTap={{ scale: 0.96 }}>
                    <Button
                      variant="default"
                      size="lg"
                      className="rounded-full px-10 h-16 text-sm uppercase tracking-widest font-black transition-transform bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/20"
                      onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Explore Work
                    </Button>
                  </motion.div>
                </Magnetic>
                <Magnetic>
                  <motion.div whileTap={{ scale: 0.96 }}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full px-10 h-16 text-sm uppercase tracking-widest font-black glass hover:bg-primary/10 border-primary/20 text-foreground shadow-xl"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Get in touch
                    </Button>
                  </motion.div>
                </Magnetic>
              </div>
            </div>
          </SoftReveal>

          {/* Right Column: The Avatar */}
          <SoftReveal delay={0.4}>
            <div className="flex-1 relative flex justify-center items-center pointer-events-none md:pointer-events-auto">
              <Magnetic>
                <div className="relative w-64 h-64 md:w-96 md:h-96 group">
                  {/* Background Ambient Glow */}
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-colors duration-700 animate-breathe" />
                  
                  {/* The Image */}
                  <img 
                    src="/profile.png" 
                    alt="Kartikey Singh" 
                    className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(112,26,255,0.3)] 
                               grayscale opacity-80 transition-all duration-700 ease-out
                               group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105
                               [mask-image[radial-gradient(circle_at_center,black_40%,transparent_80%)]"
                  />
                </div>
              </Magnetic>
            </div>
          </SoftReveal>
        </motion.section>

        {/* ════════ HARDWARE SECTION ════════ */}
        <section className="mb-48">
          <SoftReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div whileHover={{ y: -5 }}
                className="glass p-8 md:p-12 rounded-[2rem] relative overflow-hidden group border-primary/8">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Monitor className="w-32 h-32" />
                </div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-primary/60 mb-6 font-bold">Workstation</h3>
                <h2 className="text-3xl font-bold mb-4 text-foreground">{USER_DATA.hardware.primary}</h2>
                <p className="text-primary font-mono text-sm mb-6 font-bold">{USER_DATA.hardware.specs}</p>
                <p className="text-muted-foreground leading-relaxed font-medium">{USER_DATA.hardware.description}</p>
              </motion.div>
              <div className="space-y-8">
                <h2 className="text-4xl font-bold tracking-tight text-foreground">Engineered for <span className="italic text-primary">Performance</span></h2>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  My workflow is built around efficiency and raw computational power. I believe that the tools we use define the boundaries of what we can create.
                </p>
                <div className="flex gap-4">
                  <motion.div whileHover={{ rotate: 12, scale: 1.1 }} className="p-4 glass rounded-2xl border-primary/10">
                    <Layers className="w-6 h-6 text-primary" />
                  </motion.div>
                  <motion.div whileHover={{ rotate: -12, scale: 1.1 }} className="p-4 glass rounded-2xl border-primary/10">
                    <Zap className="w-6 h-6 text-primary" />
                  </motion.div>
                </div>
              </div>
            </div>
          </SoftReveal>
        </section>

        {/* ════════ PROJECTS SECTION ════════ */}
        <section id="projects" className="mb-48">
          <SoftReveal>
            <div className="flex items-end justify-between mb-16">
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-primary/60 mb-4 font-bold">Selected Works</h3>
                <h2 className="text-5xl font-bold tracking-tight text-foreground">Archive</h2>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm text-primary/30 font-mono font-bold">01 — 03</p>
              </div>
            </div>
            <div className="grid gap-12">
              {USER_DATA.projects.map((project, idx) => (
                <motion.div key={project.title}
                  initial={{ x: idx % 2 === 0 ? -80 : 80, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", damping: 30, stiffness: 50 }}
                  whileHover={{ scale: 1.015, rotate: idx % 2 === 0 ? 0.5 : -0.5 }}
                  className="group">
                  <Card className={cn(
                    "glass overflow-hidden transition-all duration-700 group-hover:shadow-[0_0_60px_rgba(0,180,160,0.12)] group-hover:border-primary/40 border-primary/8",
                    project.featured ? "border-primary/25 bg-primary/2" : ""
                  )}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1 p-10 md:p-16">
                          <div className="flex items-center gap-3 mb-8 flex-wrap">
                            {project.tech.map(t => (
                              <span key={t} className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-md bg-primary/15 text-primary font-bold">
                                {t}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-4xl font-bold mb-6 group-hover:text-primary transition-colors text-foreground tracking-tight">
                            {project.title}
                          </h3>
                          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-10 font-bold">
                            {project.desc}
                          </p>
                          <Magnetic>
                            <a href={project.link}
                              className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] font-bold hover:gap-6 transition-all text-primary">
                              View Project <ArrowUpRight className="w-5 h-5" />
                            </a>
                          </Magnetic>
                        </div>
                        <div className="w-full md:w-96 bg-primary/3 p-12 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-linear-to-br from-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <motion.div
                            whileHover={{ scale: 1.3, rotate: 15 }}
                            transition={{ type: "spring", damping: 15 }}>
                            <ExternalLink className="w-16 h-16 text-primary/10 group-hover:text-primary/30 transition-all duration-500" />
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </SoftReveal>
        </section>

        {/* ════════ SKILLS SECTION ════════ */}
        <section id="skills" className="mb-48">
          <SoftReveal>
            <div className="grid md:grid-cols-3 gap-16">
              <div className="md:col-span-1">
                <h3 className="text-xs uppercase tracking-[0.3em] text-primary/60 mb-4 font-bold">Expertise</h3>
                <h2 className="text-5xl font-bold tracking-tight mb-8 text-foreground leading-none">
                  Technical <br /><span className="italic text-primary">Stack</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed font-bold">
                  Bridging the gap between high-level abstraction and low-level optimization.
                </p>
              </div>
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {USER_DATA.skills.map((skill, idx) => (
                  <motion.div key={skill.name}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.12, type: "spring", damping: 20 }}
                    whileHover={{ y: -10, scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }}
                    className="glass p-8 rounded-3xl flex items-center gap-6 group hover:border-primary/40 transition-all border-primary/8">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 12 }}
                      className="p-4 rounded-2xl bg-primary/15 text-primary transition-transform">
                      {skill.icon}
                    </motion.div>
                    <div>
                      <h4 className="text-lg font-bold tracking-wide text-foreground uppercase">{skill.name}</h4>
                      <p className="text-xs uppercase tracking-widest text-primary/50 mt-2 font-bold">{skill.level}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SoftReveal>
        </section>

        {/* ════════ CONTACT SECTION ════════ */}
        <section id="contact" className="mb-32">
          <SoftReveal>
            <motion.div whileHover={{ scale: 1.008 }}
              className="glass p-12 md:p-24 rounded-[3rem] text-center relative overflow-hidden border-primary/15 shadow-[0_0_80px_rgba(0,180,160,0.06)]">
              <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent pointer-events-none" />

              <h3 className="text-xs uppercase tracking-[0.5em] text-primary/60 mb-10 font-bold">Available for collaboration</h3>
              <h2 className="text-6xl md:text-8xl font-bold tracking-tight mb-16 text-foreground leading-none">
                Let's build the <br />
                <span className="italic text-primary drop-shadow-[0_0_25px_rgba(0,180,160,0.2)]">future</span>.
              </h2>

              <div className="flex flex-col items-center gap-12">
                <Magnetic>
                  <motion.a href={`mailto:${USER_DATA.contact.email}`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-2xl md:text-5xl font-bold hover:text-primary transition-all flex items-center gap-6 group text-foreground tracking-tighter">
                    {USER_DATA.contact.email}
                    <ChevronRight className="w-10 h-10 opacity-0 -translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </motion.a>
                </Magnetic>

                <div className="flex gap-10 mt-12">
                  {USER_DATA.contact.socials.map((social) => (
                    <div key={social.name}>
                      <Magnetic>
                        <motion.a href={social.link} target="_blank" rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, y: -10, rotate: 8 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-6 glass rounded-full hover:text-primary transition-all border-primary/20 text-foreground shadow-lg hover:shadow-primary/15"
                          aria-label={social.name}>
                          {social.icon}
                        </motion.a>
                      </Magnetic>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </SoftReveal>
        </section>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-primary/25 font-bold">
            © {new Date().getFullYear()} Kartikey Singh — Designed for Flow
          </p>
        </footer>
      </main>
    </div>
  );
}
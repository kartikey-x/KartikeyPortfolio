/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
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
  Monitor
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";

/**
 * USER_DATA: The single source of truth for the portfolio content.
 */
const USER_DATA = {
  name: "Kartikey Singh",
  role: "AI/ML Engineer & Full-Stack Developer",
  bio: "B.Tech CSE student specializing in Artificial Intelligence and Machine Learning. Experienced in building Python-based tools and robust web applications with a focus on RESTful architectures and data-driven systems.",
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

// --- Components ---

/**
 * CustomCursor: A smooth, magnetic-feeling cursor.
 */
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

/**
 * Magnetic: A component that pulls its children toward the mouse cursor.
 */
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
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn("magnetic-area", className)}
    >
      {children}
    </motion.div>
  );
}

/**
 * InteractiveOrbBackground: A canvas-based interactive orb system
 * that reacts to both mouse movement and scroll position.
 * Optimized for Apple Silicon with Canvas 2D.
 */
interface Orb {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  driftSpeed: number;
  driftAngle: number;
  driftRadius: number;
  mass: number;
  glowIntensity: number;
}

function InteractiveOrbBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);
  const orbsRef = useRef<Orb[]>([]);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    const colors = [
      "138, 43, 226",
      "112, 26, 255",
      "75, 0, 130",
      "186, 85, 211",
      "148, 0, 211",
      "72, 61, 139",
      "123, 44, 191",
      "88, 28, 135",
      "167, 139, 250",
      "59, 7, 100",
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
      const count = Math.min(18, Math.floor((width * height) / 80000));

      for (let i = 0; i < count; i++) {
        const baseRadius = 80 + Math.random() * 200;
        const baseAlpha = 0.03 + Math.random() * 0.07;
        orbs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          vx: 0,
          vy: 0,
          radius: baseRadius,
          baseRadius,
          color: colors[i % colors.length],
          alpha: baseAlpha,
          baseAlpha,
          pulseSpeed: 0.3 + Math.random() * 0.8,
          pulsePhase: Math.random() * Math.PI * 2,
          driftSpeed: 0.15 + Math.random() * 0.3,
          driftAngle: Math.random() * Math.PI * 2,
          driftRadius: 50 + Math.random() * 150,
          mass: 0.5 + Math.random() * 1.5,
          glowIntensity: 0.5 + Math.random() * 0.5,
        });
      }

      for (let i = 0; i < 4; i++) {
        const baseRadius = 300 + Math.random() * 400;
        orbs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          vx: 0,
          vy: 0,
          radius: baseRadius,
          baseRadius,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.015 + Math.random() * 0.025,
          baseAlpha: 0.015 + Math.random() * 0.025,
          pulseSpeed: 0.1 + Math.random() * 0.2,
          pulsePhase: Math.random() * Math.PI * 2,
          driftSpeed: 0.05 + Math.random() * 0.1,
          driftAngle: Math.random() * Math.PI * 2,
          driftRadius: 30 + Math.random() * 80,
          mass: 2 + Math.random() * 2,
          glowIntensity: 0.3 + Math.random() * 0.3,
        });
      }
      return orbs;
    };

    resize();
    orbsRef.current = createOrbs();

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const drawOrb = (orb: Orb) => {
      const gradient = ctx.createRadialGradient(
        orb.x, orb.y, 0,
        orb.x, orb.y, orb.radius
      );

      gradient.addColorStop(0, `rgba(${orb.color}, ${orb.alpha * 2.5 * orb.glowIntensity})`);
      gradient.addColorStop(0.3, `rgba(${orb.color}, ${orb.alpha * 1.2})`);
      gradient.addColorStop(0.6, `rgba(${orb.color}, ${orb.alpha * 0.4})`);
      gradient.addColorStop(1, `rgba(${orb.color}, 0)`);

      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      timeRef.current += 0.008;
      const t = timeRef.current;
      const mouse = mouseRef.current;
      const scroll = scrollRef.current;

      ctx.clearRect(0, 0, width, height);

      const ambientGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, width * 0.6
      );
      ambientGradient.addColorStop(0, `rgba(112, 26, 255, 0.02)`);
      ambientGradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
      ctx.fillStyle = ambientGradient;
      ctx.fillRect(0, 0, width, height);

      for (const orb of orbsRef.current) {
        const driftX = Math.cos(t * orb.driftSpeed + orb.driftAngle) * orb.driftRadius;
        const driftY = Math.sin(t * orb.driftSpeed * 0.7 + orb.driftAngle + 1.5) * orb.driftRadius;

        const scrollOffset = scroll * (0.05 + orb.mass * 0.03);

        let targetX = orb.baseX + driftX;
        let targetY = orb.baseY + driftY - scrollOffset % (height * 2);

        if (targetY < -orb.radius * 2) targetY += height + orb.radius * 4;
        if (targetY > height + orb.radius * 2) targetY -= height + orb.radius * 4;

        const dx = mouse.x - orb.x;
        const dy = mouse.y - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 400;

        if (dist < interactionRadius && dist > 0) {
          const force = (1 - dist / interactionRadius);
          const forceStrength = force * force * 60;

          if (orb.baseRadius < 200) {
            targetX += (dx / dist) * forceStrength;
            targetY += (dy / dist) * forceStrength;
          } else {
            targetX -= (dx / dist) * forceStrength * 0.3;
            targetY -= (dy / dist) * forceStrength * 0.3;
          }

          orb.alpha = orb.baseAlpha + force * 0.08;
          orb.radius = orb.baseRadius + force * 40;
          orb.glowIntensity = 0.5 + force * 1.5;
        } else {
          orb.alpha += (orb.baseAlpha - orb.alpha) * 0.02;
          orb.radius += (orb.baseRadius - orb.radius) * 0.02;
          orb.glowIntensity += ((0.5 + Math.random() * 0.5) - orb.glowIntensity) * 0.01;
        }

        const pulse = Math.sin(t * orb.pulseSpeed + orb.pulsePhase) * 0.15 + 1;
        orb.radius *= pulse;
        orb.alpha *= (0.85 + pulse * 0.15);

        orb.vx += (targetX - orb.x) * 0.008;
        orb.vy += (targetY - orb.y) * 0.008;
        orb.vx *= 0.95;
        orb.vy *= 0.95;
        orb.x += orb.vx;
        orb.y += orb.vy;

        drawOrb(orb);
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < orbsRef.current.length; i++) {
        for (let j = i + 1; j < orbsRef.current.length; j++) {
          const a = orbsRef.current[i];
          const b = orbsRef.current[j];
          const ddx = a.x - b.x;
          const ddy = a.y - b.y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          const maxDist = 350;

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.06;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(138, 43, 226, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      if (mouse.x > 0 && mouse.y > 0) {
        const cursorGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 250
        );
        cursorGlow.addColorStop(0, `rgba(167, 139, 250, 0.04)`);
        cursorGlow.addColorStop(0.5, `rgba(112, 26, 255, 0.015)`);
        cursorGlow.addColorStop(1, `rgba(0, 0, 0, 0)`);
        ctx.fillStyle = cursorGlow;
        ctx.fillRect(mouse.x - 250, mouse.y - 250, 500, 500);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    const onResize = () => {
      resize();
      orbsRef.current = createOrbs();
    };
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
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "#050208" }}
    />
  );
}

/**
 * SoftReveal: Optimized by removing the blur transition which is expensive on scroll.
 */
function SoftReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 50,
        delay
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

// --- Main Application ---

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY, scrollYProgress } = useScroll();

  const navOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const navY = useTransform(scrollY, [0, 150], [0, -50]);

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen selection:bg-primary/30 selection:text-primary">
      {/* Visual Overlays */}
      <CustomCursor />
      <div className="grain" />
      <InteractiveOrbBackground />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary/30 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Top Navigation Bubbles */}
      <motion.nav
        style={{ opacity: navOpacity, y: navY }}
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 pointer-events-auto"
      >
        {["home", "projects", "skills", "contact"].map((section, i) => (
          <div key={section}>
            <Magnetic>
              <motion.button
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                  delay: 0.1 * i
                }}
                onClick={() => {
                  setActiveSection(section);
                  document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={cn(
                  "glass px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.3em] font-black transition-all hover:scale-110 active:scale-95",
                  activeSection === section ? "bg-primary/20 text-primary border-primary/40" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {section}
              </motion.button>
            </Magnetic>
          </div>
        ))}
      </motion.nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pt-48 pb-48">

        {/* Hero Section */}
        <motion.section
          id="home"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="min-h-[70vh] flex flex-col justify-center mb-32"
        >
          <SoftReveal>
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

            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl leading-relaxed mb-12">
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
          </SoftReveal>
        </motion.section>

        {/* Hardware Section */}
        <section className="mb-48">
          <SoftReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                whileHover={{ y: -5 }}
                className="glass p-8 md:p-12 rounded-[2rem] relative overflow-hidden group border-primary/10"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Monitor className="w-32 h-32" />
                </div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-primary/60 mb-6 font-bold">Workstation</h3>
                <h2 className="text-3xl font-bold mb-4 text-foreground">{USER_DATA.hardware.primary}</h2>
                <p className="text-primary font-mono text-sm mb-6 font-bold">{USER_DATA.hardware.specs}</p>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {USER_DATA.hardware.description}
                </p>
              </motion.div>
              <div className="space-y-8">
                <h2 className="text-4xl font-bold tracking-tight text-foreground">Engineered for <span className="italic text-primary">Performance</span></h2>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  My workflow is built around efficiency and raw computational power. I believe that the tools we use define the boundaries of what we can create.
                </p>
                <div className="flex gap-4">
                  <div className="p-4 glass rounded-2xl border-primary/10">
                    <Layers className="w-6 h-6 text-primary" />
                  </div>
                  <div className="p-4 glass rounded-2xl border-primary/10">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </SoftReveal>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-48">
          <SoftReveal>
            <div className="flex items-end justify-between mb-16">
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-primary/60 mb-4 font-bold">Selected Works</h3>
                <h2 className="text-5xl font-bold tracking-tight text-foreground">Archive</h2>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm text-primary/40 font-mono font-bold">01 — 03</p>
              </div>
            </div>

            <div className="grid gap-12">
              {USER_DATA.projects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ x: idx % 2 === 0 ? -100 : 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", damping: 30, stiffness: 50 }}
                  whileHover={{ scale: 1.02, rotate: idx % 2 === 0 ? 1 : -1 }}
                  className="group"
                >
                  <Card className={cn(
                    "glass overflow-hidden transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(112,26,255,0.2)] group-hover:border-primary/50 border-primary/10",
                    project.featured ? "border-primary/40 bg-primary/3" : ""
                  )}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1 p-10 md:p-16">
                          <div className="flex items-center gap-3 mb-8">
                            {project.tech.map(t => (
                              <span key={t} className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-md bg-primary/20 text-primary font-bold">
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
                            <a
                              href={project.link}
                              className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] font-bold hover:gap-6 transition-all text-primary"
                            >
                              View Project <ChevronRight className="w-5 h-5" />
                            </a>
                          </Magnetic>
                        </div>
                        <div className="w-full md:w-96 bg-primary/5 p-12 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <ExternalLink className="w-16 h-16 text-primary/10 group-hover:text-primary/40 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </SoftReveal>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-48">
          <SoftReveal>
            <div className="grid md:grid-cols-3 gap-16">
              <div className="md:col-span-1">
                <h3 className="text-xs uppercase tracking-[0.3em] text-primary/60 mb-4 font-bold">Expertise</h3>
                <h2 className="text-5xl font-bold tracking-tight mb-8 text-foreground leading-none">Technical <br /><span className="italic text-primary">Stack</span></h2>
                <p className="text-lg text-muted-foreground leading-relaxed font-bold">
                  Bridging the gap between high-level abstraction and low-level optimization.
                </p>
              </div>
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {USER_DATA.skills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, type: "spring", damping: 20 }}
                    whileHover={{ y: -10, scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                    className="glass p-8 rounded-3xl flex items-center gap-6 group hover:border-primary/60 transition-all border-primary/10"
                  >
                    <div className="p-4 rounded-2xl bg-primary/20 text-primary group-hover:scale-110 group-hover:rotate-12 transition-transform">
                      {skill.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold tracking-wide text-foreground uppercase">{skill.name}</h4>
                      <p className="text-xs uppercase tracking-widest text-primary/60 mt-2 font-bold">{skill.level}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SoftReveal>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-32">
          <SoftReveal>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="glass p-12 md:p-24 rounded-[3rem] text-center relative overflow-hidden border-primary/20 shadow-[0_0_100px_rgba(112,26,255,0.1)]"
            >
              <div className="absolute inset-0 bg-linear-to-b from-primary/20 to-transparent pointer-events-none" />

              <h3 className="text-xs uppercase tracking-[0.5em] text-primary/60 mb-10 font-bold">Available for collaboration</h3>
              <h2 className="text-6xl md:text-8xl font-bold tracking-tight mb-16 text-foreground leading-none">
                Let's build the <br /><span className="italic text-primary drop-shadow-[0_0_30px_rgba(112,26,255,0.3)]">future</span>.
              </h2>

              <div className="flex flex-col items-center gap-12">
                <Magnetic>
                  <motion.a
                    href={`mailto:${USER_DATA.contact.email}`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-2xl md:text-5xl font-bold hover:text-primary transition-all flex items-center gap-6 group text-foreground tracking-tighter"
                  >
                    {USER_DATA.contact.email}
                    <ChevronRight className="w-10 h-10 opacity-0 -translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </motion.a>
                </Magnetic>

                <div className="flex gap-10 mt-12">
                  {USER_DATA.contact.socials.map((social) => (
                    <div key={social.name}>
                      <Magnetic>
                        <motion.a
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, y: -10, rotate: 8 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-6 glass rounded-full hover:text-primary transition-all border-primary/30 text-foreground shadow-lg hover:shadow-primary/20"
                          aria-label={social.name}
                        >
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
          <p className="text-[10px] uppercase tracking-[0.5em] text-primary/30 font-bold">
            © {new Date().getFullYear()} Kartikey Singh — Designed for Flow
          </p>
        </footer>

      </main>
    </div>
  );
}
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence, useInView, useMotionValueEvent } from "motion/react";
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
  ArrowUpRight,
  ArrowRight,
  Braces,
  Database,
  Network,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";

// ─── USER DATA ───
const USER_DATA = {
  name: "Kartikey Singh",
  role: "AI/ML Engineer & Full-Stack Developer",
  bio: "B.Tech CSE student specializing in Artificial Intelligence and Machine Learning. Experienced in building Python-based tools and robust web applications with a focus on RESTful architectures and data-driven systems.",
  profileImage: "/profile.png",
  hardware: {
    primary: "High-Performance Workstation",
    specs: "Optimized for AI/ML Workloads",
    description: "Configured for local model training, data analysis using NumPy/Pandas, and full-stack backend development."
  },
  skills: [
    { name: "Machine Learning", icon: <Cpu className="w-5 h-5" />, level: "Specialist", desc: "Neural networks, NLP, computer vision" },
    { name: "Backend Architecture", icon: <Terminal className="w-5 h-5" />, level: "Expert", desc: "Flask, REST APIs, microservices" },
    { name: "Full-Stack Dev", icon: <Code2 className="w-5 h-5" />, level: "Proficient", desc: "React, TypeScript, Node.js" },
    { name: "Network Engineering", icon: <Network className="w-5 h-5" />, level: "Certified", desc: "TCP/IP, security, infrastructure" },
    { name: "Data Engineering", icon: <Database className="w-5 h-5" />, level: "Advanced", desc: "SQL, NoSQL, ETL pipelines" },
    { name: "Systems Design", icon: <Braces className="w-5 h-5" />, level: "Proficient", desc: "Scalable architecture patterns" },
  ],
  projects: [
    {
      title: "NotaLink",
      desc: "A web-based academic note-sharing portal featuring REST API endpoints for secure file management and subject-based categorization.",
      tech: ["Flask", "SQLite", "JavaScript", "REST"],
      link: "https://github.com/kartikey-singh",
      featured: true,
      year: "2025",
      number: "01"
    },
    {
      title: "StegoSafe",
      desc: "An advanced information-hiding tool utilizing LSB steganography to securely embed and extract data within image payloads.",
      tech: ["Python", "Steganography", "Security"],
      link: "https://github.com/kartikey-singh",
      year: "2026",
      number: "02"
    },
    {
      title: "ExamPrepBuddy",
      desc: "A modular CLI-based study optimization tool that automates plan organization and tracks completion metrics across multiple subjects.",
      tech: ["Python", "File I/O", "Modular Design"],
      link: "https://github.com/kartikey-singh",
      year: "2025",
      number: "03"
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
  const [isHovering, setIsHovering] = useState(false);

  const x = useSpring(cursorX, { damping: 25, stiffness: 300 });
  const y = useSpring(cursorY, { damping: 25, stiffness: 300 });
  const fx = useSpring(followerX, { damping: 18, stiffness: 120 });
  const fy = useSpring(followerY, { damping: 18, stiffness: 120 });

  useEffect(() => {
    // We track state locally in the loop to prevent React from re-rendering
    // hundreds of times when mousing over deeply nested SVG/Div elements.
    let currentHoverState = false;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
      followerX.set(e.clientX - 24);
      followerY.set(e.clientY - 24);

      const target = e.target as HTMLElement;
      const isHoverable = !!target.closest('a, button, [role="button"], .magnetic-area');
      
      if (isHoverable !== currentHoverState) {
        currentHoverState = isHoverable;
        setIsHovering(isHoverable);
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY, followerX, followerY]);

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{ x, y }}
        animate={{ scale: isHovering ? 0.5 : 1 }}
      />
      <motion.div
        className="custom-cursor-follower"
        style={{ x: fx, y: fy }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          borderColor: isHovering ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)"
        }}
      />
    </>
  );
}

// ─── MAGNETIC WRAPPER ───
function Magnetic({ children, className, strength = 0.35 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 30, stiffness: 150 });
  const springY = useSpring(y, { damping: 30, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((clientX - left - width / 2) * strength);
    y.set((clientY - top - height / 2) * strength);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }} className={cn("magnetic-area", className)}>
      {children}
    </motion.div>
  );
}

// ─── TEXT SPLIT REVEAL ───
function SplitText({ children, className, delay = 0 }: { children: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = children.split(" ");

  return (
    <div ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "120%", rotateX: 90 }}
            animate={isInView ? { y: 0, rotateX: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.04,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

// ─── CHAR-BY-CHAR REVEAL ───
function CharReveal({ children, className, delay = 0 }: { children: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={cn("inline-flex flex-wrap", className)}>
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.02,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}

// ─── HORIZONTAL LINE REVEAL ───
function LineReveal({ className, delay = 0 }: { className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        className="h-px bg-linear-to-r from-white/0 via-white/20 to-white/0"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

// ─── PARALLAX SECTION ───
function ParallaxSection({ children, speed = 0.5, className }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const smoothY = useSpring(y, { damping: 50, stiffness: 100 });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ y: smoothY }}>
        {children}
      </motion.div>
    </div>
  );
}

// ─── MASKED REVEAL ───
function MaskReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── GLITCH TEXT ───
function GlitchText({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn("glitch-text relative inline-block", className)} data-text={children}>
      {children}
    </span>
  );
}

// ─── INTERACTIVE PARTICLE BACKGROUND ───
interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; alpha: number; color: string;
  life: number; maxLife: number;
}

interface Orb {
  x: number; y: number; baseX: number; baseY: number;
  vx: number; vy: number; radius: number; baseRadius: number;
  color: string; alpha: number; baseAlpha: number;
  pulseSpeed: number; pulsePhase: number;
  driftSpeed: number; driftAngle: number; driftRadius: number;
  mass: number;
}

function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);
  const orbsRef = useRef<Orb[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    const orbColors = [
      "120, 200, 255",
      "80, 140, 255",
      "160, 100, 255",
      "100, 220, 200",
      "60, 100, 180",
    ];

    const particleColors = [
      "255, 255, 255",
      "180, 200, 255",
      "140, 170, 255",
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
      const count = Math.min(12, Math.floor((width * height) / 100000));
      for (let i = 0; i < count; i++) {
        const baseRadius = 100 + Math.random() * 250;
        orbs.push({
          x: Math.random() * width, y: Math.random() * height,
          baseX: Math.random() * width, baseY: Math.random() * height,
          vx: 0, vy: 0, radius: baseRadius, baseRadius,
          color: orbColors[i % orbColors.length],
          alpha: 0.015 + Math.random() * 0.025,
          baseAlpha: 0.015 + Math.random() * 0.025,
          pulseSpeed: 0.15 + Math.random() * 0.4, pulsePhase: Math.random() * Math.PI * 2,
          driftSpeed: 0.08 + Math.random() * 0.15, driftAngle: Math.random() * Math.PI * 2,
          driftRadius: 30 + Math.random() * 80, mass: 0.5 + Math.random() * 1.5,
        });
      }
      return orbs;
    };

    const createParticles = () => {
      for (let i = 0; i < 40; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -0.05 - Math.random() * 0.15,
          size: 0.5 + Math.random() * 1.2,
          alpha: 0.1 + Math.random() * 0.3,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          life: Math.random() * 300,
          maxLife: 300 + Math.random() * 400,
        });
      }
    };

    resize();
    orbsRef.current = createOrbs();
    createParticles();

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onScroll = () => { scrollRef.current = window.scrollY; };

    const animate = () => {
      timeRef.current += 0.005;
      const t = timeRef.current;
      const mouse = mouseRef.current;
      ctx.clearRect(0, 0, width, height);

      for (const orb of orbsRef.current) {
        const driftX = Math.cos(t * orb.driftSpeed + orb.driftAngle) * orb.driftRadius;
        const driftY = Math.sin(t * orb.driftSpeed * 0.7 + orb.driftAngle) * orb.driftRadius;
        const scrollOffset = scrollRef.current * 0.03;
        let targetX = orb.baseX + driftX;
        let targetY = orb.baseY + driftY - scrollOffset % (height * 2);
        if (targetY < -orb.radius * 2) targetY += height + orb.radius * 4;

        const dx = mouse.x - orb.x;
        const dy = mouse.y - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 500 && dist > 0) {
          const force = (1 - dist / 500) * 40;
          targetX += (dx / dist) * force;
          targetY += (dy / dist) * force;
          orb.alpha = orb.baseAlpha + (1 - dist / 500) * 0.03;
        } else {
          orb.alpha += (orb.baseAlpha - orb.alpha) * 0.01;
        }

        const pulse = Math.sin(t * orb.pulseSpeed + orb.pulsePhase) * 0.1 + 1;
        orb.vx += (targetX - orb.x) * 0.004;
        orb.vy += (targetY - orb.y) * 0.004;
        orb.vx *= 0.97; orb.vy *= 0.97;
        orb.x += orb.vx; orb.y += orb.vy;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius * pulse);
        gradient.addColorStop(0, `rgba(${orb.color}, ${orb.alpha * 2})`);
        gradient.addColorStop(0.4, `rgba(${orb.color}, ${orb.alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${orb.color}, 0)`);
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life++;
        if (p.life > p.maxLife) {
          p.x = Math.random() * width;
          p.y = height + 10;
          p.life = 0;
          continue;
        }
        const lifeRatio = p.life / p.maxLife;
        const fade = lifeRatio > 0.8 ? 1 - ((lifeRatio - 0.8) / 0.2) : Math.min(1, p.life / 30);
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) p.y = height + 10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha * fade})`;
        ctx.fill();
      }

      if (mouse.x > 0) {
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 250);
        glow.addColorStop(0, `rgba(120, 180, 255, 0.025)`);
        glow.addColorStop(1, `rgba(0, 0, 0, 0)`);
        ctx.fillStyle = glow;
        ctx.fillRect(mouse.x - 250, mouse.y - 250, 500, 500);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => { resize(); orbsRef.current = createOrbs(); };
    window.addEventListener("resize", onResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />;
}

// ─── SCROLL VELOCITY TEXT ───
function ScrollVelocityText({ text, className }: { text: string; className?: string }) {
  const { scrollY } = useScroll();
  const baseX = useMotionValue(0);
  const velocity = useRef(0);
  const direction = useRef(1);
  const prevScroll = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - prevScroll.current;
    direction.current = diff > 0 ? -1 : 1;
    velocity.current = Math.min(Math.abs(diff) * 0.5, 50);
    prevScroll.current = latest;
  });

  useEffect(() => {
    let raf: number;
    const animate = () => {

      let moveBy = direction.current * Math.max(0.03, velocity.current * 0.006);
      let currentX = baseX.get() + moveBy;

      // The true infinite loop math. Wrap seamlessly at exactly -50%.
      if (currentX <= -50) {
        currentX += 50;
      } else if (currentX >= 0) {
        currentX -= 50;
      }

      baseX.set(currentX);
      velocity.current *= 0.95; // Decay scroll velocity
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [baseX]);

  return (
    <div className={cn("overflow-hidden whitespace-nowrap flex", className)}>
      <motion.div className="flex gap-16 pr-16 will-change-transform" style={{ x: useMotionTemplate`${baseX}%` }}>
        {[...Array(8)].map((_, i) => (
          <span key={i} className="text-[12vw] font-black uppercase tracking-tighter text-white/3 select-none">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── NOISE DISTORTION LINE ───
function DistortionLine({ className }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    let t = 0;
    const animate = () => {
      t += 0.015;
      if (pathRef.current) {
        let d = "M 0 25";
        for (let i = 0; i <= 100; i++) {
          const x = i * 10;
          const y = 25 + Math.sin(i * 0.3 + t) * 3 + Math.sin(i * 0.7 + t * 1.5) * 2;
          d += ` L ${x} ${y}`;
        }
        pathRef.current.setAttribute("d", d);
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <svg className={cn("w-full h-12 opacity-20", className)} viewBox="0 0 1000 50" preserveAspectRatio="none">
      <path ref={pathRef} d="M 0 25 L 1000 25" stroke="url(#lineGrad)" strokeWidth="0.5" fill="none" />
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="20%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="50%" stopColor="rgba(120,180,255,0.8)" />
          <stop offset="80%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── COUNTER ANIMATION ───
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / 60;
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

// ─── OPTIMIZED COMPONENT MEMOIZATION ───
const MemoizedBackground = React.memo(InteractiveBackground);
const MemoizedDistortionLine = React.memo(DistortionLine);
const MemoizedCustomCursor = React.memo(CustomCursor);

// ─── ISOLATED NAVIGATION COMPONENT ───
function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [navScrolled, setNavScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setNavScrolled(latest > 100);
  });

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        navScrolled ? "py-4 bg-background/50 backdrop-blur-md border-b border-white/5" : "py-8"
      )}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <motion.div
          className="text-sm font-mono tracking-widest text-white/60"
          whileHover={{ color: "rgba(255,255,255,0.9)" }}
        >
          KS.
        </motion.div>
        <div className="flex items-center gap-1">
          {["home", "projects", "skills", "contact"].map((section, i) => (
            <Magnetic key={section} strength={0.2}>
              <motion.button
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  setActiveSection(section);
                  document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={cn(
                  "px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 rounded-full relative",
                  activeSection === section
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                )}
              >
                {activeSection === section && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute inset-0 bg-white/8 border border-white/12 rounded-full"
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  />
                )}
                <span className="relative z-10">{section}</span>
              </motion.button>
            </Magnetic>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}


// ─── MAIN APPLICATION ───
export default function App() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, -200]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.6], [1, 0.85]);

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative min-h-screen">
      <MemoizedCustomCursor />
      <div className="grain" />
      <MemoizedBackground />

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-white/80 z-100 origin-left" style={{ scaleX }} />

      <Navigation />

      <main>
        {/* ════════ HERO ════════ */}
        <motion.section
          ref={heroRef}
          id="home"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-8 w-full pt-32 pb-32">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
              {/* Left: Text Content */}
              <div className="relative z-10">
                {/* Top label */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={mounted ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-4 mb-12"
                >
                  <motion.div
                    className="w-12 h-px bg-white/30"
                    initial={{ scaleX: 0 }}
                    animate={mounted ? { scaleX: 1 } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ transformOrigin: "left" }}
                  />
                  <span className="text-[11px] uppercase tracking-[0.5em] text-white/50 font-medium">
                    Portfolio / 2026
                  </span>
                </motion.div>

                {/* Name */}
                <div className="mb-8">
                  {USER_DATA.name.split(" ").map((word, i) => (
                    <div key={i} className="overflow-hidden">
                      <motion.h1
                        initial={{ y: "100%", rotateX: -45 }}
                        animate={mounted ? { y: 0, rotateX: 0 } : {}}
                        transition={{
                          duration: 1.2,
                          delay: 0.4 + i * 0.12,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        className="text-[clamp(3.5rem,8vw,8rem)] font-bold leading-[0.9] tracking-[-0.04em] text-white"
                      >
                        {word}
                      </motion.h1>
                    </div>
                  ))}
                </div>

                {/* Role */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex items-center gap-4 mb-10"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[13px] uppercase tracking-[0.3em] text-white/50 font-medium">
                    {USER_DATA.role}
                  </span>
                </motion.div>

                {/* Bio */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="text-lg text-white/40 leading-relaxed max-w-lg mb-14 font-light"
                >
                  {USER_DATA.bio}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex flex-wrap gap-5"
                >
                  <Magnetic>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                      className="group relative px-10 py-4 bg-white text-black text-[12px] uppercase tracking-[0.3em] font-semibold rounded-full overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.4 }}
                      />
                      <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors">
                        Explore Work
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>
                  </Magnetic>

                  <Magnetic>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-10 py-4 border border-white/15 text-white/70 hover:text-white hover:border-white/30 text-[12px] uppercase tracking-[0.3em] font-medium rounded-full transition-all duration-300"
                    >
                      Get in Touch
                    </motion.button>
                  </Magnetic>
                </motion.div>
              </div>

              {/* Right: Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                animate={mounted ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex justify-center items-center"
              >
                <Magnetic strength={0.15}>
                  <div className="relative w-72 h-72 md:w-100 md:h-100 group">
                    {/* FIX: GPU Filter death. Swapped animating blur to animating scale/opacity */}
                    <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 via-purple-500/10 to-cyan-500/20 rounded-full blur-[80px] transition-all duration-1000 scale-110 group-hover:scale-100 group-hover:opacity-80" />

                    {/* FIX: Promoted rotating rings to the GPU */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-1 rounded-full border border-white/6 will-change-transform"
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40" />
                    </motion.div>

                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-4 rounded-full border border-white/3 will-change-transform"
                    >
                      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-blue-400/40" />
                    </motion.div>

                    {/* The Image */}
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <img
                        src="/profile.png"
                        alt="Kartikey Singh"
                        className="relative z-10 w-full h-full object-cover
                                   grayscale-[0.3] contrast-[1.1]
                                   group-hover:grayscale-0 group-hover:contrast-100
                                   transition-all duration-700 ease-out will-change-[filter,transform]"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 z-20 bg-linear-to-t from-[#050510]/60 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Floating status badge */}
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-30 px-5 py-2 rounded-full bg-white/[0.07] backdrop-blur-xl border border-white/10 flex items-center gap-2 will-change-transform"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium whitespace-nowrap">Available for work</span>
                    </motion.div>
                  </div>
                </Magnetic>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={mounted ? { opacity: 1 } : {}}
              transition={{ delay: 2 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/25">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-px h-8 bg-linear-to-b from-white/30 to-transparent"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* ════════ SCROLL VELOCITY MARQUEE ════════ */}
        <div className="py-8 overflow-hidden">
          <ScrollVelocityText text="AI/ML · Full-Stack · Python · Architecture" />
        </div>

        {/* ════════ ABOUT / HARDWARE ════════ */}
        <section className="py-40 max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <MaskReveal>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[11px] uppercase tracking-[0.5em] text-white/30 font-mono">01</span>
                  <div className="w-8 h-px bg-white/20" />
                  <span className="text-[11px] uppercase tracking-[0.4em] text-white/40">About</span>
                </div>
              </MaskReveal>

              <SplitText className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white leading-[1.15] mb-8">
                Engineered for raw computational performance
              </SplitText>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-white/35 text-lg leading-relaxed font-light"
              >
                My workflow is built around efficiency and raw computational power.
                I believe that the tools we use define the boundaries of what we can create.
              </motion.p>
            </div>

            <ParallaxSection speed={0.3}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="relative p-10 rounded-2xl border border-white/6 bg-white/2 backdrop-blur-sm overflow-hidden group"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="absolute top-6 right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <Monitor className="w-24 h-24" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-linear-to-brom-blue-400 to-purple-400 rounded-full" />
                    <h3 className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-medium">Workstation</h3>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">{USER_DATA.hardware.primary}</h2>
                  <p className="text-blue-300/60 font-mono text-sm mb-6">{USER_DATA.hardware.specs}</p>
                  <p className="text-white/30 leading-relaxed text-sm">{USER_DATA.hardware.description}</p>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px bg-bg-linear-to-rom-transparent via-blue-400/30 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </motion.div>
            </ParallaxSection>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-white/5"
          >
            {[
              { label: "Projects Built", value: 10, suffix: "+" },
              { label: "Technologies", value: 15, suffix: "+" },
              { label: "Years Coding", value: 3, suffix: "+" },
              { label: "Lines of Code", value: 50, suffix: "K+" },
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-4xl font-bold text-white tracking-tight mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/25">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        <MemoizedDistortionLine />

        {/* ════════ PROJECTS ════════ */}
        <section id="projects" className="py-40 max-w-7xl mx-auto px-8">
          <MaskReveal>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[11px] uppercase tracking-[0.5em] text-white/30 font-mono">02</span>
              <div className="w-8 h-px bg-white/20" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-white/40">Selected Works</span>
            </div>
          </MaskReveal>

          <div className="flex items-end justify-between mb-20">
            <SplitText className="text-5xl md:text-6xl font-bold tracking-[-0.03em] text-white" delay={0.1}>
              Project Archive
            </SplitText>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="hidden md:block text-sm text-white/15 font-mono"
            >
              {USER_DATA.projects.length.toString().padStart(2, '0')} entries
            </motion.span>
          </div>

          <div className="space-y-2">
            {USER_DATA.projects.map((project, idx) => (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group block"
              >
                <div className="relative py-10 px-8 -mx-8 rounded-2xl transition-all duration-500 hover:bg-white/3">
                  {/* Hover accent */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-400 via-purple-400 to-cyan-400 rounded-full origin-top"
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileHover={{ scaleY: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />

                  <div className="grid md:grid-cols-[auto_1fr_auto] gap-8 items-center">
                    {/* Number */}
                    <span className="text-5xl font-bold text-white/6 group-hover:text-white/15 transition-colors duration-500 font-mono tracking-tighter">
                      {project.number}
                    </span>

                    {/* Content */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-white/80 group-hover:text-white transition-colors duration-300 tracking-tight">
                          {project.title}
                        </h3>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowUpRight className="w-5 h-5 text-white/40" />
                        </motion.div>
                      </div>
                      <p className="text-white/25 text-sm leading-relaxed max-w-xl mb-4 group-hover:text-white/35 transition-colors duration-300">
                        {project.desc}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {project.tech.map(t => (
                          <span key={t} className="text-[10px] uppercase tracking-[0.15em] px-3 py-1 rounded-full border border-white/6 text-white/30 group-hover:border-white/12 group-hover:text-white/50 transition-all duration-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Year */}
                    <span className="text-sm text-white/15 font-mono group-hover:text-white/30 transition-colors">
                      {project.year}
                    </span>
                  </div>

                  {/* Bottom border */}
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-white/4" />
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        <MemoizedDistortionLine />

        {/* ════════ SKILLS ════════ */}
        <section id="skills" className="py-40 max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-[0.4fr_0.6fr] gap-20">
            <div>
              <MaskReveal>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[11px] uppercase tracking-[0.5em] text-white/30 font-mono">03</span>
                  <div className="w-8 h-px bg-white/20" />
                  <span className="text-[11px] uppercase tracking-[0.4em] text-white/40">Expertise</span>
                </div>
              </MaskReveal>

              <SplitText className="text-5xl font-bold tracking-[-0.03em] text-white leading-[1.1] mb-8">
                Technical Stack
              </SplitText>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-white/30 text-lg leading-relaxed font-light"
              >
                Bridging the gap between high-level abstraction and low-level optimization.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {USER_DATA.skills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="group relative p-6 rounded-xl border border-white/5 bg-white/1.5 hover:bg-white/4 hover:border-white/10 transition-all duration-500 overflow-hidden"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        className="p-3 rounded-lg bg-white/5 text-white/50 group-hover:text-white/80 group-hover:bg-white/10 transition-all duration-300"
                      >
                        {skill.icon}
                      </motion.div>
                      <span className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-mono group-hover:text-white/40 transition-colors">
                        {skill.level}
                      </span>
                    </div>
                    <h4 className="text-base font-semibold text-white/70 group-hover:text-white transition-colors duration-300 mb-1">
                      {skill.name}
                    </h4>
                    <p className="text-[12px] text-white/20 group-hover:text-white/35 transition-colors duration-300">
                      {skill.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <MemoizedDistortionLine />

        {/* ════════ CONTACT ════════ */}
        <section id="contact" className="py-40 max-w-7xl mx-auto px-8">
          <MaskReveal>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[11px] uppercase tracking-[0.5em] text-white/30 font-mono">04</span>
              <div className="w-8 h-px-white/20" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-white/40">Contact</span>
            </div>
          </MaskReveal>

          <div className="mt-16 mb-20">
            <SplitText className="text-6xl md:text-[8rem] font-bold tracking-[-0.04em] text-white leading-[0.9]">
              Let's build
            </SplitText>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-6xl md:text-[8rem] font-bold tracking-[-0.04em] leading-[0.9] bg-linear-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                  the future.
                </span>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col gap-12"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/20 mb-4">Drop a line</p>
              <Magnetic>
                <motion.a
                  href={`mailto:${USER_DATA.contact.email}`}
                  whileHover={{ x: 10 }}
                  className="group inline-flex items-center gap-4 text-2xl md:text-4xl font-light text-white/50 hover:text-white transition-colors duration-300"
                >
                  {USER_DATA.contact.email}
                  <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                </motion.a>
              </Magnetic>
            </div>

            <LineReveal delay={0.3} />

            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                {USER_DATA.contact.socials.map((social) => (
                  <Magnetic key={social.name}>
                    <motion.a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 rounded-full border border-white/6 text-white/30 hover:text-white hover:border-white/20 hover:bg-white/4 transition-all duration-300"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  </Magnetic>
                ))}
              </div>

              <p className="text-[10px] uppercase tracking-[0.4em] text-white/15">
                © {new Date().getFullYear()} Kartikey Singh
              </p>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
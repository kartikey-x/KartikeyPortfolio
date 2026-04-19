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
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";

// ─── TOUCH DEVICE DETECTION ───
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsTouch(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isTouch;
}

// ─── USER DATA ───
const USER_DATA = {
  name: "Kartikey Singh",
  role: "AI/ML Engineer & Full-Stack Developer",
  bio: "B.Tech CSE student specializing in Artificial Intelligence and Machine Learning. Experienced in building Python-based tools and robust web applications with a focus on RESTful architectures and data-driven systems.",
  profileImage: "/profile.png",
  hardware: {
    primary: "MackBook Pro M4",
    specs: "Optimized for AI/ML Workloads",
    description: "Configured for local model training, data analysis using NumPy/Pandas, and full-stack backend development."
  },
  skillCategories: [
    {
      category: "Languages",
      icon: <Code2 className="w-5 h-5" />,
      color: "from-blue-500/20 to-blue-600/5",
      accent: "bg-blue-400/80",
      items: ["Python", "C", "C++", "Java"],
    },
    {
      category: "Core CS",
      icon: <Cpu className="w-5 h-5" />,
      color: "from-purple-500/20 to-purple-600/5",
      accent: "bg-purple-400/80",
      items: ["Data Structures & Algorithms", "Object-Oriented Programming", "DBMS", "Operating Systems"],
    },
    {
      category: "Tools & Platforms",
      icon: <Terminal className="w-5 h-5" />,
      color: "from-cyan-500/20 to-cyan-600/5",
      accent: "bg-cyan-400/80",
      items: ["Git", "GitHub", "VS Code", "Google Colab"],
    },
    {
      category: "Web & Backend",
      icon: <Globe className="w-5 h-5" />,
      color: "from-emerald-500/20 to-emerald-600/5",
      accent: "bg-emerald-400/80",
      items: ["HTML", "CSS", "Backend Basics", "REST APIs"],
    },
    {
      category: "AI / ML Track",
      icon: <Sparkles className="w-5 h-5" />,
      color: "from-orange-500/20 to-orange-600/5",
      accent: "bg-orange-400/80",
      items: ["Machine Learning", "Neural Networks", "NLP", "Computer Vision"],
    },
    {
      category: "Networking",
      icon: <Network className="w-5 h-5" />,
      color: "from-rose-500/20 to-rose-600/5",
      accent: "bg-rose-400/80",
      items: ["Network Protocols", "Configuration", "Troubleshooting", "Technical Documentation"],
    },
  ],
  skills: [
    { name: "Python", icon: <Code2 className="w-5 h-5" />, level: "Primary", desc: "Core language for AI/ML & scripting" },
    { name: "C / C++", icon: <Terminal className="w-5 h-5" />, level: "Proficient", desc: "Systems & competitive programming" },
    { name: "Java", icon: <Braces className="w-5 h-5" />, level: "Proficient", desc: "OOP and academic coursework" },
    { name: "DSA & OOP", icon: <Cpu className="w-5 h-5" />, level: "Strong", desc: "80+ problems on LeetCode & HackerRank" },
    { name: "Git & GitHub", icon: <Network className="w-5 h-5" />, level: "Daily Use", desc: "Version control & open-source" },
    { name: "AI / ML", icon: <Sparkles className="w-5 h-5" />, level: "Specialising", desc: "B.Tech AI/ML track, Google Colab" },
  ],
  projects: [
    {
      title: "NotaLink",
      desc: "A web-based academic note-sharing portal featuring REST API endpoints for secure file management and subject-based categorization.",
      tech: ["Flask", "SQLite", "JavaScript", "REST"],
      link: "https://github.com/kartikey-x/NotaLink",
      featured: true,
      year: "2025",
      number: "01"
    },
    {
      title: "StegoSafe",
      desc: "An advanced information-hiding tool utilizing LSB steganography to securely embed and extract data within image payloads.",
      tech: ["Python", "Steganography", "Security"],
      link: "https://github.com/kartikey-x/StegoSafe-OpenInnovation",
      year: "2026",
      number: "02"
    },
    {
      title: "ExamPrepBuddy",
      desc: "A modular CLI-based study optimization tool that automates plan organization and tracks completion metrics across multiple subjects.",
      tech: ["Python", "File I/O", "Modular Design"],
      link: "https://github.com/kartikey-x/ExamPreparationBuddy",
      year: "2025",
      number: "03"
    }
  ],
  contact: {
    email: "kartikeysingh2007@gmail.com",
    socials: [
      { name: "GitHub", icon: <Github className="w-5 h-5" />, link: "https://github.com/kartikey-singh" },
      { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, link: "https://linkedin.com/in/kartikey-singh" },
      { name: "Instagram", icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
        </svg>
      ), link: "https://instagram.com/unclaimedheat" },
      { name: "Twitter", icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ), link: "https://twitter.com/@kartikey_x_" },
    ]
  }
};

// ─── CUSTOM CURSOR (only rendered on non-touch devices) ───
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const followerX = useMotionValue(-100);
  const followerY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const x = useSpring(cursorX, { damping: 25, stiffness: 280 });
  const y = useSpring(cursorY, { damping: 25, stiffness: 280 });
  const fx = useSpring(followerX, { damping: 18, stiffness: 100 });
  const fy = useSpring(followerY, { damping: 18, stiffness: 100 });

  useEffect(() => {
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
        animate={{ scale: isHovering ? 0.1 : 1 }}
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

// ─── MAGNETIC WRAPPER (disabled on touch) ───
function Magnetic({ children, className, strength = 0.35 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 30, stiffness: 300 });
  const springY = useSpring(y, { damping: 30, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((clientX - left - width / 2) * strength);
    y.set((clientY - top - height / 2) * strength);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  if (isTouch) {
    return <div className={cn("magnetic-area", className)}>{children}</div>;
  }

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
            duration: 0.1,
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

// ─── PARALLAX SECTION (reduced on mobile) ───
function ParallaxSection({ children, speed = 0.1, className }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const effectiveSpeed = isTouch ? speed * 0.3 : speed;
  const y = useTransform(scrollYProgress, [0, 1], [100 * effectiveSpeed, -100 * effectiveSpeed]);
  const smoothY = useSpring(y, { damping: 50, stiffness: 100 });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ y: isTouch ? 0 : smoothY }}>
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

// ─── INTERACTIVE PARTICLE BACKGROUND (reduced on mobile) ───
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

    // Detect if touch/mobile for reduced complexity
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    const orbColors = [
      "220, 168, 66",  /* Gold */
      "242, 235, 217", /* Champagne */
      "180, 130, 60",  /* Soft Bronze */
      "200, 300, 50",  /* Muted Amber */
      "255, 245, 230", /* Warm White */
    ];

    const particleColors = [
      "255, 245, 230",
      "220, 168, 66",
      "180, 130, 60",
    ];

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio, 2);
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
      const maxCount = isMobile ? 5 : 12;
      const count = Math.min(maxCount, Math.floor((width * height) / 100000));
      for (let i = 0; i < count; i++) {
        const baseRadius = isMobile ? (80 + Math.random() * 300) : (100 + Math.random() * 250);
        orbs.push({
          x: Math.random() * width, y: Math.random() * height,
          baseX: Math.random() * width, baseY: Math.random() * height,
          vx: 0, vy: 0, radius: baseRadius, baseRadius,
          color: orbColors[i % orbColors.length],
          alpha: 0.015 + Math.random() * 0.025,
          baseAlpha: 0.015 + Math.random() * 0.025,
          pulseSpeed: 0.15 + Math.random() * 0.4, pulsePhase: Math.random() * Math.PI * 2,
          driftSpeed: 0.08 + Math.random() * 0.15, driftAngle: Math.random() * Math.PI * 2,
          driftRadius: 30 + Math.random() * 80, mass: 0.1 + Math.random() * 1.5,
        });
      }
      return orbs;
    };

    const createParticles = () => {
      const particleCount = isMobile ? 15 : 40;
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.1) * 0.15,
          vy: -0.05 - Math.random() * 0.15,
          size: 0.1 + Math.random() * 1.2,
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
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 };
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

        if (!isMobile) {
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
        }

        const pulse = Math.sin(t * orb.pulseSpeed + orb.pulsePhase) * 0.1 + 1;
        orb.vx += (targetX - orb.x) * 0.004;
        orb.vy += (targetY - orb.y) * 0.004;
        orb.vx *= 0.97; orb.vy *= 0.97;
        orb.x += orb.vx; orb.y += orb.vy;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius * pulse);
        gradient.addColorStop(0, `rgba(${orb.color}, ${orb.alpha * 2})`);
        gradient.addColorStop(0.4, `rgba(${orb.color}, ${orb.alpha * 0.1})`);
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

      if (!isMobile && mouse.x > 0) {
        // Reduced size from 250 radius to 150 radius, drastically reducing pixel fill rate
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 150);
        glow.addColorStop(0, `rgba(220, 168, 66, 0.03)`); 
        glow.addColorStop(1, `rgba(0, 0, 0, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 150, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => { resize(); orbsRef.current = createOrbs(); };
    window.addEventListener("resize", onResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
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
    velocity.current = Math.min(Math.abs(diff) * 0.1, 50);
    prevScroll.current = latest;
  });

  useEffect(() => {
    let raf: number;
    const animate = () => {
      let moveBy = direction.current * Math.max(0.045, velocity.current * 0.02);
      let currentX = baseX.get() + moveBy;

      if (currentX <= -50) {
        currentX += 50;
      } else if (currentX >= 0) {
        currentX -= 50;
      }

      baseX.set(currentX);
      velocity.current *= 0.95;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [baseX]);

  return (
    <div className={cn("overflow-hidden whitespace-nowrap flex", className)}>
      <motion.div className="flex gap-8 md:gap-16 pr-8 md:pr-16 will-change-transform" style={{ x: useMotionTemplate`${baseX}%` }}>
        {[...Array(8)].map((_, i) => (
          <span key={i} className="text-[14vw] md:text-[12vw] font-black uppercase tracking-tighter text-white/3 select-none">
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
      <path ref={pathRef} d="M 0 25 L 1000 25" stroke="url(#lineGrad)" strokeWidth="0.1" fill="none" />
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="20%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="50%" stopColor="rgba(120,180,255,0.8)" />
          <stop offset="80%" stopColor="rgba(255,255,255,0.1)" />
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

// ─── MOBILE NAVIGATION MENU ───
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center"
        >
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            onClick={onClose}
            className="absolute top-6 right-6 p-3 text-white/60 hover:text-white"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </motion.button>

          <nav className="flex flex-col items-center gap-2">
            {["home", "projects", "skills", "contact"].map((section, i) => (
              <motion.button
                key={section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
                  }, 300);
                }}
                className="text-3xl font-bold uppercase tracking-[0.15em] text-white/70 hover:text-white py-4 px-8 transition-colors"
              >
                {section}
              </motion.button>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── ISOLATED NAVIGATION COMPONENT ───
function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setNavScrolled(latest > 100);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          navScrolled ? "py-3 md:py-4 bg-transparent" : "py-5 md:py-8"
        )}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          <motion.div
            className="text-sm font-mono tracking-widest text-white/60"
            whileHover={{ color: "rgba(255,255,255,0.9)" }}
          >
            KS.
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
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

          {/* Mobile hamburger */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-white/60 hover:text-white"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.nav>
    </>
  );
}

// ─── THE HYPER-SPATIAL Z-DRIVE ENGINE (v3: High Performance 60FPS) ───
// ─── THE HYPER-SPATIAL Z-DRIVE ENGINE (v4: Mobile Optimized) ───
function ZDriveLayer({ children, index, total = 5, id, className }: { children: React.ReactNode; index: number; total?: number; id?: string; className?: string }) {
  const { scrollYProgress } = useScroll();
  const isTouch = useIsTouchDevice();
  const [isActive, setIsActive] = useState(false);

  const step = 1 / Math.max(1, total - 1); 
  const enter = index * step - step;     
  const land = index * step;            
  const linger = index * step + (step * 0.15); 
  const exit = index * step + step;      

  // 1. FIXED SENSITIVITY: 
  // Desktop still travels 3500px. Mobile now only travels 800px. 
  // Less distance to travel = lightning-fast scroll sensitivity on touch devices.
  const z = useTransform(scrollYProgress, [enter, land, linger, exit], [isTouch ? -800 : -3500, 0, 0, isTouch ? 300 : 3000]);
  
  // 2. FIXED ENLARGEMENT: 
  // Desktop scales to 1 (100%). Mobile lands at 0.92 (92%) to guarantee it perfectly fits the narrow viewport without clipping.
  const scale = useTransform(scrollYProgress, [enter, land, linger, exit], [0.8, isTouch ? 0.92 : 1, isTouch ? 0.92 : 1, isTouch ? 1.05 : 1.2]);
  
  // 3. FIXED CLIPPING:
  // Reduced the tilt angle on mobile from 45deg to 10deg so the corners don't fly off the screen.
  const rotateX = useTransform(scrollYProgress, [enter, land, linger, exit], [isTouch ? 10 : 45, 0, 0, isTouch ? -10 : -45]);
  
  const opacity = useTransform(scrollYProgress, [enter + (step * 0.15), land, linger, exit - (step * 0.1)], [0, 1, 1, 0]);

  const smoothZ = useSpring(z, { damping: 25, stiffness: 300, mass: 0.1 });
  const smoothOpacity = useSpring(opacity, { damping: 25, stiffness: 300, mass: 0.1 });
  const smoothRotateX = useSpring(rotateX, { damping: 25, stiffness: 300, mass: 0.1 });
  const smoothScale = useSpring(scale, { damping: 25, stiffness: 300, mass: 0.1 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= enter + (step * 0.2) && latest <= exit - (step * 0.2)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  });

  return (
    <motion.section
      id={id}
      style={{
        z: smoothZ,
        opacity: smoothOpacity,
        rotateX: smoothRotateX,
        scale: smoothScale,
        pointerEvents: isActive ? "auto" : "none",
        transformOrigin: "center center",
      }}
      className="absolute inset-0 flex items-center justify-center w-full h-full will-change-[transform,opacity] transform-style-3d px-5 md:px-8"
    >
      <div className={cn("w-full max-w-7xl mx-auto", className)}>
        {children}
      </div>
    </motion.section>
  );
}
// ─── MAIN APPLICATION ───
export default function App() {
  const [mounted, setMounted] = useState(false);
  const isTouch = useIsTouchDevice();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Add viewport meta tag for proper mobile rendering
  useEffect(() => {
    const existing = document.querySelector('meta[name="viewport"]');
    if (!existing) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="relative overflow-x-hidden bg-[#0d0c0b]">
      {/* Only render custom cursor on non-touch devices */}
      {!isTouch && <MemoizedCustomCursor />}
      <div className="grain" />
      <MemoizedBackground />

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-white/80 z-100 origin-left" style={{ scaleX }} />

      <Navigation />

      {/* ─── THE MAGNETIC SCROLL TRACK (STRICT 5 PAGES) ─── */}
      <div className="w-full z-0 flex flex-col">
        {/* Using 100dvh instead of h-screen forces the exact window height, killing the ghost page */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-dvh w-full snap-center snap-always" />
        ))}
      </div>

      {/* ─── THE FIXED GLASS COCKPIT ─── */}
      <main className="fixed inset-0 w-full h-dvh overflow-hidden perspective-[2500px] pointer-events-none z-10">

          {/* Layer 0: Hero (index 0) */}
          <ZDriveLayer index={0} id="home" className="pt-28 md:pt-32 pb-24 md:pb-32">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-center">
              {/* Left: Text Content */}
              <div className="relative z-10 order-2 lg:order-1">
                {/* Top label */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={mounted ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-4 mb-8 md:mb-12"
                >
                  <motion.div
                    className="w-8 md:w-12 h-px bg-white/30"
                    initial={{ scaleX: 0 }}
                    animate={mounted ? { scaleX: 1 } : {}}
                    transition={{ duration: 1, delay: 0.1 }}
                    style={{ transformOrigin: "left" }}
                  />
                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-widest text-white/50 font-medium">
                    Portfolio / 2026
                  </span>
                </motion.div>

                {/* Name */}
                <div className="mb-6 md:mb-8">
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
                        className="text-[clamp(2.5rem,10vw,8rem)] font-bold leading-[0.9] tracking-[-0.04em] text-white"
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
                  className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-[11px] md:text-[13px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/50 font-medium">
                    {USER_DATA.role}
                  </span>
                </motion.div>

                {/* Bio */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="text-base md:text-lg text-white/40 leading-relaxed max-w-lg mb-10 md:mb-14 font-light"
                >
                  {USER_DATA.bio}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-5"
                >
                  <Magnetic>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                      className="group relative px-8 md:px-10 py-4 bg-white text-black text-[12px] uppercase tracking-[0.3em] font-semibold rounded-full overflow-hidden text-center"
                    >
                      <motion.div
                        className="absolute inset-0 bg-linear-to-r from-amber-500 to-yellow-600"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.4 }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-yellow-600 transition-colors">
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
                      className="px-8 md:px-10 py-4 border border-white/15 text-white/70 hover:text-white hover:border-white/30 text-[12px] uppercase tracking-[0.3em] font-medium rounded-full transition-all duration-300 text-center"
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
                className="relative flex justify-center items-center order-1 lg:order-2"
              >
                <Magnetic strength={0.15}>
                  <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-100 lg:h-100 group">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 via-purple-500/10 to-cyan-500/20 rounded-full blur-[60px] md:blur-[80px] transition-all duration-1000 scale-110 group-hover:scale-100 group-hover:opacity-80" />

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
                      className="absolute -inset-4 rounded-full border border-white/3 will-change-transform hidden sm:block"
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
                      <div className="absolute inset-0 z-20 bg-linear-to-t from-[#0d0c0b]/60 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Floating status badge */}
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-30 px-4 md:px-5 py-2 rounded-full bg-white/[0.07] backdrop-blur-xl border border-white/10 flex items-center gap-2 will-change-transform"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/60 font-medium whitespace-nowrap">Available for work</span>
                    </motion.div>
                  </div>
                </Magnetic>
              </motion.div>
            </div>
          </ZDriveLayer>

          {/* Layer 1: About (index 1) */}
          <ZDriveLayer index={1} id="about">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <MaskReveal>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[11px] uppercase tracking-widest text-white/30 font-mono">01</span>
                    <div className="w-8 h-px bg-white/20" />
                    <span className="text-[11px] uppercase tracking-[0.4em] text-white/40">About</span>
                  </div>
                </MaskReveal>

                <SplitText className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white leading-[1.15] mb-8">
                  Engineered for raw computational performance
                </SplitText>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-white/35 text-base md:text-lg leading-relaxed font-light"
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
                  className="relative p-6 md:p-10 rounded-2xl border border-white/6 bg-white/2 backdrop-blur-sm overflow-hidden group"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="absolute top-6 right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <Monitor className="w-16 md:w-24 h-16 md:h-24" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-linear-to-b from-amber-400 to-yellow-600 rounded-full" />
                      <h3 className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-medium">Workstation</h3>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">{USER_DATA.hardware.primary}</h2>
                    <p className="text-amber-300/60 font-mono text-xs md:text-sm mb-6">{USER_DATA.hardware.specs}</p>
                    <p className="text-white/30 leading-relaxed text-sm">{USER_DATA.hardware.description}</p>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-400/30 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.1 }}
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
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-24 pt-12 md:pt-16 border-t border-white/5"
            >
              {[
                { label: "Projects Built", value: 10, suffix: "+" },
                { label: "Technologies", value: 15, suffix: "+" },
                { label: "Years Coding", value: 3, suffix: "+" },
                { label: "Lines of Code", value: 50, suffix: "K+" },
              ].map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/25">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </ZDriveLayer>

          {/* Layer 2: Projects (index 2) */}
          <ZDriveLayer index={2} id="projects">
            <MaskReveal>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[11px] uppercase tracking-widest text-white/30 font-mono">02</span>
                <div className="w-8 h-px bg-white/20" />
                <span className="text-[11px] uppercase tracking-[0.4em] text-white/40">Selected Works</span>
              </div>
            </MaskReveal>

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-4">
              <SplitText className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] text-white" delay={0.1}>
                Project Archive
              </SplitText>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm text-white/15 font-mono"
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
                  <div className="relative py-6 md:py-10 px-4 md:px-8 -mx-4 md:-mx-8 rounded-2xl transition-all duration-500 hover:bg-white/3 active:bg-white/5">
                    {/* Hover accent */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-0.1 bg-linear-to-b from-amber-400 via-yellow-500 to-amber-600 rounded-full origin-top hidden md:block"
                      initial={{ scaleY: 0, opacity: 0 }}
                      whileHover={{ scaleY: 1, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />

                    <div className="grid md:grid-cols-[auto_1fr_auto] gap-4 md:gap-8 items-start md:items-center">
                      {/* Number */}
                      <span className="text-3xl md:text-5xl font-bold text-white/6 group-hover:text-white/15 transition-colors duration-500 font-mono tracking-tighter">
                        {project.number}
                      </span>

                      {/* Content */}
                      <div>
                        <div className="flex items-center gap-3 mb-2 md:mb-3">
                          <h3 className="text-xl md:text-2xl font-bold text-white/80 group-hover:text-white transition-colors duration-300 tracking-tight">
                            {project.title}
                          </h3>
                          <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white/40 md:opacity-0 md:group-hover:opacity-100 transition-opacity shrink-0" />
                        </div>
                        <p className="text-white/25 text-xs md:text-sm leading-relaxed max-w-xl mb-3 md:mb-4 group-hover:text-white/35 transition-colors duration-300">
                          {project.desc}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {project.tech.map(t => (
                            <span key={t} className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] px-2.5 md:px-3 py-1 rounded-full border border-white/6 text-white/30 group-hover:border-white/12 group-hover:text-white/50 transition-all duration-300">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Year */}
                      <span className="text-xs md:text-sm text-white/15 font-mono group-hover:text-white/30 transition-colors absolute top-6 right-4 md:static">
                        {project.year}
                      </span>
                    </div>

                    {/* Bottom border */}
                    <div className="absolute bottom-0 left-4 right-4 md:left-8 md:right-8 h-px bg-white/4" />
                  </div>
                </motion.a>
              ))}
            </div>
          </ZDriveLayer>

          {/* Layer 3: Skills (index 3) */}
          <ZDriveLayer index={3} id="skills">
            {/* Header */}
            <div className="mb-12 md:mb-20">
              <MaskReveal>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[11px] uppercase tracking-widest text-white/30 font-mono">03</span>
                  <div className="w-8 h-px bg-white/20" />
                  <span className="text-[11px] uppercase tracking-[0.4em] text-white/40">Expertise</span>
                </div>
              </MaskReveal>
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-6">
                <SplitText className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white leading-[1.1]">
                  Technical Stack
                </SplitText>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-white/30 text-sm md:text-base leading-relaxed font-light max-w-sm lg:text-right"
                >
                  B.Tech CSE · AI/ML Track · SRM Institute of Science and Technology
                </motion.p>
              </div>
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {USER_DATA.skillCategories.map((cat, idx) => (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={isTouch ? {} : { y: -6, transition: { duration: 0.25 } }}
                  className={`group relative rounded-2xl border border-white/6 bg-linear-to-br ${cat.color} overflow-hidden p-5 md:p-6 hover:border-white/14 transition-all duration-500`}
                >
                  {/* Subtle noise texture overlay */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,white,transparent_70%)]" />

                  <div className="relative z-10">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-4 md:mb-5">
                      <div className="p-2 md:p-2.5 rounded-lg bg-white/8 text-white/60 group-hover:text-white/90 group-hover:bg-white/12 transition-all duration-300">
                        {cat.icon}
                      </div>
                      <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-white/35 font-mono group-hover:text-white/55 transition-colors">
                        {cat.category}
                      </span>
                    </div>

                    {/* Accent line */}
                    <div className={`h-px w-8 ${cat.accent} opacity-40 group-hover:opacity-70 group-hover:w-14 transition-all duration-500 mb-4 md:mb-5`} />

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {cat.items.map((item, i) => (
                        <motion.span
                          key={item}
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.09 + i * 0.05 + 0.2 }}
                          className="text-[10px] md:text-[11px] px-2.5 md:px-3 py-1 md:py-1.5 rounded-full border border-white/8 text-white/40 bg-white/3 group-hover:border-white/16 group-hover:text-white/65 group-hover:bg-white/6 transition-all duration-300"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom stat bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-10 md:mt-14 flex flex-wrap gap-6 md:gap-8 items-center border-t border-white/5 pt-8 md:pt-10"
            >
              {[
                { label: "LeetCode & HackerRank", value: "80+" },
                { label: "Problems Solved", value: "Algo" },
                { label: "Specialisation", value: "AI / ML" },
                { label: "Year", value: "2nd" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-xl md:text-2xl font-bold text-white/70 tracking-tight">{stat.value}</span>
                  <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/20 font-mono">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </ZDriveLayer>

          {/* Layer 4: Contact (index 4) */}
          <ZDriveLayer index={4} id="contact">
            <MaskReveal>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[11px] uppercase tracking-widest text-white/30 font-mono">04</span>
                <div className="w-8 h-px bg-white/20" />
                <span className="text-[11px] uppercase tracking-[0.4em] text-white/40">Contact</span>
              </div>
            </MaskReveal>

            <div className="mt-10 md:mt-16 mb-12 md:mb-20">
              <SplitText className="text-4xl sm:text-5xl md:text-6xl lg:text-[8rem] font-bold tracking-[-0.04em] text-white leading-[0.9]">
                Let's build
              </SplitText>
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[8rem] font-bold tracking-[-0.04em] leading-[0.9] bg-linear-to-r from-amber-300 via-yellow-400 to-amber-600 bg-clip-text text-transparent">
                    the future.
                  </span>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col gap-8 md:gap-12"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/20 mb-4">Drop a line</p>
                <Magnetic>
                  <motion.a
                    href={`mailto:${USER_DATA.contact.email}`}
                    whileHover={{ x: 10 }}
                    className="group inline-flex items-center gap-4 text-lg sm:text-xl md:text-2xl lg:text-4xl font-light text-white/50 hover:text-white transition-colors duration-300 break-all md:break-normal"
                  >
                    {USER_DATA.contact.email}
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 shrink-0 hidden sm:block" />
                  </motion.a>
                </Magnetic>
              </div>

              <LineReveal delay={0.3} />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex gap-3 md:gap-4">
                  {USER_DATA.contact.socials.map((social) => (
                    <Magnetic key={social.name}>
                      <motion.a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 md:p-4 rounded-full border border-white/6 text-white/30 hover:text-white hover:border-white/20 hover:bg-white/4 transition-all duration-300"
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
          </ZDriveLayer>

        </main>
      </div>
  );
}
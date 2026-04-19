/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence, useInView, useMotionValueEvent, MotionValue } from "motion/react";
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

// // ─── HELPER COMPONENT: CANVAS NODE ───
function CanvasNode({ children, x, y, title }: { children: React.ReactNode; x: number; y: number; title: string }) {
  return (
    <div 
      className="absolute flex flex-col items-center justify-center"
      style={{ 
        left: `calc(50% + ${x}px)`, 
        top: `calc(50% + ${y}px)`, 
        transform: "translate(-50%, -50%)" 
      }}
    >
      <div className="mb-6 flex items-center gap-3 opacity-50 bg-[#0d0c0b]/50 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.4em] font-mono text-white/70">
          {title} // {x}, {y}
        </span>
      </div>
      <div className="pointer-events-auto" onPointerDownCapture={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

// ─── HELPER: MAP DATA STREAMS ───
function NetworkLines({ nodes }: { nodes: any }) {
  return (
    <svg className="absolute top-1/2 left-1/2 w-3000 h-3000 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60 z-0">
      {/* Center of the 12000px SVG is 6000, 6000 */}
      <g transform="translate(6000, 6000)">
        <MapPath from={nodes.home} to={nodes.about} />
        <MapPath from={nodes.home} to={nodes.projects} />
        <MapPath from={nodes.about} to={nodes.skills} />
        <MapPath from={nodes.projects} to={nodes.contact} />
        <MapPath from={nodes.skills} to={nodes.contact} />
        {/* The hidden red line to the secret terminal */}
        <MapPath from={nodes.home} to={nodes.secret} isSecret />
      </g>
    </svg>
  );
}

function MapPath({ from, to, isSecret }: { from: any; to: any; isSecret?: boolean }) {
  const path = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  const color = isSecret ? "rgba(239, 68, 68, 0.4)" : "rgba(220,168,66,0.3)";
  const dashColor = isSecret ? "rgba(239, 68, 68, 0.8)" : "rgba(220,168,66,0.8)";
  
  return (
    <>
      <path d={path} stroke={color} strokeWidth="2" fill="none" />
      <path d={path} stroke={dashColor} strokeWidth="3" fill="none" strokeDasharray={isSecret ? "10 40" : "15 30"}>
        <animate attributeName="stroke-dashoffset" from="100" to="0" dur={isSecret ? "4s" : "2s"} repeatCount="indefinite" />
      </path>
    </>
  );
}

// ─── MAIN SPATIAL OS APPLICATION ───
export default function App() {
  const [mounted, setMounted] = useState(false);
  const isTouch = useIsTouchDevice();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Puzzle State
  const [passcode, setPasscode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  
  // Universal Camera Coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
    const existing = document.querySelector('meta[name="viewport"]');
    if (!existing) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
      document.head.appendChild(meta);
    }
  }, []);

  // Trackpad & Mouse Wheel Native Panning
  const handleWheel = (e: React.WheelEvent) => {
    // Multiply delta for faster, smoother trackpad tracking
    const newX = x.get() - e.deltaX * 1.5;
    const newY = y.get() - e.deltaY * 1.5;
    
    // Clamp the coordinates so the user can't scroll off into the infinite void
    x.set(Math.max(-4000, Math.min(4000, newX)));
    y.set(Math.max(-4000, Math.min(4000, newY)));
  };

  const nodes = {
    home: { x: 0, y: 0, label: "Origin" },
    about: { x: -1600, y: -1000, label: "Hardware" },
    projects: { x: 1600, y: -800, label: "Archive" },
    skills: { x: -1200, y: 1200, label: "Stack" },
    contact: { x: 1400, y: 1400, label: "Comms" },
    secret: { x: 0, y: -2400, label: "Classified" }
  };

  const mapScale = 200 / 12000; 
  const dotX = useTransform(x, (val) => 100 - (val * mapScale));
  const dotY = useTransform(y, (val) => 100 - (val * mapScale));

  // High-Speed Camera Flight (Radar Dock)
  const flyTo = (targetX: number, targetY: number) => {
    animate(x, -targetX, { type: "spring", damping: 30, stiffness: 120, mass: 0.5 });
    animate(y, -targetY, { type: "spring", damping: 30, stiffness: 120, mass: 0.5 });
  };

  return (
    <div 
      onWheel={handleWheel}
      className="relative w-screen h-screen overflow-hidden bg-[#0d0c0b] text-[#f2ebd9] selection:bg-amber-500/30"
    >
      {!isTouch && <MemoizedCustomCursor />}
      <div className="grain" />
      <MemoizedBackground />

      {/* ─── HUD OVERLAYS ─── */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50 pointer-events-none">
        <h1 className="text-xl md:text-2xl font-bold tracking-widest text-amber-500">KS.</h1>
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/40 mt-1">Spatial OS // Live</p>
      </div>

      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50 flex items-center gap-2 pointer-events-none text-white/30 text-[9px] md:text-[10px] font-mono">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        <span className="hidden sm:inline">Trackpad / Drag to Explore</span>
        <span className="sm:hidden">Drag to Explore</span>
      </div>

      {/* ─── RADAR NAVIGATION DOCK ─── */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <div className="flex items-center gap-1 md:gap-2 p-2 rounded-full bg-[#0d0c0b]/80 backdrop-blur-xl border border-amber-500/15 shadow-[0_0_30px_rgba(220,168,66,0.05)]">
          {Object.entries(nodes).filter(([key]) => key !== 'secret').map(([key, data]) => (
            <Magnetic key={key} strength={0.1}>
              <button
                onClick={() => flyTo(data.x, data.y)}
                className="px-4 py-2.5 md:px-6 md:py-3 rounded-full text-[9px] md:text-xs uppercase tracking-widest font-medium text-white/50 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-300"
              >
                {data.label}
              </button>
            </Magnetic>
          ))}
        </div>
      </div>

      {/* ─── LIVE RADAR (MINIMAP) ─── */}
      <div className="absolute bottom-8 right-8 w-50 h-50 bg-[#0d0c0b]/80 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden pointer-events-none hidden lg:block shadow-[0_0_30px_rgba(0,0,0,0.8)] z-50">
        <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(rgba(220,168,66,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(220,168,66,0.5)_1px,transparent_1px)] bg-size-[20px_20px]" />
        
        {Object.entries(nodes).map(([key, data]) => (
          <div 
            key={key} 
            className={`absolute w-2 h-2 rounded-full -ml-1 -mt-1 ${key === 'secret' ? 'bg-red-500 animate-ping' : 'bg-amber-500'}`} 
            style={{ left: 100 + data.x * mapScale, top: 100 + data.y * mapScale }} 
          />
        ))}

        <motion.div 
          className="absolute w-12 h-8 border border-amber-400 bg-amber-400/10 shadow-[0_0_15px_rgba(220,168,66,0.4)] -ml-6 -mt-4 will-change-transform" 
          style={{ left: dotX, top: dotY }} 
        />
        
        <div className="absolute top-2 left-2 text-[8px] font-mono tracking-widest text-amber-500/50 uppercase">Live_Radar</div>
      </div>

      {/* ─── THE UNIVERSAL CANVAS ─── */}
      <motion.div
        ref={containerRef}
        drag
        dragConstraints={{ left: -4000, right: 4000, top: -4000, bottom: 4000 }}
        dragElastic={0.1}
        style={{ x, y }}
        className="absolute top-1/2 left-1/2 w-3000 h-3000 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing will-change-transform"
      >
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(220,168,66,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(220,168,66,0.5)_1px,transparent_1px)] bg-size-[100px_100px] pointer-events-none" />

        <NetworkLines nodes={nodes} />

        {/* ════════ NODE 1: ORIGIN ════════ */}
        <CanvasNode x={nodes.home.x} y={nodes.home.y} title="Origin_Profile">
          <div className="w-[90vw] md:w-175 p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-[#0d0c0b]/60 border border-amber-500/10 shadow-[0_0_80px_rgba(220,168,66,0.03)] backdrop-blur-xl flex flex-col items-center text-center group hover:border-amber-500/30 transition-colors duration-700 relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/5 mb-8 relative">
               <img src={USER_DATA.profileImage} alt="Kartikey" className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700" />
               <div className="absolute inset-0 bg-linear-to-tr from-amber-500/20 to-transparent mix-blend-overlay" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">{USER_DATA.name}</h2>
            <p className="text-amber-500 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-6">{USER_DATA.role}</p>
            <p className="text-white/40 leading-relaxed text-sm md:text-base max-w-lg mb-10">{USER_DATA.bio}</p>
            <button 
              onClick={(e) => { e.stopPropagation(); flyTo(nodes.projects.x, nodes.projects.y); }}
              className="flex items-center gap-3 px-8 py-4 bg-white/5 text-white border border-white/10 text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-amber-500 hover:text-[#0d0c0b] hover:border-amber-500 transition-all duration-300"
            >
              Initialize Archive <ArrowRight className="w-4 h-4" />
            </button>

            {/* The Upgraded Puzzle Clue (More visible, pulsing) */}
            <div className="absolute bottom-5 right-8 text-[10px] md:text-xs opacity-30 animate-pulse font-mono tracking-widest text-red-500 hover:opacity-100 transition-opacity cursor-help">
              SYS_PIN: 0451
            </div>
          </div>
        </CanvasNode>

        {/* ════════ NODE 2: HARDWARE ════════ */}
        <CanvasNode x={nodes.about.x} y={nodes.about.y} title="Sys_Hardware">
          <div className="w-[85vw] md:w-125 p-8 md:p-12 rounded-[2rem] bg-[#0d0c0b]/80 border border-white/5 backdrop-blur-xl hover:border-amber-500/20 transition-all duration-500">
            <Monitor className="w-12 h-12 md:w-16 md:h-16 text-amber-500/50 mb-8" />
            <h3 className="text-2xl md:text-3xl font-bold mb-3">{USER_DATA.hardware.primary}</h3>
            <p className="text-amber-400/60 font-mono text-xs md:text-sm mb-6">{USER_DATA.hardware.specs}</p>
            <p className="text-white/40 text-sm leading-relaxed mb-8">{USER_DATA.hardware.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">80+</p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">Problems Solved</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">3+</p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">Years Coding</p>
              </div>
            </div>
          </div>
        </CanvasNode>

        {/* ════════ NODE 3: ARCHIVE ════════ */}
        <CanvasNode x={nodes.projects.x} y={nodes.projects.y} title="Data_Archive">
          <div className="w-[90vw] md:w-225 grid md:grid-cols-2 gap-6">
            {USER_DATA.projects.map((project, i) => (
              <a 
                key={i} 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-8 md:p-10 rounded-[2rem] bg-[#0d0c0b]/80 border border-white/5 backdrop-blur-xl hover:border-amber-500/40 hover:bg-white/2 transition-all duration-500 group block"
              >
                <div className="text-5xl md:text-6xl font-black text-white/5 mb-6 group-hover:text-amber-500/10 transition-colors font-mono">{project.number}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 flex items-center justify-between text-white/90 group-hover:text-amber-400 transition-colors">
                  {project.title}
                  <ExternalLink className="w-5 h-5 text-white/20 group-hover:text-amber-400 transition-colors" />
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-8">{project.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] tracking-[0.2em] uppercase text-white/50 group-hover:border-amber-500/30 group-hover:text-amber-200 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </CanvasNode>

        {/* ════════ NODE 4: STACK ════════ */}
        <CanvasNode x={nodes.skills.x} y={nodes.skills.y} title="Neural_Network">
          <div className="w-[90vw] md:w-175 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-[#0d0c0b]/80 border border-white/5 backdrop-blur-xl">
             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {USER_DATA.skillCategories.map((cat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-amber-500/20 transition-colors">
                  <div className="flex items-center gap-3 mb-4 text-white/60">
                    {cat.icon}
                    <span className="text-[10px] uppercase tracking-widest font-mono text-amber-500/80">{cat.category}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {cat.items.map((item, j) => (
                      <span key={j} className="text-sm text-white/50">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CanvasNode>

        {/* ════════ NODE 5: COMMS ════════ */}
        <CanvasNode x={nodes.contact.x} y={nodes.contact.y} title="Comms_Link">
          <div className="w-[85vw] md:w-125 p-10 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-[#0d0c0b]/80 border border-amber-500/20 shadow-[0_0_50px_rgba(220,168,66,0.05)] backdrop-blur-xl text-center flex flex-col items-center">
            <Mail className="w-12 h-12 text-amber-500 mb-6" />
            <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Let's Build.</h3>
            <p className="text-white/40 mb-10 text-sm md:text-base">Secure channel open for collaborations and opportunities.</p>
            
            <a href={`mailto:${USER_DATA.contact.email}`} className="text-lg md:text-xl font-light text-white/60 hover:text-amber-400 transition-colors mb-12 border-b border-amber-500/30 pb-2">
              {USER_DATA.contact.email}
            </a>

            <div className="flex justify-center gap-4">
              {USER_DATA.contact.socials.map((social, i) => (
                <a 
                  key={i} 
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 rounded-full bg-white/5 border border-white/10 text-white/40 hover:bg-amber-500 hover:text-[#0d0c0b] hover:border-amber-500 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </CanvasNode>

        {/* ════════ NODE 6: CLASSIFIED TERMINAL ════════ */}
        <CanvasNode x={nodes.secret.x} y={nodes.secret.y} title="Classified_Terminal">
          <div className="w-[85vw] md:w-125 p-8 md:p-12 rounded-[2rem] bg-[#050505] border-2 border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.1)] backdrop-blur-xl text-center font-mono">
            {!unlocked ? (
              <form onSubmit={(e) => { e.preventDefault(); if(passcode === "0451") setUnlocked(true); }}>
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
                  <Terminal className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-red-500 mb-2">SYSTEM LOCKED</h3>
                <p className="text-white/40 text-xs mb-8">Access to unrestricted data requires Level 4 Clearance PIN. (Hint: Check Origin)</p>
                
                <input 
                  type="text" 
                  maxLength={4}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="____"
                  className="w-full bg-[#0d0c0b] border border-red-500/30 rounded-lg p-4 text-center text-2xl tracking-[1em] text-red-500 outline-none focus:border-red-500 transition-colors mb-4"
                />
                <button type="submit" className="w-full py-4 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-black font-bold uppercase tracking-widest rounded-lg transition-all">
                  Decrypt
                </button>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-500 mb-4">ACCESS GRANTED</h3>
                <p className="text-white/60 text-sm mb-8 leading-relaxed">Easter Egg Unlocked! You successfully deciphered the map and traced the corrupted data line.</p>
                <a href="#" className="inline-block w-full py-4 bg-emerald-500 text-black font-bold uppercase tracking-widest rounded-lg hover:bg-emerald-400 transition-colors">
                  Download Classified Resume
                </a>
              </motion.div>
            )}
          </div>
        </CanvasNode>

      </motion.div>
    </div>
  );
}

function animate(x: MotionValue<number>, arg1: number, arg2: { type: string; damping: number; stiffness: number; mass: number; }) {
  throw new Error("Function not implemented.");
}

/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║   KARTIKEY SINGH — Spatial Resume v2                      ║
 * ║   Concept: Navigable stellar universe. Each section is    ║
 * ║   a planet orbiting the developer's identity core.        ║
 * ║   Navigation triggers a warp-speed star-streak jump.      ║
 * ║   Master-developer level motion & interaction.            ║
 * ╚═══════════════════════════════════════════════════════════╝
 */

import React, {
  useEffect, useRef, useState, useCallback, ReactNode,
} from "react";
import {
  motion, AnimatePresence, useMotionValue, useSpring,
} from "motion/react";
import {
  Code2, Globe, Mail, Github, Linkedin, ExternalLink,
  Terminal, Cpu, Sparkles, Network, ArrowUpRight,
  ChevronLeft, MapPin,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════
const ME = {
  name: "Kartikey Singh",
  handle: "@kartikey_x",
  role: "AI/ML Engineer & Full-Stack Developer",
  bio: "B.Tech CSE student specializing in Artificial Intelligence & Machine Learning. I build Python-based tools, robust web applications, and data-driven systems. Currently exploring the frontier of neural networks and language models.",
  image: "/profile.png",
  machine: "MacBook Pro M4",
  machineNote: "Optimized for AI/ML workloads",
  stats: [
    { n: "80+", label: "Problems Solved" },
    { n: "3+",  label: "Years Coding"    },
    { n: "3",   label: "Projects Shipped"},
  ],
  skills: [
    { cat: "Languages",  icon: "code",  tags: ["Python", "C", "C++", "Java"]                                 },
    { cat: "Core CS",    icon: "cpu",   tags: ["DSA", "OOP", "DBMS", "Operating Systems"]                    },
    { cat: "Tools",      icon: "term",  tags: ["Git", "GitHub", "VS Code", "Google Colab"]                   },
    { cat: "Web & API",  icon: "globe", tags: ["HTML", "CSS", "Flask", "REST APIs"]                          },
    { cat: "AI / ML",    icon: "spark", tags: ["Machine Learning", "Neural Networks", "NLP", "CV"]           },
    { cat: "Networks",   icon: "net",   tags: ["Protocols", "Configuration", "Docs", "Troubleshooting"]      },
  ],
  projects: [
    {
      id: "notalink", num: "01", title: "NotaLink", year: "2025",
      desc: "Academic note-sharing portal with REST API endpoints for secure file management and subject-based categorization.",
      tech: ["Flask", "SQLite", "JavaScript", "REST"],
      url: "https://github.com/kartikey-x/NotaLink",
      h: 43, sat: 80, lit: 65,
    },
    {
      id: "stego", num: "02", title: "StegoSafe", year: "2026",
      desc: "LSB steganography tool that embeds and extracts hidden data inside image payloads with zero perceptual change.",
      tech: ["Python", "Steganography", "PIL", "Security"],
      url: "https://github.com/kartikey-x/StegoSafe-OpenInnovation",
      h: 210, sat: 80, lit: 68,
    },
    {
      id: "buddy", num: "03", title: "ExamPrepBuddy", year: "2025",
      desc: "Modular CLI study-optimization tool automating plan organization and multi-subject completion tracking.",
      tech: ["Python", "File I/O", "Modular Design", "CLI"],
      url: "https://github.com/kartikey-x/ExamPreparationBuddy",
      h: 160, sat: 70, lit: 62,
    },
  ],
  contact: {
    email: "kartikeysingh2007@gmail.com",
    socials: [
      { label: "GitHub",   url: "https://github.com/kartikey-x",         icon: "gh" },
      { label: "LinkedIn", url: "https://linkedin.com/in/kartikey-singh", icon: "li" },
      { label: "Twitter",  url: "https://twitter.com/@kartikey_x_",       icon: "tw" },
    ],
  },
};

type Section = "home" | "about" | "projects" | "skills" | "contact";

const NAV: Array<{
  id: Exclude<Section, "home">;
  label: string;
  sub: string;
  angle: number;
  orbitR: number;
  color: string;
  rgb: string;
  period: number;
}> = [
  { id: "about",    label: "About",    sub: "Who I am",        angle: -75,  orbitR: 225, color: "#dca842", rgb: "220,168,66",  period: 12 },
  { id: "projects", label: "Projects", sub: "What I've built", angle: 15,   orbitR: 260, color: "#60a5fa", rgb: "96,165,250",  period: 18 },
  { id: "skills",   label: "Skills",   sub: "What I know",     angle: 105,  orbitR: 235, color: "#f472b6", rgb: "244,114,182", period: 22 },
  { id: "contact",  label: "Contact",  sub: "Let's connect",   angle: 200,  orbitR: 250, color: "#34d399", rgb: "52,211,153",  period: 15 },
];

// ═══════════════════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════════════════
function useTouch() {
  const [t, setT] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(pointer:coarse)");
    setT(mq.matches);
    const h = (e: MediaQueryListEvent) => setT(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return t;
}

function useClock() {
  const [d, setD] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setD(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return d;
}

// ═══════════════════════════════════════════════════════════════════════════
// STARFIELD CANVAS
// ═══════════════════════════════════════════════════════════════════════════
function StarField({ warp }: { warp: boolean }) {
  const cvs = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const warpRef = useRef(warp);
  useEffect(() => { warpRef.current = warp; }, [warp]);

  useEffect(() => {
    const canvas = cvs.current!;
    const ctx = canvas.getContext("2d")!;
    const mob = matchMedia("(pointer:coarse)").matches;
    let W = 0, H = 0, raf = 0, t = 0;
    let warpP = 0; // warp progress 0–1

    interface Star {
      x: number; y: number; z: number; pz: number;
      sz: number; spd: number; lum: number; warm: number;
    }
    const N = mob ? 140 : 300;
    const stars: Star[] = [];

    const mk = (): Star => ({
      x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2,
      z: Math.random(), pz: 1,
      sz: 0.4 + Math.random() * 1.4, spd: 0.0003 + Math.random() * 0.0009,
      lum: 0.4 + Math.random() * 0.6, warm: Math.random(),
    });

    const resize = () => {
      const dpr = mob ? 1 : Math.min(devicePixelRatio, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    for (let i = 0; i < N; i++) stars.push(mk());
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX / W, y: e.clientY / H }; };
    !mob && window.addEventListener("mousemove", onMove, { passive: true });

    const draw = () => {
      t += 0.016;
      warpP = warpRef.current ? Math.min(1, warpP + 0.09) : Math.max(0, warpP - 0.065);

      ctx.fillStyle = warpP > 0.05 ? `rgba(9,8,7,${0.14 + warpP * 0.1})` : "rgba(9,8,7,0.2)";
      ctx.fillRect(0, 0, W, H);

      const mx = (mouseRef.current.x - 0.5) * 0.03;
      const my = (mouseRef.current.y - 0.5) * 0.03;
      const speedMult = 1 + warpP * 28;

      for (const s of stars) {
        s.pz = s.z;
        s.z -= s.spd * speedMult;
        if (s.z <= 0.001) { Object.assign(s, mk()); s.z = 0.95 + Math.random() * 0.05; s.pz = s.z; continue; }

        const sx = ((s.x - mx) / s.z) * 0.5 + 0.5;
        const sy = ((s.y - my) / s.z) * 0.5 + 0.5;
        const px = ((s.x - mx) / s.pz) * 0.5 + 0.5;
        const py = ((s.y - my) / s.pz) * 0.5 + 0.5;
        const sX = sx * W, sY = sy * H, pX = px * W, pY = py * H;
        const depth = 1 - s.z;
        const size = s.sz * depth * 3.5;
        const alpha = s.lum * Math.min(1, depth * 1.8);
        const r = Math.round(242 + s.warm * 13);
        const g2 = Math.round(228 + s.warm * 7);
        const b = Math.round(200 + s.warm * 17);

        if (warpP > 0.08) {
          const dx = sX - pX, dy = sY - pY, len = Math.sqrt(dx * dx + dy * dy);
          if (len > 0.5) {
            ctx.beginPath(); ctx.moveTo(pX, pY); ctx.lineTo(sX, sY);
            ctx.strokeStyle = `rgba(${r},${g2},${b},${alpha * 0.85})`;
            ctx.lineWidth = Math.max(0.3, size * 0.4);
            ctx.stroke();
          }
        } else {
          if (size > 1.5) {
            const grd = ctx.createRadialGradient(sX, sY, 0, sX, sY, size * 3);
            grd.addColorStop(0, `rgba(${r},${g2},${b},${alpha * 0.55})`);
            grd.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(sX, sY, size * 3, 0, Math.PI * 2); ctx.fill();
          }
          ctx.beginPath(); ctx.arc(sX, sY, Math.max(0.1, size), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g2},${b},${alpha})`; ctx.fill();
        }
      }

      // Nebulas
      for (const nb of [
        { x: 0.12, y: 0.18, r: 400, rgb: "220,168,66", a: 0.022 + 0.007 * Math.sin(t * 0.35) },
        { x: 0.88, y: 0.76, r: 340, rgb: "96,165,250", a: 0.016 + 0.005 * Math.sin(t * 0.27) },
        { x: 0.50, y: 0.92, r: 280, rgb: "52,211,153", a: 0.013 + 0.004 * Math.sin(t * 0.48) },
      ]) {
        const g3 = ctx.createRadialGradient(nb.x * W, nb.y * H, 0, nb.x * W, nb.y * H, nb.r);
        g3.addColorStop(0, `rgba(${nb.rgb},${nb.a})`); g3.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g3; ctx.fillRect(0, 0, W, H);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      !mob && window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={cvs} className="fixed inset-0 -z-10" style={{ background: "#090807" }} />;
}

// ═══════════════════════════════════════════════════════════════════════════
// CUSTOM CURSOR
// ═══════════════════════════════════════════════════════════════════════════
function Cursor() {
  const cx = useMotionValue(-200), cy = useMotionValue(-200);
  const fx = useSpring(useMotionValue(-200), { stiffness: 200, damping: 26, mass: 0.4 });
  const fy = useSpring(useMotionValue(-200), { stiffness: 200, damping: 26, mass: 0.4 });
  const [hot, setHot] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const mv = (e: MouseEvent) => {
      cx.set(e.clientX); cy.set(e.clientY);
      fx.set(e.clientX); fy.set(e.clientY);
      setHot(!!(e.target as Element)?.closest("a,button,[data-hover]"));
    };
    const md = () => setClicking(true);
    const mu = () => setClicking(false);
    window.addEventListener("mousemove", mv, { passive: true });
    window.addEventListener("mousedown", md);
    window.addEventListener("mouseup", mu);
    return () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mousedown", md);
      window.removeEventListener("mouseup", mu);
    };
  }, [cx, cy, fx, fy]);

  return (
    <>
      <motion.div className="fixed top-0 left-0 pointer-events-none z-9999"
        style={{ x: cx, y: cy, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: clicking ? 0.3 : hot ? 0.25 : 1 }} transition={{ duration: 0.12 }}>
        <div className="w-2.5 h-2.5 rounded-full bg-white mix-blend-difference" />
      </motion.div>
      <motion.div className="fixed top-0 left-0 pointer-events-none z-9998"
        style={{ x: fx, y: fy, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: clicking ? 0.85 : hot ? 2 : 1 }} transition={{ duration: 0.22 }}>
        <motion.div className="w-9 h-9 rounded-full border"
          animate={{ borderColor: hot ? "rgba(220,168,66,0.7)" : "rgba(255,255,255,0.18)" }}
          transition={{ duration: 0.3 }} />
      </motion.div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAGNETIC BUTTON
// ═══════════════════════════════════════════════════════════════════════════
function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }} className={className}>
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FADE-UP REVEAL
// ═══════════════════════════════════════════════════════════════════════════
function Up({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

function Divider({ color = "rgba(255,255,255,0.07)" }: { color?: string }) {
  return <div className="h-px w-full" style={{ background: `linear-gradient(90deg,transparent,${color},transparent)` }} />;
}

// ═══════════════════════════════════════════════════════════════════════════
// PLANET ORB
// ═══════════════════════════════════════════════════════════════════════════
function Planet({ item, onClick, index }: { item: typeof NAV[number]; onClick: () => void; index: number }) {
  const [hov, setHov] = useState(false);
  const rad = (item.angle * Math.PI) / 180;

  return (
    <motion.button data-hover onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="absolute flex flex-col items-center gap-2.5"
      style={{
        left: "50%", top: "50%",
        translateX: `calc(${Math.cos(rad) * item.orbitR}px - 50%)`,
        translateY: `calc(${Math.sin(rad) * item.orbitR}px - 50%)`,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.4 + index * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.94 }}
    >
      <motion.div
        className="relative w-22 h-22 rounded-full flex items-center justify-center"
        animate={{
          boxShadow: hov
            ? `0 0 0 1px ${item.color}60,0 0 50px rgba(${item.rgb},0.45),0 0 90px rgba(${item.rgb},0.15)`
            : `0 0 0 1px ${item.color}20,0 0 25px rgba(${item.rgb},0.15)`,
        }}
        transition={{ duration: 0.4 }}
        style={{ background: `radial-gradient(ellipse at 38% 32%,${item.color}28 0%,${item.color}08 55%,transparent 85%)` }}
      >
        {/* Pulsing core */}
        <motion.div className="w-8 h-8 rounded-full"
          style={{ background: `radial-gradient(circle,${item.color}90 0%,${item.color}25 65%,transparent 100%)` }}
          animate={{ scale: hov ? [1, 1.35, 1] : [1, 1.08, 1], opacity: hov ? 1 : 0.6 }}
          transition={{ duration: hov ? 0.7 : 2.5, repeat: Infinity, ease: "easeInOut" }} />
        {/* Orbiting moon */}
        <motion.div className="absolute inset-0 rounded-full"
          animate={{ rotate: 360 }} transition={{ duration: item.period, repeat: Infinity, ease: "linear" }}>
          <div className="absolute w-2.5 h-2.5 rounded-full"
            style={{
              top: "50%", left: "calc(50% + 42px)", transform: "translateY(-50%)",
              background: item.color, boxShadow: `0 0 10px ${item.color},0 0 20px ${item.color}60`,
            }} />
        </motion.div>
        {/* Hover ring */}
        <motion.div className="absolute -inset-3 rounded-full pointer-events-none"
          style={{ border: `1px solid ${item.color}15` }}
          animate={{ opacity: hov ? 1 : 0, scale: hov ? 1 : 0.9 }}
          transition={{ duration: 0.35 }} />
      </motion.div>
      {/* Label */}
      <motion.div className="flex flex-col items-center gap-0.5"
        animate={{ opacity: hov ? 1 : 0.55 }} transition={{ duration: 0.25 }}>
        <span className="text-sm font-bold tracking-wide" style={{ color: item.color }}>{item.label}</span>
        <span className="text-[10px] text-white/25 leading-none">{item.sub}</span>
      </motion.div>
    </motion.button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HOME SCREEN
// ═══════════════════════════════════════════════════════════════════════════
function HomeScreen({ onNav, isMobile }: { onNav: (s: Section) => void; isMobile: boolean }) {
  const clock = useClock();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none">
      {/* Status bar */}
      <motion.div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-6"
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <div className="flex items-center gap-1.5 text-white/20 text-[10px] font-mono">
          <MapPin className="w-2.5 h-2.5" /> India · UTC+5:30
        </div>
        <div className="text-amber-400/50 text-[10px] font-mono tabular-nums">
          {clock.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </div>
      </motion.div>

      {isMobile ? (
        <div className="w-full px-6 flex flex-col items-center gap-6">
          <Up delay={0.1} className="flex flex-col items-center gap-2">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden"
                style={{ boxShadow: "0 0 0 1.5px rgba(220,168,66,0.4),0 0 30px rgba(220,168,66,0.15)" }}>
                <img src={ME.image} alt="" className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-400"
                style={{ border: "2.5px solid #090807" }} />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-black text-white leading-none">
                {ME.name.split(" ")[0]} <span className="text-amber-400">{ME.name.split(" ")[1]}</span>
              </h1>
              <p className="text-white/30 text-[10px] font-mono tracking-widest uppercase mt-1.5">{ME.role}</p>
            </div>
          </Up>
          <Up delay={0.25} className="grid grid-cols-2 gap-2.5 w-full max-w-xs">
            {NAV.map((item) => (
              <motion.button key={item.id} data-hover onClick={() => onNav(item.id)}
                className="flex flex-col gap-1.5 p-4 rounded-2xl text-left"
                style={{
                  background: `radial-gradient(ellipse at 30% 30%,rgba(${item.rgb},0.12) 0%,rgba(255,255,255,0.02) 70%)`,
                  border: `1px solid rgba(${item.rgb},0.2)`,
                }}
                whileTap={{ scale: 0.93 }}>
                <span className="text-sm font-bold" style={{ color: item.color }}>{item.label}</span>
                <span className="text-[9px] text-white/25 leading-tight">{item.sub}</span>
              </motion.button>
            ))}
          </Up>
          <Up delay={0.4} className="flex gap-5">
            {ME.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-xl font-black text-white">{s.n}</div>
                <div className="text-[9px] text-white/25 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </Up>
        </div>
      ) : (
        <div className="relative" style={{ width: 580, height: 580 }}>
          {/* Orbit rings */}
          {[200, 235, 265].map((r, i) => (
            <div key={i} className="absolute rounded-full pointer-events-none"
              style={{ width: r * 2, height: r * 2, top: "50%", left: "50%",
                transform: "translate(-50%,-50%)", border: "1px solid rgba(255,255,255,0.025)" }} />
          ))}
          {/* Identity core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
            <Up delay={0.1}>
              <Magnetic strength={0.12}>
                <motion.div className="relative" whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}>
                  <motion.div className="w-22 h-22 rounded-full overflow-hidden"
                    animate={{ boxShadow: [
                      "0 0 0 2px rgba(220,168,66,0.25),0 0 30px rgba(220,168,66,0.1)",
                      "0 0 0 2px rgba(220,168,66,0.45),0 0 50px rgba(220,168,66,0.2)",
                      "0 0 0 2px rgba(220,168,66,0.25),0 0 30px rgba(220,168,66,0.1)",
                    ] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                    <img src={ME.image} alt="" className="w-full h-full object-cover"
                      onError={(e) => {
                        const el = e.target as HTMLImageElement;
                        el.parentElement!.style.background = "rgba(220,168,66,0.12)";
                        el.style.display = "none";
                      }} />
                  </motion.div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full"
                    style={{ background: "#22c55e", border: "2.5px solid #090807" }} />
                </motion.div>
              </Magnetic>
            </Up>
            <Up delay={0.2} className="text-center">
              <h1 className="text-2xl font-black text-white leading-tight whitespace-nowrap">
                {ME.name.split(" ")[0]} <span className="text-amber-400">{ME.name.split(" ")[1]}</span>
              </h1>
              <p className="text-white/30 text-[9px] font-mono tracking-widest uppercase mt-1">{ME.role}</p>
            </Up>
            <Up delay={0.3} className="flex items-center gap-3">
              {ME.stats.map((s, i) => (
                <React.Fragment key={i}>
                  <div className="text-center">
                    <div className="text-base font-black text-white leading-none">{s.n}</div>
                    <div className="text-[8px] text-white/22 uppercase tracking-widest mt-0.5">{s.label}</div>
                  </div>
                  {i < ME.stats.length - 1 && <div className="w-px h-7 bg-white/8" />}
                </React.Fragment>
              ))}
            </Up>
          </div>
          {/* Planets */}
          {NAV.map((item, i) => (
            <Planet key={item.id} item={item} onClick={() => onNav(item.id)} index={i} />
          ))}
        </div>
      )}

      <motion.p className="absolute bottom-6 text-white/12 text-[10px] font-mono tracking-widest"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
        {isMobile ? "tap a planet to explore" : "click any planet · esc to return home"}
      </motion.p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PANEL SHELL
// ═══════════════════════════════════════════════════════════════════════════
function Panel({ children, accentColor, accentRgb, onBack, label }: {
  children: ReactNode; accentColor: string; accentRgb: string; onBack: () => void; label: string;
}) {
  return (
    <motion.div className="w-full h-full flex flex-col"
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -16 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      {/* Top bar */}
      <motion.div className="flex items-center justify-between px-6 md:px-10 pt-6 pb-3 shrink-0"
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Magnetic strength={0.2}>
          <motion.button data-hover onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-mono px-4 py-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}
            whileHover={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.8)", scale: 1.04 }}
            whileTap={{ scale: 0.95 }}>
            <ChevronLeft className="w-3.5 h-3.5" /> Home
          </motion.button>
        </Magnetic>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accentColor }} />
          <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: `${accentColor}80` }}>{label}</span>
        </div>
      </motion.div>
      {/* Accent line */}
      <motion.div className="h-px mx-6 md:mx-10 mb-1"
        style={{ background: `linear-gradient(90deg,transparent,rgba(${accentRgb},0.3),transparent)` }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.2 }} />
      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 md:px-10 py-6" style={{ scrollbarWidth: "thin" }}>
        {children}
      </div>
      {/* Bottom nav dots */}
      <motion.div className="flex justify-center gap-2.5 py-4 shrink-0"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        {NAV.map((n) => (
          <div key={n.id} className="w-1.5 h-1.5 rounded-full"
            style={{ background: n.color, opacity: n.color === accentColor ? 1 : 0.2 }} />
        ))}
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION: ABOUT
// ═══════════════════════════════════════════════════════════════════════════
function AboutPanel({ onBack }: { onBack: () => void }) {
  return (
    <Panel accentColor="#dca842" accentRgb="220,168,66" onBack={onBack} label="about.sys">
      <div className="max-w-xl mx-auto flex flex-col gap-7">
        <Up delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.05] tracking-tight">
            The human<br /><span style={{ color: "#dca842" }}>behind the code.</span>
          </h2>
        </Up>
        <Up delay={0.2}>
          <p className="text-white/45 text-base md:text-lg leading-relaxed">{ME.bio}</p>
        </Up>
        <Divider color="rgba(220,168,66,0.12)" />
        <Up delay={0.3}>
          <div className="px-5 py-4 rounded-2xl font-mono text-xs"
            style={{ background: "rgba(220,168,66,0.04)", border: "1px solid rgba(220,168,66,0.1)" }}>
            <div className="text-amber-400/30 mb-2 text-[10px]">// system info</div>
            {([["machine", ME.machine], ["config", ME.machineNote], ["status", "● active · open to work"], ["location", "India · Remote-friendly"]] as [string, string][]).map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-2 mb-0.5">
                <span className="text-amber-400/50 w-16 shrink-0">{k}</span>
                <span className="text-white/20 shrink-0">›</span>
                <span className={k === "status" ? "text-emerald-400/80" : "text-white/45"}>{v}</span>
              </div>
            ))}
          </div>
        </Up>
        <Up delay={0.4}>
          <div className="grid grid-cols-3 gap-2.5">
            {ME.stats.map((s, i) => (
              <motion.div key={i} className="flex flex-col items-center py-5 rounded-2xl gap-1"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.04)" }}
                whileHover={{ borderColor: "rgba(220,168,66,0.2)", background: "rgba(220,168,66,0.04)" }}>
                <span className="text-3xl font-black text-white">{s.n}</span>
                <span className="text-[9px] uppercase tracking-widest text-white/22">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </Up>
      </div>
    </Panel>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION: PROJECTS
// ═══════════════════════════════════════════════════════════════════════════
function ProjectsPanel({ onBack }: { onBack: () => void }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Panel accentColor="#60a5fa" accentRgb="96,165,250" onBack={onBack} label="projects/">
      <div className="max-w-xl mx-auto flex flex-col gap-7">
        <Up delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.05] tracking-tight">
            Things I've<br /><span style={{ color: "#60a5fa" }}>shipped.</span>
          </h2>
        </Up>
        <div className="flex flex-col gap-3">
          {ME.projects.map((p, i) => {
            const isOpen = open === p.id;
            const c = `hsl(${p.h},${p.sat}%,${p.lit}%)`;
            const rgba = (a: number) => `hsla(${p.h},${p.sat}%,${p.lit}%,${a})`;
            return (
              <Up key={p.id} delay={0.15 + i * 0.1}>
                <motion.div data-hover onClick={() => setOpen(isOpen ? null : p.id)}
                  className="rounded-2xl overflow-hidden cursor-pointer"
                  animate={{ background: isOpen ? rgba(0.07) : "rgba(255,255,255,0.022)", borderColor: isOpen ? rgba(0.35) : "rgba(255,255,255,0.05)" }}
                  style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                  whileHover={{ background: rgba(0.05), borderColor: rgba(0.22), scale: 1.008 }}
                  whileTap={{ scale: 0.997 }} transition={{ duration: 0.25 }}>
                  <div className="flex items-center gap-4 p-5">
                    <span className="text-5xl font-black font-mono leading-none select-none" style={{ color: rgba(0.12) }}>{p.num}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white leading-tight">{p.title}</h3>
                      <span className="text-xs text-white/25 font-mono">{p.year}</span>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}>
                      <ArrowUpRight className="w-5 h-5" style={{ color: isOpen ? c : "rgba(255,255,255,0.18)" }} />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden">
                        <div className="px-5 pb-5">
                          <div className="h-px mb-4" style={{ background: `linear-gradient(90deg,transparent,${rgba(0.25)},transparent)` }} />
                          <p className="text-white/45 text-sm leading-relaxed mb-4">{p.desc}</p>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {p.tech.map((t) => (
                              <span key={t} className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono"
                                style={{ background: rgba(0.09), border: `1px solid ${rgba(0.2)}`, color: c }}>
                                {t}
                              </span>
                            ))}
                          </div>
                          <Magnetic strength={0.15}>
                            <a href={p.url} target="_blank" rel="noopener noreferrer" data-hover
                              className="inline-flex items-center gap-2 text-xs font-mono py-2 px-4 rounded-xl transition-all"
                              style={{ background: rgba(0.1), border: `1px solid ${rgba(0.3)}`, color: c }}
                              onClick={(e) => e.stopPropagation()}>
                              View on GitHub <ExternalLink className="w-3 h-3" />
                            </a>
                          </Magnetic>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Up>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION: SKILLS
// ═══════════════════════════════════════════════════════════════════════════
const ICONS: Record<string, ReactNode> = {
  code:  <Code2 className="w-4 h-4" />,   cpu:   <Cpu className="w-4 h-4" />,
  term:  <Terminal className="w-4 h-4" />, globe: <Globe className="w-4 h-4" />,
  spark: <Sparkles className="w-4 h-4" />, net:   <Network className="w-4 h-4" />,
};

function SkillsPanel({ onBack }: { onBack: () => void }) {
  const [hov, setHov] = useState<number | null>(null);
  return (
    <Panel accentColor="#f472b6" accentRgb="244,114,182" onBack={onBack} label="neural_stack">
      <div className="max-w-xl mx-auto flex flex-col gap-7">
        <Up delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.05] tracking-tight">
            What's in<br /><span style={{ color: "#f472b6" }}>my arsenal.</span>
          </h2>
        </Up>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {ME.skills.map((s, i) => (
            <Up key={i} delay={0.15 + i * 0.07}>
              <motion.div data-hover onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
                className="p-4 rounded-2xl"
                animate={{
                  background: hov === i ? "rgba(244,114,182,0.07)" : "rgba(255,255,255,0.025)",
                  borderColor: hov === i ? "rgba(244,114,182,0.3)" : "rgba(255,255,255,0.05)",
                }}
                style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                transition={{ duration: 0.25 }}>
                <div className="flex items-center gap-2 mb-3 text-pink-400/65">
                  {ICONS[s.icon]}
                  <span className="text-[10px] font-mono tracking-widest uppercase">{s.cat}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag, j) => (
                    <motion.span key={j}
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.04 + j * 0.03 }}
                      className="px-2.5 py-1 rounded-full text-[11px]"
                      style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}>
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </Up>
          ))}
        </div>
      </div>
    </Panel>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION: CONTACT
// ═══════════════════════════════════════════════════════════════════════════
const SOCIAL_ICONS: Record<string, ReactNode> = {
  gh: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
  li: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  tw: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
};

function ContactPanel({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(ME.contact.email); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch (_) {}
  };
  return (
    <Panel accentColor="#34d399" accentRgb="52,211,153" onBack={onBack} label="comms.link">
      <div className="max-w-xl mx-auto flex flex-col gap-7">
        <Up delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.05] tracking-tight">
            Let's build<br /><span style={{ color: "#34d399" }}>something real.</span>
          </h2>
        </Up>
        <Up delay={0.2}>
          <p className="text-white/40 text-base leading-relaxed">
            Available for internships, research collaborations, and interesting problems. I read every message and reply within 24 hours.
          </p>
        </Up>
        <Divider color="rgba(52,211,153,0.12)" />
        <Up delay={0.3}>
          <Magnetic strength={0.12}>
            <motion.button data-hover onClick={copy}
              className="w-full flex items-center justify-between px-6 py-5 rounded-2xl"
              style={{ background: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.18)" }}
              whileHover={{ scale: 1.02, borderColor: "rgba(52,211,153,0.35)" }} whileTap={{ scale: 0.98 }}>
              <div className="flex flex-col items-start gap-0.5 text-left">
                <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400/40">Email</span>
                <span className="text-sm md:text-base font-mono text-white/65">{ME.contact.email}</span>
              </div>
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div key="ok" initial={{ opacity: 0, y: 8, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }}
                    className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                    <motion.div className="w-4 h-4 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-400"
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>✓</motion.div>
                    Copied
                  </motion.div>
                ) : (
                  <motion.span key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-[10px] text-white/25 font-mono">click to copy</motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </Magnetic>
        </Up>
        <Up delay={0.4}>
          <div className="flex gap-3">
            {ME.contact.socials.map((s, i) => (
              <Magnetic key={i} strength={0.2} className="flex-1">
                <motion.a href={s.url} target="_blank" rel="noopener noreferrer" data-hover
                  className="flex flex-col items-center gap-2 py-5 w-full rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)" }}
                  whileHover={{ background: "rgba(52,211,153,0.07)", borderColor: "rgba(52,211,153,0.3)", color: "#34d399", scale: 1.04 }}
                  whileTap={{ scale: 0.96 }} transition={{ duration: 0.22 }}>
                  {SOCIAL_ICONS[s.icon]}
                  <span className="text-[10px] font-mono">{s.label}</span>
                </motion.a>
              </Magnetic>
            ))}
          </div>
        </Up>
        <Up delay={0.5}>
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl"
            style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.14)" }}>
            <motion.div className="w-2 h-2 rounded-full bg-green-400 shrink-0"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.45, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
            <span className="text-green-400/65 text-xs font-mono">Currently available · Open to new opportunities</span>
          </div>
        </Up>
      </div>
    </Panel>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [section, setSection] = useState<Section>("home");
  const [warp, setWarp] = useState(false);
  const isTouch = useTouch();

  const navigate = useCallback((to: Section) => {
    if (to === section) return;
    setWarp(true);
    setTimeout(() => setSection(to), to === "home" ? 120 : 200);
    setTimeout(() => setWarp(false), 700);
  }, [section]);

  const goHome = useCallback(() => navigate("home"), [navigate]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape" && section !== "home") goHome(); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [section, goHome]);

  const tint: Record<Section, string> = {
    home: "rgba(0,0,0,0)", about: "rgba(220,168,66,0.018)",
    projects: "rgba(96,165,250,0.018)", skills: "rgba(244,114,182,0.018)", contact: "rgba(52,211,153,0.018)",
  };

  const panels: Record<Section, ReactNode> = {
    home:     <HomeScreen onNav={navigate} isMobile={isTouch} />,
    about:    <AboutPanel    onBack={goHome} />,
    projects: <ProjectsPanel onBack={goHome} />,
    skills:   <SkillsPanel   onBack={goHome} />,
    contact:  <ContactPanel  onBack={goHome} />,
  };

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ fontFamily: "'Geist Variable', sans-serif" }}>
      <StarField warp={warp} />
      <div className="grain" />
      <motion.div className="fixed inset-0 pointer-events-none"
        animate={{ background: tint[section] }} transition={{ duration: 1 }} />
      {!isTouch && <Cursor />}
      <div className="w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div key={section} className="w-full h-full">{panels[section]}</motion.div>
        </AnimatePresence>
      </div>
      {/* Warp flash */}
      <AnimatePresence>
        {warp && (
          <motion.div key="wf" className="fixed inset-0 pointer-events-none z-100"
            initial={{ opacity: 0 }} animate={{ opacity: [0, 0.22, 0.08, 0] }} exit={{ opacity: 0 }}
            transition={{ duration: 0.55, times: [0, 0.1, 0.4, 1] }}
            style={{ background: "radial-gradient(ellipse at 50% 50%,rgba(255,255,255,0.2) 0%,rgba(255,255,255,0.02) 60%,transparent 100%)" }} />
        )}
      </AnimatePresence>
    </div>
  );
}
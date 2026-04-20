/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║   KARTIKEY SINGH — Spatial Resume v3 (Premium Edition)    ║
 * ║   Concept: Navigable stellar universe. Each section is    ║
 * ║   a glassmorphic planet orbiting the identity core.       ║
 * ║   Navigation triggers a warp-speed star-streak jump.      ║
 * ╚═══════════════════════════════════════════════════════════╝
 */

import React, {
  useEffect, useRef, useState, useCallback, ReactNode,
} from "react";
import {
  motion, AnimatePresence, useMotionValue, useSpring,
} from "motion/react";
import {
  Code2, Globe, Github, Linkedin, Twitter, ExternalLink,
  Terminal, Cpu, Sparkles, Network, ArrowUpRight,
  ChevronLeft, MapPin, User, Layers, Zap, Mail
} from "lucide-react";

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
      { label: "GitHub",   url: "https://github.com/kartikey-x",          icon: "gh" },
      { label: "LinkedIn", url: "https://linkedin.com/in/kartikey-singh", icon: "li" },
      { label: "Twitter",  url: "https://twitter.com/kartikey_x_",        icon: "tw" },
    ],
  },
};

type Section = "home" | "about" | "projects" | "skills" | "contact";

// Orbit radiuses increased to accommodate larger desktop planets
const NAV: Array<{
  id: Exclude<Section, "home">;
  label: string;
  sub: string;
  icon: React.ElementType;
  angle: number;
  orbitR: number;
  color: string;
  rgb: string;
  period: number;
}> = [
  { id: "about",    label: "About",    sub: "Who I am",        icon: User,   angle: -75,  orbitR: 245, color: "#dca842", rgb: "220,168,66",  period: 12 },
  { id: "projects", label: "Projects", sub: "What I've built", icon: Layers, angle: 15,   orbitR: 285, color: "#60a5fa", rgb: "96,165,250",  period: 18 },
  { id: "skills",   label: "Skills",   sub: "What I know",     icon: Zap,    angle: 105,  orbitR: 255, color: "#f472b6", rgb: "244,114,182", period: 22 },
  { id: "contact",  label: "Contact",  sub: "Let's connect",   icon: Mail,   angle: 200,  orbitR: 275, color: "#34d399", rgb: "52,211,153",  period: 15 },
];

// ═══════════════════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════════════════
function useMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    // Robust mobile detection mapping width and touch capability
    const check = () => setM(window.innerWidth <= 768 || matchMedia("(pointer:coarse)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return m;
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
    const mob = window.innerWidth <= 768 || matchMedia("(pointer:coarse)").matches;
    let W = 0, H = 0, raf = 0, t = 0;
    let warpP = 0; 

    interface Star {
      x: number; y: number; z: number; pz: number;
      sz: number; spd: number; lum: number; warm: number;
    }
    const N = mob ? 100 : 250;
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

      ctx.fillStyle = warpP > 0.05 ? `rgba(9,8,7,${0.14 + warpP * 0.1})` : "rgba(9,8,7,0.3)";
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

      // Premium Nebulas
      for (const nb of [
        { x: 0.12, y: 0.18, r: 400, rgb: "220,168,66", a: 0.015 + 0.007 * Math.sin(t * 0.35) },
        { x: 0.88, y: 0.76, r: 340, rgb: "96,165,250", a: 0.01 + 0.005 * Math.sin(t * 0.27) },
        { x: 0.50, y: 0.92, r: 280, rgb: "52,211,153", a: 0.008 + 0.004 * Math.sin(t * 0.48) },
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
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: cx, y: cy, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: clicking ? 0.3 : hot ? 0.25 : 1 }} transition={{ duration: 0.12 }}>
        <div className="w-2.5 h-2.5 rounded-full bg-white mix-blend-difference" />
      </motion.div>
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[9998]"
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
// PLANET ORB (PREMIUM GLASSMORPHIC BUBBLE)
// ═══════════════════════════════════════════════════════════════════════════
function Planet({ item, onClick, index }: { item: typeof NAV[number]; onClick: () => void; index: number }) {
  const [hov, setHov] = useState(false);
  const rad = (item.angle * Math.PI) / 180;
  const Icon = item.icon;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${Math.cos(rad) * item.orbitR}px)`,
        top: `calc(50% + ${Math.sin(rad) * item.orbitR}px)`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.4 + index * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <motion.button data-hover onClick={onClick}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        className="flex flex-col items-center gap-3 relative group"
        whileTap={{ scale: 0.92 }}
        // The surf/float animation
        animate={{ y: [-12, 12, -12], rotate: [-2, 2, -2] }}
        transition={{ duration: 6 + index * 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="relative w-28 h-28 rounded-full flex items-center justify-center backdrop-blur-md overflow-hidden"
          animate={{
            boxShadow: hov
              ? `0 0 0 1px ${item.color}70, inset 0 0 30px ${item.color}40, 0 15px 40px rgba(${item.rgb},0.4)`
              : `0 0 0 1px ${item.color}25, inset 0 0 15px ${item.color}15, 0 10px 25px rgba(${item.rgb},0.15)`,
            scale: hov ? 1.08 : 1
          }}
          transition={{ duration: 0.4 }}
          style={{ background: `linear-gradient(135deg, rgba(${item.rgb}, 0.15) 0%, rgba(255,255,255,0.02) 100%)` }}
        >
          {/* Subtle inner glowing core behind icon */}
          <motion.div className="absolute w-16 h-16 rounded-full"
            style={{ background: `radial-gradient(circle, ${item.color}60 0%, transparent 70%)`, opacity: hov ? 0.8 : 0.4 }}
            animate={{ scale: hov ? [1, 1.3, 1] : 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />

          {/* Premium Lucide Icon - Larger on desktop */}
          <Icon className="relative z-10 w-14 h-14 transition-transform duration-500"
            style={{ color: item.color, filter: `drop-shadow(0 0 8px ${item.color}90)` }}
            strokeWidth={1.5} />

          {/* Orbiting Moon details */}
          <motion.div className="absolute inset-0 rounded-full"
            animate={{ rotate: 360 }} transition={{ duration: item.period, repeat: Infinity, ease: "linear" }}>
            <div className="absolute w-2 h-2 rounded-full"
              style={{
                top: "2%", left: "50%", transform: "translateX(-50%)",
                background: item.color, boxShadow: `0 0 10px ${item.color}, 0 0 20px ${item.color}80`,
              }} />
          </motion.div>
        </motion.div>

        {/* Outer label */}
        <motion.div className="flex flex-col items-center gap-1"
          animate={{ opacity: hov ? 1 : 0.6, y: hov ? 0 : -4 }} transition={{ duration: 0.3 }}>
          <span className="text-[15px] font-black tracking-widest uppercase drop-shadow-md" style={{ color: item.color }}>{item.label}</span>
          <span className="text-[11px] text-white/40 leading-none">{item.sub}</span>
        </motion.div>

      </motion.button>
    </motion.div>
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
      <motion.div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-6 z-50"
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <div className="flex items-center gap-1.5 text-white/20 text-[10px] font-mono">
          <MapPin className="w-2.5 h-2.5" /> India · UTC+5:30
        </div>
        <div className="text-amber-400/50 text-[10px] font-mono tabular-nums">
          {clock.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </div>
      </motion.div>

      {isMobile ? (
        <div className="w-full h-full overflow-y-auto px-6 py-16 flex flex-col items-center gap-8" style={{ scrollbarWidth: "none" }}>
          {/* Mobile Identity Core (Kept optimal size for mobile) */}
          <Up delay={0.1} className="flex flex-col items-center gap-3">
            <motion.div className="relative" animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <div className="w-24 h-24 rounded-full overflow-hidden backdrop-blur-md"
                style={{ 
                  boxShadow: "0 0 0 1px rgba(220,168,66,0.3), 0 15px 35px rgba(220,168,66,0.2)",
                  background: "linear-gradient(135deg, rgba(220,168,66,0.1) 0%, transparent 100%)" 
                }}>
                <img src={ME.image} alt="" className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-400"
                style={{ border: "3px solid #090807", boxShadow: "0 0 10px rgba(52,211,153,0.5)" }} />
            </motion.div>
            <div className="text-center mt-2">
              <h1 className="text-3xl font-black text-white leading-none">
                {ME.name.split(" ")[0]} <span className="text-amber-400">{ME.name.split(" ")[1]}</span>
              </h1>
              <p className="text-white/40 text-[11px] font-mono tracking-widest uppercase mt-2">{ME.role}</p>
            </div>
          </Up>

          {/* Premium Mobile Navigation Grid */}
          <Up delay={0.25} className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {NAV.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button key={item.id} data-hover onClick={() => onNav(item.id)}
                  className="flex flex-col items-center justify-center gap-2 p-6 rounded-[1.5rem] text-center backdrop-blur-md relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, rgba(${item.rgb},0.12) 0%, rgba(255,255,255,0.02) 100%)`,
                    border: `1px solid rgba(${item.rgb},0.25)`,
                    boxShadow: `0 10px 30px rgba(0,0,0,0.2)`
                  }}
                  whileTap={{ scale: 0.94 }}>
                  <Icon className="w-9 h-9 mb-1" style={{ color: item.color, filter: `drop-shadow(0 0 10px ${item.color}80)` }} strokeWidth={1.5} />
                  <span className="text-sm font-black tracking-widest uppercase" style={{ color: item.color }}>{item.label}</span>
                  <span className="text-[10px] text-white/40 leading-tight">{item.sub}</span>
                </motion.button>
              );
            })}
          </Up>

          <Up delay={0.4} className="flex gap-6 mt-4">
            {ME.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-black text-white drop-shadow-md">{s.n}</div>
                <div className="text-[9px] text-white/30 uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </Up>
        </div>
      ) : (
        <div className="relative" style={{ width: 680, height: 680 }}>
          {/* Gently rotating Orbit Rings */}
          {[225, 260, 290].map((r, i) => (
            <motion.div key={i} className="absolute rounded-full pointer-events-none"
              style={{ width: r * 2, height: r * 2, top: "50%", left: "50%",
                border: "1px dashed rgba(255,255,255,0.05)" }} 
              animate={{ rotate: 360, x: "-50%", y: "-50%" }}
              transition={{ duration: 100 + i * 20, repeat: Infinity, ease: "linear" }}
              />
          ))}
          
          {/* Central Identity Core (Bigger for Desktop) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-10">
            <Up delay={0.1}>
              <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <Magnetic strength={0.12}>
                  <motion.div className="relative" whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}>
                    <motion.div className="w-32 h-32 rounded-full overflow-hidden backdrop-blur-md"
                      animate={{ boxShadow: [
                        "0 0 0 1px rgba(220,168,66,0.3), 0 0 40px rgba(220,168,66,0.15)",
                        "0 0 0 1px rgba(220,168,66,0.5), 0 0 70px rgba(220,168,66,0.3)",
                        "0 0 0 1px rgba(220,168,66,0.3), 0 0 40px rgba(220,168,66,0.15)",
                      ] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                      <img src={ME.image} alt="" className="w-full h-full object-cover"
                        onError={(e) => {
                          const el = e.target as HTMLImageElement;
                          el.parentElement!.style.background = "linear-gradient(135deg, rgba(220,168,66,0.2) 0%, transparent 100%)";
                          el.style.display = "none";
                        }} />
                    </motion.div>
                    <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full"
                      style={{ background: "#34d399", border: "4px solid #090807", boxShadow: "0 0 15px rgba(52,211,153,0.6)" }} />
                  </motion.div>
                </Magnetic>
              </motion.div>
            </Up>
            <Up delay={0.2} className="text-center">
              <h1 className="text-3xl font-black text-white leading-tight whitespace-nowrap drop-shadow-lg">
                {ME.name.split(" ")[0]} <span className="text-amber-400">{ME.name.split(" ")[1]}</span>
              </h1>
              <p className="text-white/40 text-[10px] font-mono tracking-widest uppercase mt-2">{ME.role}</p>
            </Up>
            <Up delay={0.3} className="flex items-center gap-4 mt-2">
              {ME.stats.map((s, i) => (
                <React.Fragment key={i}>
                  <div className="text-center">
                    <div className="text-lg font-black text-white leading-none drop-shadow-md">{s.n}</div>
                    <div className="text-[9px] text-white/30 uppercase tracking-widest mt-1.5">{s.label}</div>
                  </div>
                  {i < ME.stats.length - 1 && <div className="w-px h-8 bg-white/10" />}
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

      <motion.p className="absolute bottom-6 text-white/15 text-[10px] font-mono tracking-widest uppercase"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
        {isMobile ? "Tap a module to initiate" : "Click any module · Esc to return home"}
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
    <motion.div className="w-full h-full flex flex-col relative z-10"
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -16 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      {/* Top bar */}
      <motion.div className="flex items-center justify-between px-6 md:px-10 pt-6 pb-3 shrink-0"
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Magnetic strength={0.2}>
          <motion.button data-hover onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-mono px-5 py-2.5 rounded-full backdrop-blur-md"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
            whileHover={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)", scale: 1.04 }}
            whileTap={{ scale: 0.95 }}>
            <ChevronLeft className="w-4 h-4" /> Home
          </motion.button>
        </Magnetic>
        <div className="flex items-center gap-2">
          <motion.div className="w-2 h-2 rounded-full" style={{ background: accentColor, boxShadow: `0 0 10px ${accentColor}` }}
             animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: `${accentColor}90` }}>{label}</span>
        </div>
      </motion.div>
      {/* Accent line */}
      <motion.div className="h-px mx-6 md:mx-10 mb-2"
        style={{ background: `linear-gradient(90deg,transparent,rgba(${accentRgb},0.4),transparent)` }}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.2 }} />
      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 md:px-10 py-6 pb-12" style={{ scrollbarWidth: "thin" }}>
        {children}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION: ABOUT
// ═══════════════════════════════════════════════════════════════════════════
function AboutPanel({ onBack }: { onBack: () => void }) {
  return (
    <Panel accentColor="#dca842" accentRgb="220,168,66" onBack={onBack} label="about.sys">
      <div className="max-w-xl mx-auto flex flex-col gap-8">
        <Up delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
            The human<br /><span style={{ color: "#dca842", textShadow: "0 0 20px rgba(220,168,66,0.3)" }}>behind the code.</span>
          </h2>
        </Up>
        <Up delay={0.2}>
          <p className="text-white/50 text-base md:text-lg leading-relaxed">{ME.bio}</p>
        </Up>
        <Divider color="rgba(220,168,66,0.15)" />
        <Up delay={0.3}>
          <div className="px-6 py-5 rounded-2xl font-mono text-xs backdrop-blur-sm"
            style={{ background: "rgba(220,168,66,0.06)", border: "1px solid rgba(220,168,66,0.15)" }}>
            <div className="text-amber-400/40 mb-3 text-[10px] uppercase tracking-wider">// system specs</div>
            {([["machine", ME.machine], ["config", ME.machineNote], ["status", "● active · open to work"], ["location", "India · Remote-friendly"]] as [string, string][]).map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-3 mb-1.5">
                <span className="text-amber-400/60 w-16 shrink-0">{k}</span>
                <span className="text-white/20 shrink-0">›</span>
                <span className={k === "status" ? "text-emerald-400/90 drop-shadow-md" : "text-white/60"}>{v}</span>
              </div>
            ))}
          </div>
        </Up>
        <Up delay={0.4}>
          <div className="grid grid-cols-3 gap-3">
            {ME.stats.map((s, i) => (
              <motion.div key={i} className="flex flex-col items-center py-6 rounded-2xl gap-1.5 backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                whileHover={{ borderColor: "rgba(220,168,66,0.3)", background: "rgba(220,168,66,0.08)", y: -2 }}>
                <span className="text-3xl font-black text-white">{s.n}</span>
                <span className="text-[9px] uppercase tracking-widest text-white/30">{s.label}</span>
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
      <div className="max-w-xl mx-auto flex flex-col gap-8">
        <Up delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
            Things I've<br /><span style={{ color: "#60a5fa", textShadow: "0 0 20px rgba(96,165,250,0.3)" }}>shipped.</span>
          </h2>
        </Up>
        <div className="flex flex-col gap-4">
          {ME.projects.map((p, i) => {
            const isOpen = open === p.id;
            const c = `hsl(${p.h},${p.sat}%,${p.lit}%)`;
            const rgba = (a: number) => `hsla(${p.h},${p.sat}%,${p.lit}%,${a})`;
            return (
              <Up key={p.id} delay={0.15 + i * 0.1}>
                <motion.div data-hover onClick={() => setOpen(isOpen ? null : p.id)}
                  className="rounded-[1.5rem] overflow-hidden cursor-pointer backdrop-blur-md transition-all"
                  animate={{ background: isOpen ? rgba(0.08) : "rgba(255,255,255,0.025)", borderColor: isOpen ? rgba(0.4) : "rgba(255,255,255,0.08)" }}
                  style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                  whileHover={{ background: rgba(0.06), borderColor: rgba(0.3), scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}>
                  <div className="flex items-center gap-5 p-6">
                    <span className="text-5xl font-black font-mono leading-none select-none" style={{ color: rgba(0.15) }}>{p.num}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-white leading-tight">{p.title}</h3>
                      <span className="text-xs text-white/30 font-mono mt-1 block">{p.year}</span>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}>
                      <ArrowUpRight className="w-6 h-6" style={{ color: isOpen ? c : "rgba(255,255,255,0.2)" }} />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden">
                        <div className="px-6 pb-6">
                          <div className="h-px mb-5" style={{ background: `linear-gradient(90deg,transparent,${rgba(0.3)},transparent)` }} />
                          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-5">{p.desc}</p>
                          <div className="flex flex-wrap gap-2 mb-5">
                            {p.tech.map((t) => (
                              <span key={t} className="px-3 py-1 rounded-full text-[10px] md:text-xs font-mono tracking-wide"
                                style={{ background: rgba(0.1), border: `1px solid ${rgba(0.25)}`, color: c }}>
                                {t}
                              </span>
                            ))}
                          </div>
                          <Magnetic strength={0.15}>
                            <a href={p.url} target="_blank" rel="noopener noreferrer" data-hover
                              className="inline-flex items-center gap-2 text-xs font-mono py-2.5 px-5 rounded-full transition-all"
                              style={{ background: rgba(0.12), border: `1px solid ${rgba(0.4)}`, color: c }}
                              onClick={(e) => e.stopPropagation()}>
                              View on GitHub <ExternalLink className="w-3.5 h-3.5" />
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
  code:  <Code2 className="w-5 h-5" />,   cpu:   <Cpu className="w-5 h-5" />,
  term:  <Terminal className="w-5 h-5" />, globe: <Globe className="w-5 h-5" />,
  spark: <Sparkles className="w-5 h-5" />, net:   <Network className="w-5 h-5" />,
};

function SkillsPanel({ onBack }: { onBack: () => void }) {
  const [hov, setHov] = useState<number | null>(null);
  return (
    <Panel accentColor="#f472b6" accentRgb="244,114,182" onBack={onBack} label="neural_stack">
      <div className="max-w-xl mx-auto flex flex-col gap-8">
        <Up delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
            What's in<br /><span style={{ color: "#f472b6", textShadow: "0 0 20px rgba(244,114,182,0.3)" }}>my arsenal.</span>
          </h2>
        </Up>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ME.skills.map((s, i) => (
            <Up key={i} delay={0.15 + i * 0.07}>
              <motion.div data-hover onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
                className="p-5 rounded-[1.5rem] backdrop-blur-sm"
                animate={{
                  background: hov === i ? "rgba(244,114,182,0.08)" : "rgba(255,255,255,0.03)",
                  borderColor: hov === i ? "rgba(244,114,182,0.35)" : "rgba(255,255,255,0.06)",
                }}
                style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                transition={{ duration: 0.25 }}>
                <div className="flex items-center gap-3 mb-4" style={{ color: hov === i ? "#f472b6" : "rgba(244,114,182,0.6)" }}>
                  {ICONS[s.icon]}
                  <span className="text-[11px] font-mono tracking-widest uppercase">{s.cat}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag, j) => (
                    <motion.span key={j}
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.04 + j * 0.03 }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
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
  gh: <Github className="w-6 h-6" />,
  li: <Linkedin className="w-6 h-6" />,
  tw: <Twitter className="w-6 h-6" />,
};

function ContactPanel({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(ME.contact.email); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch (_) {}
  };
  return (
    <Panel accentColor="#34d399" accentRgb="52,211,153" onBack={onBack} label="comms.link">
      <div className="max-w-xl mx-auto flex flex-col gap-8">
        <Up delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
            Let's build<br /><span style={{ color: "#34d399", textShadow: "0 0 20px rgba(52,211,153,0.3)" }}>something real.</span>
          </h2>
        </Up>
        <Up delay={0.2}>
          <p className="text-white/50 text-base md:text-lg leading-relaxed">
            Available for internships, research collaborations, and interesting problems. I read every message and reply within 24 hours.
          </p>
        </Up>
        <Divider color="rgba(52,211,153,0.15)" />
        <Up delay={0.3}>
          <Magnetic strength={0.12}>
            <motion.button data-hover onClick={copy}
              className="w-full flex items-center justify-between px-6 py-6 rounded-[1.5rem] backdrop-blur-sm"
              style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.2)" }}
              whileHover={{ scale: 1.02, borderColor: "rgba(52,211,153,0.4)" }} whileTap={{ scale: 0.98 }}>
              <div className="flex flex-col items-start gap-1 text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/50">Email</span>
                <span className="text-sm md:text-lg font-mono text-white/80">{ME.contact.email}</span>
              </div>
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div key="ok" initial={{ opacity: 0, y: 8, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }}
                    className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                    <motion.div className="w-5 h-5 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-400"
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>✓</motion.div>
                    Copied
                  </motion.div>
                ) : (
                  <motion.span key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-[10px] text-white/30 font-mono uppercase tracking-wider">click to copy</motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </Magnetic>
        </Up>
        <Up delay={0.4}>
          <div className="flex gap-4">
            {ME.contact.socials.map((s, i) => (
              <Magnetic key={i} strength={0.2} className="flex-1">
                <motion.a href={s.url} target="_blank" rel="noopener noreferrer" data-hover
                  className="flex flex-col items-center gap-2.5 py-6 w-full rounded-[1.5rem] backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                  whileHover={{ background: "rgba(52,211,153,0.08)", borderColor: "rgba(52,211,153,0.35)", color: "#34d399", scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }} transition={{ duration: 0.22 }}>
                  {SOCIAL_ICONS[s.icon]}
                  <span className="text-[10px] font-mono tracking-wide">{s.label}</span>
                </motion.a>
              </Magnetic>
            ))}
          </div>
        </Up>
        <Up delay={0.5}>
          <div className="flex items-center gap-3 px-5 py-4 rounded-xl mt-2 backdrop-blur-sm"
            style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.15)" }}>
            <motion.div className="w-2.5 h-2.5 rounded-full bg-green-400 shrink-0"
              style={{ boxShadow: "0 0 10px rgba(74, 222, 128, 0.6)" }}
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
            <span className="text-green-400/80 text-xs font-mono">Currently available · Open to new opportunities</span>
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
  const isMobile = useMobile(); 

  const navigate = useCallback((to: Section) => {
    if (to === section) return;
    setWarp(true);
    setTimeout(() => setSection(to), to === "home" ? 120 : 200);
    setTimeout(() => setWarp(false), 700);
  }, [section]);

  const goHome = useCallback(() => navigate("home"), [navigate]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => { 
      if (e.key === "Escape" && section !== "home") goHome(); 
    };
    // Using `capture: true` prevents event propagation blocking by other focused elements
    document.addEventListener("keydown", k, true);
    return () => document.removeEventListener("keydown", k, true);
  }, [section, goHome]);

  const tint: Record<Section, string> = {
    home: "rgba(0,0,0,0)", about: "rgba(220,168,66,0.025)",
    projects: "rgba(96,165,250,0.025)", skills: "rgba(244,114,182,0.025)", contact: "rgba(52,211,153,0.025)",
  };

  const panels: Record<Section, ReactNode> = {
    home:     <HomeScreen onNav={navigate} isMobile={isMobile} />,
    about:    <AboutPanel    onBack={goHome} />,
    projects: <ProjectsPanel onBack={goHome} />,
    skills:   <SkillsPanel   onBack={goHome} />,
    contact:  <ContactPanel  onBack={goHome} />,
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#090807]" style={{ fontFamily: "'Geist Variable', sans-serif" }}>
      <StarField warp={warp} />
      <div className="grain" />
      <motion.div className="fixed inset-0 pointer-events-none"
        animate={{ background: tint[section] }} transition={{ duration: 1 }} />
      {!isMobile && <Cursor />}
      <div className="w-full h-full relative z-10">
        <AnimatePresence mode="wait">
          <motion.div key={section} className="w-full h-full">{panels[section]}</motion.div>
        </AnimatePresence>
      </div>
      {/* Premium Warp Flash */}
      <AnimatePresence>
        {warp && (
          <motion.div key="wf" className="fixed inset-0 pointer-events-none z-[100]"
            initial={{ opacity: 0 }} animate={{ opacity: [0, 0.35, 0.1, 0] }} exit={{ opacity: 0 }}
            transition={{ duration: 0.55, times: [0, 0.1, 0.4, 1] }}
            style={{ background: "radial-gradient(ellipse at 50% 50%,rgba(255,255,255,0.25) 0%,rgba(255,255,255,0.05) 50%,transparent 100%)" }} />
        )}
      </AnimatePresence>
    </div>
  );
}
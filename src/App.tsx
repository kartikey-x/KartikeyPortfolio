/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "motion/react";
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
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

  // High damping and low stiffness for "heavy but smooth" feel
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
 * BreatheBackground: Optimized for performance.
 * Removed rotation and simplified scaling to reduce GPU load on large blurred elements.
 */
function BreatheBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#050208]">
      <motion.div 
        className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] rounded-full bg-primary/10 blur-[120px] will-change-transform"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-[#4c1d95]/15 blur-[100px] will-change-transform"
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 2
        }}
      />
    </div>
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
  const { scrollYProgress } = useScroll();
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
      <BreatheBackground />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary/30 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Top Navigation Bubbles */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
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
                  "glass px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.3em] font-semibold transition-all hover:scale-110 active:scale-95",
                  activeSection === section ? "bg-primary/20 text-primary border-primary/40" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {section}
              </motion.button>
            </Magnetic>
          </div>
        ))}
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pt-48 pb-48">
        
        {/* Hero Section */}
        <section id="home" className="min-h-[70vh] flex flex-col justify-center mb-32">
          <SoftReveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-xs uppercase tracking-[0.4em] text-primary/60 font-medium">
                Digital Sanctuary
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8 leading-[1.1] text-foreground">
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
            
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed mb-12">
              {USER_DATA.bio}
            </p>

            <div className="flex flex-wrap gap-6">
              <Magnetic>
                <motion.div whileTap={{ scale: 0.96 }}>
                  <Button 
                    variant="default" 
                    size="lg" 
                    className="rounded-full px-8 h-14 text-sm uppercase tracking-widest transition-transform bg-primary text-primary-foreground hover:bg-primary/90"
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
                    className="rounded-full px-8 h-14 text-sm uppercase tracking-widest glass hover:bg-primary/10 border-primary/20 text-foreground"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Get in touch
                  </Button>
                </motion.div>
              </Magnetic>
            </div>
          </SoftReveal>
        </section>

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
                <h3 className="text-xs uppercase tracking-[0.3em] text-primary/60 mb-6">Workstation</h3>
                <h2 className="text-3xl font-light mb-4 text-foreground">{USER_DATA.hardware.primary}</h2>
                <p className="text-primary font-mono text-sm mb-6">{USER_DATA.hardware.specs}</p>
                <p className="text-muted-foreground leading-relaxed">
                  {USER_DATA.hardware.description}
                </p>
              </motion.div>
              <div className="space-y-8">
                <h2 className="text-4xl font-light tracking-tight text-foreground">Engineered for <span className="italic text-primary">Performance</span></h2>
                <p className="text-muted-foreground leading-relaxed">
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
                <h3 className="text-xs uppercase tracking-[0.3em] text-primary/60 mb-4">Selected Works</h3>
                <h2 className="text-5xl font-light tracking-tight text-foreground">Archive</h2>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm text-primary/40 font-mono">01 — 03</p>
              </div>
            </div>

            <div className="grid gap-8">
              {USER_DATA.projects.map((project) => (
                <motion.div
                  key={project.title}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="group"
                >
                  <Card className={cn(
                    "glass overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:border-primary/30 border-primary/10",
                    project.featured ? "border-primary/30 bg-primary/2" : ""
                  )}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1 p-8 md:p-12">
                          <div className="flex items-center gap-3 mb-6">
                            {project.tech.map(t => (
                              <span key={t} className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-md bg-primary/10 text-primary/80">
                                {t}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-3xl font-light mb-4 group-hover:text-primary transition-colors text-foreground">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed max-w-xl mb-8">
                            {project.desc}
                          </p>
                          <Magnetic>
                            <a 
                              href={project.link}
                              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium hover:gap-4 transition-all text-primary"
                            >
                              View Project <ChevronRight className="w-4 h-4" />
                            </a>
                          </Magnetic>
                        </div>
                        <div className="w-full md:w-72 bg-primary/3 p-8 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <ExternalLink className="w-12 h-12 text-primary/10 group-hover:text-primary/30 transition-colors" />
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
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-1">
                <h3 className="text-xs uppercase tracking-[0.3em] text-primary/60 mb-4">Expertise</h3>
                <h2 className="text-4xl font-light tracking-tight mb-6 text-foreground">Technical <span className="italic text-primary">Stack</span></h2>
                <p className="text-muted-foreground leading-relaxed">
                  Bridging the gap between high-level abstraction and low-level optimization.
                </p>
              </div>
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {USER_DATA.skills.map((skill) => (
                  <motion.div 
                    key={skill.name} 
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="glass p-6 rounded-2xl flex items-center gap-4 group hover:border-primary/40 transition-colors border-primary/10"
                  >
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium tracking-wide text-foreground">{skill.name}</h4>
                      <p className="text-[10px] uppercase tracking-widest text-primary/50 mt-1">{skill.level}</p>
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
            <div className="glass p-12 md:p-24 rounded-[3rem] text-center relative overflow-hidden border-primary/10">
              <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent pointer-events-none" />
              
              <h3 className="text-xs uppercase tracking-[0.4em] text-primary/60 mb-8">Available for collaboration</h3>
              <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-12 text-foreground">Let's build the <span className="italic text-primary">future</span>.</h2>
              
              <div className="flex flex-col items-center gap-8">
                <Magnetic>
                  <motion.a 
                    href={`mailto:${USER_DATA.contact.email}`}
                    whileHover={{ scale: 1.05 }}
                    className="text-2xl md:text-4xl font-light hover:text-primary transition-colors flex items-center gap-4 group text-foreground"
                  >
                    {USER_DATA.contact.email}
                    <ChevronRight className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </motion.a>
                </Magnetic>
                
                <div className="flex gap-8 mt-8">
                  {USER_DATA.contact.socials.map((social) => (
                    <div key={social.name}>
                      <Magnetic>
                        <motion.a 
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -5 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-4 glass rounded-full hover:text-primary transition-colors border-primary/20 text-foreground"
                          aria-label={social.name}
                        >
                          {social.icon}
                        </motion.a>
                      </Magnetic>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SoftReveal>
        </section>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-primary/30">
            © {new Date().getFullYear()} Alex Chen — Designed for Flow
          </p>
        </footer>

      </main>
    </div>
  );
}

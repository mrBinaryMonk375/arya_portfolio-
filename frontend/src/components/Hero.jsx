import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight, Download, Code2, Megaphone, Lightbulb,
  User, MapPin, Laptop, GraduationCap,
} from "lucide-react";

const HERO_PHOTO =
  "https://customer-assets.emergentagent.com/job_portfolio-builder-1477/artifacts/3dn54etm_image.png";

const ROLES = [
  { icon: Code2, title: "Developer", sub: "Turning ideas into solutions" },
  { icon: Megaphone, title: "Marketer", sub: "Crafting strategies that grow brands" },
  { icon: Lightbulb, title: "Problem Solver", sub: "Solving problems with creativity" },
];

const STATS = [
  { icon: User, label: "Age", value: "18" },
  { icon: MapPin, label: "City", value: "Kolkata" },
  { icon: Laptop, label: "Skills", value: "Marketing & Tech" },
  { icon: GraduationCap, label: "Education", value: "B.Tech 1st Year" },
];

/* Rotating tagline words */
const ROTATING = [
  "Full-Stack Developer.",
  "SEO Engineer.",
  "Digital Marketer.",
  "AI Builder.",
  "Problem Solver.",
];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROTATING.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block align-baseline">
      <motion.span
        key={ROTATING[i]}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        className="inline-block text-brand-orange"
      >
        {ROTATING[i]}
      </motion.span>
    </span>
  );
}

/* Linear typewriter — types one character at a time, constant speed */
function Typewriter({ text, speed = 70, startDelay = 0, showCursor = true, className = "" }) {
  const [i, setI] = useState(0);
  const [started, setStarted] = useState(startDelay === 0);

  useEffect(() => {
    if (!started) {
      const t = setTimeout(() => setStarted(true), startDelay);
      return () => clearTimeout(t);
    }
    if (i < text.length) {
      const t = setTimeout(() => setI((v) => v + 1), speed);
      return () => clearTimeout(t);
    }
  }, [i, started, text, speed, startDelay]);

  const done = started && i >= text.length;

  return (
    <span className={className} aria-label={text}>
      {text.slice(0, i).split("").map((c, idx) => (
        <span key={idx}>{c === " " ? "\u00A0" : c}</span>
      ))}
      {showCursor && (
        <span
          className={`inline-block w-[0.06em] h-[0.9em] align-middle bg-brand-orange ml-1 ${
            done ? "animate-caret-blink" : ""
          }`}
          style={{ transform: "translateY(-0.05em)" }}
          aria-hidden
        />
      )}
    </span>
  );
}

/* Word-by-word reveal — auto-plays on mount */
function RevealText({ text, className = "", delay = 0 }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block overflow-hidden align-baseline">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + wi * 0.06,
            }}
            className="inline-block"
          >
            {w}
            {wi !== words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* Character-by-character reveal for the big name */
function RevealChars({ text, className = "", delay = 0 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((c, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.035,
            }}
            className="inline-block"
          >
            {c === " " ? "\u00A0" : c}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative pt-24 md:pt-36 pb-12 md:pb-16 overflow-hidden" data-testid="hero-section">
      {/* Grain */}
      <div className="grain absolute inset-0" />
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid lg:grid-cols-12 gap-10 items-center relative">
        {/* Left column */}
        <div className="lg:col-span-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-3 mb-6"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-1.5 w-8 bg-brand-orange rounded-full origin-left"
            />
            <span className="text-xs tracking-[0.3em] text-white/60 font-semibold uppercase">Who I am</span>
          </motion.div>

          <p className="text-white/70 max-w-md text-base leading-relaxed mb-8" data-testid="hero-bio">
            <RevealText text="I design experiences that feel natural to use, scale thoughtfully, and quietly support both users and business goals." delay={0.15} />
          </p>

          <h1 className="font-display font-black leading-[0.95] tracking-tight text-5xl sm:text-6xl md:text-7xl">
            <span className="block">
              <Typewriter text="Hey, I'm" speed={75} startDelay={200} showCursor={false} />
            </span>

            {/* Script accent Arya with draw-in swoosh */}
            <motion.span
              initial={{ opacity: 0, rotate: -8, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, rotate: -2, scale: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.9, type: "spring", stiffness: 90, damping: 12 }}
              className="font-script text-brand-orange text-6xl sm:text-7xl md:text-8xl inline-block mt-2 relative"
            >
              Arya
              {/* SVG stroke that draws in */}
              <motion.svg
                viewBox="0 0 220 20"
                className="absolute -bottom-2 left-[-4%] w-[108%]"
                aria-hidden
              >
                <motion.path
                  d="M4 12 C 40 4, 120 20, 216 6"
                  stroke="#FF6B1A"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.7, duration: 1.0, ease: "easeInOut" }}
                />
              </motion.svg>
            </motion.span>{" "}

            <span className="block mt-2">
              <Typewriter text="Chakraborty" speed={75} startDelay={2400} />
            </span>
          </h1>

          {/* Rotating tagline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.4, duration: 0.6 }}
            className="mt-5 h-8 md:h-10 overflow-hidden font-display font-semibold text-xl md:text-2xl tracking-tight"
            aria-live="polite"
          >
            <span className="text-white/70">I&apos;m a&nbsp;</span>
            <RotatingWord />
          </motion.div>

          {/* Roles */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { delayChildren: 3.7, staggerChildren: 0.12 } },
            }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3"
            data-testid="hero-roles"
          >
            {ROLES.map((r) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                  }}
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-brand-orange/60 transition"
                >
                  <div className="w-9 h-9 shrink-0 grid place-items-center rounded-lg border border-brand-orange/30 bg-brand-orange/10 text-brand-orange">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-sm">{r.title}</div>
                    <div className="text-[11px] text-white/50 leading-snug">{r.sub}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.2, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.a
              href="#projects"
              className="btn-primary"
              data-testid="hero-cta-work"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work <ArrowUpRight size={18} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/arya-chackraborty"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
              data-testid="hero-cta-resume"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              Download Resume <Download size={16} />
            </motion.a>
          </motion.div>
        </div>

        {/* Right column: portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 relative"
        >
          <div className="relative w-full max-w-[620px] mx-auto">
            {/* Ambient glow that pulses */}
            <motion.div
              className="absolute inset-6 rounded-full bg-brand-orange/30 blur-3xl -z-10"
              animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              src={HERO_PHOTO}
              alt="Arya Chakraborty"
              className="relative z-10 w-full h-auto object-contain"
              data-testid="hero-photo"
              style={{
                WebkitMaskImage: "radial-gradient(ellipse at center, #000 55%, transparent 100%)",
                maskImage: "radial-gradient(ellipse at center, #000 55%, transparent 100%)",
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Stats card */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { delayChildren: 1.4, staggerChildren: 0.08 } },
            }}
            className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.03]"
            data-testid="hero-stats"
          >
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="flex flex-col items-center text-center gap-2"
                >
                  <div className="w-9 h-9 grid place-items-center rounded-lg border border-white/10 text-brand-orange">
                    <Icon size={16} />
                  </div>
                  <div className="text-[11px] tracking-[0.2em] uppercase text-white/45">{s.label}</div>
                  <div className="font-display font-semibold text-sm">{s.value}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

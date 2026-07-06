import React, { useEffect, useRef, useState } from "react";

const ABOUT_IMAGE =
  "https://customer-assets.emergentagent.com/job_portfolio-builder-1477/artifacts/gqj8nbrw_image.png";

const PARAGRAPH_1 = [
  { text: "I\u2019m " },
  { text: "Arya Chakraborty", className: "text-white font-semibold" },
  {
    text:
      ", a passionate technology professional building high-performance digital solutions. Full-Stack Web Development, SEO, Digital Marketing, Data Analytics and AI-powered apps \u2014 I turn ideas into scalable, user-centric products.",
  },
];

const PARAGRAPH_2 = [
  { text: "1\u00D7 National Hackathon Winner", className: "text-brand-orange font-semibold" },
  { text: " and " },
  { text: "5\u00D7 National Finalist", className: "text-brand-orange font-semibold" },
  {
    text:
      ". I love solving real-world problems through innovation, and shipping work that combines creativity, performance and clear business value.",
  },
];

const PARAGRAPH_3 = [
  { text: "As the " },
  { text: "Founder of Inaara Web Solutions", className: "text-white font-semibold" },
  {
    text:
      ", I lead a dedicated team of 18 professionals in delivering scalable, responsive, and SEO-optimized web solutions for diverse industries. My role encompasses building business strategies, managing end-to-end project development, and fostering a culture of collaboration and innovation.",
  },
];

const P1_LEN = PARAGRAPH_1.reduce((a, s) => a + s.text.length, 0);
const P2_LEN = PARAGRAPH_2.reduce((a, s) => a + s.text.length, 0);
const P3_LEN = PARAGRAPH_3.reduce((a, s) => a + s.text.length, 0);
const TOTAL_LEN = P1_LEN + P2_LEN + P3_LEN;
const SPEED_MS = 15; // ms per character (linear)
const PARAGRAPH_PAUSE_MS = 500; // pause between paragraph 1 → 2

/** Renders one paragraph filled up to `chars` characters of its own text. */
function renderSegments(segments, chars) {
  let remaining = chars;
  const out = [];
  for (let s = 0; s < segments.length; s++) {
    if (remaining <= 0) break;
    const seg = segments[s];
    const slice = seg.text.slice(0, Math.min(seg.text.length, remaining));
    out.push(
      <span key={s} className={seg.className || ""}>
        {slice}
      </span>
    );
    remaining -= slice.length;
  }
  return out;
}

export default function About() {
  const [typed, setTyped] = useState(0);
  const [started, setStarted] = useState(false);
  const paused = useRef(false);
  const containerRef = useRef(null);

  // Start typing when About enters viewport
  useEffect(() => {
    if (!containerRef.current || started) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(containerRef.current);
    return () => io.disconnect();
  }, [started]);

  // Type one char per tick, pause between paragraphs (ref-based pause survives re-renders)
  const paused2 = useRef(false);
  useEffect(() => {
    if (!started || typed >= TOTAL_LEN) return;

    // Pause once between paragraph 1 → 2
    if (typed === P1_LEN && !paused.current) {
      paused.current = true;
      const t = setTimeout(() => setTyped((v) => v + 1), PARAGRAPH_PAUSE_MS);
      return () => clearTimeout(t);
    }
    // Pause once between paragraph 2 → 3
    if (typed === P1_LEN + P2_LEN && !paused2.current) {
      paused2.current = true;
      const t = setTimeout(() => setTyped((v) => v + 1), PARAGRAPH_PAUSE_MS);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setTyped((v) => v + 1), SPEED_MS);
    return () => clearTimeout(t);
  }, [started, typed]);

  const p1Chars = Math.min(typed, P1_LEN);
  const p2Chars = Math.max(0, Math.min(typed - P1_LEN, P2_LEN));
  const p3Chars = Math.max(0, typed - P1_LEN - P2_LEN);
  const done = typed >= TOTAL_LEN;

  return (
    <section id="about" className="relative py-16 md:py-32" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-10 md:mb-14">
          <div className="flex justify-center items-center gap-3 mb-4">
            <span className="h-1.5 w-8 bg-brand-orange rounded-full" />
            <span className="text-xs tracking-[0.3em] text-white/60 font-semibold uppercase">About</span>
            <span className="h-1.5 w-8 bg-brand-orange rounded-full" />
          </div>
        </div>

        {/* Composed image — desktop: contained; mobile: horizontally scrollable at natural size */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-10 rounded-full bg-brand-orange/15 blur-3xl -z-10 hidden md:block" />

          {/* Mobile: horizontal scroll wrapper for readability */}
          <div className="md:hidden -mx-5 overflow-x-auto px-5 pb-2 scroll-mobile">
            <img
              src={ABOUT_IMAGE}
              alt="About Arya — Pass Card"
              className="min-w-[720px] w-[720px] h-auto block mx-auto"
              data-testid="about-pass-card-mobile"
            />
            <p className="mt-2 text-center text-[10px] uppercase tracking-widest text-white/40">← swipe to explore →</p>
          </div>

          {/* Desktop */}
          <img
            src={ABOUT_IMAGE}
            alt="About Arya — Pass Card"
            className="w-full h-auto hidden md:block"
            data-testid="about-pass-card"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse at center, #000 62%, transparent 100%)",
              maskImage:
                "radial-gradient(ellipse at center, #000 62%, transparent 100%)",
            }}
          />
        </div>

        {/* Bio paragraphs — linear sequential typewriter */}
        <div
          ref={containerRef}
          className="mt-4 md:mt-6 max-w-3xl mx-auto text-center space-y-5 md:space-y-6 text-white/70 leading-relaxed px-1"
          data-testid="about-bio"
        >
          <p aria-label={PARAGRAPH_1.map((s) => s.text).join("")}>
            {renderSegments(PARAGRAPH_1, p1Chars)}
            {typed < P1_LEN && (
              <span
                className="inline-block w-[0.06em] h-[0.9em] align-middle bg-brand-orange ml-1"
                style={{ transform: "translateY(-0.05em)" }}
                aria-hidden
              />
            )}
          </p>
          <p aria-label={PARAGRAPH_2.map((s) => s.text).join("")}>
            {renderSegments(PARAGRAPH_2, p2Chars)}
            {typed >= P1_LEN && typed < P1_LEN + P2_LEN && (
              <span
                className="inline-block w-[0.06em] h-[0.9em] align-middle bg-brand-orange ml-1"
                style={{ transform: "translateY(-0.05em)" }}
                aria-hidden
              />
            )}
          </p>
          <p aria-label={PARAGRAPH_3.map((s) => s.text).join("")}>
            {renderSegments(PARAGRAPH_3, p3Chars)}
            {typed >= P1_LEN + P2_LEN && (
              <span
                className={`inline-block w-[0.06em] h-[0.9em] align-middle bg-brand-orange ml-1 ${
                  done ? "animate-caret-blink" : ""
                }`}
                style={{ transform: "translateY(-0.05em)" }}
                aria-hidden
              />
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

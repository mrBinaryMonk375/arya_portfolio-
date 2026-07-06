import React from "react";
import { Code2, Search, TrendingUp, BarChart3, Bot, Palette, ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    icon: Code2,
    title: "Full Stack Web Dev",
    desc: "Responsive, high-performance apps with React, Node.js, PHP & MySQL.",
    tags: ["React", "Node", "Supabase"],
  },
  {
    icon: Search,
    title: "SEO Engineering",
    desc: "Technical, On-Page, Off-Page, Local, AEO & GEO strategies that rank.",
    tags: ["Technical", "AEO", "GEO"],
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    desc: "Google & Meta Ads, content, and social funnels that convert visitors.",
    tags: ["Ads", "Content", "Social"],
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    desc: "Insights from data using Python, SQL, Power BI and Excel dashboards.",
    tags: ["Python", "SQL", "Power BI"],
  },
  {
    icon: Bot,
    title: "AI & Automation",
    desc: "AI tools, chatbots and workflow automation to remove busywork.",
    tags: ["LLMs", "Chatbots", "Workflows"],
  },
  {
    icon: Palette,
    title: "UI / UX Design",
    desc: "Clean, accessible interfaces designed to guide the user's next step.",
    tags: ["Figma", "Wireframe", "Design System"],
  },
];

/** Individual card — identical design to the previous grid version. */
function ServiceCard({ s, i }) {
  const Icon = s.icon;
  return (
    <article
      tabIndex={0}
      className="marquee-card group relative w-[300px] sm:w-[340px] md:w-[360px] shrink-0 p-6 md:p-7 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-brand-orange/60 hover:bg-white/[0.04] hover:shadow-[0_0_0_1px_rgba(255,107,26,0.35)] focus-visible:border-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40 transition"
      data-testid={`service-card-${i}`}
      aria-label={s.title}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-xl grid place-items-center bg-brand-orange/10 border border-brand-orange/30 text-brand-orange">
          <Icon size={22} />
        </div>
        <ArrowUpRight
          size={18}
          className="text-white/30 group-hover:text-brand-orange group-hover:-translate-y-1 group-hover:translate-x-1 transition"
        />
      </div>
      <h3 className="font-display font-bold text-xl mb-2">{s.title}</h3>
      <p className="text-sm text-white/60 leading-relaxed mb-5">{s.desc}</p>
      <div className="flex flex-wrap gap-2">
        {s.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-white/70"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-brand-orange/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
    </article>
  );
}

/** One row of marquee — duplicates children twice for seamless loop. */
function MarqueeRow({ items, direction = "ltr", startIndex = 0, testid }) {
  // Two copies of the list side-by-side; keyframes translate by exactly -50%.
  const cards = [...items, ...items];
  return (
    <div
      className="marquee-viewport"
      data-testid={testid}
      role="region"
      aria-label="Services carousel"
    >
      <div
        className={`marquee-row ${direction === "ltr" ? "marquee-row--ltr" : "marquee-row--rtl"}`}
      >
        {cards.map((s, i) => (
          <ServiceCard
            key={`${s.title}-${i}`}
            s={s}
            i={(startIndex + (i % items.length))}
          />
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const rowOne = SERVICES.slice(0, 3); // Web Dev, SEO, Digital Marketing
  const rowTwo = SERVICES.slice(3, 6); // Data Analytics, AI & Automation, UI/UX

  return (
    <section id="services" className="relative py-16 md:py-32 bg-black/30" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-1.5 w-8 bg-brand-orange rounded-full" />
              <span className="text-xs tracking-[0.3em] text-white/60 font-semibold uppercase">Services</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight max-w-2xl">
              What I do <span className="font-script text-brand-orange -rotate-2 inline-block">for you</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-sm md:text-base">
            End-to-end services that combine engineering craft with marketing science — so what you ship actually moves the needle.
          </p>
        </div>
      </div>

      {/* Full-bleed marquee rows */}
      <div className="mt-4 space-y-6" data-testid="services-marquee">
        <MarqueeRow items={rowOne} direction="ltr" startIndex={0} testid="services-row-ltr" />
        <MarqueeRow items={rowTwo} direction="rtl" startIndex={3} testid="services-row-rtl" />
      </div>
    </section>
  );
}

import React from "react";

const SKILLS = [
  "React.js",
  "JavaScript",
  "Vite",
  "HTML",
  "Tailwind CSS",
  "Supabase",
  "Digital Marketing",
  "Team Management",
  "SEO",
  "AEO",
  "GEO",
  "GMB Optimisation",
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-14 md:py-28 bg-black/30 overflow-hidden" data-testid="skills-section">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <span className="h-1.5 w-8 bg-brand-orange rounded-full" />
            <span className="text-xs tracking-[0.3em] text-white/60 font-semibold uppercase">Skills</span>
            <span className="h-1.5 w-8 bg-brand-orange rounded-full" />
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight">
            The <span className="font-script text-brand-orange -rotate-2 inline-block">toolkit</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto" data-testid="skills-cloud">
          {SKILLS.map((s, i) => (
            <span
              key={s}
              className={`px-4 py-2.5 rounded-full border text-sm font-medium transition ${
                i % 3 === 0
                  ? "bg-brand-orange text-black border-brand-orange"
                  : "bg-white/[0.03] border-white/10 hover:border-brand-orange/60 hover:text-brand-orange"
              }`}
              data-testid={`skill-pill-${i}`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

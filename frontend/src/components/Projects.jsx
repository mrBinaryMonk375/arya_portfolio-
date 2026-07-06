import React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

const PROJECTS = [
  {
    name: "CitiFix",
    tag: "AI · Civic Tech",
    tagline: "AI-Powered Civic Issue Reporting Platform",
    desc:
      "Citizens report public issues (potholes, garbage, water leakage, streetlights) in a few clicks. AI classifies complaints, prioritizes by severity, and routes them to authorities. Auto-posts to X for public accountability, with a real-time tracking dashboard.",
    tech: ["AI Classification", "Geolocation", "Social API", "Analytics"],
    image:
      "https://customer-assets.emergentagent.com/job_portfolio-builder-1477/artifacts/z1hk4vou_image.png",
    logo: true,
  },
  {
    name: "EduVerse",
    tag: "AI · EdTech",
    tagline: "All-in-One AI Learning Ecosystem",
    desc:
      "Connects students, teachers and parents in one digital space. AI summarizes notes and PDFs, generates structured summaries from YouTube lectures, and gives parents a live view of progress and attendance.",
    tech: ["Notes AI", "YouTube Summarizer", "Teacher Dashboard", "Parent Portal"],
    image:
      "https://images.pexels.com/photos/13107929/pexels-photo-13107929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "AttendAI",
    tag: "SaaS · Education",
    tagline: "School ERP & QR-based Attendance System",
    desc:
      "Cloud-based ERP for schools — admissions, attendance, fees, examinations, report cards, staff records, class scheduling and parent communication, all from one centralized dashboard.",
    tech: ["Attendance", "Fees", "Exams", "Analytics"],
    image:
      "https://customer-assets.emergentagent.com/job_portfolio-builder-1477/artifacts/3oweqkiw_image.png",
    logo: true,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-16 md:py-32" data-testid="projects-section">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-1.5 w-8 bg-brand-orange rounded-full" />
              <span className="text-xs tracking-[0.3em] text-white/60 font-semibold uppercase">Projects</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight max-w-2xl">
              Recent <span className="font-script text-brand-orange -rotate-2 inline-block">work</span>
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 text-sm text-white/60">
            <Sparkles size={16} className="text-brand-orange" />
            Built with intent, shipped with pride.
          </div>
        </div>

        <div className="grid gap-8 md:gap-10" data-testid="projects-grid">
          {PROJECTS.map((p, i) => (
            <article
              key={p.name}
              className={`group grid md:grid-cols-12 gap-6 md:gap-10 items-center p-5 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-brand-orange/50 transition ${
                i % 2 === 1 ? "md:direction-rtl" : ""
              }`}
              data-testid={`project-card-${i}`}
            >
              <div className={`md:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] ${i % 2 === 1 ? "md:order-2" : ""} ${p.logo ? "bg-black" : ""}`}>
                <img
                  src={p.image}
                  alt={p.name}
                  className={`w-full h-full ${p.logo ? "object-contain p-6 md:p-10" : "object-cover"} group-hover:scale-105 transition duration-700`}
                />
                {!p.logo && <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />}
                <div className="absolute top-3 left-3 text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-black/60 border border-white/10">
                  {p.tag}
                </div>
              </div>

              <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="flex items-baseline gap-4 mb-3">
                  <div className="font-mono text-brand-orange text-xs tracking-widest">0{i + 1}</div>
                  <h3 className="font-display font-bold text-3xl md:text-4xl">{p.name}</h3>
                </div>
                <div className="text-white/80 text-lg mb-3">{p.tagline}</div>
                <p className="text-white/60 leading-relaxed mb-5 max-w-xl">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-white/80">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-brand-orange text-sm font-semibold hover:gap-3 transition"
                  onClick={() => window.open("https://github.com/aryachackraborty-spec", "_blank")}
                  data-testid={`project-cta-${i}`}
                >
                  View Case Study <ArrowUpRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

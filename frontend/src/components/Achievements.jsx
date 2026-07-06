import React from "react";
import { Trophy, Medal, GraduationCap, Building2 } from "lucide-react";

const ITEMS = [
  { icon: Trophy, label: "National Hackathon Winner" },
  { icon: Medal, label: "5× National Hackathon Finalist" },
  { icon: GraduationCap, label: "Campus Ambassador · IIT Kharagpur" },
  { icon: Building2, label: "Intern · Shaastra IIT Madras" },
];

export default function Achievements() {
  const track = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <section className="relative py-16 border-y border-white/10 bg-brand-orange text-black" data-testid="achievements-section">
      <div className="overflow-hidden">
        <div className="marquee-track flex gap-14 whitespace-nowrap">
          {track.map((it, i) => {
            const Icon = it.icon;
            return (
              <div key={i} className="flex items-center gap-3 font-display font-bold text-lg md:text-2xl uppercase">
                <Icon size={22} strokeWidth={2.4} />
                <span>{it.label}</span>
                <span className="text-black/40">✦</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

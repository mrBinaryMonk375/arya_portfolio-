import React from "react";
import { Linkedin, Instagram, Github, Mail, ArrowUp } from "lucide-react";

const SOCIALS = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/arya-chackraborty", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/arya_911c", label: "Instagram" },
  { icon: Github, href: "https://github.com/aryachackraborty-spec", label: "GitHub" },
  { icon: Mail, href: "https://wa.me/919073568772", label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl border border-white/10 grid place-items-center bg-white/5">
              <span className="font-display font-black text-xl leading-none">
                <span className="text-white">A</span>
                <span className="text-brand-orange">C</span>
              </span>
            </div>
            <div className="leading-tight">
              <div className="font-display font-semibold">Arya Chakraborty</div>
              <div className="text-[11px] text-white/50">Marketing &amp; Tech Enthusiast</div>
            </div>
          </div>
          <p className="text-white/50 text-sm max-w-xs">
            Building high-performance digital solutions that combine engineering, marketing and AI.
          </p>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-widest text-white/50 mb-4">Navigate</div>
          <ul className="space-y-2 text-sm">
            {[["Home", "#home"], ["About", "#about"], ["Services", "#services"], ["Projects", "#projects"], ["Contact", "#contact"]].map(([l, h]) => (
              <li key={h}>
                <a href={h} className="text-white/70 hover:text-brand-orange">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-widest text-white/50 mb-4">Follow Me</div>
          <div className="flex gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-10 h-10 grid place-items-center rounded-lg border border-white/10 hover:border-brand-orange hover:text-brand-orange transition"
                data-testid={`footer-social-${label.toLowerCase()}`}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <a
            href="#home"
            className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-brand-orange"
            data-testid="footer-back-top"
          >
            <ArrowUp size={14} /> Back to Top
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-white/40">
          <div>© {new Date().getFullYear()} Arya Chakraborty. All rights reserved.</div>
          <div>Designed &amp; built with care in Kolkata.</div>
        </div>
      </div>
    </footer>
  );
}

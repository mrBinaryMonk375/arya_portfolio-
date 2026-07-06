import React, { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["home", "about", "services", "projects", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 120 && r.bottom >= 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-black/70 border-b border-white/5" : "bg-transparent"
      }`}
      data-testid="site-nav"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group" data-testid="nav-logo">
          <div className="w-11 h-11 rounded-xl border border-white/10 grid place-items-center bg-white/5 group-hover:border-brand-orange transition">
            <span className="font-display font-black text-xl leading-none">
              <span className="text-white">A</span>
              <span className="text-brand-orange">C</span>
            </span>
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-display font-semibold text-sm">Arya Chakraborty</div>
            <div className="text-[11px] text-white/50">Marketing &amp; Tech Enthusiast</div>
          </div>
        </a>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => {
            const id = l.href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide uppercase transition ${
                  isActive ? "text-brand-orange" : "text-white/80 hover:text-white"
                }`}
                data-testid={`nav-link-${id}`}
              >
                {l.label}
                {isActive && (
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-1.5 h-1.5 rounded-full bg-brand-orange" />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden sm:inline-flex items-center gap-2 border border-brand-orange text-brand-orange font-semibold text-xs tracking-widest uppercase px-5 py-3 rounded-full hover:bg-brand-orange hover:text-black transition"
          data-testid="nav-cta-connect"
        >
          Let&apos;s Connect <ArrowUpRight size={14} />
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-white p-2"
          aria-label="Menu"
          data-testid="nav-mobile-toggle"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10" data-testid="nav-mobile-menu">
          <div className="px-6 py-6 flex flex-col gap-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-lg font-display uppercase tracking-wider text-white/85 hover:text-brand-orange"
                data-testid={`nav-mobile-link-${l.href.replace("#", "")}`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 border border-brand-orange text-brand-orange font-semibold text-xs tracking-widest uppercase px-5 py-3 rounded-full"
            >
              Let&apos;s Connect <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

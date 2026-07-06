import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Award, ExternalLink } from "lucide-react";

const CERTIFICATES = [
  {
    title: "Integrated Marketing Communications",
    issuer: "IE Business School · Coursera",
    date: "Jun 16, 2026",
    verify: "https://coursera.org/verify/6NZ2HEGEVKME",
    image:
      "https://customer-assets.emergentagent.com/job_portfolio-builder-1477/artifacts/dvels4zq_image.png",
  },
  {
    title: "Business and Marketing Strategies",
    issuer: "University of London · Coursera Specialization",
    date: "Jun 14, 2026",
    verify: "https://coursera.org/verify/specialization/NNNHNE35QRWP",
    image:
      "https://customer-assets.emergentagent.com/job_portfolio-builder-1477/artifacts/fwatp4tv_image.png",
  },
  {
    title: "Fundamentals of Marketing Strategy",
    issuer: "University of London · Coursera",
    date: "Jun 14, 2026",
    verify: "https://coursera.org/verify/T2PQJE4BXG53",
    image:
      "https://customer-assets.emergentagent.com/job_portfolio-builder-1477/artifacts/442hpnon_image.png",
  },
  {
    title: "Google Citations: Boost SEO For New Local Websites",
    issuer: "Alex Genadinik · Coursera",
    date: "Jun 14, 2026",
    verify: "https://coursera.org/verify/VO8KWHPDS9TM",
    image:
      "https://customer-assets.emergentagent.com/job_portfolio-builder-1477/artifacts/5o4z1ysc_image.png",
  },
];

export default function Certifications() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  // Autoplay
  useEffect(() => {
    if (!emblaApi) return;
    const t = setInterval(() => emblaApi.scrollNext(), 5500);
    return () => clearInterval(t);
  }, [emblaApi]);

  return (
    <section id="certifications" className="relative py-16 md:py-32 bg-black/30" data-testid="certifications-section">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-1.5 w-8 bg-brand-orange rounded-full" />
              <span className="text-xs tracking-[0.3em] text-white/60 font-semibold uppercase">Certifications</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight max-w-2xl">
              Always <span className="font-script text-brand-orange -rotate-2 inline-block">learning.</span>
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 text-sm text-white/60">
            <Award size={16} className="text-brand-orange" />
            {CERTIFICATES.length} verified credentials
          </div>
        </div>

        <div className="relative">
          {/* Viewport */}
          <div className="overflow-hidden rounded-2xl" ref={emblaRef} data-testid="certifications-carousel">
            <div className="flex touch-pan-y">
              {CERTIFICATES.map((c, i) => (
                <div
                  key={c.title}
                  className="min-w-0 shrink-0 grow-0 basis-full md:basis-[85%] lg:basis-[75%] px-3"
                  data-testid={`cert-slide-${i}`}
                >
                  <div className="grid md:grid-cols-5 gap-5 items-stretch p-4 md:p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent">
                    {/* Certificate image */}
                    <a
                      href={c.verify}
                      target="_blank"
                      rel="noreferrer"
                      className="md:col-span-3 relative block rounded-xl overflow-hidden bg-white group"
                      data-testid={`cert-image-link-${i}`}
                    >
                      <img
                        src={c.image}
                        alt={c.title}
                        className="w-full h-auto block transition duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-sm border border-white/10 text-white text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition">
                        Verify <ExternalLink size={11} />
                      </div>
                    </a>

                    {/* Metadata */}
                    <div className="md:col-span-2 flex flex-col justify-between gap-6 p-2 md:p-4">
                      <div>
                        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-brand-orange border border-brand-orange/40 bg-brand-orange/10 px-2.5 py-1 rounded-full mb-4">
                          <Award size={12} /> Certificate {String(i + 1).padStart(2, "0")}
                        </div>
                        <h3 className="font-display font-bold text-xl md:text-2xl leading-tight">{c.title}</h3>
                        <div className="mt-2 text-sm text-white/70">{c.issuer}</div>
                        <div className="mt-1 text-xs text-white/45">Issued {c.date}</div>
                      </div>
                      <a
                        href={c.verify}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:gap-3 transition"
                        data-testid={`cert-verify-${i}`}
                      >
                        Verify credential <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <button
            onClick={scrollPrev}
            aria-label="Previous certificate"
            className="hidden md:grid absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 place-items-center rounded-full bg-black/70 border border-white/10 hover:border-brand-orange hover:text-brand-orange transition"
            data-testid="cert-prev"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next certificate"
            className="hidden md:grid absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 place-items-center rounded-full bg-black/70 border border-white/10 hover:border-brand-orange hover:text-brand-orange transition"
            data-testid="cert-next"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2" data-testid="cert-dots">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to certificate ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                selected === i ? "w-8 bg-brand-orange" : "w-3 bg-white/25 hover:bg-white/50"
              }`}
              data-testid={`cert-dot-${i}`}
            />
          ))}
        </div>

        {/* Mobile arrows */}
        <div className="md:hidden mt-6 flex items-center justify-center gap-4">
          <button onClick={scrollPrev} className="w-10 h-10 grid place-items-center rounded-full bg-black/70 border border-white/10" data-testid="cert-prev-mobile">
            <ChevronLeft size={18} />
          </button>
          <button onClick={scrollNext} className="w-10 h-10 grid place-items-center rounded-full bg-black/70 border border-white/10" data-testid="cert-next-mobile">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

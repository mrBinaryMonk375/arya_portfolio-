import React from "react";

const EXPERIENCE_IMAGE =
  "https://customer-assets.emergentagent.com/job_portfolio-builder-1477/artifacts/trezb1x1_image.png";

export default function ExperienceImage() {
  return (
    <section
      id="experience"
      className="relative py-16 md:py-32"
      data-testid="experience-section"
    >
      {/* Desktop */}
      <div className="hidden md:block max-w-6xl mx-auto px-5 md:px-10">
        <img
          src={EXPERIENCE_IMAGE}
          alt="Arya Chakraborty — Experience timeline"
          className="w-full h-auto block"
          loading="lazy"
          data-testid="experience-image"
        />
      </div>

      {/* Mobile: horizontal scroll wrapper */}
      <div className="md:hidden -mx-1 overflow-x-auto px-4 pb-3 scroll-mobile">
        <img
          src={EXPERIENCE_IMAGE}
          alt="Arya Chakraborty — Experience timeline"
          className="min-w-[900px] w-[900px] h-auto block mx-auto"
          loading="lazy"
          data-testid="experience-image-mobile"
        />
        <p className="mt-2 text-center text-[10px] uppercase tracking-widest text-white/40">← swipe to explore →</p>
      </div>
    </section>
  );
}

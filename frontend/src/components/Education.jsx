import React from "react";

const EDUCATION_IMAGE =
  "https://customer-assets.emergentagent.com/job_portfolio-builder-1477/artifacts/mrucwbiw_image.png";

export default function Education() {
  return (
    <section
      id="education"
      className="relative py-16 md:py-32"
      data-testid="education-section"
    >
      {/* Desktop */}
      <div className="hidden md:block max-w-[1400px] mx-auto px-5 md:px-10">
        <img
          src={EDUCATION_IMAGE}
          alt="Arya Chakraborty — Education & Languages"
          className="w-full h-auto block"
          loading="lazy"
          data-testid="education-image"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse at center, #000 60%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse at center, #000 60%, transparent 100%)",
          }}
        />
      </div>

      {/* Mobile: horizontal scroll so infographic stays readable */}
      <div className="md:hidden -mx-1 overflow-x-auto px-4 pb-3 scroll-mobile">
        <img
          src={EDUCATION_IMAGE}
          alt="Arya Chakraborty — Education & Languages"
          className="min-w-[800px] w-[800px] h-auto block mx-auto"
          loading="lazy"
          data-testid="education-image-mobile"
        />
        <p className="mt-2 text-center text-[10px] uppercase tracking-widest text-white/40">← swipe to explore →</p>
      </div>
    </section>
  );
}

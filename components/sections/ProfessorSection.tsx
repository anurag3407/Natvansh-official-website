"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ProfessorSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".prof-card", {
        opacity: 0,
        y: 60,
        rotationZ: -1,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(".prof-quote-icon", {
          opacity: 0,
          scale: 0,
          rotation: -180,
          duration: 0.5,
          ease: "back.out(2)",
        }, "-=0.3")
        .from(".prof-message", {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power3.out",
        }, "-=0.2")
        .from(".prof-name", {
          opacity: 0,
          x: -20,
          duration: 0.4,
          ease: "power3.out",
        }, "-=0.2");
    },
    { scope: container }
  );

  return (
    <section ref={container} className="section-padding relative bg-grunge-dark halftone-overlay">
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading
          accent="GUIDING LIGHT"
          title="MESSAGE FROM THE FACULTY"
          subtitle="Words of wisdom from our Professor In-Charge"
        />

        <div className="prof-card bg-black border-4 border-black p-8 sm:p-12 mt-12 relative overflow-visible shadow-[10px_10px_0px_#FFFF00] rotate-1">
          {/* Decorative grunge tape */}
          <div className="absolute top-[-15px] left-[50%] transform -translate-x-1/2 w-32 h-6 bg-[var(--neon-pink)] rotate-[-3deg] border-2 border-black" />

          {/* Quote Icon */}
          <div className="prof-quote-icon mb-8">
            <div className="w-16 h-16 border-2 border-black flex items-center justify-center bg-[var(--neon-green)] shadow-[4px_4px_0_#000] rotate-[-2deg]">
              <Quote size={32} className="text-black" />
            </div>
          </div>

          {/* Message */}
          <blockquote className="prof-message space-y-6">
            <p className="text-xl sm:text-2xl leading-relaxed font-bold font-inter text-white">
              "Drama and cinema are not merely forms of entertainment — they are mirrors of society,
              vehicles of empathy, and crucibles of character. At Natvansh, we nurture not just performers,
              but thinkers, leaders, and storytellers who carry the spark of creativity into every walk of life."
            </p>
            <p className="text-lg leading-relaxed font-bold font-inter text-[var(--neon-yellow)]">
              "I encourage every student to embrace the stage, for it teaches what classrooms sometimes cannot —
              the courage to be vulnerable, the art of collaboration, and the power of a story well told."
            </p>
          </blockquote>

          {/* Professor Info */}
          <div className="prof-name flex items-center gap-6 mt-10 pt-8" style={{ borderTop: "4px dashed #333" }}>
            <div className="w-16 h-16 border-2 border-black flex items-center justify-center text-3xl font-anton text-black bg-[var(--neon-pink)] shrink-0 shadow-[4px_4px_0_#000]">
              P
            </div>
            <div>
              <p className="font-anton text-2xl tracking-wider text-white uppercase">
                Prof. Faculty Name
              </p>
              <p className="text-lg font-bold text-[var(--text-secondary)] uppercase font-inter mt-1">
                Professor In-Charge, Natvansh
              </p>
              <p className="text-sm font-bold text-[var(--text-muted)] uppercase mt-1">
                Department of Humanities & Social Sciences, NIT Patna
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


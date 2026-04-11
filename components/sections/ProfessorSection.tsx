"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ProfessorContent {
  title: string;
  content: string;
  image: string;
  metadata: {
    designation?: string;
    department?: string;
  };
}

export default function ProfessorSection() {
  const container = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<ProfessorContent | null>(null);

  useEffect(() => {
    fetch("/api/content/professor")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setContent(data);
        }
      })
      .catch((err) => console.error("Failed to fetch professor content", err));
  }, []);

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

        <div className="prof-card bg-black border-2 md:border-4 border-black p-4 sm:p-6 md:p-12 mt-8 sm:mt-12 relative overflow-visible shadow-[4px_4px_0px_#FFFF00] sm:shadow-[5px_5px_0px_#FFFF00] md:shadow-[10px_10px_0px_#FFFF00] md:rotate-1">
          {/* Decorative grunge tape */}
          <div className="absolute top-[-12px] sm:top-[-15px] left-[50%] transform -translate-x-1/2 w-24 sm:w-32 h-5 sm:h-6 bg-[var(--neon-pink)] rotate-[-3deg] border-2 border-black" />

          {/* Quote Icon */}
          <div className="prof-quote-icon mb-4 sm:mb-6 md:mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 border-black flex items-center justify-center bg-[var(--neon-green)] shadow-[3px_3px_0_#000] sm:shadow-[4px_4px_0_#000] rotate-[-2deg]">
              <Quote size={24} className="text-black sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </div>
          </div>

          {/* Message */}
          <blockquote className="prof-message space-y-4 sm:space-y-6">
            {(content?.content || "Drama and cinema are not merely forms of entertainment — they are mirrors of society, vehicles of empathy, and crucibles of character. At Natvansh, we nurture not just performers, but thinkers, leaders, and storytellers who carry the spark of creativity into every walk of life.\n\nI encourage every student to embrace the stage, for it teaches what classrooms sometimes cannot — the courage to be vulnerable, the art of collaboration, and the power of a story well told.")
              .split("\n")
              .filter((p) => p.trim() !== "")
              .map((paragraph, index) => (
                <p
                  key={index}
                  className={`leading-relaxed font-bold font-inter ${
                    index === 0
                      ? "text-base sm:text-xl md:text-2xl text-white"
                      : "text-sm sm:text-base md:text-lg text-[var(--neon-yellow)]"
                  }`}
                >
                  &ldquo;{paragraph.trim()}&rdquo;
                </p>
              ))}
          </blockquote>

          {/* Professor Info & Picture */}
          <div className="prof-name flex flex-col items-center md:flex-row md:items-start gap-6 sm:gap-8 mt-6 sm:mt-8 md:mt-10 pt-6 sm:pt-8" style={{ borderTop: "4px dashed #333" }}>
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 shrink-0 transform -rotate-3 hover:rotate-0 transition-transform">
              <div className="absolute inset-0 bg-[var(--neon-pink)] border-3 sm:border-4 border-black shadow-[4px_4px_0_#000] sm:shadow-[6px_6px_0_#000] rotate-6"></div>
              <img 
                src={content?.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"} 
                alt={content?.title || "Prof. Faculty Name"} 
                className="relative z-10 w-full h-full object-cover border-3 sm:border-4 border-black shadow-[3px_3px_0_#000] sm:shadow-[4px_4px_0_#000] filter contrast-125 grayscale hover:grayscale-0 transition-all duration-500"
              />
              {/* Tape */}
              <div className="absolute top-[-8px] sm:top-[-10px] right-[-8px] sm:right-[-10px] w-10 sm:w-12 h-3 sm:h-4 bg-[var(--neon-yellow)] border-2 border-black rotate-12 z-20"></div>
            </div>
            
            <div className="flex flex-col justify-center text-center md:text-left h-full mt-1 sm:mt-2">
              <p className="font-anton text-xl sm:text-2xl md:text-3xl tracking-wider text-white uppercase drop-shadow-[2px_2px_0_#000]">
                {content?.title || "Prof. Faculty Name"}
              </p>
              <p className="text-sm sm:text-base md:text-xl font-bold text-[var(--neon-green)] uppercase font-inter mt-1.5 sm:mt-2">
                {content?.metadata?.designation || "Professor In-Charge, Natvansh"}
              </p>
              <p className="text-xs sm:text-sm md:text-base font-bold text-zinc-400 uppercase mt-1.5 sm:mt-2">
                {content?.metadata?.department || "Department of Humanities & Social Sciences, NIT Patna"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

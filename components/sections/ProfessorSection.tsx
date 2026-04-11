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
            {(content?.content || "Drama and cinema are not merely forms of entertainment — they are mirrors of society, vehicles of empathy, and crucibles of character. At Natvansh, we nurture not just performers, but thinkers, leaders, and storytellers who carry the spark of creativity into every walk of life.\n\nI encourage every student to embrace the stage, for it teaches what classrooms sometimes cannot — the courage to be vulnerable, the art of collaboration, and the power of a story well told.")
              .split("\n")
              .filter((p) => p.trim() !== "")
              .map((paragraph, index) => (
                <p
                  key={index}
                  className={`leading-relaxed font-bold font-inter ${
                    index === 0
                      ? "text-xl sm:text-2xl text-white"
                      : "text-lg text-[var(--neon-yellow)]"
                  }`}
                >
                  "{paragraph.trim()}"
                </p>
              ))}
          </blockquote>

          {/* Professor Info & Picture */}
          <div className="prof-name flex flex-col md:flex-row items-center md:items-start gap-8 mt-10 pt-8" style={{ borderTop: "4px dashed #333" }}>
            <div className="relative w-40 h-40 shrink-0 transform -rotate-3 hover:rotate-0 transition-transform">
              <div className="absolute inset-0 bg-[var(--neon-pink)] border-4 border-black shadow-[6px_6px_0_#000] rotate-6"></div>
              <img 
                src={content?.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"} 
                alt={content?.title || "Prof. Faculty Name"} 
                className="relative z-10 w-full h-full object-cover border-4 border-black shadow-[4px_4px_0_#000] filter contrast-125 grayscale hover:grayscale-0 transition-all duration-500"
              />
              {/* Tape */}
              <div className="absolute top-[-10px] right-[-10px] w-12 h-4 bg-[var(--neon-yellow)] border-2 border-black rotate-12 z-20"></div>
            </div>
            
            <div className="flex flex-col justify-center text-center md:text-left h-full mt-2">
              <p className="font-anton text-3xl tracking-wider text-white uppercase drop-shadow-[2px_2px_0_#000]">
                {content?.title || "Prof. Faculty Name"}
              </p>
              <p className="text-xl font-bold text-[var(--neon-green)] uppercase font-inter mt-2">
                {content?.metadata?.designation || "Professor In-Charge, Natvansh"}
              </p>
              <p className="text-md font-bold text-zinc-400 uppercase mt-2">
                {content?.metadata?.department || "Department of Humanities & Social Sciences, NIT Patna"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


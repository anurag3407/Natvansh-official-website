"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Megaphone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/content/notice")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error && data.content) {
          setNotice(data.content);
        }
      })
      .catch((err) => console.error("Failed to fetch notice", err));
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Dramatic entrance
      tl.from(".hero-badge", {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: "power3.out",
      })
        .from(".hero-char", {
          opacity: 0,
          y: 40,
          rotationZ: -5,
          stagger: 0.05,
          duration: 0.6,
          ease: "back.out(1.5)",
        }, "-=0.3")
        .from(".hero-subtitle", {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.4")
        .from(".hero-cta", {
          opacity: 0,
          y: 20,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        }, "-=0.3");

    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative min-h-[100dvh] w-full flex flex-col items-center overflow-hidden bg-[var(--neon-yellow)] bg-[url('/images/bg_grunge_red.png')] bg-cover bg-center pt-24 sm:pt-28 md:pt-32"
    >
      <div className="absolute inset-0 bg-white/70 halftone-overlay pointer-events-none mix-blend-overlay"></div>

      {/* Main Content Wrapper */}
      <div className="hero-content-wrapper relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 flex flex-col items-center pb-8 sm:pb-12 overflow-hidden">

        {notice && (
          <div className="w-full max-w-3xl mb-4 sm:mb-6 bg-[#AD7DBB] border-2 md:border-3 border-black p-1.5 sm:p-2 shadow-[4px_4px_0_#000] md:shadow-[6px_6px_0_#000] transform -rotate-1 relative overflow-hidden flex items-center justify-center text-center mt-2">
            <Megaphone size={16} className="text-black shrink-0 mr-2 animate-pulse" />
            <span className="font-inter font-black text-xs sm:text-sm md:text-lg text-black uppercase tracking-widest break-words flex-1">
              {notice}
            </span>
            <Megaphone size={20} className="text-black shrink-0 ml-3 animate-pulse" />
          </div>
        )}

        {/* Sanskrit Floating Badge */}
        <div className="hero-badge flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 border-2 md:border-3 border-black bg-[var(--neon-cyan)] mb-3 sm:mb-4 shadow-[3px_3px_0_#000] sm:shadow-[4px_4px_0_#000] rotate-[-3deg] hover:rotate-[3deg] transition-transform duration-300">
          <Sparkles size={12} className="text-black shrink-0" />
          <span className="font-anton tracking-widest text-black uppercase text-xs sm:text-sm whitespace-nowrap">
            अस्ति कश्चित् विशेषः!
          </span>
          <Sparkles size={12} className="text-black shrink-0" />
        </div>

        {/* Masterpiece Title */}
        <h1
          ref={titleRef}
          className="text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[180px] font-bebas leading-[0.85] tracking-tight mb-1 md:mb-2 flex overflow-visible text-white drop-shadow-[2px_2px_0_#000] sm:drop-shadow-[4px_4px_0_#000] md:drop-shadow-[10px_10px_0_#000] stroke-black text-stroke-black"
          style={{ WebkitTextStroke: "3px black", transform: "rotate(-2deg)" }}
        >
          {Array.from("NATVANSH").map((char, i) => (
            <span key={i} className="hero-char inline-block" style={{ transform: i % 2 === 0 ? 'translateY(-2px)' : 'translateY(2px)' }}>
              {char}
            </span>
          ))}
        </h1>

        <h1 className="text-[4.5vw] sm:text-[4.5vw] lg:text-[40px] font-anton text-[var(--neon-yellow)] uppercase tracking-wider mb-4 sm:mb-6 text-stroke-black drop-shadow-[2px_2px_0_#000] sm:drop-shadow-[4px_4px_0_#000] rotate-[2deg] bg-black px-3 py-1 sm:px-4 md:px-5 md:py-1 border-2 md:border-3 border-black">
          Drama & Film Club
        </h1>

        <div className="hero-subtitle bg-[#AD7DBB] border-2 md:border-3 border-black p-2 sm:p-3 shadow-[4px_4px_0_var(--neon-yellow)] transform -rotate-1 max-w-sm w-full text-center mb-6 sm:mb-8 mx-auto">
          <p className="text-xs sm:text-sm md:text-base text-black font-anton tracking-wider uppercase leading-snug">
            Where every emotion finds its stage and every story finds its screen.
          </p>
          <span className="text-black bg-white inline-block px-1.5 py-0.5 sm:px-2 border border-black font-anton tracking-widest text-[10px] sm:text-xs mt-1.5 sm:mt-2 uppercase shadow-[2px_2px_0_#000] rotate-2">
            NIT PATNA
          </span>
        </div>

        {/* Ultra-modern CTAs - Retro Style */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-2 w-full sm:w-auto">
          <a href="/events" className="hero-cta w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 font-anton text-sm sm:text-base md:text-xl text-black bg-[var(--neon-yellow)] border-3 sm:border-4 border-black hover:bg-white hover:-translate-y-1 hover:-translate-x-1 transition-transform shadow-[3px_3px_0_#000] sm:shadow-[4px_4px_0_#000] md:shadow-[8px_8px_0_#000] rotate-[-2deg] hover:rotate-0 text-center">
            EXPLORE THE MAGIC
          </a>
          <a href="/team" className="hero-cta w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 font-anton text-sm sm:text-base md:text-xl text-white bg-black border-3 sm:border-4 border-black hover:bg-[var(--neon-pink)] hover:text-black hover:-translate-y-1 hover:-translate-x-1 transition-transform shadow-[3px_3px_0_var(--neon-cyan)] sm:shadow-[4px_4px_0_var(--neon-cyan)] md:shadow-[8px_8px_0_var(--neon-cyan)] rotate-[2deg] hover:rotate-0 text-center">
            MEET THE CAST
          </a>
        </div>
      </div>
    </section>
  );
}

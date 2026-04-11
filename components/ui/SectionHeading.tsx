"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  accent?: string;
  align?: "left" | "center" | "right";
  children?: ReactNode;
}

export default function SectionHeading({
  title,
  subtitle,
  accent,
  align = "center",
  children,
}: SectionHeadingProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      if (accent) {
        tl.from(".section-accent", {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power3.out",
        });
      }

      tl.from(".section-title", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power3.out",
      }, accent ? "-=0.3" : 0);

      if (subtitle) {
        tl.from(".section-subtitle", {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power3.out",
        }, "-=0.4");
      }

      tl.from(".section-line", {
        scaleX: 0,
        duration: 0.8,
        ease: "power3.inOut",
      }, "-=0.3");
    },
    { scope: container }
  );

  const alignClass =
    align === "center"
      ? "text-center items-center"
      : align === "right"
      ? "text-right items-end"
      : "text-left items-start";

  return (
    <div ref={container} className={`flex flex-col gap-2 sm:gap-3 mb-8 sm:mb-12 ${alignClass}`}>
      {accent && (
        <span
          className="section-accent font-anton text-sm sm:text-base md:text-xl uppercase tracking-widest bg-[var(--neon-pink)] text-black px-2 py-0.5 sm:px-3 sm:py-1 border-2 border-black inline-block shadow-[2px_2px_0_#000] sm:shadow-[3px_3px_0_#000] rotate-[-2deg]"
        >
          {accent}
        </span>
      )}
      <h2
        className="section-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-anton leading-tight uppercase tracking-wide text-white drop-shadow-[2px_2px_0_#000] sm:drop-shadow-[4px_4px_0_#000]"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="section-subtitle text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl font-inter font-bold text-zinc-300"
        >
          {subtitle}
        </p>
      )}
      <div
        className="section-line h-1 w-16 sm:w-20 mt-1 sm:mt-2 bg-[var(--neon-yellow)] border border-black"
      />
      {children}
    </div>
  );
}

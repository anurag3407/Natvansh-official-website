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
    <div ref={container} className={`flex flex-col gap-3 mb-12 ${alignClass}`}>
      {accent && (
        <span
          className="section-accent font-accent text-xl sm:text-2xl"
          style={{ color: "var(--accent-purple)" }}
        >
          {accent}
        </span>
      )}
      <h2
        className="section-title text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="section-subtitle text-base sm:text-lg max-w-2xl"
          style={{ color: "var(--text-secondary)" }}
        >
          {subtitle}
        </p>
      )}
      <div
        className="section-line h-1 w-20 rounded-full mt-2"
        style={{ background: "var(--accent-gradient)" }}
      />
      {children}
    </div>
  );
}

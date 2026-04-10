"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { Users, Calendar, Award, Film } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Users, value: "100+", label: "REBELS", color: "var(--neon-pink)" },
  { icon: Calendar, value: "50+", label: "GIGS", color: "var(--neon-yellow)" },
  { icon: Award, value: "15+", label: "TROPHIES", color: "var(--neon-green)" },
  { icon: Film, value: "10+", label: "YEARS", color: "var(--neon-orange)" },
];

export default function ClubIntroSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate intro text
      gsap.from(".intro-text", {
        scrollTrigger: {
          trigger: ".intro-text",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -40,
        duration: 0.6,
        ease: "power3.out",
      });

      // Animate stats cards
      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        rotationZ: () => Math.random() * 6 - 3,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.2)",
      });

      // Counter animation
      const counters = container.current?.querySelectorAll(".stat-value");
      counters?.forEach((counter) => {
        const target = counter.getAttribute("data-value") || "0";
        const num = parseInt(target.replace("+", ""));

        ScrollTrigger.create({
          trigger: counter,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(
              counter,
              { textContent: "0" },
              {
                textContent: num,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                onUpdate: function () {
                  const val = Math.round(
                    parseFloat(
                      (counter as HTMLElement).textContent || "0"
                    )
                  );
                  (counter as HTMLElement).textContent = val + (target.includes("+") ? "+" : "");
                },
              }
            );
          },
          once: true,
        });
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="section-padding relative overflow-hidden bg-grunge-dark halftone-overlay"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          accent="WARNING: RAW TALENT"
          title="WHO WE ARE"
          subtitle="WE'RE NOT JUST A CLUB — WE'RE A MOVEMENT."
        />

        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          {/* Text Content */}
          <div className="intro-text space-y-8 bg-black p-8 border-4 border-black shadow-[10px_10px_0px_var(--neon-pink)] rotate-1">
            <p className="text-xl font-inter font-bold leading-relaxed text-white">
              Founded at the National Institute of Technology, Patna, <strong className="text-[var(--neon-green)] text-2xl font-anton uppercase">Natvansh</strong> is
              the heartbeat of the underground dramatic arts. From the raw, chaotic energy of
              <span className="font-anton text-2xl uppercase ml-2" style={{ color: "var(--neon-yellow)" }}> nukkad natak </span>
              to the cinematic grit of short films, we tear up the script.
            </p>
            <p className="text-xl font-inter font-bold leading-relaxed text-white">
              Our culture is fueled by passion, rebellion, and an unyielding belief that
              <span className="font-anton uppercase block text-3xl mt-4 bg-[var(--neon-pink)] text-black px-2 py-1 inline-block -rotate-2 border-2 border-black"> every story must be told loud </span>
            </p>
            <div className="inline-block px-6 py-4 border-4 border-black bg-[var(--neon-yellow)] transform -rotate-2 shadow-[4px_4px_0_#000]">
              <p className="font-anton text-2xl text-black uppercase">
                "THERE IS SOMETHING SPECIAL!"
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`stat-card grunge-card p-6 text-center transform ${i % 2 === 0 ? '-rotate-2' : 'rotate-2'}`}
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 border-2 border-black flex items-center justify-center shadow-[4px_4px_0_#000]"
                  style={{ background: stat.color }}
                >
                  <stat.icon size={32} className="text-black" />
                </div>
                <p
                  className="stat-value text-5xl font-anton font-bold text-white text-stroke-black drop-shadow-[3px_3px_0_#000]"
                  data-value={stat.value}
                >
                  {stat.value}
                </p>
                <p className="text-xl font-anton uppercase mt-2 text-gray-300">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


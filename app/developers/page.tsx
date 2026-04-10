"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SectionHeading from "@/components/ui/SectionHeading";
import { Globe, Code2, Heart } from "lucide-react";
import { IconGithub, IconLinkedin } from "@/components/ui/SocialIcons";

gsap.registerPlugin(ScrollTrigger);

const developers = [
  {
    name: "Developer One",
    role: "Full-Stack Developer",
    image: null,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    portfolio: "https://example.com",
  },
  {
    name: "Developer Two",
    role: "Frontend Developer",
    image: null,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    portfolio: null,
  },
  {
    name: "Developer Three",
    role: "UI/UX Designer",
    image: null,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    portfolio: "https://example.com",
  },
];

const techStack = [
  { name: "Next.js", color: "#000" },
  { name: "React", color: "#61DAFB" },
  { name: "Three.js", color: "#000" },
  { name: "GSAP", color: "#88CE02" },
  { name: "MongoDB", color: "#47A248" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "Clerk", color: "#6C47FF" },
  { name: "TypeScript", color: "#3178C6" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function DevelopersPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".dev-card", {
        scrollTrigger: {
          trigger: ".dev-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        rotateY: 15,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".tech-badge", {
        scrollTrigger: {
          trigger: ".tech-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "back.out(2)",
      });
    },
    { scope: container }
  );

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main ref={container} className="min-h-screen pt-28">
        {/* Header */}
        <section className="section-padding doodle-bg pb-12">
          <div className="max-w-6xl mx-auto">
            <SectionHeading
              accent="✦ Behind the Curtain"
              title="The Developers"
              subtitle="The tech wizards who built this digital stage for Natvansh."
            />
          </div>
        </section>

        {/* Developer Cards */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16" style={{ background: "var(--bg-primary)" }}>
          <div className="max-w-4xl mx-auto dev-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {developers.map((dev, i) => (
              <div
                key={dev.name}
                className="dev-card glass-strong rounded-2xl p-8 text-center card-hover group perspective-1000"
              >
                {/* Avatar */}
                <div className="relative mx-auto w-28 h-28 mb-6">
                  <div
                    className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-500"
                    style={{ background: "var(--accent-gradient)" }}
                  >
                    {getInitials(dev.name)}
                  </div>
                  {/* Code icon */}
                  <div
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "var(--bg-primary)", border: "2px solid var(--accent-purple)" }}
                  >
                    <Code2 size={14} style={{ color: "var(--accent-purple)" }} />
                  </div>
                </div>

                <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {dev.name}
                </h3>
                <p className="text-sm mt-1 font-accent text-lg" style={{ color: "var(--accent-purple)" }}>
                  {dev.role}
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-3 mt-5">
                  {dev.github && (
                    <a
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:glow"
                      style={{ background: "var(--bg-glass)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}
                    >
                      <IconGithub size={18} />
                    </a>
                  )}
                  {dev.linkedin && (
                    <a
                      href={dev.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:glow"
                      style={{ background: "var(--bg-glass)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}
                    >
                      <IconLinkedin size={18} />
                    </a>
                  )}
                  {dev.portfolio && (
                    <a
                      href={dev.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:glow"
                      style={{ background: "var(--bg-glass)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}
                    >
                      <Globe size={18} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ background: "var(--bg-secondary)" }}>
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              Built With
            </h3>
            <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
              Technologies powering this experience
            </p>
            <div className="tech-grid flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="tech-badge px-4 py-2 rounded-full text-sm font-medium glass-strong card-hover cursor-default"
                  style={{ color: "var(--text-primary)" }}
                >
                  {tech.name}
                </span>
              ))}
            </div>

            {/* Love message */}
            <div className="mt-12 flex items-center justify-center gap-2">
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                Crafted with
              </span>
              <Heart size={16} fill="var(--accent-pink)" style={{ color: "var(--accent-pink)" }} />
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                for
              </span>
              <span className="font-bold text-gradient">नटवंश</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

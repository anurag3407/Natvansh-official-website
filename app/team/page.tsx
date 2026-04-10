"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SectionHeading from "@/components/ui/SectionHeading";
import { Mail } from "lucide-react";
import { IconInstagram, IconLinkedin } from "@/components/ui/SocialIcons";

gsap.registerPlugin(ScrollTrigger);

const postBearers = [
  { name: "Rahul Sharma", role: "President", image: null },
  { name: "Priya Singh", role: "Vice President", image: null },
  { name: "Arjun Patel", role: "General Secretary", image: null },
  { name: "Sneha Gupta", role: "Cultural Secretary", image: null },
];

const teamCategories = [
  {
    name: "CREATIVE TEAM",
    members: [
      { name: "Ananya Roy", role: "Head of Direction", image: null },
      { name: "Vikram Das", role: "Head of Scripting", image: null },
      { name: "Meera Yadav", role: "Head of Acting", image: null },
      { name: "Karan Joshi", role: "Choreographer", image: null },
    ],
  },
  {
    name: "TECHNICAL TEAM",
    members: [
      { name: "Amit Kumar", role: "Head of Cinematography", image: null },
      { name: "Riya Verma", role: "Head of Editing", image: null },
      { name: "Saurav Mishra", role: "Sound Design", image: null },
      { name: "Nisha Agarwal", role: "Lighting Design", image: null },
    ],
  },
  {
    name: "MANAGEMENT TEAM",
    members: [
      { name: "Deepak Singh", role: "Event Manager", image: null },
      { name: "Pooja Kumari", role: "PR & Outreach", image: null },
      { name: "Rohit Sinha", role: "Sponsorship Lead", image: null },
      { name: "Kavya Sharma", role: "Social Media", image: null },
    ],
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const colors = ["var(--neon-pink)", "var(--neon-yellow)", "var(--neon-green)", "var(--neon-orange)"];

export default function TeamPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate post bearers
      gsap.from(".bearer-card", {
        scrollTrigger: {
          trigger: ".bearers-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        rotationZ: () => Math.random() * 8 - 4,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.5)",
      });

      // Animate team sections
      document.querySelectorAll(".team-section").forEach((section) => {
        gsap.from(section.querySelectorAll(".team-card"), {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 40,
          rotationZ: () => Math.random() * 8 - 4,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
        });
      });
    },
    { scope: container }
  );

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main ref={container} className="min-h-screen pt-28 bg-black">
        {/* Header */}
        <section className="section-padding bg-grunge-dark halftone-overlay pb-12 relative border-b-8 border-white">
          <div className="max-w-6xl mx-auto relative z-10">
            <SectionHeading
              accent="THE ENSEMBLE"
              title="OUR TEAM"
              subtitle="The incredible people who make the magic happen — on stage, behind the camera, and beyond."
            />
          </div>
        </section>

        {/* Post Bearers */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bearers-section bg-grunge-red halftone-overlay relative border-b-8 border-black">
          <div className="max-w-6xl mx-auto relative z-10">
            <h3 className="text-3xl font-anton text-center mb-12 text-black bg-[var(--neon-yellow)] inline-block px-4 py-2 border-4 border-black shadow-[6px_6px_0px_#000] rotate-[-2deg] mx-auto block w-max">
              POST BEARERS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {postBearers.map((person, i) => (
                <div
                  key={person.name}
                  className="bearer-card bg-black border-4 border-black p-6 text-center group transition-all duration-300 hover:scale-105 hover:rotate-0"
                  style={{ boxShadow: `8px 8px 0px ${colors[i % colors.length]}`, transform: `rotate(${i % 2 === 0 ? '-2deg' : '2deg'})` }}
                >
                  {/* Avatar */}
                  <div
                    className="w-28 h-28 mx-auto flex items-center justify-center text-4xl font-anton text-black mb-6 border-4 border-black shadow-[4px_4px_0_#FFF]"
                    style={{ background: colors[i % colors.length] }}
                  >
                    {getInitials(person.name)}
                  </div>
                  <h4 className="font-anton text-2xl text-white tracking-widest uppercase mb-1">
                    {person.name}
                  </h4>
                  <p className="text-lg font-bold font-inter" style={{ color: colors[i % colors.length] }}>
                    {person.role}
                  </p>
                  {/* Social Icons */}
                  <div className="flex justify-center gap-3 mt-6">
                    <a href="#" className="w-10 h-10 border-2 border-white flex items-center justify-center text-white hover:bg-[var(--neon-pink)] hover:border-black hover:text-black transition-colors shadow-[2px_2px_0_#FFF]">
                      <IconInstagram size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 border-2 border-white flex items-center justify-center text-white hover:bg-[var(--neon-yellow)] hover:border-black hover:text-black transition-colors shadow-[2px_2px_0_#FFF]">
                      <IconLinkedin size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 border-2 border-white flex items-center justify-center text-white hover:bg-[var(--neon-green)] hover:border-black hover:text-black transition-colors shadow-[2px_2px_0_#FFF]">
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Categories */}
        {teamCategories.map((category, catIndex) => (
          <section
            key={category.name}
            className={`team-section px-4 sm:px-6 lg:px-8 py-20 relative border-b-4 border-black ${
              catIndex % 2 === 0 ? "bg-grunge-purple" : "bg-grunge-dark"
            } halftone-overlay`}
          >
            <div className="max-w-6xl mx-auto relative z-10">
              <h3
                className="text-4xl font-anton mb-12 text-center text-white text-stroke-black drop-shadow-[4px_4px_0_#000]"
              >
                {category.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.members.map((member, i) => (
                  <div
                    key={member.name}
                    className="team-card bg-black border-4 border-black p-5 text-center group cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-0"
                    style={{
                      boxShadow: "6px 6px 0px #FFF",
                      transform: `rotate(${i % 2 === 0 ? '1deg' : '-1deg'})`
                    }}
                  >
                    <div
                      className="w-20 h-20 mx-auto flex items-center justify-center text-2xl font-anton text-black mb-4 border-2 border-black shadow-[3px_3px_0_#FFF]"
                      style={{ background: colors[(catIndex + i) % colors.length] }}
                    >
                      {getInitials(member.name)}
                    </div>
                    <h4 className="font-anton tracking-wider text-xl text-white uppercase mt-2">
                      {member.name}
                    </h4>
                    <p className="text-sm font-bold font-inter text-gray-400 mt-2 uppercase border-t-2 border-zinc-800 pt-2">
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}


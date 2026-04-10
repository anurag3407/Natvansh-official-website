"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SectionHeading from "@/components/ui/SectionHeading";
import { Calendar, MapPin, Tag, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Drama", "Film", "Workshop", "Competition"];

const placeholderEvents = [
  {
    id: "1",
    title: "Rangmanch — Annual Drama Festival",
    description: "The flagship annual drama festival featuring theatrical performances, monologue competitions, and workshops.",
    date: "March 15-17, 2025",
    venue: "Cultural Complex, NIT Patna",
    category: "Drama",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    id: "2",
    title: "Short Film Competition",
    description: "Annual short film making competition — 48-hour filmmaking challenge with a surprise theme reveal.",
    date: "February 20, 2025",
    venue: "Auditorium, NIT Patna",
    category: "Film",
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: "3",
    title: "Nukkad Natak — Street Play Day",
    description: "Bringing socially relevant stories to the streets of NIT Patna campus through powerful street theater.",
    date: "January 26, 2025",
    venue: "Main Campus Ground",
    category: "Drama",
    image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: "4",
    title: "Acting Workshop by Alumni",
    description: "Master class on method acting and improvisation led by Natvansh alumni from the film industry.",
    date: "December 10, 2024",
    venue: "Seminar Hall, NIT Patna",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: "5",
    title: "Mime & Monologue Night",
    description: "An evening dedicated to the art of mime and solo performances, exploring silence and solitude on stage.",
    date: "November 15, 2024",
    venue: "Open Air Theater",
    category: "Competition",
    image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    id: "6",
    title: "Documentary Screening",
    description: "Screening of award-winning documentaries followed by panel discussion on independent filmmaking.",
    date: "October 8, 2024",
    venue: "Auditorium, NIT Patna",
    category: "Film",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=400&fit=crop",
    featured: false,
  },
];

export default function EventsPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".event-card", {
        scrollTrigger: {
          trigger: ".events-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main ref={container} className="min-h-screen pt-28">
        {/* Hero Banner */}
        <section className="section-padding doodle-bg pb-12">
          <div className="max-w-6xl mx-auto">
            <SectionHeading
              accent="✦ The Stage Awaits"
              title="Our Events"
              subtitle="From the raw energy of nukkad natak to the magic of cinema, explore everything Natvansh has to offer."
            />

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    i === 0
                      ? "text-white"
                      : ""
                  }`}
                  style={
                    i === 0
                      ? { background: "var(--accent-gradient)" }
                      : {
                          background: "var(--bg-glass)",
                          border: "1px solid var(--border-color)",
                          color: "var(--text-secondary)",
                        }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20" style={{ background: "var(--bg-primary)" }}>
          <div className="max-w-6xl mx-auto events-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6 -mt-4">
            {placeholderEvents.map((event) => (
              <div
                key={event.id}
                className="event-card glass-strong rounded-2xl overflow-hidden card-hover group cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(180deg, transparent 40%, rgba(13,13,26,0.7) 100%)",
                    }}
                  />
                  {event.featured && (
                    <span
                      className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ background: "var(--accent-gradient)" }}
                    >
                      ★ Featured
                    </span>
                  )}
                  <span
                    className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium text-white glass"
                  >
                    {event.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3
                    className="text-lg font-bold group-hover:text-gradient transition-all line-clamp-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {event.title}
                  </h3>
                  <p
                    className="text-sm line-clamp-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {event.description}
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} style={{ color: "var(--accent-purple)" }} />
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {event.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} style={{ color: "var(--accent-pink)" }} />
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {event.venue.split(",")[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

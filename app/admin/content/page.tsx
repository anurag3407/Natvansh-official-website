"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw } from "lucide-react";

interface ContentSection {
  section: string;
  title: string;
  content: string;
  image: string;
  metadata: Record<string, string>;
}

const defaultContent: ContentSection[] = [
  {
    section: "hero",
    title: "नटवंश",
    content: "Where every emotion finds its stage and every story finds its screen.",
    image: "",
    metadata: { tagline: "अस्ति कश्चित् विशेषः!", subtitle: "Drama & Film Club · NIT Patna" },
  },
  {
    section: "intro",
    title: "Where Stories Come Alive",
    content: "Founded at the National Institute of Technology, Patna, Natvansh is the heartbeat of dramatic arts on campus. From the raw energy of nukkad natak to the polished lens of short films, we explore every shade of storytelling.",
    image: "",
    metadata: { members: "100+", events: "50+", awards: "15+", years: "10+" },
  },
  {
    section: "professor",
    title: "Prof. Faculty Name",
    content: "Drama and cinema are not merely forms of entertainment — they are mirrors of society, vehicles of empathy, and crucibles of character.",
    image: "",
    metadata: { designation: "Professor In-Charge, Natvansh", department: "Department of Humanities & Social Sciences, NIT Patna" },
  },
];

export default function AdminContentPage() {
  const [sections, setSections] = useState<ContentSection[]>(defaultContent);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    try {
      const res = await fetch("/api/content");
      if (res.ok) {
        const data = await res.json();
        if (data.length > 0) {
          setSections(
            defaultContent.map((dc) => {
              const found = data.find((d: ContentSection) => d.section === dc.section);
              return found || dc;
            })
          );
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSave(section: ContentSection) {
    setSaving(section.section);
    try {
      const res = await fetch(`/api/content/${section.section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(section),
      });
      if (res.ok) {
        setSaved(section.section);
        setTimeout(() => setSaved(null), 2000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(null);
    }
  }

  function updateSection(sectionName: string, updates: Partial<ContentSection>) {
    setSections(sections.map((s) => (s.section === sectionName ? { ...s, ...updates } : s)));
  }

  function updateMetadata(sectionName: string, key: string, value: string) {
    setSections(
      sections.map((s) =>
        s.section === sectionName
          ? { ...s, metadata: { ...s.metadata, [key]: value } }
          : s
      )
    );
  }

  const sectionLabels: Record<string, string> = {
    hero: "🎭 Hero Section",
    intro: "✦ Club Introduction",
    professor: "📜 Professor's Message",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Site Content</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Edit homepage sections — hero, intro, and professor message</p>
      </div>

      {sections.map((section) => (
        <div key={section.section} className="admin-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg" style={{ color: "var(--text-primary)" }}>
              {sectionLabels[section.section] || section.section}
            </h3>
            <button
              className="admin-btn admin-btn-primary"
              onClick={() => handleSave(section)}
              disabled={saving === section.section}
            >
              {saving === section.section ? (
                <><RefreshCw size={14} className="animate-spin" /> Saving...</>
              ) : saved === section.section ? (
                <>✓ Saved!</>
              ) : (
                <><Save size={14} /> Save</>
              )}
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Title</label>
            <input
              className="admin-input"
              value={section.title}
              onChange={(e) => updateSection(section.section, { title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Content</label>
            <textarea
              className="admin-input"
              rows={4}
              value={section.content}
              onChange={(e) => updateSection(section.section, { content: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Image URL</label>
            <input
              className="admin-input"
              value={section.image}
              onChange={(e) => updateSection(section.section, { image: e.target.value })}
              placeholder="Optional image URL"
            />
          </div>

          {/* Metadata Fields */}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>Metadata</label>
            <div className="grid sm:grid-cols-2 gap-3">
              {Object.entries(section.metadata).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                    {key}
                  </label>
                  <input
                    className="admin-input"
                    value={value}
                    onChange={(e) => updateMetadata(section.section, key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

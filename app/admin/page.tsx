"use client";

import { Calendar, Users, FileText, Code2, TrendingUp, Activity } from "lucide-react";
import Link from "next/link";

const quickActions = [
  {
    title: "Events",
    description: "Manage drama festivals, workshops, and competitions",
    icon: Calendar,
    href: "/admin/events",
    count: "6",
    color: "#3B5BDB",
  },
  {
    title: "Team",
    description: "Update team members and post bearers",
    icon: Users,
    href: "/admin/team",
    count: "16",
    color: "#7C3AED",
  },
  {
    title: "Site Content",
    description: "Edit hero, intro, and professor sections",
    icon: FileText,
    href: "/admin/content",
    count: "3",
    color: "#EC4899",
  },
  {
    title: "Developers",
    description: "Manage developer profiles",
    icon: Code2,
    href: "/admin/developers",
    count: "3",
    color: "#3B5BDB",
  },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
          Dashboard
        </h1>
        <p className="mt-1" style={{ color: "var(--text-muted)" }}>
          Welcome to the Natvansh admin panel. Manage your club&apos;s digital presence.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="admin-card group hover:border-[var(--accent-purple)] transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${action.color}20`, color: action.color }}
              >
                <action.icon size={20} />
              </div>
              <span
                className="text-2xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {action.count}
              </span>
            </div>
            <h3
              className="font-semibold text-sm"
              style={{ color: "var(--text-primary)" }}
            >
              {action.title}
            </h3>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              {action.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="admin-card">
        <div className="flex items-center gap-3 mb-4">
          <Activity size={20} style={{ color: "var(--accent-purple)" }} />
          <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
            Getting Started
          </h3>
        </div>
        <div className="space-y-3 text-sm" style={{ color: "var(--text-secondary)" }}>
          <p>
            👋 Welcome to the admin panel! Here&apos;s how to get started:
          </p>
          <ul className="space-y-2 ml-4 list-disc">
            <li>
              <strong>Events:</strong> Add your club events with images, dates, and descriptions.
            </li>
            <li>
              <strong>Team:</strong> Set up post bearers and team members with their roles and photos.
            </li>
            <li>
              <strong>Content:</strong> Edit the hero text, club introduction, and professor&apos;s message shown on the homepage.
            </li>
            <li>
              <strong>Developers:</strong> Add developer credits with their GitHub/LinkedIn profiles.
            </li>
          </ul>
          <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
            💡 All changes are saved to the database and reflected on the live site immediately.
          </p>
        </div>
      </div>
    </div>
  );
}

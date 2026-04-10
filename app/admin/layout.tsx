"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Code2,
  ChevronLeft,
  User,
} from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/developers", label: "Developers", icon: Code2 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Don't show admin layout on sign-in page
  if (pathname?.includes("sign-in")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-primary)" }}>
      {/* Sidebar */}
      <aside className="w-64 shrink-0 admin-sidebar hidden lg:flex flex-col" style={{ minHeight: "100vh" }}>
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 text-sm mb-4 hover:opacity-80 transition-opacity" style={{ color: "var(--text-muted)" }}>
              <ChevronLeft size={16} />
              Back to Site
            </Link>
            <h2 className="text-xl font-bold text-gradient">Admin Panel</h2>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Natvansh Management
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 flex-1">
            {adminLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "hover:bg-[var(--bg-glass)]"
                  }`}
                  style={
                    isActive
                      ? { background: "var(--accent-gradient)" }
                      : { color: "var(--text-secondary)" }
                  }
                >
                  <link.icon size={18} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User placeholder (replace with Clerk UserButton when keys are set) */}
          <div className="pt-4" style={{ borderTop: "1px solid var(--border-color)" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--accent-gradient)" }}>
                <User size={16} className="text-white" />
              </div>
              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Admin
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gradient">Admin</h2>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`p-2 rounded-lg ${pathname === link.href ? "text-white" : ""}`}
                  style={
                    pathname === link.href
                      ? { background: "var(--accent-gradient)" }
                      : { color: "var(--text-muted)" }
                  }
                >
                  <link.icon size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 min-h-screen lg:p-8 p-4 pt-20 lg:pt-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}

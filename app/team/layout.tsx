import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the dedicated student performers, creative heads, and post bearers behind Natvansh's stage.",
  keywords: ["Team", "Post Bearers", "Creative Team", "Student Performers", "Actors"],
  openGraph: {
    title: "Team | Natvansh",
    description: "Meet the dedicated student performers, creative heads, and post bearers behind Natvansh's stage.",
    url: "https://natvansh.nitp.ac.in/team",
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

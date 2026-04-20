import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "Explore the street plays, drama festivals, theatre performances, and workshops hosted by Natvansh.",
  keywords: ["Nukkad Natak", "Drama Festivals", "Street Plays", "Workshops", "Performances"],
  openGraph: {
    title: "Events | Natvansh",
    description: "Explore the street plays, drama festivals, theatre performances, and workshops hosted by Natvansh.",
    url: "https://natvansh.nitp.ac.in/events",
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore the visual archive of Natvansh. From backstage moments to full-scale performances.",
  keywords: ["Performance Gallery", "Stage Highlights", "Natvansh visual archive", "Photos"],
  openGraph: {
    title: "Gallery | Natvansh",
    description: "Explore the visual archive of Natvansh. From backstage moments to full-scale performances.",
    url: "https://natvansh.nitp.ac.in/gallery",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alumni",
  description: "The creative minds and visionaries who built Natvansh. Discover our alumni legacy.",
  keywords: ["Alumni Network", "Natvansh Legacy", "Past Members", "Past Alumni"],
  openGraph: {
    title: "Alumni | Natvansh",
    description: "The creative minds and visionaries who built Natvansh. Discover our alumni legacy.",
    url: "https://natvansh.nitp.ac.in/alumni",
  },
};

export default function AlumniLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

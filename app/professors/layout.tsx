import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professor In-Charges",
  description: "Guiding the vision and spirit of Natvansh. Honoring the current and previous pillars of our club.",
  keywords: ["NITP Faculty", "Professor In-Charges", "Club Guardians", "Teachers"],
  openGraph: {
    title: "Professor In-Charges | Natvansh",
    description: "Guiding the vision and spirit of Natvansh. Honoring the current and previous pillars of our club.",
    url: "https://natvansh.nitp.ac.in/professors",
  },
};

export default function ProfessorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

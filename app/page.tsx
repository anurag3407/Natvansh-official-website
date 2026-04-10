import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import HeroSection from "@/components/sections/HeroSection";
import ClubIntroSection from "@/components/sections/ClubIntroSection";
import ProfessorSection from "@/components/sections/ProfessorSection";
import RecentEventsSection from "@/components/sections/RecentEventsSection";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <ClubIntroSection />
        <ProfessorSection />
        <RecentEventsSection />
      </main>
      <Footer />
    </>
  );
}

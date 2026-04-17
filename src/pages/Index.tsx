import Navbar from "@/components/wedding/Navbar";
import HeroSection from "@/components/wedding/HeroSection";
import LoveStorySection from "@/components/wedding/LoveStorySection";
import DetailsSection from "@/components/wedding/DetailsSection";
import GallerySection from "@/components/wedding/GallerySection";
import RSVPSection from "@/components/wedding/RSVPSection";
import ContactsSection from "@/components/wedding/ContactsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <LoveStorySection />
      <DetailsSection />
      <GallerySection />
      <RSVPSection />
      <ContactsSection />
    </div>
  );
};

export default Index;

import { Hero } from "@/components/sections/Hero";
import { ProofBar } from "@/components/sections/ProofBar";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { RitualVIP } from "@/components/sections/RitualVIP";
import { MembershipTeaser } from "@/components/sections/MembershipTeaser";
import { GalleryStrip } from "@/components/sections/GalleryStrip";
import { ProductFeature } from "@/components/sections/ProductFeature";
import { Testimonials } from "@/components/sections/Testimonials";
import { LocationHours } from "@/components/sections/LocationHours";
import { LeadCapture } from "@/components/sections/LeadCapture";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofBar />
      <ServicesPreview />
      <RitualVIP />
      <MembershipTeaser />
      <GalleryStrip />
      <ProductFeature />
      <Testimonials />
      <LocationHours />
      <LeadCapture />
    </>
  );
}

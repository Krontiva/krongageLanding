import Hero from '../components/UnifiedHero';
import PlatformFeaturesSection from '../components/home/PlatformFeaturesSection';
import IndustriesSection from '../components/home/IndustriesSection';
import DemoCtaSection from '../components/home/DemoCtaSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <PlatformFeaturesSection />
      <IndustriesSection />
      <DemoCtaSection />
    </>
  );
}

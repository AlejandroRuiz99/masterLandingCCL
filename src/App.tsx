import { SmoothScroll } from "./components/SmoothScroll";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/sections/Hero";
import { Marquee } from "./components/Marquee";
import { HowItWorks } from "./components/sections/HowItWorks";
import { Resources } from "./components/sections/Resources";
import { Community } from "./components/sections/Community";
import { AboutMiriam } from "./components/sections/AboutMiriam";
import { Testimonials } from "./components/sections/Testimonials";
import { Footer } from "./components/sections/Footer";
import { WhatsAppFab } from "./components/WhatsAppFab";

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink">
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <Resources />
        <Community />
        <AboutMiriam />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

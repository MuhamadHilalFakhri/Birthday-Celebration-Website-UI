import { useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { SplashScreen } from "./components/SplashScreen";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { MemoryCarousel } from "./components/MemoryCarousel";
import { Top10Section } from "./components/Top10Section";
import { GallerySection } from "./components/GallerySection";
import { TimelineSection } from "./components/TimelineSection";
import { TrailerSection } from "./components/TrailerSection";
import { SurpriseSection } from "./components/SurpriseSection";
import { Footer } from "./components/Footer";
import {
  CelebrationMusicPlayer,
  type CelebrationMusicPlayerHandle,
} from "./components/CelebrationMusicPlayer";
import { FlowerPetalOverlay } from "./components/FlowerPetalOverlay";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const userName = "Faisha Auditha"; // You can customize this name
  const musicPlayerRef = useRef<CelebrationMusicPlayerHandle>(null);

  const handleEnterCelebration = () => {
    void musicPlayerRef.current?.startPlayback();
    setShowSplash(false);
  };

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-background text-foreground">
      {!showSplash && <FlowerPetalOverlay className="fixed inset-0 z-30" />}
      <CelebrationMusicPlayer
        ref={musicPlayerRef}
        isVisible={!showSplash}
        isVideoActive={isTrailerOpen}
      />
      <AnimatePresence>
        {showSplash && (
          <SplashScreen
            userName={userName}
            onComplete={handleEnterCelebration}
          />
        )}
      </AnimatePresence>

      {!showSplash && (
        <div className="relative">
          <Navbar />
          <main>
            <HeroSection userName={userName} />
            <MemoryCarousel />
            <Top10Section />
            <GallerySection
              onOpenVideo={() => setIsTrailerOpen(true)}
              onCloseVideo={() => setIsTrailerOpen(false)}
            />
            <TimelineSection />
            <TrailerSection />
            <SurpriseSection />
          </main>
          <Footer userName={userName} />
        </div>
      )}
    </div>
  );
}

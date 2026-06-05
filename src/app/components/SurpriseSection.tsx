import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Lock, Unlock, Heart, Sparkles, Star } from "lucide-react";
import confetti from "canvas-confetti";

export function SurpriseSection() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);

    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#FF90BB", "#FF7AAD", "#FFC1DA", "#FFFFFF"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#FF90BB", "#FF7AAD", "#FFC1DA", "#FFFFFF"],
      });
    }, 250);

    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 3,
            angle: 90,
            spread: 45,
            origin: { x: Math.random(), y: 1.2 },
            colors: ["#FFC1DA", "#FF90BB"],
            shapes: ["circle"],
            scalar: 2,
            gravity: -0.5,
            drift: 1,
          });
        }, i * 200);
      }
    }, 500);
  };

  return (
    <section id="surprise" className="bg-surface-soft py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mb-6 inline-block"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand shadow-[0_20px_44px_rgba(255,144,187,0.28)] md:h-24 md:w-24">
                  <Lock className="h-10 w-10 text-brand-foreground md:h-12 md:w-12" />
                </div>
              </motion.div>

              <h2 className="mb-4 text-3xl text-ink md:text-4xl">A Surprise Is Waiting...</h2>
              <p className="mb-8 text-base text-ink-soft sm:text-lg">Something special has been prepared just for you</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUnlock}
                className="mx-auto flex w-full items-center justify-center gap-3 rounded-full bg-brand px-6 py-4 text-base text-brand-foreground shadow-[0_18px_38px_rgba(255,144,187,0.28)] transition-colors hover:bg-brand-hover sm:w-auto sm:px-8 sm:text-lg"
              >
                <Unlock className="h-5 w-5" />
                Unlock Surprise
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{ x: Math.random() * 100 + "%", y: "120%", opacity: 0 }}
                    animate={{ y: "-20%", opacity: [0, 1, 0], rotate: 360 }}
                    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.3, ease: "linear" }}
                  >
                    <Sparkles className="h-6 w-6 text-brand" />
                  </motion.div>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-white via-surface-soft to-soft-highlight p-6 text-center shadow-[0_28px_70px_rgba(255,144,187,0.18)] sm:p-8 md:p-12">
                <div
                  className="absolute top-0 left-1/2 h-full w-full -translate-x-1/2 opacity-40"
                  style={{
                    background: "radial-gradient(circle at top, rgba(255, 144, 187, 0.42), transparent 70%)",
                  }}
                />

                <div className="relative z-10">
                  <motion.div
                    animate={{ scale: [1, 1.18, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-6"
                  >
                    <Heart className="mx-auto h-16 w-16 fill-brand text-brand md:h-20 md:w-20" />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6 text-2xl text-ink sm:text-3xl md:text-5xl"
                  >
                    🌹 Happy Birthday! 🎉
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mx-auto max-w-2xl space-y-4 text-sm leading-relaxed text-ink-soft sm:text-base md:text-lg"
                  >
                    <p>Selamat ulang tahun ya! Semoga panjang umur, sehat selalu, dimudahkan dalam segala urusan, dan diberikan banyak kebahagiaan. Semoga apa yang kamu inginkan, cita-citakan, dan doakan bisa segera tercapai.</p>
                    <p>Terima kasih sudah bertahan sampai sejauh ini. Kamu hebat karena sudah melewati banyak hal, baik yang mudah maupun yang sulit. Jangan lupa untuk selalu bahagia dan menikmati setiap momen yang ada.</p>
                    <p className="pt-2">Pokoknya, semoga tahun ini membawa lebih banyak senyum, lebih banyak keberuntungan, dan lebih banyak alasan untuk bersyukur. Selamat merayakan hari spesialmu, semoga harimu menyenangkan dan penuh kebahagiaan! 💖✨</p>
                  </motion.div>

                  <div className="mt-8 flex justify-center gap-3">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + i * 0.1 }}
                      >
                        <Star className="h-6 w-6 fill-brand-hover text-brand-hover" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import flowerHtml from "../../../flower/Index.html?raw";
import flowerCss from "../../../flower/Style.css?raw";
import flowerScript from "../../../flower/Script.js?raw";

interface SplashScreenProps {
  onComplete: () => void;
  userName: string;
}

const flowerBodyMarkup = flowerHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? "";

const flowerIntroDoc = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      ${flowerCss}

      .flowers {
        transform-origin: center bottom;
        transform: scale(0.92);
      }

      @media (max-width: 768px) {
        .flowers {
          transform-origin: center bottom;
          transform: translateY(-10vh) scale(1.42);
        }
      }
    </style>
  </head>
  <body class="not-loaded">
    ${flowerBodyMarkup.replace(/<script[\s\S]*<\/script>/i, "")}
    <script>${flowerScript}</script>
  </body>
</html>
`;

export function SplashScreen({ onComplete, userName }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showFlowerIntro, setShowFlowerIntro] = useState(true);
  const [canDismissFlowerIntro, setCanDismissFlowerIntro] = useState(false);

  useEffect(() => {
    if (!showFlowerIntro) {
      return;
    }

    const introTimer = window.setTimeout(() => {
      setCanDismissFlowerIntro(true);
    }, 6000);

    return () => window.clearTimeout(introTimer);
  }, [showFlowerIntro]);

  useEffect(() => {
    if (showFlowerIntro) {
      return;
    }

    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(interval);
          return 100;
        }

        return prev + 2;
      });
    }, 30);

    return () => window.clearInterval(interval);
  }, [showFlowerIntro]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-background px-4 py-6"
    >
      {showFlowerIntro ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => {
            if (canDismissFlowerIntro) {
              setShowFlowerIntro(false);
            }
          }}
          className="absolute inset-0 overflow-hidden bg-[#fff5f8]"
        >
          <iframe
            title="Flower intro"
            srcDoc={flowerIntroDoc}
            className="pointer-events-none absolute inset-0 h-full w-full border-0"
          />

          {canDismissFlowerIntro && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-x-0 top-6 z-10 mx-auto w-fit rounded-full border border-white/70 bg-white/84 px-5 py-3 text-center text-sm text-ink shadow-[0_20px_40px_rgba(255,144,187,0.18)] backdrop-blur-xl sm:text-base"
            >
              Klik layar di mana saja untuk lanjut
            </motion.div>
          )}
        </motion.div>
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 25%, rgba(255, 144, 187, 0.24) 0%, transparent 32%), radial-gradient(circle at 80% 20%, rgba(255, 193, 218, 0.34) 0%, transparent 26%), linear-gradient(180deg, #fff9fb 0%, #fff5f8 100%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 mx-auto my-auto w-full max-w-2xl rounded-[2rem] border border-border bg-white/85 p-6 text-center shadow-[0_30px_70px_rgba(255,144,187,0.2)] backdrop-blur-xl sm:p-8 md:p-14"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.9 }}
              className="text-3xl tracking-[0.18em] text-brand sm:text-4xl sm:tracking-[0.22em] md:text-7xl md:tracking-[0.28em]"
            >
              BIRTHFLIX
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-5 text-xl text-ink sm:text-2xl md:mt-6 md:text-4xl"
            >
              Now Celebrating: {userName}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.7 }}
              className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink-soft md:text-base"
            >
              Happy Birthday!
              <br />
              Wishing you a day filled with love, joy, and sweet memories.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mx-auto mt-8 w-full max-w-md md:mt-10"
            >
              <div className="h-2 overflow-hidden rounded-full bg-soft-highlight">
                <motion.div
                  className="h-full rounded-full bg-brand"
                  style={{
                    width: `${progress}%`,
                    boxShadow: "0 0 22px rgba(255, 144, 187, 0.55)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            {progress === 100 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
                onClick={onComplete}
                className="mt-8 w-full rounded-full bg-brand px-6 py-3 text-base tracking-wide text-brand-foreground shadow-[0_18px_38px_rgba(255,144,187,0.28)] transition-all hover:scale-105 hover:bg-brand-hover sm:w-auto sm:px-8 sm:py-4 sm:text-lg md:mt-10"
              >
                Enter Celebration
              </motion.button>
            )}
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

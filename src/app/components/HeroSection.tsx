import { motion } from "motion/react";
import { Play, Plus, Heart } from "lucide-react";

interface HeroSectionProps {
  userName: string;
}

export function HeroSection({ userName }: HeroSectionProps) {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-white via-surface-soft to-soft-highlight"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 30%, rgba(255, 144, 187, 0.26) 0%, transparent 36%), radial-gradient(circle at 80% 25%, rgba(255, 193, 218, 0.4) 0%, transparent 28%)",
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,245,248,0.6) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-24 pb-14 sm:px-6 sm:pt-28 sm:pb-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="rounded-[2rem] border border-border bg-white/82 p-6 text-center shadow-[0_28px_70px_rgba(255,144,187,0.18)] backdrop-blur-xl sm:p-8 md:p-12 md:text-left"
        >
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-4 text-3xl leading-tight text-ink sm:text-4xl md:text-7xl"
          >
            Happy Birthday, <span className="text-brand">{userName}</span>
          </motion.h1>

          {/* Metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-6 flex flex-wrap items-center justify-center gap-2 text-sm text-ink-soft sm:gap-3 md:justify-start md:text-base"
          >
            <span>2026</span>
            <span>&bull;</span>
            <span>1 Special Episode</span>
            <span>&bull;</span>
            <span>All Ages</span>
            <span>&bull;</span>
            <span className="text-brand-hover">Made with Love</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mb-8 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg"
          >
            Every year brings a new chapter, but today is the episode where everything is about you.
            Your smile, your kindness, your memories, and your beautiful journey deserve to be
            celebrated like a masterpiece.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <button
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-base text-brand-foreground shadow-[0_18px_36px_rgba(255,144,187,0.3)] transition-all hover:scale-105 hover:bg-brand-hover sm:w-auto md:px-8 md:py-4 md:text-lg"
            >
              <Play className="w-5 h-5 fill-brand-foreground" />
              Play Celebration
            </button>

            <button className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-base text-ink shadow-[0_14px_30px_rgba(255,144,187,0.12)] transition-colors hover:bg-soft-highlight sm:w-auto md:px-8 md:py-4 md:text-lg">
              <Plus className="w-5 h-5" />
              Add to Memories
            </button>

            <button className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface-soft px-6 py-3 text-base text-ink shadow-[0_14px_30px_rgba(255,144,187,0.12)] transition-colors hover:bg-soft-highlight sm:w-auto md:px-8 md:py-4 md:text-lg">
              <Heart className="w-5 h-5" />
              Send Wishes
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

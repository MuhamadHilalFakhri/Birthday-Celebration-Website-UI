import { motion } from "motion/react";
import { Heart } from "lucide-react";

interface FooterProps {
  userName: string;
}

export function Footer({ userName }: FooterProps) {
  const links = ["Memories", "Gallery", "Surprise"];

  return (
    <footer className="border-t border-border bg-surface-soft py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
          <div>
            <h3 className="mb-3 text-2xl tracking-[0.14em] text-brand sm:tracking-[0.2em] md:text-3xl">
              BIRTHFLIX
            </h3>
            <p className="flex items-center justify-center gap-2 text-ink-soft md:justify-start">
              Made with <Heart className="h-4 w-4 fill-brand text-brand" /> for {userName}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-ink">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-ink-soft transition-colors hover:text-brand"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-ink">About This Celebration</h4>
            <p className="text-sm leading-relaxed text-ink-soft">
              A special birthday experience created to celebrate an extraordinary person. Every moment, every memory, and every wish has been curated with a softer, more elegant visual tone.
            </p>
          </div>
        </div>

        <div className="mb-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-ink-soft">
            &copy; 2026 All memories reserved.
          </p>
          <p className="mt-2 text-xs text-ink-muted">
            Crafted with soft pink details, modern spacing, and a premium celebratory feel
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

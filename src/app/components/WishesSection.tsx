import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, Mail, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface Wish {
  id: number;
  sender: string;
  avatar: string;
  preview: string;
  fullMessage: string;
  label: string;
  labelColor: string;
}

const wishes: Wish[] = [
  { id: 1, sender: "Best Friend", avatar: "BF", preview: "You deserve all the happiness in the world...", fullMessage: "Happy Birthday to my favorite person! You deserve all the happiness in the world and so much more. Thank you for always being there, for the laughs, the memories, and for being exactly who you are. Here's to another year of adventures together!", label: "New", labelColor: "#FF90BB" },
  { id: 2, sender: "Family", avatar: "FA", preview: "We're so proud of the person you've become...", fullMessage: "Happy Birthday, sweetheart! We're so proud of the person you've become. Watching you grow has been the greatest joy of our lives. May this year bring you everything you've been hoping for. We love you more than words can express!", label: "Special", labelColor: "#FFC1DA" },
  { id: 3, sender: "Someone Special", avatar: "SS", preview: "Every moment with you is a gift...", fullMessage: "Happy Birthday to the most amazing person I know! Every moment with you is a gift, and I'm so grateful to celebrate this special day with you. You make the world brighter just by being in it. Here's to you and all the wonderful things ahead!", label: "Emotional", labelColor: "#F8C8DC" },
  { id: 4, sender: "The Squad", avatar: "SQ", preview: "Party time! Can't wait to celebrate...", fullMessage: "HAPPY BIRTHDAY! We're not saying you're old, but... actually, we are! Just kidding! You're timeless and awesome. Can't wait to celebrate with you properly. Get ready for the best birthday ever. Love you tons!", label: "Must Read", labelColor: "#FFD6E5" },
  { id: 5, sender: "Secret Admirer", avatar: "?", preview: "Someone thinks you're incredible...", fullMessage: "Happy Birthday to someone truly special. You may not know who this is from, but just know that you're admired, appreciated, and valued more than you realize. Your kindness doesn't go unnoticed. Have the most amazing day!", label: "Mystery", labelColor: "#FFE5EF" },
];

export function WishesSection() {
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);

  const openWish = (wish: Wish) => {
    setSelectedWish(wish);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
      colors: ["#FF90BB", "#FF7AAD", "#FFC1DA"],
    });
  };

  return (
    <section id="wishes" className="bg-background py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-2xl text-ink md:text-3xl"
        >
          Birthday Wishes Collection
        </motion.h2>
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
          The cards, badges, modal, and highlights all now follow the same soft pink rhythm without losing readability.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="group relative cursor-pointer rounded-[1.85rem] border border-border bg-white p-6 shadow-[0_18px_38px_rgba(255,144,187,0.12)] transition-shadow hover:shadow-[0_24px_48px_rgba(255,144,187,0.18)]"
              onClick={() => openWish(wish)}
            >
              <div
                className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs tracking-wider text-brand-foreground"
                style={{ backgroundColor: wish.labelColor }}
              >
                {wish.label}
              </div>

              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl text-brand-foreground shadow-[0_12px_24px_rgba(255,144,187,0.14)]"
                style={{ backgroundColor: wish.labelColor }}
              >
                {wish.avatar}
              </div>

              <h3 className="mb-2 text-xl text-ink">{wish.sender}</h3>
              <p className="mb-4 line-clamp-2 text-sm text-ink-soft">{wish.preview}</p>

              <button
                className="flex items-center gap-2 text-sm text-brand transition-all group-hover:gap-3 hover:text-brand-hover"
                style={{ color: "#FF90BB" }}
              >
                <Mail className="h-4 w-4" />
                Read Message
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedWish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedWish(null)}
          >
            <div className="absolute inset-0 bg-overlay-strong/70 backdrop-blur-md" />

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-[2rem] border border-border bg-white p-8 shadow-[0_28px_70px_rgba(255,144,187,0.22)] md:p-10"
              style={{ boxShadow: `0 28px 70px ${selectedWish.labelColor}66` }}
            >
              <button
                onClick={() => setSelectedWish(null)}
                className="absolute top-4 right-4 rounded-full border border-border bg-white p-2 text-brand transition-colors hover:bg-soft-highlight"
              >
                <X className="h-6 w-6" />
              </button>

              <div
                className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-3xl text-brand-foreground shadow-[0_12px_24px_rgba(255,144,187,0.14)]"
                style={{ backgroundColor: selectedWish.labelColor }}
              >
                {selectedWish.avatar}
              </div>

              <h3 className="mb-2 text-center text-2xl text-ink">{selectedWish.sender}</h3>

              <div className="mb-6 flex justify-center">
                <span
                  className="rounded-full px-3 py-1 text-xs tracking-wider text-brand-foreground"
                  style={{ backgroundColor: selectedWish.labelColor }}
                >
                  {selectedWish.label}
                </span>
              </div>

              <p className="mb-6 text-center leading-relaxed text-ink-soft">
                {selectedWish.fullMessage}
              </p>

              <div className="flex justify-center">
                <Sparkles className="h-6 w-6 text-brand" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

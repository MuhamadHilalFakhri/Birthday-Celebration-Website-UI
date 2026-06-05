import { motion } from "motion/react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { PhotoLightbox, type PhotoLightboxItem } from "./PhotoLightbox";

interface Memory {
  id: number;
  title: string;
  date: string;
  description: string;
  progress: number;
  src: string;
}

const imageModules = import.meta.glob(
  [
    "../MediaWeb/*.{jpg,jpeg,png,webp,avif}",
    "!../MediaWeb/WhatsApp Image 2026-05-26 at 23.34.36.jpeg",
    "!../MediaWeb/WhatsApp Image 2026-05-26 at 23.34.38.jpeg",
    "!../MediaWeb/WhatsApp Image 2026-05-26 at 23.34.41.jpeg",
    "!../MediaWeb/WhatsApp Image 2026-05-26 at 23.34.42 (1).jpeg",
    "!../MediaWeb/WhatsApp Image 2026-05-26 at 23.34.40 (2).jpeg",
  ],
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const excludedImageNames = new Set([
  "WhatsApp Image 2026-05-26 at 23.34.36.jpeg",
  "WhatsApp Image 2026-05-26 at 23.34.38.jpeg",
  "WhatsApp Image 2026-05-26 at 23.34.41.jpeg",
  "WhatsApp Image 2026-05-26 at 23.34.42 (1).jpeg",
  "WhatsApp Image 2026-05-26 at 23.34.40 (2).jpeg",
]);

const extractDateLabel = (path: string) => {
  const dashedMatch = path.match(/(\d{4}-\d{2}-\d{2})/);
  if (dashedMatch) {
    return dashedMatch[1];
  }

  const compactMatch = path.match(/(\d{4})(\d{2})(\d{2})/);
  if (compactMatch) {
    const [, year, month, day] = compactMatch;
    return `${year}-${month}-${day}`;
  }

  return "Special Moment";
};

const shuffleEntries = <T,>(items: T[]) => {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
};

const memories: Memory[] = shuffleEntries(
  Object.entries(imageModules).filter(([path]) => {
    const segments = path.split("/");
    const fileName = segments[segments.length - 1];
    return !excludedImageNames.has(fileName);
  }),
)
  .map(([path, src], index) => ({
    id: index + 1,
    title: `Memory ${String(index + 1).padStart(2, "0")}`,
    date: extractDateLabel(path),
    description: "Captured and saved for this celebration.",
    progress: 42 + ((index * 9) % 50),
    src,
  }));

export function MemoryCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedMemoryIndex, setSelectedMemoryIndex] = useState<number | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const lightboxItems: PhotoLightboxItem[] = memories.map((memory) => ({
    src: memory.src,
    alt: memory.title,
    title: memory.title,
    subtitle: memory.date,
    description: memory.description,
  }));

  return (
    <>
      <section id="memories" className="bg-surface-soft py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-3 text-2xl text-ink md:text-3xl"
          >
            Continue Watching Our Memories
          </motion.h2>
          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
            
          </p>
          <p className="mb-4 text-xs text-ink-muted md:hidden">
            Geser kartu ke samping untuk melihat memori lainnya.
          </p>

          {memories.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-border bg-white/70 p-6 text-sm text-ink-soft">
              Belum ada foto yang ditemukan di `src/app/MediaWeb`.
            </div>
          ) : (
            <div className="relative group">
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll memories left"
                className="absolute left-1 top-1/2 z-10 flex -translate-y-1/2 rounded-full border border-border bg-white/95 p-1.5 text-brand shadow-[0_12px_24px_rgba(255,144,187,0.16)] transition-all hover:bg-soft-highlight md:left-0 md:p-2 md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto px-10 pb-4 scrollbar-hide scroll-smooth md:px-0"
                style={{ scrollbarWidth: "none" }}
              >
                {memories.map((memory) => (
                  <motion.button
                    key={memory.id}
                    type="button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setHoveredId(memory.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedMemoryIndex(memories.findIndex((item) => item.id === memory.id))}
                    className="relative w-48 flex-shrink-0 cursor-pointer text-left group/card md:w-56 lg:w-60"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] border border-border bg-gradient-to-br from-white via-surface-soft to-surface-tint shadow-[0_20px_44px_rgba(255,144,187,0.12)]"
                    >
                      <img
                        src={memory.src}
                        alt={memory.title}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                      {hoveredId === memory.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand shadow-[0_16px_30px_rgba(255,144,187,0.28)]">
                            <Play className="ml-1 h-6 w-6 fill-brand-foreground text-brand-foreground" />
                          </div>
                        </motion.div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="mb-1 text-base text-white md:text-lg">{memory.title}</h3>
                        <p className="mb-2 text-xs text-soft-highlight md:text-sm">{memory.date}</p>
                        <p className="mb-3 text-xs text-white/80">{memory.description}</p>

                        <div className="h-1 overflow-hidden rounded-full bg-white/25">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${memory.progress}%`,
                              backgroundColor: "#FF90BB",
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => scroll("right")}
                aria-label="Scroll memories right"
                className="absolute right-1 top-1/2 z-10 flex -translate-y-1/2 rounded-full border border-border bg-white/95 p-1.5 text-brand shadow-[0_12px_24px_rgba(255,144,187,0.16)] transition-all hover:bg-soft-highlight md:right-0 md:p-2 md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </section>

      <PhotoLightbox
        items={lightboxItems}
        selectedIndex={selectedMemoryIndex}
        onClose={() => setSelectedMemoryIndex(null)}
        onSelect={setSelectedMemoryIndex}
      />
    </>
  );
}

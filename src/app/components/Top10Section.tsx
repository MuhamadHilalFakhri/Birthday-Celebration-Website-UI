import { motion } from "motion/react";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PhotoLightbox, type PhotoLightboxItem } from "./PhotoLightbox";

interface Reason {
  rank: number;
  title: string;
  description: string;
}

const reasons: Reason[] = [
  { rank: 1, title: "Your Kindness", description: "The way you care for everyone around you" },
  { rank: 2, title: "Your Smile", description: "It lights up every room you enter" },
  { rank: 3, title: "Your Energy", description: "Contagious positivity that inspires us all" },
  { rank: 4, title: "Your Patience", description: "Always understanding and supportive" },
  { rank: 5, title: "Your Humor", description: "Making us laugh even on tough days" },
  { rank: 6, title: "Your Loyalty", description: "A friend we can always count on" },
  { rank: 7, title: "Your Dreams", description: "Chasing goals with unstoppable passion" },
  { rank: 8, title: "Your Strength", description: "Facing challenges with grace and courage" },
  { rank: 9, title: "Your Heart", description: "Pure, genuine, and full of love" },
  { rank: 10, title: "Your Presence", description: "Making every moment better just by being here" },
];

const photoModules = import.meta.glob("./foto/*.{jpg,jpeg,JPG,JPEG,png,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const excludedTopReasonPhotos = new Set([
  "./foto/c1f175cb-249a-48c9-9786-b0026e2272ee (1).jpg",
  "./foto/d16189af-555c-4f90-aa13-2cea8b2faa43 (1).jpg",
]);

const topReasonPhotos = Object.entries(photoModules)
  .sort(([leftPath], [rightPath]) => leftPath.localeCompare(rightPath))
  .filter(([path]) => !excludedTopReasonPhotos.has(path))
  .map(([, src]) => src);

export function Top10Section() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const photoCarouselRef = useRef<HTMLDivElement>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollPhotos = (direction: "left" | "right") => {
    if (photoCarouselRef.current) {
      const scrollAmount = 220;
      photoCarouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const lightboxItems: PhotoLightboxItem[] = topReasonPhotos.map((photo, index) => ({
    src: photo,
    alt: `Top reason moment ${index + 1}`,
    title: `Top Reason Moment ${String(index + 1).padStart(2, "0")}`,
    subtitle: "Top 10 Reasons Why You're Amazing",
    description: reasons[index]
      ? `${reasons[index].title}: ${reasons[index].description}`
      : "A personal moment from this celebration.",
  }));

  return (
    <section className="bg-background py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-2xl text-ink md:text-3xl"
        >
          Top 10 Reasons Why You're Amazing
        </motion.h2>
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
        </p>
        <p className="mb-4 text-xs text-ink-muted md:hidden">
          Geser horizontal untuk menjelajahi semua alasan favorit.
        </p>

        {topReasonPhotos.length > 0 && (
          <div className="relative mb-8 group">
            <button
              onClick={() => scrollPhotos("left")}
              aria-label="Scroll top reason photos left"
              className="absolute left-1 top-1/2 z-10 flex -translate-y-1/2 rounded-full border border-border bg-white/95 p-1.5 text-brand shadow-[0_12px_24px_rgba(255,144,187,0.16)] transition-all hover:bg-soft-highlight md:left-0 md:p-2 md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              ref={photoCarouselRef}
              className="flex gap-3 overflow-x-auto px-8 pb-2 scrollbar-hide scroll-smooth md:px-0"
              style={{ scrollbarWidth: "none" }}
            >
              {topReasonPhotos.map((photo, index) => (
                <button
                  key={`${photo}-${index}`}
                  type="button"
                  onClick={() => setSelectedPhotoIndex(index)}
                  className="h-28 w-20 flex-shrink-0 overflow-hidden rounded-[1.25rem] border border-border bg-white shadow-[0_12px_24px_rgba(255,144,187,0.12)] md:h-36 md:w-24"
                >
                  <img
                    src={photo}
                    alt={`Top reason moment ${index + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollPhotos("right")}
              aria-label="Scroll top reason photos right"
              className="absolute right-1 top-1/2 z-10 flex -translate-y-1/2 rounded-full border border-border bg-white/95 p-1.5 text-brand shadow-[0_12px_24px_rgba(255,144,187,0.16)] transition-all hover:bg-soft-highlight md:right-0 md:p-2 md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll top reasons left"
            className="absolute left-1 top-1/2 z-10 flex -translate-y-1/2 rounded-full border border-border bg-white/95 p-1.5 text-brand shadow-[0_12px_24px_rgba(255,144,187,0.16)] transition-all hover:bg-soft-highlight md:left-0 md:p-2 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-10 pb-4 scrollbar-hide scroll-smooth md:px-0"
            style={{ scrollbarWidth: "none" }}
          >
            {reasons.map((reason, index) => (
              <motion.button
                key={reason.rank}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  if (topReasonPhotos[index]) {
                    setSelectedPhotoIndex(index);
                  }
                }}
                className="relative w-64 flex-shrink-0 text-left group/card md:w-80"
              >
                {/* Background Rank Number */}
                <div className="absolute -top-8 -left-4 text-9xl md:text-[12rem] opacity-10 select-none pointer-events-none z-0">
                  <span
                    className="stroke-text"
                    style={{
                      WebkitTextStroke: "2px rgba(255, 144, 187, 0.42)",
                      color: "transparent",
                    }}
                  >
                    {reason.rank}
                  </span>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex h-72 flex-col justify-end overflow-hidden rounded-[1.85rem] border border-border bg-gradient-to-br from-white via-surface-soft to-surface-tint p-6 shadow-[0_20px_44px_rgba(255,144,187,0.12)] md:h-80"
                >
                  {topReasonPhotos[index] && (
                    <img
                      src={topReasonPhotos[index]}
                      alt={reason.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  )}

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(28,18,24,0.1) 28%, rgba(28,18,24,0.78) 100%), radial-gradient(circle at top right, rgba(255, 144, 187, 0.3), transparent 70%)",
                    }}
                  />

                  <div className="relative z-10">
                    {/* Rank badge */}
                    <div
                      className="mb-4 inline-block rounded-full bg-brand px-3 py-1 text-xs tracking-wider text-brand-foreground shadow-[0_10px_20px_rgba(255,144,187,0.2)]"
                    >
                      #{reason.rank} IN TOP 10
                    </div>

                    <h3 className="mb-3 text-2xl text-ink md:text-3xl">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-ink-soft md:text-base">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              </motion.button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll top reasons right"
            className="absolute right-1 top-1/2 z-10 flex -translate-y-1/2 rounded-full border border-border bg-white/95 p-1.5 text-brand shadow-[0_12px_24px_rgba(255,144,187,0.16)] transition-all hover:bg-soft-highlight md:right-0 md:p-2 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <PhotoLightbox
        items={lightboxItems}
        selectedIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onSelect={setSelectedPhotoIndex}
      />
    </section>
  );
}

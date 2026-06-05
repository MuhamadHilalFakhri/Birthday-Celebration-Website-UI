import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

interface GallerySectionProps {
  onOpenVideo?: () => void;
  onCloseVideo?: () => void;
}

interface Episode {
  id: number;
  number: string;
  title: string;
  description: string;
  date: string;
  fileName: string;
  thumbnailSrc: string;
  src: string;
}

const videoModules = import.meta.glob("../MediaWeb/*.{mp4,MP4,webm,WEBM,mov,MOV,m4v,M4V}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const prioritizedVideoNames = [
  "8c8427c0-64c7-425e-98f3-97ec67d96104.MP4",
  "aa744b28-96c3-40d4-84b3-e0428bd1b3e4.MP4",
];

const getFileName = (path: string) => {
  const segments = path.split("/");
  return segments[segments.length - 1];
};

const getThumbnailSrc = (fileName: string) =>
  `/video-thumbnails/${encodeURIComponent(`${fileName}.jpg`)}`;

const extractDateLabel = (path: string) => {
  const match = path.match(/(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : "Video Memory";
};

const episodes: Episode[] = Object.entries(videoModules)
  .sort(([leftPath], [rightPath]) => {
    const leftName = getFileName(leftPath);
    const rightName = getFileName(rightPath);
    const leftPriority = prioritizedVideoNames.indexOf(leftName);
    const rightPriority = prioritizedVideoNames.indexOf(rightName);

    if (leftPriority !== -1 || rightPriority !== -1) {
      if (leftPriority === -1) return 1;
      if (rightPriority === -1) return -1;
      return leftPriority - rightPriority;
    }

    return leftPath.localeCompare(rightPath);
  })
  .map(([path, src], index) => {
    const fileName = getFileName(path);

    return {
      id: index + 1,
      number: String(index + 1).padStart(2, "0"),
      title: `Video Memory ${String(index + 1).padStart(2, "0")}`,
      description: "Klik untuk membuka dan memutar video kenangan ini.",
      date: extractDateLabel(path),
      fileName,
      thumbnailSrc: getThumbnailSrc(fileName),
      src,
    };
  });

export function GallerySection({ onOpenVideo, onCloseVideo }: GallerySectionProps) {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  const openEpisode = (episode: Episode) => {
    setSelectedEpisode(episode);
    onOpenVideo?.();
  };

  const closeEpisode = () => {
    setSelectedEpisode(null);
    onCloseVideo?.();
  };

  const nextEpisode = () => {
    if (!selectedEpisode) return;
    const currentIndex = episodes.findIndex((ep) => ep.id === selectedEpisode.id);
    setSelectedEpisode(episodes[(currentIndex + 1) % episodes.length]);
  };

  const prevEpisode = () => {
    if (!selectedEpisode) return;
    const currentIndex = episodes.findIndex((ep) => ep.id === selectedEpisode.id);
    setSelectedEpisode(episodes[(currentIndex - 1 + episodes.length) % episodes.length]);
  };

  return (
    <section id="gallery" className="bg-surface-soft py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-2xl text-ink md:text-3xl"
        >
          Featured Episodes of Your Life
        </motion.h2>

        {episodes.length === 0 ? (
          <div className="rounded-[1.9rem] border border-dashed border-border bg-white/70 p-6 text-sm text-ink-soft">
            Belum ada video yang ditemukan di `src/app/MediaWeb`.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {episodes.map((episode, index) => (
              <motion.button
                key={episode.id}
                type="button"
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => openEpisode(episode)}
                className="group relative h-64 cursor-pointer overflow-hidden rounded-[1.9rem] border border-border bg-gradient-to-br from-white via-surface-soft to-surface-tint text-left shadow-[0_20px_44px_rgba(255,144,187,0.12)] md:h-72"
              >
                <img
                  src={episode.thumbnailSrc}
                  alt={episode.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.04 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/95 shadow-[0_16px_30px_rgba(255,144,187,0.28)] transition-transform group-hover:scale-105">
                    <Play className="ml-1 h-8 w-8 fill-brand-foreground text-brand-foreground" />
                  </div>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-sm tracking-wider text-soft-highlight">EPISODE {episode.number}</span>
                    <span className="text-white/70">&bull;</span>
                    <span className="text-sm text-white/80">{episode.date}</span>
                  </div>
                  <h3 className="mb-2 text-xl text-white md:text-2xl">{episode.title}</h3>
                  <p className="text-sm text-white/80">{episode.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedEpisode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-overlay-strong/70 p-3 backdrop-blur-md sm:items-center sm:p-4"
            onClick={closeEpisode}
          >
            <button
              onClick={closeEpisode}
              className="absolute top-3 right-3 z-10 rounded-full border border-border bg-white/90 p-2 text-brand shadow-[0_12px_24px_rgba(255,144,187,0.16)] transition-colors hover:bg-soft-highlight sm:top-4 sm:right-4"
            >
              <X className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevEpisode();
              }}
              className="absolute left-4 z-10 hidden rounded-full border border-border bg-white/90 p-2 text-brand shadow-[0_12px_24px_rgba(255,144,187,0.16)] transition-colors hover:bg-soft-highlight sm:block"
            >
              <ChevronLeft className="h-12 w-12" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextEpisode();
              }}
              className="absolute right-4 z-10 hidden rounded-full border border-border bg-white/90 p-2 text-brand shadow-[0_12px_24px_rgba(255,144,187,0.16)] transition-colors hover:bg-soft-highlight sm:block"
            >
              <ChevronRight className="h-12 w-12" />
            </button>

            <motion.div
              key={selectedEpisode.id}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto w-full max-w-5xl"
            >
              <div className="overflow-hidden rounded-[1.75rem] border border-border bg-black shadow-[0_28px_70px_rgba(255,144,187,0.22)] sm:rounded-[2rem]">
                <video
                  key={selectedEpisode.src}
                  src={selectedEpisode.src}
                  className="aspect-video h-full w-full bg-black object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              </div>

              <div className="mt-4 rounded-[1.5rem] border border-border bg-white p-4 text-center shadow-[0_16px_36px_rgba(255,144,187,0.18)] sm:p-6">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <span className="text-sm tracking-wider text-brand">EPISODE {selectedEpisode.number}</span>
                  <span className="text-ink-muted">&bull;</span>
                  <span className="text-sm text-ink-soft">{selectedEpisode.date}</span>
                </div>
                <h3 className="mb-2 text-2xl text-ink md:text-3xl">{selectedEpisode.title}</h3>
                <p className="text-ink-soft">{selectedEpisode.description}</p>
              </div>

              <div className="mt-5 flex items-center justify-center gap-3 sm:hidden">
                <button
                  onClick={prevEpisode}
                  className="rounded-full border border-border bg-surface-soft px-4 py-2 text-sm text-brand transition-colors hover:bg-soft-highlight"
                >
                  Previous
                </button>
                <button
                  onClick={nextEpisode}
                  className="rounded-full border border-border bg-brand px-4 py-2 text-sm text-brand-foreground transition-colors hover:bg-brand-hover"
                >
                  Next
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

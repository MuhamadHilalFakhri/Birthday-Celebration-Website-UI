import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface PhotoLightboxItem {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  description?: string;
}

interface PhotoLightboxProps {
  items: PhotoLightboxItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onSelect: (index: number) => void;
}

export function PhotoLightbox({
  items,
  selectedIndex,
  onClose,
  onSelect,
}: PhotoLightboxProps) {
  if (selectedIndex === null || items.length === 0) {
    return null;
  }

  const currentItem = items[selectedIndex];

  const showPrevious = () => {
    onSelect((selectedIndex - 1 + items.length) % items.length);
  };

  const showNext = () => {
    onSelect((selectedIndex + 1) % items.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center bg-overlay-strong/70 p-3 backdrop-blur-md sm:items-center sm:p-4"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 rounded-full border border-border bg-white/90 p-2 text-brand shadow-[0_12px_24px_rgba(255,144,187,0.16)] transition-colors hover:bg-soft-highlight sm:top-4 sm:right-4"
        >
          <X className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>

        <button
          onClick={(event) => {
            event.stopPropagation();
            showPrevious();
          }}
          className="absolute left-4 z-10 hidden rounded-full border border-border bg-white/90 p-2 text-brand shadow-[0_12px_24px_rgba(255,144,187,0.16)] transition-colors hover:bg-soft-highlight sm:block"
        >
          <ChevronLeft className="h-12 w-12" />
        </button>

        <button
          onClick={(event) => {
            event.stopPropagation();
            showNext();
          }}
          className="absolute right-4 z-10 hidden rounded-full border border-border bg-white/90 p-2 text-brand shadow-[0_12px_24px_rgba(255,144,187,0.16)] transition-colors hover:bg-soft-highlight sm:block"
        >
          <ChevronRight className="h-12 w-12" />
        </button>

        <motion.div
          key={currentItem.src}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          onClick={(event) => event.stopPropagation()}
          className="mx-auto w-full max-w-5xl"
        >
          <div className="overflow-hidden rounded-[1.75rem] border border-border bg-black shadow-[0_28px_70px_rgba(255,144,187,0.22)] sm:rounded-[2rem]">
            <img
              src={currentItem.src}
              alt={currentItem.alt}
              className="max-h-[80vh] w-full object-contain"
            />
          </div>

          <div className="mt-4 rounded-[1.5rem] border border-border bg-white p-4 text-center shadow-[0_16px_36px_rgba(255,144,187,0.18)] sm:p-6">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="text-sm tracking-wider text-brand">{currentItem.title}</span>
              {currentItem.subtitle && (
                <>
                  <span className="text-ink-muted">&bull;</span>
                  <span className="text-sm text-ink-soft">{currentItem.subtitle}</span>
                </>
              )}
            </div>
            {currentItem.description && <p className="text-ink-soft">{currentItem.description}</p>}
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 sm:hidden">
            <button
              onClick={showPrevious}
              className="rounded-full border border-border bg-surface-soft px-4 py-2 text-sm text-brand transition-colors hover:bg-soft-highlight"
            >
              Previous
            </button>
            <button
              onClick={showNext}
              className="rounded-full border border-border bg-brand px-4 py-2 text-sm text-brand-foreground transition-colors hover:bg-brand-hover"
            >
              Next
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

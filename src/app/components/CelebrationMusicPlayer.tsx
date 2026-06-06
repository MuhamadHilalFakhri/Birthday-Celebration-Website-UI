import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronUp, Disc3, Music4, Pause, Play, SkipForward, Volume2 } from "lucide-react";

import rayuanPerempuanGilaSrc from "../music/Nadin Amizah - Rayuan Perempuan Gila.mp3";
import semuaAkuDirayakanSrc from "../music/Nadin Amizah - Semua Aku Dirayakan.mp3";
import kekalSrc from "../music/Nadin Amizah - Kekal.mp3";
import fotoKitaBlurSrc from "../music/Sal Priadi - Foto kita blur.mp3";

interface SongDefinition {
  title: string;
  subtitle: string;
  src: string;
}

export interface CelebrationMusicPlayerHandle {
  startPlayback: () => Promise<void>;
}

interface CelebrationMusicPlayerProps {
  isVisible: boolean;
  isVideoActive?: boolean;
}

const SONGS: SongDefinition[] = [
  {
    title: "Semua Aku Dirayakan",
    subtitle: "Nadin Amizah",
    src: semuaAkuDirayakanSrc,
  },
  {
    title: "Rayuan Perempuan Gila",
    subtitle: "Nadin Amizah",
    src: rayuanPerempuanGilaSrc,
  },
  {
    title: "Kekal",
    subtitle: "Nadin Amizah",
    src: kekalSrc,
  },
  {
    title: "Foto Kita Blur",
    subtitle: "Sal Priadi",
    src: fotoKitaBlurSrc,
  },
];

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00";
  }

  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export const CelebrationMusicPlayer = forwardRef<
  CelebrationMusicPlayerHandle,
  CelebrationMusicPlayerProps
>(function CelebrationMusicPlayer({ isVisible, isVideoActive = false }, ref) {
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isPlaylistExpanded, setIsPlaylistExpanded] = useState(true);
  const [volume, setVolume] = useState(0.45);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldResumeOnSongChangeRef = useRef(false);
  const shouldResumeAfterVideoRef = useRef(false);

  const activeSong = SONGS[activeSongIndex];
  const shouldShowPlaylist = !isMobileViewport || isPlaylistExpanded;
  const progressPercent = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 640px)");

    const syncViewportState = (matches: boolean) => {
      setIsMobileViewport(matches);
      setIsMinimized(matches);
      setIsPlaylistExpanded(!matches);
    };

    syncViewportState(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      syncViewportState(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      shouldResumeOnSongChangeRef.current = true;
      setActiveSongIndex((currentIndex) => (currentIndex + 1) % SONGS.length);
    };

    const handleError = () => {
      setAudioError("File musik tidak bisa diputar. Coba pilih lagu lain.");
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    setCurrentTime(0);
    setDuration(0);
    audio.load();

    if (!shouldResumeOnSongChangeRef.current) {
      return;
    }

    shouldResumeOnSongChangeRef.current = false;
    void playAudio();
  }, [activeSongIndex]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      shouldResumeAfterVideoRef.current = false;
      return;
    }

    if (isVideoActive) {
      if (isPlaying) {
        shouldResumeAfterVideoRef.current = true;
        audioRef.current?.pause();
      }

      return;
    }

    if (shouldResumeAfterVideoRef.current) {
      shouldResumeAfterVideoRef.current = false;
      void playAudio();
    }
  }, [isPlaying, isVideoActive, isVisible]);

  useImperativeHandle(ref, () => ({
    startPlayback: () => playAudio(),
  }));

  async function playAudio() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      setAudioError(null);
      await audio.play();
    } catch {
      setAudioError("Musik belum bisa diputar otomatis. Tekan tombol play untuk memulai.");
      setIsPlaying(false);
    }
  }

  function stopPlayback() {
    audioRef.current?.pause();
  }

  async function togglePlayback() {
    if (isPlaying) {
      stopPlayback();
      return;
    }

    await playAudio();
  }

  function handleSelectSong(index: number) {
    shouldResumeOnSongChangeRef.current = isPlaying;
    audioRef.current?.pause();
    setActiveSongIndex(index);

    if (isMobileViewport) {
      setIsPlaylistExpanded(false);
    }
  }

  function handleNextSong() {
    handleSelectSong((activeSongIndex + 1) % SONGS.length);
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={activeSong.src}
        preload="metadata"
      />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed right-3 bottom-3 left-3 z-50 sm:right-4 sm:bottom-4 sm:left-auto"
          >
            <AnimatePresence mode="wait">
              {isMinimized ? (
                <motion.div
                  key="compact-player"
                  initial={{ opacity: 0, scale: 0.86 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.86 }}
                  className="flex items-center justify-end sm:justify-end"
                >
                  <div className="relative">
                    <button
                      onClick={() => setIsMinimized(false)}
                      className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-[radial-gradient(circle_at_32%_30%,#ffffff_0%,#fff0f5_28%,#ffc1da_55%,#ff90bb_100%)] shadow-[0_24px_52px_rgba(255,144,187,0.28)] transition-transform hover:scale-105"
                      aria-label="Tampilkan panel musik"
                    >
                      <span className="absolute h-5 w-5 rounded-full border border-white/70 bg-white/80" />
                      <span className="absolute h-11 w-11 rounded-full border border-white/45" />
                      <span className="absolute h-[4.25rem] w-[4.25rem] rounded-full border border-white/25" />
                      <Disc3 className={`h-8 w-8 text-brand-foreground ${isPlaying ? "animate-spin" : ""}`} />
                    </button>

                    <button
                      onClick={() => void togglePlayback()}
                      className="absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-brand shadow-[0_10px_22px_rgba(255,144,187,0.18)] transition-colors hover:bg-soft-highlight"
                      aria-label={isPlaying ? "Pause musik" : "Play musik"}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.aside
                  key="full-player"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="max-h-[min(24rem,calc(100vh-5.5rem))] w-full overflow-y-auto rounded-[1.5rem] border border-border bg-white/92 p-3 shadow-[0_22px_48px_rgba(255,144,187,0.2)] backdrop-blur-xl sm:max-h-[calc(100vh-6rem)] sm:w-[min(22rem,calc(100vw-2rem))] sm:rounded-[1.75rem] sm:p-4"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand sm:h-11 sm:w-11">
                        <Disc3 className={`h-5 w-5 ${isPlaying ? "animate-spin" : ""}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink">Birthday Music</p>
                        <p className="text-xs text-ink-soft">Playlist pilihan untuk celebration ini</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleNextSong}
                        className="rounded-full border border-border bg-surface-soft p-2 text-brand transition-colors hover:bg-soft-highlight"
                        aria-label="Putar lagu berikutnya"
                      >
                        <SkipForward className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setIsMinimized(true)}
                        className="rounded-full border border-border bg-surface-soft p-2 text-brand transition-colors hover:bg-soft-highlight"
                        aria-label="Perkecil panel musik"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-soft-highlight/70 p-3 sm:p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <Music4 className="h-4 w-4 text-brand" />
                      <div>
                        <p className="text-sm font-medium text-ink">{activeSong.title}</p>
                        <p className="text-xs text-ink-soft">{activeSong.subtitle}</p>
                      </div>
                    </div>

                    <div className="mb-4 flex items-center gap-3">
                      <button
                        onClick={() => void togglePlayback()}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-[0_14px_28px_rgba(255,144,187,0.24)] transition-colors hover:bg-brand-hover"
                        aria-label={isPlaying ? "Pause musik" : "Play musik"}
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
                      </button>

                      <div className="flex-1">
                        <div className="mb-1 flex items-center justify-between text-xs text-ink-soft">
                          <span>{isPlaying ? "Playing" : "Paused"}</span>
                          <span>
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/70">
                          <motion.div
                            className="h-full rounded-full bg-brand"
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="mb-2 flex items-center gap-2 text-xs text-ink-soft">
                        <Volume2 className="h-4 w-4 text-brand" />
                        <span>Volume</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={(event) => setVolume(Number(event.target.value))}
                        className="w-full accent-[#FF90BB]"
                        aria-label="Atur volume musik"
                      />
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
                          Pilih Lagu
                        </p>
                        <button
                          onClick={() => {
                            if (isMobileViewport) {
                              setIsPlaylistExpanded((current) => !current);
                              return;
                            }

                            setIsMinimized(true);
                          }}
                          className="flex items-center gap-1 text-xs text-brand transition-colors hover:text-brand-hover"
                        >
                          {isMobileViewport ? (isPlaylistExpanded ? "Ringkas" : "Lihat") : "Hide"}
                          {isMobileViewport ? (
                            <ChevronDown
                              className={`h-3.5 w-3.5 transition-transform ${
                                isPlaylistExpanded ? "rotate-180" : ""
                              }`}
                            />
                          ) : (
                            <ChevronUp className="h-3.5 w-3.5 rotate-180" />
                          )}
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {shouldShowPlaylist && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="grid gap-2">
                              {SONGS.map((song, index) => {
                                const isActive = index === activeSongIndex;

                                return (
                                  <button
                                    key={song.src}
                                    onClick={() => handleSelectSong(index)}
                                    className={`rounded-2xl border px-3 py-3 text-left transition-all ${
                                      isActive
                                        ? "border-brand bg-white text-ink shadow-[0_14px_28px_rgba(255,144,187,0.18)]"
                                        : "border-border bg-white/60 text-ink-soft hover:border-brand/40 hover:bg-white"
                                    }`}
                                  >
                                    <p className="text-sm font-medium">{song.title}</p>
                                    <p className="text-xs">{song.subtitle}</p>
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {audioError && (
                    <p className="mt-3 text-xs text-destructive">{audioError}</p>
                  )}
                </motion.aside>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

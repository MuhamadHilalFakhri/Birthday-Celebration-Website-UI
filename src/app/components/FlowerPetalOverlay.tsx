import type { CSSProperties } from "react";

interface PetalTone {
  base: string;
  edge: string;
  glow: string;
}

interface PetalSpec {
  id: string;
  left: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  driftDuration: number;
  driftDistance: number;
  fallShift: number;
  rotateStart: number;
  rotateMid: number;
  rotateEnd: number;
  scale: number;
  tone: PetalTone;
}

interface SparkSpec {
  id: string;
  left: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  driftDistance: number;
  fallShift: number;
}

const PETAL_TONES: PetalTone[] = [
  {
    base: "rgba(255, 243, 247, 0.96)",
    edge: "rgba(255, 193, 218, 0.92)",
    glow: "rgba(255, 193, 218, 0.18)",
  },
  {
    base: "rgba(255, 236, 243, 0.96)",
    edge: "rgba(255, 144, 187, 0.82)",
    glow: "rgba(255, 144, 187, 0.14)",
  },
  {
    base: "rgba(255, 239, 245, 0.95)",
    edge: "rgba(248, 200, 220, 0.88)",
    glow: "rgba(248, 200, 220, 0.16)",
  },
  {
    base: "rgba(255, 245, 248, 0.94)",
    edge: "rgba(255, 182, 208, 0.84)",
    glow: "rgba(255, 182, 208, 0.15)",
  },
];

interface FlowerPetalOverlayProps {
  className?: string;
}

// Reduced to 24 petals for better GPU performance while keeping visual density
const PETALS: PetalSpec[] = Array.from({ length: 24 }, (_, index) => {
  const tone = PETAL_TONES[index % PETAL_TONES.length];
  const left = ((index * 4.35) % 100) + (index % 2 === 0 ? 0.6 : -0.6);
  const size = 16 + (index % 6) * 6 + (index % 3) * 2;
  const opacity = 0.36 + (index % 5) * 0.08;
  // Slower fall = smoother perceived motion (18–28s range)
  const duration = 18 + (index % 6) * 1.8 + Math.floor(index / 6) * 1.4;
  const delay = -(index * 1.6);
  // Gentler drift for organic feel
  const driftDuration = 4.2 + (index % 5) * 0.9;
  const driftDistance = 14 + (index % 6) * 5;
  const fallShift = index % 2 === 0 ? -18 - (index % 4) * 3 : 16 + (index % 4) * 4;
  const rotateStart = index % 2 === 0 ? -20 - index * 1.1 : 18 + index * 1.0;
  const rotateMid = rotateStart + (index % 2 === 0 ? 28 : -25);
  const rotateEnd = rotateMid + (index % 2 === 0 ? 24 : -28);
  const scale = 0.92 + (index % 4) * 0.1;

  return {
    id: `petal-${index}`,
    left,
    size,
    opacity,
    duration,
    delay,
    driftDuration,
    driftDistance,
    fallShift,
    rotateStart,
    rotateMid,
    rotateEnd,
    scale,
    tone,
  };
});

// Reduced to 16 sparks for performance
const SPARKS: SparkSpec[] = Array.from({ length: 16 }, (_, index) => {
  const left = 3 + ((index * 6.1) % 94);
  const size = 2.5 + (index % 4) * 1.2;
  const opacity = 0.22 + (index % 4) * 0.08;
  const duration = 16 + (index % 5) * 2.6;
  const delay = -(index * 1.5);
  const driftDistance = 8 + (index % 4) * 5;
  const fallShift = index % 2 === 0 ? -10 - index : 9 + index;

  return {
    id: `spark-${index}`,
    left,
    size,
    opacity,
    duration,
    delay,
    driftDistance,
    fallShift,
  };
});

export function FlowerPetalOverlay({ className }: FlowerPetalOverlayProps) {
  return (
    <div
      className={["flower-petal-overlay", className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      {PETALS.map((petal) => (
        <span
          key={petal.id}
          className="flower-petal-overlay__stream"
          style={
            {
              "--petal-left": `${petal.left}%`,
              "--petal-size": `${petal.size}px`,
              "--petal-opacity": `${petal.opacity}`,
              "--fall-duration": `${petal.duration}s`,
              "--fall-delay": `${petal.delay}s`,
              "--drift-duration": `${petal.driftDuration}s`,
              "--drift-distance": `${petal.driftDistance}px`,
              "--fall-shift": `${petal.fallShift}px`,
              "--rotate-start": `${petal.rotateStart}deg`,
              "--rotate-mid": `${petal.rotateMid}deg`,
              "--rotate-end": `${petal.rotateEnd}deg`,
              "--petal-scale": `${petal.scale}`,
              "--petal-base": petal.tone.base,
              "--petal-edge": petal.tone.edge,
              "--petal-glow": petal.tone.glow,
            } as CSSProperties
          }
        >
          <span className="flower-petal-overlay__sway">
            <span className="flower-petal-overlay__petal" />
          </span>
        </span>
      ))}

      {SPARKS.map((spark) => (
        <span
          key={spark.id}
          className="flower-petal-overlay__spark"
          style={
            {
              "--spark-left": `${spark.left}%`,
              "--spark-size": `${spark.size}px`,
              "--spark-opacity": `${spark.opacity}`,
              "--spark-duration": `${spark.duration}s`,
              "--spark-delay": `${spark.delay}s`,
              "--spark-drift": `${spark.driftDistance}px`,
              "--spark-shift": `${spark.fallShift}px`,
            } as CSSProperties
          }
        >
          <span className="flower-petal-overlay__spark-core" />
        </span>
      ))}
    </div>
  );
}

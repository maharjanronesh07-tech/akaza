import { useEffect, useRef } from "react";
import Snowfall from "react-snowfall";

export default function App() {
  const musicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = musicRef.current;
    if (!audio) return;

    let isPlaying = false;
    let isStarting = false;

    const startMusic = async () => {
      if (isPlaying || isStarting) return;

      isStarting = true;
      audio.muted = false;
      // Set volume before play: iPhone/iPad Safari may ignore volume fades.
      audio.volume = 0.32;

      try {
        await audio.play();
        isPlaying = true;
        // No visible controls are added; the scene stays completely clean.
        window.removeEventListener("pointerdown", startMusic, true);
        window.removeEventListener("touchstart", startMusic, true);
        window.removeEventListener("click", startMusic, true);
        window.removeEventListener("keydown", startMusic, true);
      } catch (error) {
        // Keep listening so the next real user interaction can retry.
        isStarting = false;
        console.warn("Akaza background music could not start yet:", error);
      }
    };

    // A real interaction is required by most browsers before sound can play.
    window.addEventListener("pointerdown", startMusic, true);
    window.addEventListener("touchstart", startMusic, true);
    window.addEventListener("click", startMusic, true);
    window.addEventListener("keydown", startMusic, true);

    // If the browser suspended playback when the tab was backgrounded,
    // allow the next interaction to resume it.
    const onVisibilityChange = () => {
      if (!document.hidden && audio.paused) {
        isPlaying = false;
        isStarting = false;
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("pointerdown", startMusic, true);
      window.removeEventListener("touchstart", startMusic, true);
      window.removeEventListener("click", startMusic, true);
      window.removeEventListener("keydown", startMusic, true);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <main className="scene" aria-label="Akaza in a snowy night">
      <img
        className="character-art"
        src="/akaza-4k.webp"
        alt="Akaza in a fighting stance in a snowy night"
        draggable="false"
      />

      <div className="cinematic-shade" aria-hidden="true" />

      <Snowfall
        color="#eaf4ff"
        snowflakeCount={230}
        speed={[0.45, 1.8]}
        radius={[0.5, 2.1]}
        wind={[-0.8, 0.9]}
        opacity={[0.2, 0.65]}
        enable3DRotation
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <Snowfall
        color="#f5f9ff"
        snowflakeCount={75}
        speed={[1.4, 3.8]}
        radius={[2.2, 7.5]}
        wind={[-1.4, 1.6]}
        opacity={[0.35, 0.9]}
        enable3DRotation
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 3,
          filter: "blur(0.65px)",
        }}
      />

      <audio
        ref={musicRef}
        src="/akaza-theme.mp3"
        loop
        preload="auto"
        playsInline
      />
    </main>
  );
}

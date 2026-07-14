import { useEffect, useRef, useState } from "react";
import { videos, icons } from "../constants/index.js";
import { MediaLoader } from "../UI/index.js";

const slides = [
    { id: 1, label: "Heart beat", video: videos.highlightHeart },
    { id: 2, label: "Technology", video: videos.highlightAirPods },
    { id: 3, label: "Geography", video: videos.highlightEarth },
    { id: 4, label: "Physics", video: videos.highlightLoop },
];

// Where to grab the resting poster frame for a tile that hasn't been watched yet.
const POSTER = 0.3;

const VideoCarousel = () => {
    const videoRefs = useRef([]);
    const canvasRefs = useRef([]);
    const barRef = useRef(null);
    const containerRef = useRef(null);
    const activeRef = useRef(0);

    const [active, setActive] = useState(0);
    const [playing, setPlaying] = useState(true);
    // `live` = the active video is actually rendering frames. Used to cross-fade
    // from the still canvas to the live video so a switch never flashes black.
    const [live, setLive] = useState(false);
    // Per-tile: has the clip loaded enough to show a real frame yet?
    const [ready, setReady] = useState(() => slides.map(() => false));

    const markReady = (i) =>
        setReady((r) => (r[i] ? r : r.map((v, idx) => (idx === i ? true : v))));

    useEffect(() => {
        activeRef.current = active;
    }, [active]);

    // Paint the video's current frame onto its canvas. This is the key trick:
    // a paused <video> may drop its frame buffer (→ black), but a canvas keeps
    // whatever we drew, so the resting tile always shows a real image.
    const snapshot = (i) => {
        const v = videoRefs.current[i];
        const c = canvasRefs.current[i];
        if (!v || !c || !v.videoWidth) return;
        if (c.width !== v.videoWidth) c.width = v.videoWidth;
        if (c.height !== v.videoHeight) c.height = v.videoHeight;
        try {
            c.getContext("2d").drawImage(v, 0, 0, c.width, c.height);
        } catch {
            /* ignore */
        }
    };

    // Only the active tile plays. Before pausing any tile we snapshot its frame,
    // so switching away can never leave a black square.
    useEffect(() => {
        setLive(false);
        videoRefs.current.forEach((v, i) => {
            if (!v) return;
            if (i === active) {
                if (playing) v.play().catch(() => {});
                else {
                    snapshot(i);
                    v.pause();
                }
            } else {
                snapshot(i);
                v.pause();
            }
        });
    }, [active, playing]);

    // Smooth 60fps progress for the active tile.
    useEffect(() => {
        if (barRef.current) barRef.current.style.width = "0%";
        if (!playing) return;
        let raf;
        const tick = () => {
            const v = videoRefs.current[active];
            if (v && v.duration && barRef.current) {
                barRef.current.style.width = `${(v.currentTime / v.duration) * 100}%`;
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [active, playing]);

    // Pause the active clip while the section is off-screen.
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                const v = videoRefs.current[active];
                if (!v) return;
                if (entry.isIntersecting && playing) v.play().catch(() => {});
                else v.pause();
            },
            { threshold: 0.2 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [active, playing]);

    const handleLoadedMetadata = (i) => {
        const v = videoRefs.current[i];
        if (!v) return;
        if (i === active) {
            if (playing) v.play().catch(() => {});
        } else {
            // Pull a poster frame so never-watched tiles aren't black.
            try {
                v.currentTime = Math.min(1.2, (v.duration || 4) * POSTER);
            } catch {
                /* ignore */
            }
        }
    };

    const handleSeeked = (i) => {
        // A resting tile finished seeking to its poster → capture it.
        if (i !== activeRef.current) snapshot(i);
        markReady(i);
    };

    const handleEnded = () => setActive((a) => (a + 1) % slides.length);

    const activate = (i) => {
        if (i === active) return;
        const v = videoRefs.current[i];
        if (v) {
            try {
                v.currentTime = 0;
            } catch {
                /* ignore */
            }
        }
        setActive(i);
        setPlaying(true);
    };

    return (
        <div
            ref={containerRef}
            className="mx-auto mt-10 w-full max-w-[1680px] px-5 sm:px-8 lg:px-10"
        >
            <div className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible lg:grid-cols-4">
                {slides.map((s, i) => {
                    const isActive = i === active;
                    const showLive = isActive && live && playing;
                    return (
                        <div key={s.id} className="w-[75vw] flex-shrink-0 snap-center sm:w-auto sm:flex-shrink-1">
                            <button
                                type="button"
                                onClick={() => activate(i)}
                                aria-pressed={isActive}
                                className={`group relative aspect-square w-full overflow-hidden rounded-3xl border bg-black text-left transition-all duration-300 ${
                                    isActive
                                        ? "border-accent shadow-glow-green"
                                        : "border-border hover:-translate-y-1 hover:border-accent/60"
                                }`}
                            >
                                <video
                                    ref={(el) => (videoRefs.current[i] = el)}
                                    src={s.video}
                                    muted
                                    playsInline
                                    preload="metadata"
                                    className="absolute inset-0 h-full w-full object-cover"
                                    onLoadedData={() => markReady(i)}
                                    onLoadedMetadata={() => handleLoadedMetadata(i)}
                                    onSeeked={() => handleSeeked(i)}
                                    onPlaying={() => {
                                        markReady(i);
                                        if (activeRef.current === i) setLive(true);
                                    }}
                                    onEnded={handleEnded}
                                />
                                {/* Resting still — cross-fades out when the live video is up */}
                                <canvas
                                    ref={(el) => (canvasRefs.current[i] = el)}
                                    aria-hidden="true"
                                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
                                        showLive ? "opacity-0" : "opacity-100"
                                    }`}
                                />
                                {/* loading placeholder while the clip streams in */}
                                {!ready[i] && <MediaLoader />}
                                <span className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/55 to-transparent" />
                                <span className="pointer-events-none absolute left-4 top-4 text-lg font-medium text-white sm:text-xl">
                                    {s.label}
                                </span>
                                <span
                                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-black/30 transition-opacity ${
                                        isActive ? "opacity-100" : "opacity-0"
                                    }`}
                                >
                                    {isActive && (
                                        <span
                                            ref={barRef}
                                            className="block h-full bg-main_gradient"
                                            style={{ width: "0%" }}
                                        />
                                    )}
                                </span>
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="mt-10 flex justify-center">
                <button
                    type="button"
                    onClick={() => setPlaying((p) => !p)}
                    aria-label={playing ? "Pause" : "Play"}
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface backdrop-blur transition-transform hover:scale-105"
                >
                    <img
                        src={playing ? icons.pause : icons.play}
                        alt=""
                        aria-hidden="true"
                        className="h-5 w-5"
                    />
                </button>
            </div>
        </div>
    );
};

export default VideoCarousel;

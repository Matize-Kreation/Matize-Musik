/* eslint-env browser */
/* global window, document */
"use client";

import React, {
    useState,
    useCallback,
    useEffect,
    useRef,
} from "react";
import Image from "next/image";
import Link from "next/link";
import songs from "@/data/songs.json";
import PlayerLayout from "@/components/PlayerLayout";
import { withBase } from "@/lib/paths";

type Song = (typeof songs)[number];

const ORBIT_STORAGE_KEY = "facetten-orbit-angle";

// === FIX für nicht geladene Windows-Pfade ===
const FACETTEN_TRACK_FIXES: Record<string, string> = {
    "01-spotlight_an.jpg": "/images/covers/facetten/tracks/01-spotlight_an.jpg",
    "07-psychoanalyse.jpg": "/images/covers/facetten/tracks/07-psychoanalyse.jpg",
    "08-wasserfarben.jpg": "/images/covers/facetten/tracks/08-wasserfarben.jpg",
    "13-blut-und-ehre.jpg": "/images/covers/facetten/tracks/13-blut-und-ehre.jpg",
};

function normalizeCoverPath(raw?: string | null): string | null {
    if (!raw) return null;

    const basename = raw.split(/[/\\]/).pop()?.toLowerCase() ?? "";
    if (basename && FACETTEN_TRACK_FIXES[basename]) {
        return FACETTEN_TRACK_FIXES[basename];
    }

    const winRoot = "D:\\Matize\\Matize-Kreation\\Matize-Musik\\public\\";
    const winRootAlt1 = "D:/Matize/Matize-Kreation/Matize-Musik/public/";
    const winRootAlt2 = "D:/Matize/Matize-Kreation/Matize-Musik/";

    let cleaned = raw;

    if (cleaned.startsWith(winRoot)) {
        cleaned = cleaned.replace(winRoot, "/");
    } else if (cleaned.startsWith(winRootAlt1)) {
        cleaned = cleaned.replace(winRootAlt1, "/");
    } else if (cleaned.startsWith(winRootAlt2)) {
        cleaned = cleaned.replace(winRootAlt2, "/");
    }

    cleaned = cleaned.replace(/\\/g, "/");

    if (!cleaned.startsWith("/")) {
        cleaned = "/" + cleaned;
    }

    return cleaned;
}

function getCoverSrc(song: Song): string | null {
    if (song?.cover) {
        const norm = normalizeCoverPath(song.cover);
        if (norm) return withBase(norm);
    }

    const title = song?.title?.toLowerCase() ?? "";
    const slug = song?.slug?.toLowerCase() ?? "";

    if (slug.includes("04") || title.includes("kunst") || slug.includes("kunst")) {
        return withBase("/images/covers/facetten/tracks/04-kunst.jpg");
    }

    if (
        (title.includes("fakt") && title.includes("ansicht")) ||
        (slug.includes("fakt") && slug.includes("ansicht")) ||
        slug.includes("11")
    ) {
        return withBase("/images/covers/facetten/tracks/11-fakt_und_ansicht.jpg");
    }

    if (
        title.includes("apokalypse") ||
        slug.includes("apokalypse") ||
        slug.includes("12")
    ) {
        return withBase("/images/covers/facetten/tracks/12-apokalypse.jpg");
    }

    return null;
}

export default function FacettenOrbit3D() {
    const albumCover = withBase(
        "/images/covers/facetten/album/facetten-album/Facetten-Cover.jpg"
    );

    const orbitRef = useRef<HTMLDivElement | null>(null);
    const isSnappingRef = useRef(false);
    const userOverrideRef = useRef(false);

    const [baseAngle, setBaseAngle] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedSong, setSelectedSong] = useState<null | Song>(null);
    const angleCheckpointRef = useRef<number | null>(null);

    // gespeicherten Winkel holen
    useEffect(() => {
        if (typeof window === "undefined") return;
        const saved = window.sessionStorage.getItem(ORBIT_STORAGE_KEY);
        if (saved) {
            const num = Number(saved);
            if (!Number.isNaN(num)) setBaseAngle(num);
        }
    }, []);

    // Winkel speichern
    useEffect(() => {
        if (typeof window === "undefined") return;
        window.sessionStorage.setItem(ORBIT_STORAGE_KEY, String(baseAngle));
    }, [baseAngle]);

    // Scroll sperren, wenn Orbit aktiv oder Player offen
    useEffect(() => {
        if (typeof document === "undefined") return;
        const shouldLock = isFocused || Boolean(selectedSong);
        if (shouldLock) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = prev;
            };
        }
    }, [isFocused, selectedSong]);

    const closeOverlay = () => {
        if (angleCheckpointRef.current !== null) {
            setBaseAngle(angleCheckpointRef.current);
            angleCheckpointRef.current = null;
        }
        setSelectedSong(null);
    };

    const onWheel = useCallback(
        (e: React.WheelEvent<HTMLDivElement>) => {
            const delta = e.deltaY > 0 ? -8 : 8;
            setBaseAngle((prev) => prev + delta);
        },
        []
    );

    // Scroll-Snap: etwas entschärft
    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleScroll = () => {
            if (!orbitRef.current) return;
            if (isSnappingRef.current) return;

            const rect = orbitRef.current.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const orbitCenter = rect.top + rect.height / 2;
            const delta = orbitCenter - viewportCenter;

            // weiter oben: gar nicht snappen
            // (etwas höher gesetzt, damit es seltener greift)
            if (rect.top < 320) {
                return;
            }

            // sehr weit weg → User will frei scrollen
            if (Math.abs(delta) > 320) {
                userOverrideRef.current = true;
                return;
            }

            // enger Korridor, aber etwas kleiner als vorher
            // damit er nicht bei jeder Kleinigkeit snapt
            if (!userOverrideRef.current && Math.abs(delta) < 70) {
                isSnappingRef.current = true;
                window.scrollTo({
                    top: window.scrollY + delta,
                    behavior: "smooth",
                });
                // etwas länger warten, damit nicht mehrfach hintereinander gesnapt wird
                setTimeout(() => {
                    isSnappingRef.current = false;
                }, 650);
            }
        };

        // beim Mount einmal prüfen
        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Orbit-Parameter
    const itemCount = songs.length;
    const stepAngle = 360 / itemCount;
    const radius = 480;
    const itemSize = 130;
    const ORBIT_X_OFFSET = -48;

    return (
        <div
            className="relative w-full min-h-[150vh] overflow-visible pt-[8vh]"
            onWheel={onWheel}
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => !selectedSong && setIsFocused(false)}
            style={{ touchAction: "none" }}
        >
            {/* Smooth-Background */}
            <div
                className="pointer-events-none absolute inset-x-0 -top-40"
                style={{
                    height: "calc(150vh + 160px)",
                    background:
                        "linear-gradient(to bottom, rgba(2,6,23,0) 0%, rgba(2,6,23,0.15) 6%, rgba(2,6,23,0.5) 16%, rgba(2,6,23,1) 32%, rgba(2,6,23,1) 100%)",
                }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(13,16,23,0.3)_0%,rgba(6,7,10,0.9)_50%,#020617_100%)]" />

            {/* ORBIT */}
            <div
                ref={orbitRef}
                className="absolute left-1/2 top-[46%]"
                style={{
                    transform: "translate(-50%, -50%)",
                    width: "1100px",
                    height: "520px",
                    perspective: "1400px",
                    perspectiveOrigin: "50% 50%",
                    zIndex: 10,
                }}
            >
                <div
                    className="relative w-full h-full flex items-center justify-center"
                    style={{
                        transformStyle: "preserve-3d",
                        transform: `translateX(${ORBIT_X_OFFSET}px) translateY(-6px)`,
                    }}
                >
                    {songs.map((song, index) => {
                        const angle = baseAngle + index * stepAngle;
                        const normalized = ((angle % 360) + 360) % 360;
                        const isBack = normalized > 90 && normalized < 270;
                        const scale = isBack ? 0.5 : 1;
                        const coverSrc = getCoverSrc(song);

                        return (
                            <div
                                key={song.slug ?? song.title ?? index}
                                className="absolute left-1/2 top-1/2 transition-transform duration-300"
                                style={{
                                    width: `${itemSize}px`,
                                    height: `${itemSize}px`,
                                    transformStyle: "preserve-3d",
                                    transform: `
                                        rotateY(${angle}deg)
                                        translateZ(${radius}px)
                                        translate(-50%, -50%)
                                        scale(${scale})
                                    `,
                                    zIndex: isBack ? 30 : 160 - Math.abs(180 - normalized),
                                    opacity: isBack ? 0.38 : 1,
                                    filter: isBack ? "blur(0.25px) brightness(0.78)" : "brightness(1)",
                                    pointerEvents: isBack ? "none" : "auto",
                                }}
                            >
                                {!isBack ? (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            angleCheckpointRef.current = baseAngle;
                                            setSelectedSong(song);
                                        }}
                                        className="block h-full w-full"
                                    >
                                        <div className="relative w-full h-full rounded-xl overflow-hidden border border-slate-500/25 bg-transparent shadow-[0_16px_35px_rgba(0,0,0,0.35)] hover:scale-[1.04] transition-transform duration-300">
                                            {coverSrc ? (
                                                <Image
                                                    src={coverSrc}
                                                    alt={song.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-slate-300">
                                                    Kein Cover
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                ) : (
                                    <div className="relative w-full h-full rounded-xl overflow-hidden border border-slate-500/25 bg-transparent shadow-[0_16px_35px_rgba(0,0,0,0.35)]">
                                        {coverSrc ? (
                                            <Image
                                                src={coverSrc}
                                                alt={song.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-slate-300">
                                                Kein Cover
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Zentrales Album */}
                    <div
                        className="absolute left-1/2 top-1/2"
                        style={{
                            transform: "translate(-50%, -50%) translateZ(150px)",
                            zIndex: 300,
                        }}
                    >
                        <div className="relative w-[500px] h-[500px] overflow-visible transition-all duration-700 hover:scale-[1.02]">
                            <Image
                                src={albumCover}
                                alt="Facetten Albumcover"
                                fill
                                className="object-cover drop-shadow-[0_0_45px_rgba(255,255,255,0.15)]"
                                priority
                            />
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.13)_0%,rgba(255,255,255,0)_80%)] mix-blend-screen" />
                        </div>
                    </div>
                </div>
            </div>

            {/* schwebende Zwischen-Spiegelung */}
            <div
                className="absolute left-1/2"
                style={{
                    top: "calc(48% + 185px)",
                    transform: "translateX(-50%)",
                    width: "720px",
                    height: "255px",
                    pointerEvents: "none",
                    zIndex: 180,
                }}
            >
                <div
                    className="relative w-full h-full"
                    style={{
                        borderRadius: "9999px",
                        overflow: "hidden",
                        transform: "rotateX(10deg)",
                        filter: "drop-shadow(0 10px 50px rgba(0,0,0,0.3))",
                    }}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url(${albumCover})`,
                            backgroundSize: "cover",
                            backgroundPosition: "top",
                            transform: "scale(1.02) scaleY(-1) translateY(-95px)",
                            opacity: 0.2,
                            maskImage:
                                "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)",
                            WebkitMaskImage:
                                "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)",
                        }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(2,6,23,1) 0%, rgba(2,6,23,0) 20%, rgba(2,6,23,0) 80%, rgba(2,6,23,1) 100%)",
                            opacity: 0.7,
                            pointerEvents: "none",
                        }}
                    />
                </div>
            </div>

            {/* Boden */}
            <div
                className="absolute left-1/2"
                style={{
                    top: "calc(46% + 195px)",
                    transform: "translateX(-50%)",
                    width: "1180px",
                    maxWidth: "96vw",
                    height: "440px",
                    pointerEvents: "none",
                    zIndex: 1,
                }}
            >
                <div
                    className="relative w-full h-full"
                    style={{
                        background:
                            "radial-gradient(ellipse at center, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0) 100%)",
                        transform: "rotateX(16deg) scale(1, 0.62)",
                        borderRadius: "9999px",
                        overflow: "hidden",
                        boxShadow: "0 46px 120px rgba(0,0,0,0.55)",
                    }}
                >
                    <div
                        className="absolute left-1/2 top-[6%]"
                        style={{
                            transform: "translateX(-50%)",
                            width: "38%",
                            height: "22%",
                            background:
                                "radial-gradient(circle, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0) 70%)",
                            filter: "blur(7px)",
                            opacity: 0.55,
                        }}
                    />

                    <div
                        className="absolute inset-0 flex justify-center items-center"
                        style={{ transform: "rotateX(0deg)" }}
                    >
                        <div
                            className="relative"
                            style={{
                                width: "960px",
                                maxWidth: "90vw",
                                height: "400px",
                                borderRadius: "9999px",
                                overflow: "hidden",
                                transform: "translateY(52px) scale(1, 0.8)",
                                background:
                                    "radial-gradient(ellipse at bottom, rgba(2,6,23,0.08) 0%, rgba(2,6,23,0) 60%, rgba(0,0,0,0) 100%)",
                                boxShadow: "inset 0 18px 38px rgba(0,0,0,0.6)",
                            }}
                        >
                            <div
                                className="absolute inset-x-[12%] top-[42%] h-[32%]"
                                style={{
                                    background:
                                        "radial-gradient(ellipse at center, rgba(220,230,255,0.26) 0%, rgba(220,230,255,0) 80%)",
                                    filter: "blur(18px)",
                                    opacity: 0.85,
                                }}
                            />

                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `url(${albumCover})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "top",
                                    transform: "scale(1.02) scaleY(-1) translateY(-182px)",
                                    opacity: 0.74,
                                    maskImage:
                                        "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.74) 60%, rgba(255,255,255,0) 100%)",
                                    WebkitMaskImage:
                                        "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.74) 60%, rgba(255,255,255,0) 100%)",
                                    filter: "contrast(1.01) brightness(1.0)",
                                }}
                            />

                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "radial-gradient(circle at bottom, rgba(236,106,67,0.36) 0%, rgba(143,206,255,0.24) 28%, rgba(0,0,0,0) 78%)",
                                    filter: "blur(25px)",
                                    opacity: 0.4,
                                    mixBlendMode: "screen",
                                }}
                            />

                            <div
                                className="absolute inset-x-[6%] bottom-[-20%] h-[60%]"
                                style={{
                                    background:
                                        "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 70%)",
                                    filter: "blur(18px)",
                                    opacity: 0.9,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Player-Overlay */}
            {selectedSong && (
                <div
                    className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[998]"
                    onClick={closeOverlay}
                >
                    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                        <div
                            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-700/40 shadow-[0_0_60px_rgba(0,0,0,0.6)] bg-[#020617]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeOverlay}
                                className="absolute top-5 right-6 text-slate-200/75 hover:text-white text-2xl z-[1000]"
                                aria-label="Schließen"
                            >
                                ×
                            </button>

                            <PlayerLayout
                                coverSrc={
                                    getCoverSrc(selectedSong) ??
                                    normalizeCoverPath(selectedSong.cover) ??
                                    albumCover
                                }
                                audioSrc={
                                    selectedSong.audio
                                        ? selectedSong.audio.startsWith("/")
                                            ? selectedSong.audio
                                            : `/${selectedSong.audio}`
                                        : ""
                                }
                                title={selectedSong.title}
                                subtitle={selectedSong.subtitle}
                                lyricsLrc={selectedSong.lyricsLrc}
                                backLink="/musik"
                                rondellLink="/musik"
                            >
                                {selectedSong.spotifyUrl && (
                                    <a
                                        href={selectedSong.spotifyUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-block mt-2 text-sm text-emerald-200 hover:text-white underline underline-offset-4"
                                    >
                                        Auf Spotify
                                    </a>
                                )}
                                {selectedSong.slug && (
                                    <Link
                                        href={`/musik/${selectedSong.slug}`}
                                        className="inline-block mt-2 text-sm text-slate-200/80 hover:text-white underline underline-offset-4"
                                        onClick={closeOverlay}
                                    >
                                        zur Trackseite
                                    </Link>
                                )}
                            </PlayerLayout>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

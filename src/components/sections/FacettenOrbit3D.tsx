"use client";

import React, {
    useState,
    useCallback,
    useEffect,
    useRef, // â¬…ï¸ neu
} from "react";
import Image from "next/image";
import Link from "next/link";
import songs from "@/data/songs.json";
import PlayerLayout from "@/components/PlayerLayout";

const ORBIT_STORAGE_KEY = "facetten-orbit-angle";

// Windows-Pfad â†’ Web-Pfad umwandeln
function normalizeCoverPath(raw?: string | null): string | null {
    if (!raw) return null;

    // Windows-Pfad aus deinem Projekt:
    const winRoot = "D:\\Matize\\Matize-Kreation\\Matize-Musik\\public\\";
    const winRootAlt = "D:/Matize/Matize-Kreation/Matize-Musik//";

    let cleaned = raw;

    if (cleaned.startsWith(winRoot)) {
        cleaned = cleaned.replace(winRoot, "/");
    } else if (cleaned.startsWith(winRootAlt)) {
        cleaned = cleaned.replace(winRootAlt, "/");
    }

    // Backslashes zu normalen Slashes
    cleaned = cleaned.replace(/\\/g, "/");

    // sicherstellen, dass es mit / anfÃ¤ngt
    if (!cleaned.startsWith("/")) {
        cleaned = "/" + cleaned;
    }

    return cleaned;
}

// Fallback fÃ¼r deine 3 genannten Cover
function getCoverSrc(song: any): string | null {
    // 1) wenn im Song was steht â†’ normalisieren
    if (song?.cover) {
        const norm = normalizeCoverPath(song.cover);
        if (norm) return norm;
    }

    const title = (song?.title || "").toLowerCase();
    const slug = (song?.slug || "").toLowerCase();

    // 04 â€“ Kunst
    if (title.includes("kunst") || slug.includes("kunst") || slug.includes("04")) {
        return "/images/covers/facetten/tracks/04-kunst.jpg";
    }

    // 11 â€“ Fakt und Ansicht
    if (
        title.includes("fakt") ||
        title.includes("ansicht") ||
        slug.includes("fakt") ||
        slug.includes("ansicht") ||
        slug.includes("11")
    ) {
        return "/images/covers/facetten/tracks/11-fakt_und_ansicht.jpg";
    }

    // 12 â€“ Apokalypse
    if (
        title.includes("apokalypse") ||
        slug.includes("apokalypse") ||
        slug.includes("12")
    ) {
        return "/images/covers/facetten/tracks/12-apokalypse.jpg";
    }

    return null;
}

export default function FacettenOrbit3D() {
    const albumCover =
        "/images/covers/facetten/album/facetten-album/Facetten-Cover.jpg";

    type Song = (typeof songs)[number];

    const [baseAngle, setBaseAngle] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedSong, setSelectedSong] = useState<null | Song>(null);
    const [overlayPos, setOverlayPos] = useState<
        | null
        | {
            top: number;
            left: number;
            width: number;
            height: number;
        }
    >(null);

    // â¬…ï¸ neu: hier merken wir uns die Orbit-Position genau beim Ã–ffnen
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

    // Scroll lock
    useEffect(() => {
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
        // â¬…ï¸ beim SchlieÃŸen wieder auf die alte Orbit-Position springen
        if (angleCheckpointRef.current !== null) {
            setBaseAngle(angleCheckpointRef.current);
            angleCheckpointRef.current = null;
        }
        setSelectedSong(null);
        setOverlayPos(null);
        // WICHTIG: kein setIsFocused(false) hier,
        // damit das Drehen danach sofort wieder mÃ¶glich ist
    };

    const onWheel = useCallback(
        (e: React.WheelEvent<HTMLDivElement>) => {
            if (selectedSong) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            if (isFocused) {
                e.preventDefault();
                e.stopPropagation();
                const delta = e.deltaY > 0 ? -8 : 8;
                setBaseAngle((prev) => prev + delta);
            }
        },
        [isFocused, selectedSong]
    );

    const itemCount = songs.length;
    const stepAngle = 360 / itemCount;

    // deine Orbit-Parameter
    const radius = 480; // sattes Drehmoment
    const itemSize = 130;
    const ORBIT_X_OFFSET = -48; // leicht nach links gezogen, wie gewÃ¼nscht

    return (
        <div
            className="relative w-full h-screen overflow-hidden bg-[#020617]"
            onWheel={onWheel}
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => !selectedSong && setIsFocused(false)}
            style={{ touchAction: "none" }}
        >
            {/* Hintergrund */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(13,16,23,0.95)_0%,_rgba(6,7,10,1)_60%,_#020617_100%)]" />

            {/* 3D-Szene absolut im Viewport zentriert */}
            <div
                className="absolute top-1/2 left-1/2"
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
                    {/* Orbit */}
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
                                    filter: isBack
                                        ? "blur(0.25px) brightness(0.78)"
                                        : "brightness(1)",
                                    pointerEvents: isBack ? "none" : "auto",
                                }}
                            >
                                {!isBack ? (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            // â¬…ï¸ genau HIER: aktuelle Orbit-Position merken
                                            angleCheckpointRef.current = baseAngle;

                                            const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                                            const top = rect.top + window.scrollY;
                                            const left = rect.left + window.scrollX;
                                            setOverlayPos({
                                                top,
                                                left,
                                                width: rect.width,
                                                height: rect.height,
                                            });
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

                    {/* zentrales Album */}
                    <div
                        className="absolute left-1/2 top-1/2"
                        style={{
                            transform: "translate(-50%, -50%) translateZ(150px)",
                            zIndex: 300,
                        }}
                    >
                        <div className="relative w-[420px] h-[420px] overflow-visible transition-all duration-700 hover:scale-[1.02]">
                            <Image
                                src={albumCover}
                                alt="Facetten Albumcover"
                                fill
                                className="object-cover drop-shadow-[0_0_45px_rgba(255,255,255,0.15)]"
                                priority
                            />
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.13)_0%,_rgba(255,255,255,0)_80%)] mix-blend-screen" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Boden */}
            <div
                className="absolute left-1/2"
                style={{
                    top: "calc(50% + 205px)",
                    transform: "translateX(-50%)",
                    width: "880px",
                    maxWidth: "90vw",
                    height: "250px",
                    pointerEvents: "none",
                }}
            >
                <div
                    className="relative w-full h-full rounded-full"
                    style={{
                        transform: "rotateX(22deg) scale(1.03,0.5)",
                        background:
                            "radial-gradient(ellipse at center, rgba(180,210,255,0.22) 0%, rgba(80,120,220,0.06) 38%, rgba(0,0,0,0.9) 100%)",
                        filter: "blur(10px)",
                    }}
                />
                <div
                    className="absolute inset-0 flex justify-center"
                    style={{ top: 0 }}
                >
                    <div
                        className="relative w-[800px] max-w-[82vw] h-[230px]"
                        style={{
                            transform: "rotateX(14deg) scale(1,0.65)",
                            mixBlendMode: "screen",
                            opacity: 0.65,
                        }}
                    >
                        <div
                            className="absolute inset-0"
                            style={{
                                transform: "rotateX(180deg) scaleY(-1) translateY(-118px)",
                                filter: "brightness(1.01) contrast(1.1) saturate(1.05)",
                                opacity: 0.4,
                                maskImage:
                                    "linear-gradient(to bottom, rgba(255,255,255,0.8) 8%, rgba(255,255,255,0.3) 55%, transparent 100%)",
                                WebkitMaskImage:
                                    "linear-gradient(to bottom, rgba(255,255,255,0.8) 8%, rgba(255,255,255,0.3) 55%, transparent 100%)",
                            }}
                        >
                            <Image
                                src={albumCover}
                                alt="Facetten Album Spiegelung"
                                fill
                                className="object-cover object-top"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Player-Overlay */}
            {selectedSong && (
                <>
                    <div
                        className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[998]"
                        onClick={closeOverlay}
                    />
                    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                        <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-700/40 shadow-[0_0_60px_rgba(0,0,0,0.6)] bg-[#020617]">
                            <button
                                onClick={closeOverlay}
                                className="absolute top-5 right-6 text-slate-200/75 hover:text-white text-2xl z-[1000]"
                                aria-label="SchlieÃŸen"
                            >
                                Ã—
                            </button>
                            <PlayerLayout
                                coverSrc={
                                    getCoverSrc(selectedSong) ||
                                    normalizeCoverPath(selectedSong.cover) ||
                                    albumCover
                                }
                                audioSrc={selectedSong.audioUrl || selectedSong.audio}
                                title={selectedSong.title}
                                subtitle={selectedSong.subtitle}
                                lyricsLrc={selectedSong.lyricsLrc}
                                backLink="/musik"
                            >
                                {selectedSong.spotifyUrl ? (
                                    <a
                                        href={selectedSong.spotifyUrl}
                                        target="_blank"
                                        className="inline-block mt-2 text-sm text-emerald-200 hover:text-white underline underline-offset-4"
                                    >
                                        Auf Spotify Ã¶ffnen
                                    </a>
                                ) : null}
                                {selectedSong.slug ? (
                                    <Link
                                        href={`/musik/${selectedSong.slug}`}
                                        className="inline-block mt-2 text-sm text-slate-200/80 hover:text-white underline underline-offset-4"
                                        onClick={closeOverlay}
                                    >
                                        zur Trackseite
                                    </Link>
                                ) : null}
                            </PlayerLayout>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}



// src/components/sections/MusicGrid.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import songs from "@/data/songs.json";
import { FACETTEN_ALBUM_COVER, getSongCoverSrc, type MatizeSong } from "@/lib/facetten";

export default function MusicGrid() {
    const albumCover = FACETTEN_ALBUM_COVER;

    const [baseAngle, setBaseAngle] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (isFocused) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = prev;
            };
        }
    }, [isFocused]);

    const onWheel = useCallback(
        (e: React.WheelEvent<HTMLDivElement>) => {
            if (isFocused) {
                e.preventDefault();
                e.stopPropagation();
                const delta = e.deltaY > 0 ? -8 : 8;
                setBaseAngle((prev) => prev + delta);
            }
        },
        [isFocused]
    );

    const list = songs as MatizeSong[];
    const itemCount = list.length;
    const stepAngle = 360 / itemCount;
    const radius = 460;
    const itemSize = 130;

    return (
        <div
            className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#020617]"
            onWheel={onWheel}
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => setIsFocused(false)}
            style={{ touchAction: "none" }}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(13,16,23,0.95)_0%,rgba(6,7,10,1)_60%,#020617_100%)]" />

            <div className="relative w-full max-w-[1100px] h-[780px] mx-auto flex flex-col items-center justify-center">
                <div className="relative w-full h-[520px]" style={{ perspective: "1400px", zIndex: 10 }}>
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ transformStyle: "preserve-3d", transform: "translateY(-6px)" }}
                    >
                        {list.map((song, index) => {
                            const angle = baseAngle + index * stepAngle;
                            const normalized = ((angle % 360) + 360) % 360;
                            const isBack = normalized > 90 && normalized < 270;
                            const scale = isBack ? 0.5 : 1;

                            const coverSrc = getSongCoverSrc(song);
                            const targetSlug = song.slug ?? song.id ?? `track-${index}`;

                            return (
                                <div
                                    key={targetSlug}
                                    className="absolute left-1/2 top-1/2 transition-transform duration-300"
                                    style={{
                                        width: `${itemSize}px`,
                                        height: `${itemSize}px`,
                                        transform: `
                      rotateY(${angle}deg)
                      translateZ(${radius}px)
                      translate(-50%, -50%)
                      scale(${scale})
                    `,
                                        transformOrigin: "center center",
                                        zIndex: isBack ? 10 : 200 - index,
                                        opacity: isBack ? 0.45 : 1,
                                    }}
                                >
                                    <Link
                                        href={`/musik/${targetSlug}`}
                                        className="relative w-full h-full rounded-xl overflow-hidden border border-slate-500/25 bg-transparent shadow-[0_16px_35px_rgba(0,0,0,0.35)]"
                                    >
                                        {coverSrc ? (
                                            <Image src={coverSrc} alt={song.displayTitle ?? song.title} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-slate-300">
                                                Kein Cover
                                            </div>
                                        )}
                                    </Link>
                                </div>
                            );
                        })}

                        <div
                            className="absolute left-1/2 top-1/2"
                            style={{ transform: "translate(-50%, -50%) translateZ(150px)", zIndex: 300 }}
                        >
                            <div className="relative w-[420px] h-[420px] overflow-visible transition-all duration-700 hover:scale-[1.02]">
                                <Image src={albumCover} alt="Facetten Albumcover" fill className="object-cover" priority />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


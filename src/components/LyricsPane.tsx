"use client";

import { useEffect, useMemo, useState } from "react";

type LyricsLine = {
    time: number;
    text: string;
};

function parseLrc(lrc?: string): LyricsLine[] {
    if (!lrc) return [];
    return lrc
        .split("\n")
        .map((line) => {
            const match = line.match(/\[(\d{2}):(\d{2})(?:\.(\d{2}))?\](.*)/);
            if (!match) return null;
            const min = Number(match[1]);
            const sec = Number(match[2]);
            const ms = match[3] ? Number(match[3]) : 0;
            const text = match[4].trim();
            const time = min * 60 + sec + ms / 100;
            return { time, text };
        })
        .filter(Boolean) as LyricsLine[];
}

interface LyricsPaneProps {
    lrc?: string;
    currentTime: number;
    isPlaying?: boolean; // ← NEU
}

export default function LyricsPane({
    lrc,
    currentTime,
    isPlaying = false,
}: LyricsPaneProps) {
    const lines = useMemo(() => parseLrc(lrc), [lrc]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!lines.length) return;
        for (let i = lines.length - 1; i >= 0; i--) {
            if (currentTime >= lines[i].time) {
                setActiveIndex(i);
                break;
            }
        }
    }, [currentTime, lines]);

    // Basismaße
    const lineHeightRem = 2.5; // muss zu h-10 passen
    const centerOffsetRem = 4.5; // wo die aktive Zeile "stehen" soll

    return (
        <div className="mt-4 w-full rounded-2xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-md max-h-52 overflow-hidden relative">
            {/* leichte Masken oben/unten, damit Scroll sichtbar wird */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#020617] to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#020617] to-transparent" />

            <div
                className="transition-transform duration-500 ease-out"
                style={{
                    transform: `translateY(calc(-${activeIndex} * ${lineHeightRem}rem + ${centerOffsetRem}rem))`,
                }}
            >
                {lines.length ? (
                    lines.map((line, idx) => {
                        const isActive = idx === activeIndex;
                        return (
                            <div
                                key={idx}
                                className={`h-10 flex items-center pl-5 pr-4 text-sm md:text-base transition-all duration-300 ${isActive
                                        ? "text-white"
                                        : "text-slate-400/50"
                                    }`}
                            >
                                {/* linker Balken als Beat-Anzeige */}
                                <div
                                    className={`w-1 h-6 rounded-full mr-3 transition-all ${isActive
                                            ? isPlaying
                                                ? "bg-emerald-300/90 scale-y-100"
                                                : "bg-slate-500/50"
                                            : "bg-transparent scale-y-0"
                                        }`}
                                />
                                <span
                                    className={`transition-all ${isActive && isPlaying
                                            ? "scale-[1.02] drop-shadow-[0_0_8px_rgba(0,255,200,0.35)]"
                                            : ""
                                        }`}
                                >
                                    {line.text || "⋯"}
                                </span>
                            </div>
                        );
                    })
                ) : (
                    <div className="h-10 flex items-center px-5 text-slate-400/60 text-sm">
                        Keine Lyrics hinterlegt.
                    </div>
                )}
            </div>
        </div>
    );
}

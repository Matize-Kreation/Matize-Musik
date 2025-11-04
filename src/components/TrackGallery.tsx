"use client";

import { useState } from "react";
import Image from "next/image";

const TRACKS = [
    {
        id: "1",
        title: "Facetten I – Ruf",
        cover: "/images/tracks/facetten-1.png",
        audioUrl: "/audio/facetten-1.mp3",
    },
    {
        id: "2",
        title: "Matize – Klartext",
        cover: "/images/tracks/klartext.png",
        audioUrl: "/audio/klartext.mp3",
    },
    {
        id: "3",
        title: "Iris Orbit",
        cover: "/images/tracks/iris-orbit.png",
        audioUrl: "/audio/iris-orbit.mp3",
    },
];

export default function TrackGallery() {
    const [activeTrack, setActiveTrack] = useState<(typeof TRACKS)[0] | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="relative">
            {/* Abdunkeln bei aktivem Player */}
            {activeTrack && (
                <div className="fixed inset-0 bg-slate-950/45 backdrop-blur-[1px] z-30 transition-opacity" />
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 relative z-40">
                {TRACKS.map((track) => (
                    <button
                        key={track.id}
                        onClick={() => {
                            setActiveTrack(track);
                            setIsPlaying(true);
                        }}
                        className="group relative aspect-[4/4.3] rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-900/40 shadow-[0_8px_35px_rgba(0,0,0,0.35)] transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_14px_50px_rgba(0,255,255,0.16)]"
                    >
                        {/* Cover */}
                        <div className="absolute inset-0">
                            <Image
                                src={track.cover}
                                alt={track.title}
                                fill
                                className="object-cover transition duration-200 group-hover:scale-[1.03] group-hover:brightness-110"
                            />
                            {/* „Schärfungs“-Lichtfenster */}
                            <div className="absolute inset-0 mix-blend-screen pointer-events-none bg-[radial-gradient(circle,_rgba(255,255,255,0.18)_0%,_rgba(0,0,0,0)_55%)]" />
                            {/* Dunkler Verlauf für Titel */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/0 to-black/10" />
                        </div>

                        {/* Titelbox */}
                        <div className="absolute bottom-3 left-3 right-3">
                            <div className="bg-black/55 border border-cyan-100/18 rounded-xl px-3 py-2 backdrop-blur-sm">
                                <p className="text-sm md:text-[0.9rem] font-medium tracking-wide text-slate-50 leading-snug">
                                    {track.title}
                                </p>
                            </div>
                        </div>

                        {/* Hover-Glow nur hier */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15),transparent_65%)] pointer-events-none" />

                        {/* kleines Play-Symbol */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 border border-cyan-200/40">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4 fill-cyan-100"
                                    aria-hidden="true"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Player unten */}
            {activeTrack && (
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[min(1100px,94vw)] z-50">
                    <div className="bg-slate-950/90 border border-slate-600/40 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-md">
                        <div className="relative h-14 w-14 rounded-lg overflow-hidden border border-slate-500/40 flex-shrink-0">
                            <Image
                                src={activeTrack.cover}
                                alt={activeTrack.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                            <p className="text-sm text-slate-100 font-semibold truncate">{activeTrack.title}</p>
                            <p className="text-[0.68rem] text-slate-300/60 uppercase tracking-[0.2em]">
                                Matize · Single
                            </p>
                            <div className="mt-2 h-1.5 bg-slate-800/90 rounded-full overflow-hidden">
                                <div className="h-full w-1/3 bg-cyan-400/90 transition-all" />
                            </div>
                        </div>

                        {/* Play/Pause */}
                        <button
                            onClick={() => setIsPlaying((p) => !p)}
                            className="h-11 w-11 rounded-full bg-cyan-400/90 hover:bg-cyan-300 text-slate-950 flex items-center justify-center transition"
                        >
                            {isPlaying ? (
                                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-slate-950" aria-hidden="true">
                                    <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-slate-950" aria-hidden="true">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>

                        {/* Close */}
                        <button
                            onClick={() => {
                                setActiveTrack(null);
                                setIsPlaying(false);
                            }}
                            className="h-9 w-9 rounded-full border border-slate-500/40 flex items-center justify-center text-slate-100/70 hover:text-white hover:border-slate-100/60 transition"
                            aria-label="Close player"
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none">
                                <path d="M6 6l12 12M18 6L6 18" strokeWidth="1.7" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

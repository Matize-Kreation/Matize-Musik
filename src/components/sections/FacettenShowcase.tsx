// D:\Matize\Matize-Kreation\Matize-Musik\src\components\sections\FacettenShowcase.tsx
"use client";

import Image from "next/image";
import songs from "@/data/songs.json";
import { useState } from "react";
import { normalizePublicPath } from "@/lib/paths";

export default function FacettenShowcase() {
    const albumCover = "/images/covers/facetten/album/facetten-album/Facetten-Cover.jpg";
    const [activeSong, setActiveSong] = useState<(typeof songs)[0] | null>(null);

    const radius = 340;
    const startAngle = -110;
    const endAngle = 110;
    const step = songs.length > 1 ? (endAngle - startAngle) / (songs.length - 1) : 0;

    return (
        <div className="relative w-full py-14 lg:py-20 flex flex-col items-center">
            <div className="pointer-events-none absolute bottom-10 lg:bottom-12 w-[520px] h-[200px] bg-[radial-gradient(circle,_rgba(56,189,248,0.35)_0%,_rgba(2,6,23,0)_70%)] blur-[38px]" />

            <div className="relative z-20 mb-10 lg:mb-12">
                <div className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px] rounded-2xl overflow-hidden border border-slate-500/50 shadow-[0_25px_70px_rgba(0,0,0,0.45)] bg-slate-900/40 backdrop-blur">
                    <Image
                        src={normalizePublicPath(albumCover)}
                        alt="Facetten Albumcover"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <p className="text-center mt-4 text-slate-200 font-medium tracking-wide">
                    FACETTEN – Album
                </p>
                <p className="text-center text-xs text-slate-400">
                    13 Kapitel • Cinematic Rap • Spoken Word
                </p>
            </div>

            <div className="relative w-full max-w-[1100px] h-[340px]">
                {songs.map((song, index) => {
                    const angleDeg = startAngle + step * index;
                    const angleRad = (angleDeg * Math.PI) / 180;
                    const centerX = 550;
                    const centerY = 220;
                    const x = centerX + radius * Math.cos(angleRad);
                    const y = centerY + radius * Math.sin(angleRad);
                    const scale = 1 - Math.abs(angleDeg) / 300;
                    const rotateY = -angleDeg / 8;

                    return (
                        <button
                            key={song.slug}
                            onClick={() => setActiveSong(song)}
                            className="absolute transition-transform duration-300 hover:scale-105 focus:outline-none"
                            style={{
                                left: x,
                                top: y,
                                transform: `translate(-50%, -50%) scale(${scale}) perspective(800px) rotateY(${rotateY}deg)`,
                                transformOrigin: "center center",
                                zIndex: Math.round(1000 - Math.abs(angleDeg)),
                            }}
                        >
                            <div className="relative w-[150px] h-[150px] rounded-xl overflow-hidden border border-slate-500/50 bg-slate-900/30 shadow-[0_18px_55px_rgba(0,0,0,0.45)]">
                                <Image
                                    src={normalizePublicPath(song.cover)}
                                    alt={song.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="mt-2 text-center text-[11px] text-slate-200 drop-shadow">
                                {song.title}
                            </p>
                        </button>
                    );
                })}
            </div>

            {activeSong && (
                <div className="fixed inset-0 z-[3000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="bg-slate-900/90 border border-slate-700 rounded-2xl max-w-2xl w-full overflow-hidden">
                        <div className="relative aspect-[16/9] bg-slate-950/40">
                            <Image
                                src={normalizePublicPath(activeSong.cover)}
                                alt={activeSong.title}
                                fill
                                className="object-cover opacity-70"
                            />
                            <button
                                onClick={() => setActiveSong(null)}
                                className="absolute top-4 right-4 text-slate-100 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-2 text-slate-50">
                                {activeSong.title}
                            </h2>
                            <p className="text-slate-400 mb-4">{activeSong.subtitle}</p>
                            <audio
                                src={normalizePublicPath(activeSong.audio)}
                                controls
                                className="w-full mb-4"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

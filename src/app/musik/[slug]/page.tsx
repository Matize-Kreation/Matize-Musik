// src/app/musik/[slug]/page.tsx
import Image from "next/image";
import {
    FACETTEN_ALBUM_COVER,
    getSongBySlug,
    getSongCoverSrc,
    getSongAudioSrc,
    getAllSongs,
    type MatizeSong,
} from "@/lib/facetten";

export const dynamicParams = false;

export function generateStaticParams() {
    return getAllSongs().map((song) => ({
        slug: song.slug ?? song.id,
    }));
}

export default function MusikDetailPage({ params }: { params: { slug: string } }) {
    const song = getSongBySlug(params.slug);

    if (!song) {
        return (
            <div className="min-h-screen bg-[#020617] text-slate-50 flex items-center justify-center">
                <p className="text-slate-400">Track nicht gefunden.</p>
            </div>
        );
    }

    const coverSrc = getSongCoverSrc(song) ?? FACETTEN_ALBUM_COVER;
    const audioSrc = getSongAudioSrc(song);

    return (
        <div className="relative min-h-screen bg-[#020617] text-slate-50 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(10,15,25,0.85)_0%,rgba(2,6,23,1)_65%,#020617_100%)]" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 pt-16 pb-28">
                <button
                    onClick={() => (history.length > 1 ? history.back() : (location.href = "/musik"))}
                    className="mb-8 inline-flex items-center gap-2 text-sm text-slate-200/80 hover:text-white"
                >
                    <span className="text-xl leading-none">←</span> Zurück zur Übersicht
                </button>

                <div className="grid gap-10 lg:grid-cols-[280px,1fr] items-start">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-slate-700/40 bg-slate-900/30 shadow-[0_24px_55px_rgba(0,0,0,0.35)]">
                        <Image src={coverSrc} alt={song.displayTitle ?? song.title} fill className="object-cover" priority />
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,rgba(2,6,23,0)_70%)] mix-blend-screen" />
                    </div>

                    <div className="flex flex-col gap-6">
                        <div>
                            <p className="text-xs uppercase tracking-[0.38em] text-slate-400 mb-2">Matize · Facetten</p>
                            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 mb-2">
                                {song.displayTitle ?? song.title}
                            </h1>
                            {song.subtitle ? <p className="text-slate-300/80">{song.subtitle}</p> : null}
                        </div>

                        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
                            <p className="text-sm text-slate-300 mb-3">Direkt abspielen</p>
                            {audioSrc ? (
                                <audio controls autoPlay className="w-full accent-emerald-400">
                                    <source src={audioSrc} type="audio/mpeg" />
                                    Dein Browser unterstützt das Audio-Element nicht.
                                </audio>
                            ) : (
                                <p className="text-xs text-red-300">Kein Audio hinterlegt.</p>
                            )}
                        </div>

                        {song.spotifyUrl ? (
                            <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5">
                                <p className="text-sm text-slate-300 mb-3">Auf Spotify</p>
                                <a
                                    href={song.spotifyUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-sm font-medium text-slate-950 transition"
                                >
                                    Öffnen ↗
                                </a>
                            </div>
                        ) : null}

                        {song.tags && song.tags.length ? (
                            <div className="flex gap-2 flex-wrap">
                                {song.tags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 rounded-full bg-slate-900/30 border border-slate-800 text-xs uppercase tracking-wide text-slate-200"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[180px]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(60,120,220,0.18)_0%,rgba(0,0,0,1)_100%)] blur-2xl" />
            </div>
        </div>
    );
}

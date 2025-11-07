"use client";

import Image from "next/image";
import { ReactNode, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import LyricsPane from "./LyricsPane";
import { normalizePublicPath, withBase } from "@/lib/paths";

interface PlayerLayoutProps {
    coverSrc: string;
    audioSrc: string;
    title?: string;
    subtitle?: string;
    backLink?: string;
    rondellLink?: string;
    children?: ReactNode;
    lyricsLrc?: string;
}

export default function PlayerLayout({
    coverSrc,
    audioSrc,
    title,
    subtitle,
    backLink = "/musik",
    rondellLink = "/musik",
    children,
    lyricsLrc,
}: PlayerLayoutProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    // Cover immer normalisieren
    const safeCoverSrc = normalizePublicPath(coverSrc) ?? "";

    // Audio sauber machen
    const safeAudioSrc =
        audioSrc ? withBase(audioSrc.startsWith("/") ? audioSrc : `/${audioSrc}`) : "";

    // nur noch der Rondell-Link
    const safeRondellLink = withBase(rondellLink);

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.load();

        if (safeAudioSrc) {
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
        } else {
            setIsPlaying(false);
        }
    }, [safeAudioSrc]);

    return (
        <div className="relative min-h-screen bg-[#020617] text-slate-50 overflow-hidden">
            {/* Hintergrund */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(10,15,25,0.85)_0%,_rgba(2,6,23,1)_65%,_#020617_100%)]" />

            {/* Inhalt */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 flex flex-col gap-10">
                {/* Header */}
                <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-2">
                        Facetten • Track
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        {title ?? "Unbenannter Track"}
                    </h1>
                    {subtitle && <p className="text-slate-400 mt-2">{subtitle}</p>}
                </div>

                {/* Haupt-Grid */}
                <div className="grid gap-10 lg:grid-cols-[280px,1fr] items-start">
                    {/* Cover */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative w-full aspect-square rounded-2xl overflow-hidden border border-slate-700/40 bg-slate-900/30 shadow-[0_24px_55px_rgba(0,0,0,0.35)]"
                    >
                        {safeCoverSrc ? (
                            <Image
                                src={safeCoverSrc}
                                alt={title ?? "Track Cover"}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-500">
                                Kein Cover
                            </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.09)_0%,rgba(2,6,23,0)_70%)] mix-blend-screen" />
                    </motion.div>

                    {/* Rechte Spalte */}
                    <div className="flex flex-col gap-6">
                        {/* Audio */}
                        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
                            <p className="text-sm text-slate-300 mb-3">Direkt abspielen</p>
                            {safeAudioSrc ? (
                                <audio
                                    ref={audioRef}
                                    controls
                                    autoPlay
                                    className="w-full accent-emerald-400"
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                    onTimeUpdate={(e) =>
                                        setCurrentTime(e.currentTarget.currentTime)
                                    }
                                >
                                    <source src={safeAudioSrc} type="audio/mpeg" />
                                    Dein Browser unterstützt das Audio-Element nicht.
                                </audio>
                            ) : (
                                <p className="text-xs text-red-300">Kein Audio hinterlegt.</p>
                            )}
                        </div>

                        {/* Lyrics */}
                        <LyricsPane
                            lrc={lyricsLrc}
                            currentTime={currentTime}
                            isPlaying={isPlaying}
                        />

                        {/* Optionale Zusatzinhalte */}
                        {children && <div className="flex flex-col gap-4">{children}</div>}
                    </div>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[220px]">
                <div
                    className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(60,120,220,0.25)_0%,_rgba(0,0,0,1)_100%)] blur-2xl transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-60"
                        }`}
                />
            </div>
        </div>
    );
}

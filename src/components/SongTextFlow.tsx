// src/components/SongTextFlow.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FacettenTextBlock } from "@/data/facettenLyrics";
import { withBase } from "@/lib/paths";

interface SongTextFlowProps {
    blocks?: FacettenTextBlock[];
    currentTime: number;
    isPlaying?: boolean;
    variant?: "graphit" | "clean";
}

export default function SongTextFlow({
    blocks = [],
    currentTime,
    isPlaying = false,
    variant = "graphit",
}: SongTextFlowProps) {
    // aktiver Block nach Zeit
    const active = blocks.find(
        (b) => currentTime >= b.start && currentTime < b.end
    );

    // dein Texture-Pfad aus public
    const textureSrc = withBase(
        "/images/textures/hintergrund-lyrics(4000x3000).png"
    );

    // gemeinsamer Header
    const Header = (
        <p className="text-[0.6rem] uppercase tracking-[0.35em] text-slate-200/55 mb-3">
            Songtext · Verlauf
        </p>
    );

    // gemeinsamer Textbereich (zentriert, mittig gebunden)
    const TextArea = (
        <div className="relative flex items-center justify-center min-h-[100px] w-full text-center px-6">
            <AnimatePresence mode="wait">
                {active ? (
                    <motion.div
                        key={active.id}
                        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                        transition={{ duration: 0.65, ease: "easeOut" }}
                        className="max-w-3xl mx-auto"
                    >
                        <p
                            className={`whitespace-pre-line leading-relaxed ${isPlaying
                                    ? "text-slate-50"
                                    : "text-slate-200/90"
                                }`}
                            style={{
                                textAlign: "center",
                                lineHeight: "1.8",
                                letterSpacing: "0.02em",
                            }}
                        >
                            {active.text}
                        </p>
                        <div className="mt-4 h-[1px] w-1/3 mx-auto bg-gradient-to-r from-transparent via-emerald-300/35 to-transparent" />
                    </motion.div>
                ) : (
                    <motion.p
                        key="no-block"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        className="text-slate-200/50 text-sm"
                    >
                        Kein Verlauf für diesen Zeitpunkt.
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );

    // Variante 1: clean
    if (variant === "clean") {
        return (
            <div className="relative w-full rounded-2xl bg-slate-900/20 border border-slate-800/50 px-6 py-5 overflow-hidden min-h-[140px] flex flex-col items-center justify-center text-center">
                {Header}
                {TextArea}
            </div>
        );
    }

    // Variante 2: graphit + Texture
    return (
        <div className="relative w-full rounded-2xl overflow-hidden min-h-[140px] border border-slate-800/60">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${textureSrc})` }}
            />
            {/* dunkler Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-[#020617]/78 to-black/80" />
            {/* Vignette */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_75%,rgba(0,0,0,0.8)_100%)]" />

            {/* Inhalt */}
            <div className="relative z-10 px-6 py-5 flex flex-col items-center justify-center text-center">
                {Header}
                {TextArea}
            </div>
        </div>
    );
}

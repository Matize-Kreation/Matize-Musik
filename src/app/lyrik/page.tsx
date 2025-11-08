// src/app/lyrik/page.tsx
"use client";

import Link from "next/link";
import PlayerLayout from "@/components/PlayerLayout";

export default function LyrikPage() {
    return (
        <PlayerLayout
            coverSrc="/images/covers/facetten/tracks/01-spotlight_an.jpg" // ggf. anpassen
            audioSrc="/audio/spotlight_an.mp3"                            // ggf. anpassen
            title="Lyrik · Spotlight an"
            subtitle="Matize-Musik • Facetten"
            facettenId="spotlight_an"
            backLink="/musik"
            rondellLink="/musik"
        >
            <header className="space-y-2">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Matize-Musik
                </p>
                <h2 className="text-lg font-semibold tracking-tight">Lyrik</h2>
                <p className="text-slate-300 text-sm">
                    Lyrikansicht auf Basis des Players.
                </p>
            </header>

            <div className="rounded-2xl border border-slate-800/60 bg-slate-900/20 p-4 space-y-2">
                <p className="text-sm leading-relaxed text-slate-200">
                    „Worte fallen wie Facetten auf Beton …“
                </p>
            </div>

            <div>
                <Link
                    href="/musik"
                    className="inline-block mt-2 text-sm text-sky-400 hover:underline"
                >
                    🎧 Zur Musikseite
                </Link>
            </div>
        </PlayerLayout>
    );
}

/* src\app\test-page\page.tsx */

"use client";

import MatizeCosmicOverlay from "@/components/MatizeCosmicOverlay";

export default function TestCosmicPage() {
    return (
        <div className="relative min-h-screen bg-[#020617] overflow-hidden">
            {/* Hintergrund-Gradient für etwas Tiefe */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,41,59,0.5)_0%,#020617_70%,#000_100%)]" />

            {/* unser Overlay */}
            <MatizeCosmicOverlay />

            {/* optional: Debug-Text oder Platzhalter */}
            <div className="relative z-10 flex items-center justify-center h-screen">
                <h1 className="text-slate-200 text-3xl font-light tracking-[0.25em] uppercase">
                    Cosmic Overlay – Test Raum
                </h1>
            </div>
        </div>
    );
}

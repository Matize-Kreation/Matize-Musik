// src/app/studio/page.tsx
import React from "react";

export const metadata = {
    title: "Studio | Matize-Musik",
    description: "Infos zum Studio / Produktion.",
};

export default function StudioPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-16">
            <div className="mx-auto max-w-4xl space-y-8">
                <header className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                        Matize-Musik
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight">Studio</h1>
                    <p className="text-slate-300">
                        Placeholder-Seite für dein Studio. Wichtig: jetzt ist es ein
                        gültiges Modul.
                    </p>
                </header>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5">
                        <h2 className="font-semibold mb-2">Leistungen</h2>
                        <ul className="text-sm space-y-1 text-slate-200">
                            <li>• Recording</li>
                            <li>• Mixing</li>
                            <li>• Vocal Edit</li>
                        </ul>
                    </div>
                    <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5">
                        <h2 className="font-semibold mb-2">Kontakt</h2>
                        <p className="text-sm text-slate-200">
                            Buchungen über die Kontaktseite.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

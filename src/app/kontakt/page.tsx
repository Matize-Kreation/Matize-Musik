// src/app/kontakt/page.tsx
import React from "react";

export const metadata = {
    title: "Kontakt | Matize-Musik",
    description: "Kontakt zu Matize-Musik aufnehmen.",
};

export default function KontaktPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-16">
            <div className="mx-auto max-w-3xl space-y-10">
                <header className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                        Matize-Musik
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight">Kontakt</h1>
                    <p className="text-slate-300">
                        Schreib mir für Features, Studio oder Facetten-Fragen.
                    </p>
                </header>

                <div className="rounded-2xl bg-slate-900/40 border border-slate-800/60 p-6 space-y-4">
                    <p className="text-sm text-slate-200">
                        Hier könnte später ein echtes Formular stehen.
                    </p>
                    <p className="text-sm">
                        <span className="text-slate-400">E-Mail:</span>{" "}
                        <a
                            className="text-emerald-300 hover:text-emerald-100"
                            href="mailto:info@matize-musik.de"
                        >
                            info@matize-musik.de
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}

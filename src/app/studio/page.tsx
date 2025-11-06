// src/app/page.tsx
export default function HomePage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-16">
            <div className="mx-auto max-w-3xl space-y-8">
                <header className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                        Matize-Musik
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight">SphÃ¤re</h1>
                    <p className="text-slate-300">
                        WÃ¤hle deinen Raum.
                    </p>
                </header>

                <div className="space-y-3">
                    <a
                        href="/studio"
                        className="block rounded-xl border border-slate-800/60 bg-slate-900/40 px-4 py-3 hover:border-emerald-400/70 transition"
                    >
                        <h2 className="font-semibold">Studio</h2>
                        <p className="text-sm text-slate-300">
                            Infos zu Recording, Mixing, Vocal Edit.
                        </p>
                    </a>

                    <a
                        href="/kontakt"
                        className="block rounded-xl border border-slate-800/60 bg-slate-900/40 px-4 py-3 hover:border-emerald-400/70 transition"
                    >
                        <h2 className="font-semibold">Kontakt</h2>
                        <p className="text-sm text-slate-300">
                            Schreib mir fÃ¼r Features, Studio oder Facetten-Fragen.
                        </p>
                    </a>
                </div>
            </div>
        </main>
    );
}


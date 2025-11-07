import Link from "next/link";

export default function LyrikPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-16">
            <div className="mx-auto max-w-4xl space-y-8">
                <header className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                        Matize-Musik
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight">Lyrik</h1>
                    <p className="text-slate-300">
                        Placeholder-Seite – damit der Build durchläuft. Hier kannst du später
                        echte Texte einfügen.
                    </p>
                </header>

                <article className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6 space-y-3">
                    <h2 className="text-lg font-semibold">Beispiel-Text</h2>
                    <p className="text-sm leading-relaxed text-slate-200">
                        “Worte fallen wie Facetten auf Beton …”
                    </p>
                </article>

                <div>
                    <Link
                        href="/musik"
                        className="inline-block mt-6 text-sm text-sky-400 hover:underline"
                    >
                        🎧 Zur Musikseite
                    </Link>
                </div>
            </div>
        </main>
    );
}

// auto-generated track page
import Image from "next/image";
import { normalizePublicPath, withBase } from "@/lib/paths";

export const metadata = { title: "Fakt und Ansicht | Matize-Musik" };

export default function TrackPage() {
  const cover = normalizePublicPath("public/images/covers/facetten/tracks/11-fakt_und_ansicht.jpg");
  const audio = normalizePublicPath("public/audio/facetten/11 - Fakt_und_Ansicht_(Master).mp3");

  return (
    <main className="min-h-screen bg-[#020617] text-slate-50 px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <a
          href={withBase("/musik")}
          className="inline-flex items-center gap-2 text-sm text-slate-200/80 hover:text-white transition"
        >
          <span className="text-lg leading-none">?</span>
          <span>Zurueck zur Uebersicht</span>
        </a>

        <div className="grid gap-8 lg:grid-cols-[280px,1fr] items-start">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-slate-700/40 bg-slate-900/30 shadow-[0_24px_55px_rgba(0,0,0,0.35)]">
            {cover ? (
              <Image src={cover} alt="Fakt und Ansicht" fill className="object-cover" priority />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
                Kein Cover gefunden
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-2">
                Matize · Facetten
              </p>
              <h1 className="text-3xl font-semibold tracking-tight">Fakt und Ansicht</h1>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
              <p className="text-sm text-slate-300 mb-3">Direkt abspielen</p>
              {audio ? (
                <audio controls className="w-full accent-emerald-400">
                  <source src={audio} type="audio/mpeg" />
                  Dein Browser unterstuetzt das Audio-Element nicht.
                </audio>
              ) : (
                <p className="text-xs text-red-300">Kein Audio gefunden.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


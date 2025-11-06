import Image from "next/image";
import { normalizePublicPath, withBase } from "@/lib/paths";

export const metadata = { title: "Psychoanalyse | Matize-Musik" };

export default function TrackPage() {
  const cover = normalizePublicPath("D:\\Matize\\Matize-Kreation\\Matize-Musik\\public\\images\\covers\\facetten\\tracks\\07-psychoanalyse.jpg");
  const audio = normalizePublicPath("D:\\Matize\\Matize-Kreation\\Matize-Musik\\public\\audio\\facetten\\7 - Psychoanalyse_(Master).mp3");

  return (
    <main className="min-h-screen bg-[#020617] text-slate-50 px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <a href={withBase("/musik")} className="inline-flex items-center gap-2 text-sm text-slate-200/80 hover:text-white">
          <span className="text-lg">←</span> Zurück zur Übersicht
        </a>
        <div className="grid gap-8 lg:grid-cols-[280px,1fr] items-start">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border bg-slate-900/30 border-slate-700/40">
            {cover ? <Image src={cover} alt="Psychoanalyse" fill className="object-cover" priority /> : null}
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-2">Matize · Facetten</p>
              <h1 className="text-3xl font-semibold tracking-tight">Psychoanalyse</h1>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
              <p className="text-sm text-slate-300 mb-3">Direkt abspielen</p>
              {audio ? (
                <audio controls className="w-full accent-emerald-400">
                  <source src={audio} type="audio/mpeg" />
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


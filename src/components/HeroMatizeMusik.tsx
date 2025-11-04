"use client";

import Image from "next/image";

export default function HeroMatizeMusik() {
    return (
        <section className="relative w-full bg-[#020617] overflow-hidden border-b border-slate-900/60">
            {/* Hintergrund */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.35)_0%,_#020617_55%,_#000_100%)]" />

            {/* Ⅰ · Matize Banner */}
            <div className="relative max-w-6xl mx-auto px-4 pt-12 pb-32 lg:pt-16 lg:pb-40">
                <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden border border-slate-700/60 bg-black/30 backdrop-blur">
                    <Image
                        src="/images/logos/banner_2560x1440.png"
                        alt="Matize Musik Banner"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/0 to-black/60" />
                </div>
            </div>

            {/* Ⅱ · Separator / Titel / FREQUENZ (neu) */}
            <div className="relative w-full h-[210px] -mt-28">
                {/* blaue Trennlinie */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/60 to-cyan-400/0" />

                {/* Titel */}
                <div className="relative mx-auto max-w-6xl px-4 mt-8 mb-6 flex justify-center">
                    <h2 className="text-lg md:text-xl lg:text-2xl tracking-[0.35em] uppercase text-cyan-100/95 bg-black/40 px-8 py-3 rounded-full border border-cyan-200/20 shadow-[0_0_40px_rgba(0,255,255,0.15)] backdrop-blur-sm">
                        Matize-Musik
                    </h2>
                </div>

                {/* Frequenz – höher gesetzt & center-out */}
                <div className="relative mx-auto max-w-6xl px-4 h-full flex items-start justify-center">
                    <div className="relative w-full h-[130px] mt-1">
                        {/* Basislinie */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-full h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/35 to-cyan-400/0" />
                        </div>

                        {/* Basis-Frequenz-Grafik */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div className="freq-base relative w-[58%] sm:w-[50%] md:w-[46%] lg:w-[42%] h-[110px]">
                                <Image
                                    src="/images/textures/frequenz-800x200.png"
                                    alt="Frequenz Visual"
                                    fill
                                    className="object-contain object-center drop-shadow-[0_8px_30px_rgba(34,211,238,0.35)]"
                                />
                            </div>
                        </div>

                        {/* Core-Flash in der Mitte */}
                        <div className="freq-core pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cyan-200/40 blur-[10px]" />

                        {/* expandierender Glow nach außen */}
                        <div className="freq-spread pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10%] h-[50px] rounded-full bg-cyan-300/6" />
                    </div>
                </div>

                {/* sanfter Glow darunter */}
                <div className="pointer-events-none absolute inset-x-0 bottom-[-60px] h-20 bg-cyan-500/10 blur-[55px]" />
            </div>

            {/* Ⅲ · Mischpult – mit deinem neuen 8000x2122-Bild */}
            <div className="relative w-full pt-24 pb-56 md:pb-64 lg:pb-72 bg-gradient-to-b from-transparent via-[#020617] to-[#020617] flex justify-center">
                <div
                    className="
            relative
            w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] xl:w-[68%]
            aspect-[38/10]
            rounded-2xl
            overflow-hidden
            border border-slate-700/40
            bg-black/20
            shadow-[0_20px_60px_rgba(0,0,0,0.5)]
            backdrop-blur-sm
            flex items-center justify-center
          "
                >
                    <div className="relative w-[96%] h-[96%]">
                        <Image
                            src="/images/textures/mischpult(8000x2122).png"
                            alt="Mischpult"
                            fill
                            className="object-contain object-center"
                            priority
                        />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/45 via-transparent to-transparent" />
                </div>
            </div>

            {/* ✦ Animationen */}
            <style jsx>{`
        /* Basis-Frequenz: leichtes Einblenden + minimaler Zoom */
        .freq-base {
          animation: freqBaseIn 1s ease-out 0s 1;
          transform-origin: center;
        }
        @keyframes freqBaseIn {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Core-Flash: kurzer, heller Kern in der Mitte */
        .freq-core {
          animation: freqCore 1.25s ease-out 0s 1;
        }
        @keyframes freqCore {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3);
          }
          15% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.4);
          }
          40% {
            opacity: 0.35;
            transform: translate(-50%, -50%) scale(0.9);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        /* Spread: breitet sich von der Mitte nach außen aus */
        .freq-spread {
          animation: freqSpread 1.35s ease-out 0s 1;
          transform-origin: center;
        }
        @keyframes freqSpread {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scaleX(0.2) scaleY(0.6);
            filter: drop-shadow(0 0 0 rgba(34, 211, 238, 0));
          }
          25% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scaleX(2.2) scaleY(1);
            filter: drop-shadow(0 0 14px rgba(34, 211, 238, 0.35));
          }
          60% {
            opacity: 0.35;
            transform: translate(-50%, -50%) scaleX(3.2) scaleY(0.9);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scaleX(4) scaleY(0.9);
          }
        }
      `}</style>
        </section>
    );
}

"use client";

import Image from "next/image";
import { withBase } from "@/lib/paths";

export default function HeroMatizeMusik() {
  const bannerSrc = withBase("/images/logos/banner_2560x1440.png");
  const freqSrc = withBase("/images/textures/frequenz-800x200.png");
  const mixerSrc = withBase(
    encodeURI("/images/textures/mischpult(8000x2122).png")
  );

  return (
    <section className="relative w-full bg-[#020617] overflow-hidden border-b border-slate-900/60">
      {/* Hintergrund */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.35)_0%,_#020617_55%,_#000_100%)]" />

      {/* Banner */}
      <div className="relative max-w-6xl mx-auto px-4 pt-12 pb-32 lg:pt-16 lg:pb-40">
        <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden border border-slate-700/60 bg-black/30 backdrop-blur">
          <Image
            src={bannerSrc}
            alt="Matize Musik Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/0 to-black/60" />
        </div>
      </div>

      {/* Separator / Titel / Frequenz */}
      <div className="relative w-full h-[210px] -mt-28">
        {/* feine Linie oben */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/60 to-cyan-400/0" />

        {/* Titel */}
        <div className="relative mx-auto max-w-6xl px-4 mt-8 mb-6 flex justify-center">
          <h2 className="text-lg md:text-xl lg:text-2xl tracking-[0.35em] uppercase text-cyan-100/95 bg-black/40 px-8 py-3 rounded-full border border-cyan-200/20 shadow-[0_0_40px_rgba(0,255,255,0.15)] backdrop-blur-sm">
            Matize-Musik
          </h2>
        </div>

        {/* Frequenz-Zone */}
        <div className="relative mx-auto max-w-6xl px-4 h-full flex items-start justify-center">
          <div className="relative w-full h-[130px] mt-1">
            {/* horizontale Linie hinter allem */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/35 to-cyan-400/0" />
            </div>

            {/* Frequenz-Komposition */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="freq-shell relative w-[62%] sm:w-[54%] md:w-[48%] lg:w-[44%] h-[118px]">
                {/* kosmischer softly-glow Untergrund */}
                <div className="freq-space pointer-events-none absolute inset-[-18%] rounded-[999px] blur-[22px]" />

                {/* feine Strahlen im Hintergrund */}
                <div className="freq-rays pointer-events-none absolute inset-x-[5%] inset-y-[12%]" />

                {/* eigentliche Frequenz-Grafik */}
                <div className="freq-wave relative w-full h-full">
                  <Image
                    src={freqSrc}
                    alt="Frequenz Visual"
                    fill
                    className="object-contain object-center"
                  />
                  {/* Kanten-Softmask, damit kein grauer Block sichtbar ist */}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,1)_0%,rgba(2,6,23,0)_14%,rgba(2,6,23,0)_86%,rgba(2,6,23,1)_100%)]" />
                </div>

                {/* zentraler Energie-Glow */}
                <div className="freq-core-glow pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24%] h-[54%] rounded-[45%] bg-[radial-gradient(circle,rgba(190,243,255,0.9)_0%,rgba(2,6,23,0)_70%)] blur-[16px]" />

                {/* breiter Halo / Membran */}
                <div className="freq-halo pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[80%] rounded-full border border-cyan-200/6 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.28)_0%,rgba(2,6,23,0)_65%)] blur-[16px]" />
              </div>
            </div>

            {/* tiefer Lichtnebel darunter */}
            <div className="pointer-events-none absolute inset-x-0 bottom-[-60px] h-20 bg-cyan-500/10 blur-[55px]" />
          </div>
        </div>
      </div>

      {/* Mischpult */}
      <div className="relative w-full pt-24 pb-40 md:pb-48 lg:pb-52 bg-gradient-to-b from-transparent via-[#020617] to-[#020617] flex justify-center">
        <div
          className="relative w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] xl:w-[68%]
          aspect-[38/10] rounded-2xl overflow-hidden border border-slate-700/40
          bg-black/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-sm
          flex items-center justify-center"
        >
          <div className="relative w-[96%] h-[96%]">
            <Image
              src={mixerSrc}
              alt="Mischpult"
              fill
              className="object-contain object-center"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/45 via-transparent to-transparent" />
        </div>
      </div>

      <style jsx>{`
        /* gesamter Frequenzblock kommt smooth rein */
        .freq-shell {
          animation: freqShellEnter 1.4s ease-out 0s 1;
          transform-origin: center;
        }
        @keyframes freqShellEnter {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          45% {
            opacity: 1;
            transform: translateY(0) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* kosmischer Hintergrund */
        .freq-space {
          background: radial-gradient(
            circle,
            rgba(15, 118, 178, 0.28) 0%,
            rgba(2, 6, 23, 0) 70%
          );
          animation: freqSpacePulse 3.2s ease-out 0.2s 1;
        }
        @keyframes freqSpacePulse {
          0% {
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
          100% {
            opacity: 0.85;
          }
        }

        /* feine, lebende Linien im Hintergrund */
        .freq-rays {
          background-image: repeating-linear-gradient(
            90deg,
            rgba(168, 243, 255, 0.045) 0px,
            rgba(168, 243, 255, 0.045) 1px,
            transparent 1px,
            transparent 11px
          );
          filter: drop-shadow(0 0 12px rgba(34, 211, 238, 0.26));
          animation: freqRaysSpin 9s ease-in-out 0.4s infinite alternate;
        }
        @keyframes freqRaysSpin {
          0% {
            transform: scaleX(1) skewX(0deg);
            opacity: 0.5;
          }
          100% {
            transform: scaleX(1.03) skewX(3deg);
            opacity: 0.9;
          }
        }

        /* zentraler Glow */
        .freq-core-glow {
          animation: freqCoreGlow 1.6s ease-out 0.25s 1;
        }
        @keyframes freqCoreGlow {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.6);
          }
          32% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.06);
          }
          100% {
            opacity: 0.85;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        /* ovaler, leicht atmender Halo */
        .freq-halo {
          animation: freqHalo 2.8s ease-out 0.25s 1;
        }
        @keyframes freqHalo {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9, 0.35);
          }
          40% {
            opacity: 0.55;
            transform: translate(-50%, -50%) scale(1.05, 0.5);
          }
          100% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(1, 0.48);
          }
        }
      `}</style>
    </section>
  );
}

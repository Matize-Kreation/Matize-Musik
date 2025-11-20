"use client";

import { useEffect, useRef } from "react";

/* src/components/MatizeCosmicOverlay.tsx */

type Star = {
    x: number;
    y: number;
    r: number;
    vx: number;
    vy: number;
    baseAlpha: number;
    twPhase: number;
    twSpeed: number;
    hue: number;
    lightness: number;
};

type Flare = {
    x: number;
    y: number;
    life: number; // 1 → 0
    hueCore: number;
    hueFlare: number;
    radius: number;
    angle: number;
    decay: number;
    alpha: number;
};

export default function MatizeCosmicOverlay() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // --- DevicePixelRatio & Größe ---
        let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
        let width = window.innerWidth;
        let height = window.innerHeight;
        let raf = 0;

        const rand = (a: number, b: number) => a + Math.random() * (b - a);

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();

        const handleResize = () => {
            dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
            resize();
        };
        window.addEventListener("resize", handleResize, { passive: true });

        // ---------- Webb-Style Stars ----------
        const makeStar = (): Star => {
            const roll = Math.random();
            let hue = 210;
            let light = 92;
            if (roll > 0.55 && roll <= 0.85) {
                hue = 0;
                light = 94;
            } else if (roll > 0.85 && roll <= 0.95) {
                hue = 42 + Math.random() * 6;
                light = 80;
            } else if (roll > 0.95) {
                hue = 8 + Math.random() * 5;
                light = 78;
            }
            const speed = rand(0.003, 0.01);
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                r: rand(0.25, 1.1),
                vx: (Math.random() - 0.5) * speed,
                vy: -speed * rand(0.3, 1.3),
                baseAlpha: rand(0.25, 0.85),
                twPhase: Math.random() * Math.PI * 2,
                twSpeed: rand(0.010, 0.023),
                hue,
                lightness: light,
            };
        };

        const STAR_COUNT = 340;
        const stars = Array.from({ length: STAR_COUNT }, makeStar);

        // ---------- Flares ----------
        const flares: Flare[] = [];
        const MAX_FLARES = 40;

        const spawnFlare = () => {
            if (flares.length >= MAX_FLARES) return;
            flares.push({
                x: Math.random() * width,
                y: Math.random() * height,
                life: 1,
                hueCore: Math.random() < 0.5 ? 210 + rand(0, 10) : 45 + rand(0, 15),
                hueFlare: Math.random() < 0.4 ? 42 + rand(0, 10) : 200 + rand(0, 15),
                radius: rand(0.6, 1.3),
                angle: Math.random() * Math.PI,
                decay: rand(0.012, 0.018),
                alpha: rand(0.5, 0.9),
            });
        };

        const drawFlareCross = (
            x: number,
            y: number,
            r: number,
            angle: number,
            hue: number,
            alpha: number,
        ) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.strokeStyle = `hsla(${hue},100%,90%,${alpha})`;
            ctx.lineWidth = 0.35;
            ctx.beginPath();
            ctx.moveTo(-r * 3.6, 0);
            ctx.lineTo(r * 3.6, 0);
            ctx.moveTo(0, -r * 3.6);
            ctx.lineTo(0, r * 3.6);
            ctx.stroke();
            ctx.restore();
        };

        const getDepthFade = (y: number) => 1 - (y / height) * 0.25;

        const current = { hueShift: 0, sat: 100 };

        // ---------- Animation ----------
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Space depth gradient
            const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
            bgGrad.addColorStop(0, "rgba(0,0,0,0)");
            bgGrad.addColorStop(1, "rgba(0,0,0,0.25)");
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            // --- Stars ---
            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];
                s.twPhase += s.twSpeed;
                const tw = 0.55 + 0.45 * Math.sin(s.twPhase);
                s.x += s.vx;
                s.y += s.vy;

                // Recycle if off-screen
                if (s.y < -8 || s.x < -12 || s.x > width + 12) {
                    stars[i] = makeStar();
                    continue;
                }

                const depth = getDepthFade(s.y);
                const a = s.baseAlpha * tw * depth;

                // Core
                ctx.beginPath();
                ctx.fillStyle = `hsla(${s.hue + current.hueShift},${current.sat}%,${s.lightness}%,${a})`;
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();

                // Glow
                const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3.2);
                g.addColorStop(0, `hsla(${s.hue},100%,95%,${a * 0.4})`);
                g.addColorStop(1, "rgba(0,0,0,0)");
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r * 3.2, 0, Math.PI * 2);
                ctx.fill();

                // occasional faint structure noise
                if (Math.random() < 0.0025) {
                    ctx.beginPath();
                    ctx.fillStyle = `rgba(0,0,0,${0.2 + Math.random() * 0.25})`;
                    ctx.arc(s.x + rand(-4, 4), s.y + rand(-4, 4), rand(0.5, 1.3), 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // --- Flares ---
            if (Math.random() < 0.18) spawnFlare();
            for (let i = flares.length - 1; i >= 0; i--) {
                const f = flares[i];
                f.life -= f.decay;
                if (f.life <= 0) {
                    flares.splice(i, 1);
                    continue;
                }

                const a = f.alpha * f.life;
                ctx.beginPath();
                ctx.fillStyle = `hsla(${f.hueCore},100%,90%,${a})`;
                ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
                ctx.fill();

                const g2 = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 4.1);
                g2.addColorStop(0, `hsla(${f.hueCore},100%,95%,${a * 0.35})`);
                g2.addColorStop(1, "rgba(0,0,0,0)");
                ctx.fillStyle = g2;
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.radius * 4.1, 0, Math.PI * 2);
                ctx.fill();

                drawFlareCross(f.x, f.y, f.radius * 2.3, f.angle, f.hueFlare, a * 0.45);
            }

            raf = requestAnimationFrame(animate);
        };

        raf = requestAnimationFrame(animate);

        // Pause when tab hidden
        const handleVisibility = () => {
            if (document.hidden) cancelAnimationFrame(raf);
            else raf = requestAnimationFrame(animate);
        };
        document.addEventListener("visibilitychange", handleVisibility, { passive: true });

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden mix-blend-screen">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[radial-gradient(circle,rgba(255,255,255,0.18)_0,rgba(255,255,255,0)_55%)] bg-[length:220px_220px]" />
        </div>
    );
}

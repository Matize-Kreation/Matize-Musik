"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { withBase } from "@/lib/paths";

/**
 * Startseite von Matize-Musik.
 * Leitet automatisch weiter zur Musikseite – lokal zu /musik,
 * auf GitHub Pages zu /Matize-Musik/musik (via withBase).
 */
export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const target = withBase("/musik");
        router.replace(target);
    }, [router]);

    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center">
            <p className="text-slate-400 text-sm tracking-wide">
                Weiterleiten zur Musik-Bühne …
            </p>
        </main>
    );
}

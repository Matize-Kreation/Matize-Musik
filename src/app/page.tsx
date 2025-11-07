// src/app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { withBase } from "@/lib/paths";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // immer auf /musik leiten – aber basePath-sicher
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

"use client";
/* src/app/musik/page.tsx */

import HeroMatizeMusik from "@/components/HeroMatizeMusik";
import FacettenOrbit3D from "@/components/sections/FacettenOrbit3D";

export default function MusikPage() {
    console.log("🎵 /musik page loaded");

    return (
        <div className="relative min-h-screen overflow-hidden bg-transparent">
            {/* Hero oben */}
            <section className="relative z-30 pt-24 pb-16">
                <HeroMatizeMusik />
            </section>

            {/* Orbit darunter */}
            <section className="relative z-30">
                <FacettenOrbit3D />
            </section>
        </div>
    );
}

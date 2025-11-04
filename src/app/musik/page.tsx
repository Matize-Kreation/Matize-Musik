"use client";

import HeroMatizeMusik from "@/components/HeroMatizeMusik";
import FacettenOrbit3D from "@/components/sections/FacettenOrbit3D";

export default function MusikPage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#020617]">
            {/* globaler Hintergrundverlauf */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#1f2937_0%,_#020617_55%,_#000_100%)] opacity-70" />

            {/* Hero */}
            <div className="relative z-10">
                <HeroMatizeMusik />
            </div>

            {/* Hauptbühne */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 pb-32">
                <FacettenOrbit3D />
            </main>
        </div>
    );
}

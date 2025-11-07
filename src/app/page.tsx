"use client";
/* src/app/musik/page.tsx */
import FacettenOrbit3D from "@/components/sections/FacettenOrbit3D";
import MatizeCosmicOverlay from "@/components/MatizeCosmicOverlay";

export default function MusikPage() {
    return (
        <div className="relative min-h-screen bg-[#020617] overflow-hidden">
            {/* globaler James-Webb-Cosmos */}
            <MatizeCosmicOverlay />

            {/* Musik-Inhalt */}
            <main className="relative z-10">
                <FacettenOrbit3D />
            </main>
        </div>
    );
}

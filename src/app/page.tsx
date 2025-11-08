// src/app/page.tsx
"use client";

import React from "react";

// Hero liegt direkt unter components
import HeroMatizeMusik from "@/components/HeroMatizeMusik";

// Orbit liegt im Unterordner sections
import FacettenOrbit3D from "@/components/sections/FacettenOrbit3D";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-[#020617] overflow-hidden">
            {/* Hero oben */}
            <section className="relative z-10">
                <HeroMatizeMusik />
            </section>

            {/* Orbit / Rondell darunter */}
            <section className="relative z-20 pt-10 pb-20">
                <FacettenOrbit3D />
            </section>
        </main>
    );
}

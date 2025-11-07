// src/app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";
import MatizeCosmicOverlay from "@/components/MatizeCosmicOverlay";

export const metadata: Metadata = {
    title: "Matize Musik",
    description: "Cinematic Rap, Spoken Word und Seelenpoesie von Matize.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="de" className="dark" suppressHydrationWarning>
            <body className="relative bg-[#020617] text-slate-100 min-h-screen antialiased overflow-x-hidden">
                {/* === Sparkle-Cosmos unterhalb des Inhalts === */}
                <MatizeCosmicOverlay />

                {/* === Seiten-Inhalt === */}
                <div className="relative z-20 flex flex-col min-h-screen">
                    <main className="flex-1">{children}</main>
                </div>
            </body>
        </html>
    );
}

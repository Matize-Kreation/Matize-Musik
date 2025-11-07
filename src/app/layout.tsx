

// src/app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";

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
            <body className="bg-[#0a0a0a] text-slate-100 min-h-screen antialiased">
                <div className="min-h-screen flex flex-col">
                    <main className="flex-1">{children}</main>
                </div>
            </body>
        </html>
    );
}

// src/lib/paths.ts
const BASE =
    process.env.NEXT_PUBLIC_BASE_PATH && process.env.NEXT_PUBLIC_BASE_PATH !== "/"
        ? process.env.NEXT_PUBLIC_BASE_PATH
        : "";

/**
 * Hängt das basePath-Präfix (z. B. /Matize-Musik) korrekt an.
 * Benutzt überall dasselbe Verhalten – Hero & Orbit!
 */
export function withBase(path: string): string {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    if (!path.startsWith("/")) path = "/" + path;
    return `${BASE}${path}`;
}

/**
 * Normalisiert Windows- oder absolute "public"-Pfade.
 * Wird im Orbit für song.cover etc. genutzt.
 */
export function normalizePublicPath(raw?: string | null): string {
    if (!raw) return "";

    const winRoot = "D:\\Matize\\Matize-Kreation\\Matize-Musik\\public\\";
    const winRootAlt1 = "D:/Matize/Matize-Kreation/Matize-Musik/public/";
    const winRootAlt2 = "D:/Matize/Matize-Kreation/Matize-Musik/";

    let cleaned = raw
        .replace(winRoot, "/")
        .replace(winRootAlt1, "/")
        .replace(winRootAlt2, "/")
        .replace(/\\/g, "/");

    if (!cleaned.startsWith("/")) cleaned = "/" + cleaned;

    return withBase(cleaned);
}

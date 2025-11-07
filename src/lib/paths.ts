// src/lib/paths.ts

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Normalisiert einen optionalen Pfad für statische Assets.
 * Gibt einen vollständigen Pfad zurück oder ein Fallback-Bild.
 */
export function normalizePublicPath(path?: string | null): string {
    if (typeof path === "string" && path.length > 0) {
        const cleanPath = path.startsWith("/") ? path : `/${path}`;
        return `${base}${cleanPath}`;
    }
    return `${base}/fallback.png`;
}

/**
 * Fügt den basePath an einen gegebenen Pfad an.
 * Ideal für Bilder, Audio, Logos etc.
 */
export function withBase(path: string): string {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${base}${cleanPath}`;
}

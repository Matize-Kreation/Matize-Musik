// src/lib/paths.ts

// in PROD (GitHub Pages) brauchen wir /Matize-Musik vorne dran
const BASE_PATH =
    process.env.NODE_ENV === "production" ? "/Matize-Musik" : "";

/**
 * Macht aus lokalen Windows-Pfaden oder schon vorhandenen /images/...-Pfaden
 * einen sauberen öffentlichen Pfad inkl. BasePath.
 */
export function normalizePublicPath(raw?: string | null): string | null {
    if (!raw) return null;

    // deine Projekt-Roots (Windows)
    const winRoot = "D:\\Matize\\Matize-Kreation\\Matize-Musik\\public\\";
    const winRootAlt = "D:/Matize/Matize-Kreation/Matize-Musik/public/";

    let cleaned = raw;

    // wenn ein absoluter Windows-Pfad reinkommt → auf Public relativieren
    if (cleaned.startsWith(winRoot)) {
        cleaned = cleaned.replace(winRoot, "/");
    } else if (cleaned.startsWith(winRootAlt)) {
        cleaned = cleaned.replace(winRootAlt, "/");
    }

    // Backslashes zu /
    cleaned = cleaned.replace(/\\/g, "/");

    // sicherstellen, dass es mit / beginnt
    if (!cleaned.startsWith("/")) {
        cleaned = "/" + cleaned;
    }

    // final mit BasePath
    return `${BASE_PATH}${cleaned}`;
}

/**
 * Für Links wie /musik → /Matize-Musik/musik in prod
 */
export function withBase(path: string): string {
    if (!path.startsWith("/")) path = "/" + path;
    return `${BASE_PATH}${path}`;
}

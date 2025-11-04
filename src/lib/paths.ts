// src/lib/paths.ts
export function normalizePublicPath(raw?: string | null): string | null {
    if (!raw) return null;

    // deine lokalen Windows-Pfade → public
    const winRoot = "D:\\Matize\\Matize-Kreation\\Matize-Musik\\public\\";
    const winRootAlt = "D:/Matize/Matize-Kreation/Matize-Musik/public/";

    let cleaned = raw;

    if (cleaned.startsWith(winRoot)) {
        cleaned = cleaned.replace(winRoot, "/");
    } else if (cleaned.startsWith(winRootAlt)) {
        cleaned = cleaned.replace(winRootAlt, "/");
    }

    // backslashes entfernen
    cleaned = cleaned.replace(/\\/g, "/");

    if (!cleaned.startsWith("/")) {
        cleaned = "/" + cleaned;
    }

    return cleaned;
}

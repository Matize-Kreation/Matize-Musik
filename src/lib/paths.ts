// D:\Matize\Matize-Kreation\Matize-Musik\src\lib\paths.ts

const base = process.env.NEXT_PUBLIC_BASE_PATH || "/Matize-Musik";

export function normalizePublicPath(path?: string | null): string {
    return typeof path === "string" && path.length > 0
        ? path.startsWith("/") ? `${base}${path}` : `${base}/${path}`
        : `${base}/fallback.png`;
}

export function withBase(path: string): string {
    return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

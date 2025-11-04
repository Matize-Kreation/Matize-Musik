// src/lib/facetten.ts
import songs from "@/data/songs.json";
import { normalizePublicPath } from "./paths";

export const FACETTEN_ALBUM_COVER =
    "/images/covers/facetten/album/facetten-album/Facetten-Cover.jpg";

export type MatizeSong = {
    id: string;
    slug?: string;
    title: string;
    displayTitle?: string;
    subtitle?: string;
    cover?: string;
    safeCover?: string;
    audioUrl?: string;
    audio?: string;
    safeAudio?: string;
    spotifyUrl?: string;
    releaseDate?: string;
    tags?: string[];
    lyricsLrc?: string;
};

const SONG_LIST = songs as MatizeSong[];

export function getSongBySlug(slug: string): MatizeSong | null {
    return SONG_LIST.find((s) => s.slug === slug || s.id === slug) ?? null;
}

export function getSongCoverSrc(song: MatizeSong | null | undefined): string | null {
    if (!song) return null;

    if (song.safeCover) {
        const norm = normalizePublicPath(song.safeCover);
        if (norm) return norm;
    }

    if (song.cover) {
        const norm = normalizePublicPath(song.cover);
        if (norm) return norm;
    }

    const title = (song.title || "").toLowerCase();
    const slug = (song.slug || "").toLowerCase();

    if (title.includes("kunst") || slug.includes("kunst") || slug.includes("04")) {
        return "/images/covers/facetten/tracks/04-kunst.jpg";
    }
    if (title.includes("fakt") || slug.includes("fakt") || slug.includes("ansicht") || slug.includes("11")) {
        return "/images/covers/facetten/tracks/11-fakt_und_ansicht.jpg";
    }
    if (title.includes("apokalypse") || slug.includes("apokalypse") || slug.includes("12")) {
        return "/images/covers/facetten/tracks/12-apokalypse.jpg";
    }

    return null;
}

export function getSongAudioSrc(song: MatizeSong | null | undefined): string {
    if (!song) return "";
    const raw = song.safeAudio ?? song.audioUrl ?? song.audio ?? "";
    return raw ? encodeURI(raw) : "";
}

// falls du öfter die Liste brauchst
export function getAllSongs(): MatizeSong[] {
    return SONG_LIST;
}

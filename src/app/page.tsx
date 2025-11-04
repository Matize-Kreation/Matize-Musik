// src/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
    // Start immer auf der Musik-Bühne
    redirect("/musik");
}

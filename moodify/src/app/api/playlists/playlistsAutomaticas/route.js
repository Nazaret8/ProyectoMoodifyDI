import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lppshycjcubtzwzklarq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwcHNoeWNqY3VidHp3emtsYXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMjAwMjAsImV4cCI6MjA1Mjg5NjAyMH0.I5Vg72XMCm2dPJstHynctDdGVfq6hC35cNP75UI4Rg8";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const { data: artistas, error: errorArtistas } = await supabase
      .from("CANCION")
      .select("artista")
      .neq("artista", null);

    if (errorArtistas) throw errorArtistas;

    const artistasUnicos = [...new Set(artistas.map((c) => c.artista))];

    const playlists = await Promise.all(
      artistasUnicos.map(async (artista) => {
        const { data: canciones, error: errorCanciones } = await supabase
          .from("CANCION")
          .select("*")
          .eq("artista", artista);

        if (errorCanciones) throw errorCanciones;

        return {
          artista,
          canciones,
        };
      })
    );

    return new Response(JSON.stringify(playlists), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

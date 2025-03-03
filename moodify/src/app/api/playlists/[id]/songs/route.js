import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lppshycjcubtzwzklarq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwcHNoeWNqY3VidHp3emtsYXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMjAwMjAsImV4cCI6MjA1Mjg5NjAyMH0.I5Vg72XMCm2dPJstHynctDdGVfq6hC35cNP75UI4Rg8";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req) {
  const url = new URL(req.url);
  const id = url.pathname.split("/")[3];

  try {
    console.log("Fetching playlist con ID:", id);

    const { data: playlistSongs, error } = await supabase
      .from("PLAYLIST_CANCION")
      .select("idCancion")
      .eq("idPlaylist", id);

    if (error) {
      console.error("Error fetching playlist canciones:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    if (!playlistSongs.length) {
      console.log("No se han encontrado canciones para la playlist");
      return new Response(JSON.stringify({ songs: [] }), { status: 200 });
    }

    const songIds = playlistSongs.map((pc) => pc.idCancion);
    console.log("Id de canciones:", songIds);

    const { data: songs, error: songError } = await supabase
      .from("CANCION")
      .select("titulo, artista, duracion, imagen")
      .in("id", songIds);

    if (songError) {
      console.error("Error fetching canciones:", songError);
      return new Response(JSON.stringify({ error: songError.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ songs }), { status: 200 });
  } catch (err) {
    console.error("Error general:", err);
    return new Response(
      JSON.stringify({ error: "Error fetching canciones de la playlist" }),
      { status: 500 }
    );
  }
}

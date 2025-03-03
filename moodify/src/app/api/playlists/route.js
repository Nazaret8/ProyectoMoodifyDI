import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lppshycjcubtzwzklarq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwcHNoeWNqY3VidHp3emtsYXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMjAwMjAsImV4cCI6MjA1Mjg5NjAyMH0.I5Vg72XMCm2dPJstHynctDdGVfq6hC35cNP75UI4Rg8";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("idUsuario");

  const { data, error } = await supabase
    .from("PLAYLIST")
    .select("*")
    .eq("idUsuario", userId);

  if (error) {
    return new Response(
      JSON.stringify({ error: "Error al obtener las playlists" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const playlistId = searchParams.get("id");

  const { data: songsData, error: songsError } = await supabase
    .from("PLAYLIST_CANCION")
    .delete()
    .eq("idPlaylist", playlistId);

  if (songsError) {
    return new Response(
      JSON.stringify({ error: "Error al eliminar las canciones de la playlist" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const { data, error } = await supabase
    .from("PLAYLIST")
    .delete()
    .eq("id", playlistId);

  if (error) {
    return new Response(
      JSON.stringify({ error: "Error al eliminar la playlist" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ message: "Playlist y canciones eliminadas correctamente" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}


export async function POST(req) {
  const body = await req.json();
  console.log(body); 

  if (!body.nombre || !body.descripcion || !body.tipoMood) {
    return new Response(
      JSON.stringify({ message: "Todos los campos son requeridos" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { data, error } = await supabase
      .from("PLAYLIST")
      .insert([
        {
          nombre: body.nombre,
          descripcion: body.descripcion,
          tipoMood: body.tipoMood,
          idUsuario: body.idUsuario,
        },
      ])
      .single();

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ message: "Playlist creada con éxito", data }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al crear la playlist:", error.message || error);
    return new Response(
      JSON.stringify({ message: "Error al crear la playlist", error: error.message || error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
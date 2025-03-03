import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lppshycjcubtzwzklarq.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwcHNoeWNqY3VidHp3emtsYXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMjAwMjAsImV4cCI6MjA1Mjg5NjAyMH0.I5Vg72XMCm2dPJstHynctDdGVfq6hC35cNP75UI4Rg8"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request, { params }) {
  const playlistId = params.id; 

  if (!playlistId) {
    return new Response(JSON.stringify({ error: "playlistId es requerido" }), { status: 400 });
  }

  const { data, error } = await supabase
    .from("PLAYLIST_CANCION")
    .select("idCancion")
    .eq("idPlaylist", playlistId);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  const songIds = data.map((item) => item.idCancion);

  if (songIds.length === 0) {
    return new Response(JSON.stringify([]), { status: 200 });
  }

  const { data: songs, error: songError } = await supabase
    .from("CANCION")
    .select("id, titulo, artista, imagen, enlace")
    .in("id", songIds);

  if (songError) {
    return new Response(JSON.stringify({ error: songError.message }), { status: 500 });
  }

  return new Response(JSON.stringify(songs), { status: 200 });
}

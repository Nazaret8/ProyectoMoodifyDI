import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lppshycjcubtzwzklarq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwcHNoeWNqY3VidHp3emtsYXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMjAwMjAsImV4cCI6MjA1Mjg5NjAyMH0.I5Vg72XMCm2dPJstHynctDdGVfq6hC35cNP75UI4Rg8";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req, { params }) {
  try {
    const { idCancion } = await req.json(); 
    const { id: idPlaylist } = params; 


    if (!idCancion || !idPlaylist) {
      return new Response(
        JSON.stringify({ error: 'Se requiere idCancion y idPlaylist' }),
        { status: 400 }
      );
    }

    const { data: songData, error: songError } = await supabase
      .from('CANCION')
      .select('id')
      .eq('id', idCancion)
      .single();

    if (songError || !songData) {
      return new Response(
        JSON.stringify({ error: 'Canción no encontrada' }),
        { status: 404 }
      );
    }

    const { data: playlistData, error: playlistError } = await supabase
      .from('PLAYLIST')
      .select('id')
      .eq('id', idPlaylist)
      .single();

    if (playlistError || !playlistData) {
      return new Response(
        JSON.stringify({ error: 'Playlist no encontrada' }),
        { status: 404 }
      );
    }

    const { data, error } = await supabase
      .from('PLAYLIST_CANCION')
      .insert([
        {
          idPlaylist: parseInt(idPlaylist, 10),
          idCancion: parseInt(idCancion, 10),
        },
      ]);

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Canción añadida correctamente', data }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error inesperado:", error);
    return new Response(
      JSON.stringify({ error: 'Hubo un error al añadir la canción a la playlist' }),
      { status: 500 }
    );
  }
}

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lppshycjcubtzwzklarq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwcHNoeWNqY3VidHp3emtsYXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMjAwMjAsImV4cCI6MjA1Mjg5NjAyMH0.I5Vg72XMCm2dPJstHynctDdGVfq6hC35cNP75UI4Rg8";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req) {
  const { userId, mood } = await req.json();

  if (!userId || !mood) {
    return new Response(
      JSON.stringify({ error: "Usuario o mood no proporcionado" }),
      { status: 400 }
    );
  }

  console.log(`Recibido userId: ${userId}, mood: ${mood}`);

  const { data: moodData, error: moodError } = await supabase
    .from("MOOD")
    .select("id")
    .eq("descripcion", mood)
    .single();

  if (moodError || !moodData) {
    console.error("Error al obtener mood:", moodError);
    return new Response(
      JSON.stringify({
        error: "No se encontró el mood o hubo un error al obtener el id del mood",
      }),
      { status: 500 }
    );
  }

  console.log(`Mood encontrado con id: ${moodData.id}`);

  const { error: insertError } = await supabase
    .from("DETECTOR")
    .insert([{ idUsuario: parseInt(userId), idMood: moodData.id }]);

  if (insertError) {
    console.error("Error al insertar en DETECTOR:", insertError);
    return new Response(
      JSON.stringify({ error: "Error al guardar el estado de ánimo" }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({ success: `Mood "${mood}" guardado correctamente` }),
    { status: 200 }
  );
}

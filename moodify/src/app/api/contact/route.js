import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lppshycjcubtzwzklarq.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwcHNoeWNqY3VidHp3emtsYXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMjAwMjAsImV4cCI6MjA1Mjg5NjAyMH0.I5Vg72XMCm2dPJstHynctDdGVfq6hC35cNP75UI4Rg8"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(req) {
  const { firstName, lastName, email, phoneNumber, message } = await req.json();

  if (!firstName || !lastName || !email || !phoneNumber || !message) {
    return new Response(
      JSON.stringify({ error: "Todos los campos son requiridos" }),
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from("CONTACTO")
      .insert([
        {
          nombre: firstName,
          apellido: lastName,
          email: email,
          telefono: phoneNumber,
          mensaje: message
        },
      ]);

    if (error) {
      return new Response(
        JSON.stringify({ error: "Error al insertar los elementos", details: error.message }),
        { status: 500 }
      );
    }
    return new Response(
      JSON.stringify({ message: "Mensaje enviado correctamente", data }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Error interno del servidor", details: err.message }),
      { status: 500 }
    );
  }
}

import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabaseUrl = "https://lppshycjcubtzwzklarq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwcHNoeWNqY3VidHp3emtsYXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMjAwMjAsImV4cCI6MjA1Mjg5NjAyMH0.I5Vg72XMCm2dPJstHynctDdGVfq6hC35cNP75UI4Rg8";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req) {
  const body = await req.json();
  console.log(body);

  if (!body.termsAccept) {
    return new Response(
      JSON.stringify({ error: "Debe aceptar los términos y condiciones" }),
      { status: 400 }
    );
  }
  if (!body.nombreUsuario) {
    return new Response(
      JSON.stringify({ error: "El nombre de usuario no puede estar vacío." }),
      { status: 400 }
    );
  }
  if (!body.email || !body.password) {
    return new Response(
      JSON.stringify({ error: "El correo y la contraseña son necesarios." }),
      { status: 400 }
    );
  }

  try {
    const { user, error: authError } = await supabase.auth.signUp({
      email: body.email,
      password: body.password
    });

    if (authError) {
      return new Response(
        JSON.stringify({ error: "Error de autenticación:" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const { userData, error } = await supabase
      .from("USUARIO")
      .insert([
        {
          nombreUsuario: body.nombreUsuario,
          email: body.email,
          password: hashedPassword,
          termsAccept: body.termsAccept,
          fechaRegistro: new Date().toISOString(),
        },
      ])
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: "Error en la base de datos:" }), { status: 400 });
    }

    return new Response(
      JSON.stringify({
        message: "Usuario registrado exitosamente",
        userData,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error interno:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
}

import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabaseUrl = 'https://lppshycjcubtzwzklarq.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwcHNoeWNqY3VidHp3emtsYXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMjAwMjAsImV4cCI6MjA1Mjg5NjAyMH0.I5Vg72XMCm2dPJstHynctDdGVfq6hC35cNP75UI4Rg8";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  const body = await request.json();

  if (!body.email || !body.password) {
    return new Response(
      JSON.stringify({ error: "Email y Password son obligatorios" }),
      { status: 400 }
    );
  }

  try {
    const { data: users, error } = await supabase
      .from("USUARIO")
      .select("*")
      .eq("email", body.email)
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: "Database query error", details: error.message }),
        { status: 500 }
      );
    }

    if (!users) {
      return new Response(
        JSON.stringify({ error: "Usuario no encontrado o las credenciales son incorrectas" }),
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(body.password, users.password);

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Password incorrecta" }),
        { status: 401 }
      );
    }

    const { password: userPassword, ...userData } = users;
    return new Response(
      JSON.stringify({
        message: "Login con éxito",
        user: userData,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Error interno del servidor", details: err.message }),
      { status: 500 }
    );
  }
}

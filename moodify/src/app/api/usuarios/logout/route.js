import { createClient } from "@supabase/supabase-js";
const supabaseUrl = 'https://lppshycjcubtzwzklarq.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwcHNoeWNqY3VidHp3emtsYXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMjAwMjAsImV4cCI6MjA1Mjg5NjAyMH0.I5Vg72XMCm2dPJstHynctDdGVfq6hC35cNP75UI4Rg8"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(req) {
  try {
    const { error } = await supabase.auth.signOut(); 
    if (error) {
      return new Response(
        JSON.stringify({ error: "Error mientras el deslogueo", details: error.message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Logout con éxito" }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Error interno del servidor", details: err.message }),
      { status: 500 }
    );
  }
}

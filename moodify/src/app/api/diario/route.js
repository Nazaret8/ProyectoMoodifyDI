import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lppshycjcubtzwzklarq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwcHNoeWNqY3VidHp3emtsYXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMjAwMjAsImV4cCI6MjA1Mjg5NjAyMH0.I5Vg72XMCm2dPJstHynctDdGVfq6hC35cNP75UI4Rg8";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.estado) {
      return new Response(JSON.stringify({ error: "El estado es obligatorio" }), { status: 400 });
    }

    const fecha = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase.from("DIARIO").insert({
      estado: body.estado,
      fechaActualEstado: fecha,
    });

    if (error) {
      console.error("Error en Supabase:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: "Estado registrado", data }), { status: 200 });
  } catch (err) {
    console.error("Error en el servidor:", err);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
  }
}

export async function GET() {
    const { data: estados, error } = await supabase
      .from("DIARIO")
      .select("id, estado, fechaActualEstado");
  
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  
    const estadosFormateados = estados.map((estado) => {
      const fechaFormateada = new Date(estado.fechaActualEstado).toISOString().split('T')[0]; 
      return {
        ...estado,
        fechaActualEstado: fechaFormateada,
      };
    });
  
    return new Response(JSON.stringify(estadosFormateados), { status: 200 });
  }
  
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lppshycjcubtzwzklarq.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwcHNoeWNqY3VidHp3emtsYXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMjAwMjAsImV4cCI6MjA1Mjg5NjAyMH0.I5Vg72XMCm2dPJstHynctDdGVfq6hC35cNP75UI4Rg8"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
    try {
      const { data, error } = await supabase
        .from('MOOD')
        .select('id, descripcion, imagen, description')
        .order('id', { ascending: true });
  
      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400 }
        );
      }
  
      console.log('Datos obtenidos de la tabla MOOD:', data);  
  
      return new Response(
        JSON.stringify({ moods: data }),
        { status: 200 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Error al obtener los moods' }),
        { status: 500 }
      );
    }
  }
  
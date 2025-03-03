'use client';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import UserLibrary from "./UserLibrary";

export default function ListPlaylist() {
  const [songs, setSongs] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        if (params?.idPlaylist) {
          const response = await fetch(`/api/playlists/${params.idPlaylist}/songs`);
          const data = await response.json();
          setSongs(data.songs || []);
        }
      } catch (error) {
        console.error("Error fetching playlist songs:", error);
      }
    };

    fetchSongs();
  }, [params?.idPlaylist]);

  return (
    <div className="container-fluid vh-100 d-flex p-0">
      <div
        className="bg-dark text-white d-none d-md-block"
        style={{
          width: "300px",
        }}
      >
        <UserLibrary />
      </div>
  
      <div
        className="flex-grow-1 p-4"
        style={{
          background: "linear-gradient(to bottom left, #ffffff, #F4DCFF, #D781FF, #AE00FF)",
          color: "#2F2F2F",
          overflowY: "auto",
          width: window.innerWidth < 768 ? "100%" : "auto", 
          scrollbarWidth: "thin", 
          scrollbarColor: "#D781FF transparent", 
        }}
      >
        <h2 className="text-center">Canciones</h2>
  
        {songs.length === 0 ? (
          <p className="text-center">No hay ninguna canción disponible en esta playlist.</p>
        ) : (
          <div className="list-group">
            {songs.map((song, index) => (
              <div
                key={index}
                className="d-flex align-items-center justify-content-between list-group-item border-0 mb-2 p-3"
                style={{ background: "#4B1960", borderRadius: "8px", color: "white" }}
              >
                <img
                  src={song.imagen}
                  alt={song.titulo}
                  className="rounded"
                  style={{ width: "50px", height: "50px" }}
                />
  
                <div className="flex-grow-1 mx-3">
                  <p className="mb-1 fw-bold">{song.titulo}</p>
                  <p className="mb-1">{song.artista}</p>
                  <p className="mb-0">{song.duracion}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

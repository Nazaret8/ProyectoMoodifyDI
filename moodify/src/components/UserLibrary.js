"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext ";
import { useMusic } from "@/app/context/MusicContext";

export default function UserLibrary() {
  const { language } = useLanguage();
  const {
    playSong,
    stopSong,
    setCurrentPlaylist,
    setCurrentSongIndex,
    playingPlaylist,
    setPlayingPlaylist,
    isPlaying,
    setIsPlaying,
  } = useMusic();

  const [playlists, setPlaylists] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState({});
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipoMood, setTipoMood] = useState("");
  const [userId, setUserId] = useState(null);
  const [moods, setMoods] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.id) {
      setUserId(userInfo.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchPlaylists();
    }
  }, [userId]);

  useEffect(() => {
    fetchMoods();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (userId) fetchPlaylists();
    }, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCreatePlaylist = async () => {
    if (!nombre.trim()) {
      alert("El nombre de la playlist es obligatorio");
      return;
    }

    const response = await fetch("/api/playlists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        descripcion,
        tipoMood,
        idUsuario: userId,
      }),
    });

    if (response.ok) {
      fetchPlaylists(); 
      setNombre("");
      setDescripcion("");
      setTipoMood("");
    } else {
      alert("Error al crear la playlist");
    }
  };

  const fetchPlaylists = async () => {
    if (userId) {
      try {
        const response = await fetch(`/api/playlists?idUsuario=${userId}`);
        const dataPlaylists = await response.json();

        if (Array.isArray(dataPlaylists)) {
          setPlaylists(dataPlaylists);
        } else {
          console.error("Se esperaba un array pero se recibió:", dataPlaylists);
          setPlaylists([]);
        }

        const songsData = {};
        for (const playlist of dataPlaylists) {
          const res = await fetch(`/api/playlists/${playlist.id}/songs`);
          const songs = await res.json();
          songsData[playlist.id] = songs.songs ? songs.songs.slice(0, 4) : [];
        }
        setPlaylistSongs(songsData);
      } catch (error) {
        console.error("Error al obtener las playlists:", error);
        setPlaylists([]);
      }
    }
  };

  const fetchMoods = async () => {
    try {
      const response = await fetch("/api/moods");
      const data = await response.json();
      setMoods(data.moods || []);
    } catch (error) {
      console.error("Error fetching moods:", error);
      setMoods([]);
    }
  };

  const handleDeletePlaylist = async (idPlaylist) => {
    const response = await fetch(`/api/playlists?id=${idPlaylist}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setPlaylists(playlists.filter((playlist) => playlist.id !== idPlaylist));
    } else {
      alert("Error al eliminar la playlist.");
    }
  };

  const navigateToPlaylist = (idPlaylist) => {
    window.location.href = `/listaPlaylists/${idPlaylist}`;
  };

  const handlePlayPlaylist = async (playlistId) => {
    try {
      console.log("Intentando reproducir la playlist con ID:", playlistId);
  
      const response = await fetch(`/api/playlists/${playlistId}/reproducir`);
  
      if (!response.ok) {
        throw new Error("Error al obtener canciones");
      }
  
      const songs = await response.json();
      console.log("Canciones obtenidas para la playlist:", songs);
  
      if (songs.length > 0) {
        if (!playingPlaylist || playingPlaylist.id !== playlistId) {
          setCurrentPlaylist(songs);
          setCurrentSongIndex(0); 
          setPlayingPlaylist({ id: playlistId, songs });
          console.log("Reproduciendo nueva playlist:", playlistId);
          playSong(songs[0].enlace, songs[0], songs);
          setIsPlaying(true);
        } else {
          console.log("Misma playlist detectada. Estado actual:", isPlaying);
          if (isPlaying) {
            stopSong();
            setIsPlaying(false);
          } else {
            playSong(songs[0].enlace, songs[0], songs); 
            setIsPlaying(true);
          }
        }
      } else {
        alert("No hay canciones en esta playlist");
      }
    } catch (error) {
      console.error("Error al reproducir la playlist:", error);
      alert("Hubo un problema al reproducir la playlist");
    }
  };

  return (
    <section
      className={`d-flex flex-column p-3 ${menuOpen ? "menu-open" : ""}`}
      style={{
        backgroundColor: "#320048",
        height: "100vh",
        color: "#fff",
        position: "relative",
        width: isMobile ? (menuOpen ? "300px" : "50px") : "300px",
        transition: "width 0.3s ease",
        overflow: "hidden",
      }}
    >
      {isMobile && (
        <div
          className="icon-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            position: "absolute",
            top: "20px",
            left: "10px",
            zIndex: 10,
            cursor: "pointer",
          }}
        >
          <img
            src="/icons/biblioteca.png"
            alt="Menú"
            style={{ width: "25px", height: "25px" }}
          />
        </div>
      )}

      <div
        className={`d-flex flex-column ${
          isMobile && !menuOpen ? "d-none" : ""
        }`}
        style={{ width: "100%", overflowY: "auto", minHeight: "50vh" }}
      >
        <div className="d-flex flex-column align-items-center mb-3 w-100">
          <h2 className="m-0" style={{ textAlign: "center" }}>
            {language === "Spanish" ? "Biblioteca" : "Library"}
          </h2>
        </div>

        <div
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            cursor: "pointer",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          <img
            src="/icons/agregar.png"
            alt="Añadir Playlist"
            style={{ width: "30px", height: "30px" }}
          />
        </div>

        {menuOpen && (
          <div className="d-flex flex-column align-items-center mb-3">
            <input
              type="text"
              placeholder="Nombre de la playlist"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{
                width: "100%",
                marginBottom: "5px",
                padding: "8px",
                borderRadius: "10px",
                border: "1px solid #555",
                outline: "none",
                backgroundColor: "#2F2F2F",
                color: "#fff",
              }}
            />
            <input
              type="text"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              style={{
                width: "100%",
                marginBottom: "5px",
                padding: "8px",
                borderRadius: "10px",
                border: "1px solid #555",
                outline: "none",
                backgroundColor: "#2F2F2F",
                color: "#fff",
              }}
            />
            <select
              value={tipoMood}
              onChange={(e) => setTipoMood(e.target.value)}
              style={{
                width: "100%",
                maxWidth: isMobile ? "90vw" : "100%",
                marginBottom: "10px",
                padding: "8px",
                borderRadius: "10px",
                border: "1px solid #555",
                outline: "none",
                backgroundColor: "#2F2F2F",
                color: "#fff",
                fontSize: isMobile ? "12px" : "16px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <option value="">Selecciona un mood</option>
              {moods.map((mood) => (
                <option key={mood.id} value={mood.descripcion}>
                  {mood.descripcion}
                </option>
              ))}
            </select>

            <button
              onClick={handleCreatePlaylist}
              style={{
                backgroundColor: "#A97CD5",
                color: "#fff",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "10px",
              }}
            >
              Crear
            </button>
          </div>
        )}

        <div
          className="scroll-container"
          style={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}
        >
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="playlist-card d-flex align-items-center justify-content-between mb-3"
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "2px",
                }}
              >
                {playlistSongs[playlist.id]?.map((song, index) => (
                  <div key={`${playlist.id}-${song.id || index}`}>
                    <img
                      src={song.imagen}
                      alt={song.titulo}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "15%",
                      }}
                    />
                  </div>
                ))}
              </div>

              <p
                onClick={() => navigateToPlaylist(playlist.id)}
                className="font-weight-bold m-0"
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                {playlist.nombre}
              </p>

              <button
                onClick={() => handleDeletePlaylist(playlist.id)}
                className="border-0 bg-transparent"
              >
                <img
                  src="/icons/delete.png"
                  alt="Eliminar"
                  style={{ width: "16px", height: "16px" }}
                />
              </button>

              <button
                onClick={() => handlePlayPlaylist(playlist.id)} 
                className="border-0 bg-transparent"
              >
                <img
                  src="/icons/reproductor/play.png"
                  alt="Reproducir"
                  style={{ width: "16px", height: "16px" }}
                />
              </button>
            </div>
          ))}
        </div>
        <style>
            {`@media (max-width: 768px) {
              select {
                max-height: 200px; 
                overflow-y: auto;  
                display: block;    
              }
            }}
            .scroll-container {
              scrollbar-width: thin;
              scrollbar-color: #D781FF transparent; 
            }
    
            .scroll-container::-webkit-scrollbar {
              width: 6px; 
            }
    
            .scroll-container::-webkit-scrollbar-track {
              background: transparent; 
            }
    
            .scroll-container::-webkit-scrollbar-thumb {
              background: #D781FF; 
              border-radius: 10px;
            }`}
        </style>
      </div>
    </section>
  );
}

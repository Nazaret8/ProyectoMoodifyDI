"use client";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/app/context/LanguageContext ";
import { useMusic } from "@/app/context/MusicContext";

export default function AutomaticPlaylistsSlider() {
  const { language } = useLanguage();
  const { playSong, setCurrentSongIndex, currentPlaylist, isPlaying, currentSong } = useMusic();
  const [playlists, setPlaylists] = useState([]);
  const [playingPlaylist, setPlayingPlaylist] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("/api/playlists/playlistsAutomaticas");
        if (!response.ok) throw new Error("Error al obtener las playlists");
        const data = await response.json();
        setPlaylists(data);

        setTimeout(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft =
              scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
          }
        }, 500);
      } catch (error) {
        console.error("Error al obtener playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  const playPlaylist = (playlist) => {
    if (!playlist.canciones || playlist.canciones.length === 0) return;

    if (playingPlaylist === playlist) {
      if (isPlaying) {
        setPlayingPlaylist(null); 
      } else {
        playSong(currentSong.enlace, currentSong, currentPlaylist); 
      }
    } else {
      setPlayingPlaylist(playlist);
      setCurrentSongIndex(0);
      playSong(playlist.canciones[0].enlace, playlist.canciones[0], playlist.canciones);
    }
  };

  return (
    <section className="playlist-section" style={{ color: "#2F2F2F", marginLeft: "40px" }}>
      <h2>
        {language === "Spanish" ? "Playlist de Artistas" : "Artist Playlist"}
      </h2>

      <div
        className="d-flex gap-3 pb-3 overflow-auto scroll-container"
        style={{
          whiteSpace: "nowrap",
          scrollSnapType: "x mandatory",
          paddingBottom: "10px",
          maxWidth: "89%",
          zIndex: 5,
        }}
        ref={scrollContainerRef}
      >
        {playlists.length > 0 &&
          playlists.map((playlist) => (
            <div
              key={playlist.artista}
              style={{
                scrollSnapAlign: "center",
                width: "150px",
                height: "150px",
                background: "white",
                borderRadius: "12px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                position: "relative",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "130px",
                  height: "130px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={playlist.canciones.length > 0 ? playlist.canciones[0].imagen : "/playlist.png"}
                  alt={`Playlist de ${playlist.artista}`}
                  style={{
                    maxWidth: "90%",
                    maxHeight: "90%",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </div>
              <button
                onClick={() => playPlaylist(playlist)}
                className="position-absolute bottom-0 end-0 mb-2 me-2 btn btn-transparent rounded-circle shadow"
              >
                <img
                  src={
                    playingPlaylist === playlist && isPlaying
                      ? "/icons/reproductor/pausa.png"
                      : "/icons/reproductor/boton-de-play.png"
                  }
                  width="40"
                  height="40"
                  alt="Play/Pause"
                />
              </button>
            </div>
          ))}
      </div>
    </section>
  );
}

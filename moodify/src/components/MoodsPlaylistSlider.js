"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext ";
import UserLibrary from "./UserLibrary";
import AutomaticPlaylistsSlider from "./AutomaticPlaylistsSlider";
import { useMusic } from "@/app/context/MusicContext";

export default function MoodsPlaylistSlider() {
  const { language } = useLanguage();
  const { playSong, pauseSong, currentSong } = useMusic();
  const [playlistAlegre, setPlaylistAlegre] = useState([]);
  const [playlistEnamorado, setPlaylistEnamorado] = useState([]);
  const [playlistEnergico, setPlaylistEnergico] = useState([]);
  const [playlistFiesta, setPlaylistFiesta] = useState([]);
  const [playlistMelancolico, setPlaylistMelancolico] = useState([]);
  const [playlistTriste, setPlaylistTriste] = useState([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playingPlaylist, setPlayingPlaylist] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    fetch("/api/playlists/playlistAlegre")
      .then((response) => response.json())
      .then((data) => setPlaylistAlegre(data))
      .catch((error) =>
        console.error("Error al cargar la playlist Alegre:", error)
      );

    fetch("/api/playlists/playlistEnamorado")
      .then((response) => response.json())
      .then((data) => setPlaylistEnamorado(data))
      .catch((error) =>
        console.error("Error al cargar la playlist Enamorado:", error)
      );

    fetch("/api/playlists/playlistEnergico")
      .then((response) => response.json())
      .then((data) => setPlaylistEnergico(data))
      .catch((error) =>
        console.error("Error al cargar la playlist Energico:", error)
      );

    fetch("/api/playlists/playlistFiesta")
      .then((response) => response.json())
      .then((data) => setPlaylistFiesta(data))
      .catch((error) =>
        console.error("Error al cargar la playlist Fiesta:", error)
      );

    fetch("/api/playlists/playlistMelancolico")
      .then((response) => response.json())
      .then((data) => setPlaylistMelancolico(data))
      .catch((error) =>
        console.error("Error al cargar la playlist Melancolico:", error)
      );

    fetch("/api/playlists/playlistTriste")
      .then((response) => response.json())
      .then((data) => setPlaylistTriste(data))
      .catch((error) =>
        console.error("Error al cargar la playlist Triste:", error)
      );
  }, []);

  const playMoodPlaylist = (playlist) => {
    if (playlist.length > 0) {
      if (playlist === playingPlaylist && isPlaying) {
        pauseSong();
        setIsPlaying(false);
        setPlayingPlaylist(null);
        setCurrentTrack(null);
      } else {
        playSong(playlist[0].enlace, playlist[0], playlist);
        setIsPlaying(true);
        setPlayingPlaylist(playlist);
        setCurrentTrack(playlist[0]);
      }
    }
  };

  const handlePause = () => {
    pauseSong();
    setIsPlaying(false);
    setPlayingPlaylist(null);
    setCurrentTrack(null);
  };

  return (
    <div
      className="container-fluid p-0"
      style={{
        height: "100vh",
        background:
          "linear-gradient(to bottom left, #ffffff, #F4DCFF, #D781FF, #AE00FF)",
      }}
    >
      <div className="row no-gutters" style={{ height: "100%" }}>
        <div className="col-3 p-0" style={{ position: "relative", zIndex: 10 }}>
          <UserLibrary />
        </div>

        <div
          className="col-9 d-flex flex-column p-0"
          style={{ height: "100%" }}
        >
          <section
            className="p-3 d-flex flex-column align-items-start"
            style={{
              flex: 1,
              color: "#2F2F2F",
              marginTop: "13px",
              marginLeft: "20px",
              padding: "20px",
            }}
          >
            <h2 className="texto-titulo">
              {language === "Spanish" ? "Playlist de Moods" : "Moods Playlist"}
            </h2>

            <div className="d-flex justify-content-start w-100 mt-4 mt-md-0 playlist-moods-container">
              <div
                className="d-flex gap-3 pb-3 overflow-auto scroll-container"
                style={{
                  whiteSpace: "nowrap",
                  scrollSnapType: "x mandatory",
                  paddingBottom: "10px",
                  maxWidth: "90%",
                  zIndex: 5,
                }}
              >
                {[
                  { name: "Alegre", playlist: playlistAlegre },
                  { name: "Enamorado", playlist: playlistEnamorado },
                  { name: "Energico", playlist: playlistEnergico },
                  { name: "Fiesta", playlist: playlistFiesta },
                  { name: "Melancolico", playlist: playlistMelancolico },
                  { name: "Triste", playlist: playlistTriste },
                ].map(({ name, playlist }) => (
                  <div
                    key={name}
                    className="position-relative text-center flex-shrink-0"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <img
                      className="rounded-3 img-fluid"
                      style={{ maxWidth: "150px", height: "auto" }}
                      src={`/icons/${name.toLowerCase()}.png`}
                      alt={`${name} Mood`}
                    />
                    <button
                      onClick={() => playMoodPlaylist(playlist)}
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
            </div>
          </section>
          <div style={{ marginTop: "20px", flex: 1, zIndex: 0 }}>
            <AutomaticPlaylistsSlider />
          </div>
        </div>
      </div>
    </div>
  );
}

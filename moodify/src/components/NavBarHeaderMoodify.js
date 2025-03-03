"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext ";
import { useMusic } from "@/app/context/MusicContext";

export default function NavBarHeaderMoodify() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();
  const { playSong } = useMusic();
  const [playlistSelections, setPlaylistSelections] = useState({});

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const fetchPlaylists = async (userId) => {
    try {
      const response = await fetch(`/api/playlists?idUsuario=${userId}`);
      const data = await response.json();

      if (response.ok) {
        setPlaylists(data);
      } else {
        console.error(
          language === "Spanish"
            ? "Error al obtener las playlists:"
            : "Error fetching playlists:",
          data.error
        );
      }
    } catch (error) {
      console.error(
        language === "Spanish"
          ? "Error al obtener las playlists:"
          : "Error fetching playlists:",
        error
      );
    }
  };

  const syncUserFromStorage = () => {
    const userFromLocalStorage = localStorage.getItem("userInfo");
    if (userFromLocalStorage) {
      try {
        const parsedUser = JSON.parse(userFromLocalStorage);
        setUser(parsedUser);
        setUserName(parsedUser?.nombreUsuario || "");
        fetchPlaylists(parsedUser?.id);
      } catch (error) {
        console.error("Error al parsear el usuario desde localStorage", error);
      }
    }
  };

  useEffect(() => {
    syncUserFromStorage();
    window.addEventListener("storage", syncUserFromStorage);

    return () => {
      window.removeEventListener("storage", syncUserFromStorage);
    };
  }, []);

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchQuery: e.target.value }),
      });

      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error(
        language === "Spanish"
          ? "Error al obtener los resultados de búsqueda:"
          : "Error fetching search results:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const addToPlaylist = async (songName, selectedPlaylist) => {
    if (!selectedPlaylist) {
      alert(
        language === "Spanish"
          ? "Selecciona una playlist antes"
          : "Select a playlist first"
      );
      return;
    }

    const song = searchResults.find((result) => result.titulo === songName);

    if (!song) {
      alert(
        language === "Spanish" ? "Canción no encontrada" : "Song not found"
      );
      return;
    }

    const idCancion = song.id;

    try {
      const response = await fetch(`/api/playlists/${selectedPlaylist}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idCancion }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        setPlaylistSelections((prev) => ({
          ...prev,
          [song.id]: "",
        }));
      } else {
        console.error(
          language === "Spanish"
            ? "Error añadiendo la canción:"
            : "Error adding song:",
          result.error || result.message
        );
        alert(
          language === "Spanish"
            ? "Hubo un error al añadir la canción."
            : "There was an error adding the song."
        );
      }
    } catch (error) {
      console.error(
        language === "Spanish" ? "Error de conexión:" : "Connection error:",
        error
      );
      alert(
        language === "Spanish"
          ? "Error al intentar añadir la canción."
          : "Error trying to add the song."
      );
    }
  };

  const handlePlaylistChange = (idCancion, idPlaylist) => {
    setPlaylistSelections((prevSelections) => ({
      ...prevSelections,
      [idCancion]: idPlaylist,
    }));
  };

  return (
    <header
      className="text-white text-center text-light p-3"
      style={{ backgroundColor: "#2F2F2F" }}
    >
      <div className="container d-flex justify-content-between align-items-center d-lg-none mt-4">
        <nav className="navbar navbar-expand-lg navbar-dark w-100">
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav w-100">
              <li className="nav-item">
                <Link href="/home" className="nav-link text-white">
                  {language === "Spanish" ? "Inicio" : "Home"}
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/moods" className="nav-link text-white">
                  Moods
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/detector-moods" className="nav-link text-white">
                  {language === "Spanish"
                    ? "Detector de Moods"
                    : "Mood Detector"}
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/moods-diary" className="nav-link text-white">
                  {language === "Spanish" ? "Diario de Moods" : "Mood Diary"}
                </Link>
              </li>

              <li className="nav-item w-100 mt-3">
                <input
                  type="text"
                  placeholder={
                    language === "Spanish"
                      ? "Buscar canciones..."
                      : "Search songs..."
                  }
                  value={searchQuery}
                  onChange={handleSearch}
                  className="form-control"
                  style={{
                    backgroundColor: "#ECE6F0",
                    borderRadius: "25px",
                    color: "black",
                    padding: "10px 15px",
                  }}
                />
              </li>

              <li className="nav-item w-100 mt-3">
                {user ? (
                  <div
                    className="d-flex align-items-center"
                    style={{
                      backgroundColor: "#ECE6F0",
                      borderRadius: "25px",
                      padding: "5px 15px",
                    }}
                  >
                    <img
                      src="/icons/default-avatar.png"
                      width="20px"
                      height="20px"
                      alt="User Avatar"
                      style={{ marginRight: "10px" }}
                    />
                    <Link href="/profile">
                      <span className="text-dark">
                        <strong>{userName}</strong>
                      </span>
                    </Link>
                  </div>
                ) : (
                  <Link href="/login">
                    <button className="btn btn-light w-100 mt-2">
                      {language === "Spanish" ? "Iniciar sesión" : "Login"}
                    </button>
                  </Link>
                )}
              </li>

              <div className="d-block d-lg-none mt-3">
                {loading ? (
                  <p>{language === "Spanish" ? "Cargando..." : "Loading..."}</p>
                ) : (
                  searchResults.map((song, index) => (
                    <div
                      key={song.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        width: "100%",
                        backgroundColor: "#2F2F2F",
                        padding: "10px",
                        borderRadius: "5px",
                        gap: "10px",
                        marginBottom: "10px",
                        position: "relative",
                      }}
                    >
                      <img
                        src={song.imagen}
                        alt={song.titulo}
                        width="50"
                        height="50"
                        style={{ flexShrink: 0 }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                          minWidth: 0,
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: "14px",
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {song.titulo}
                        </p>
                        <p style={{ margin: 0, fontSize: "12px" }}>
                          {song.artista}
                        </p>
                      </div>
                      <button
                        onClick={() => playSong(song.enlace, song)}
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src="/icons/reproductor/play.png"
                          width="30"
                          height="30"
                          alt="Play"
                        />
                      </button>
                      <select
                        onChange={(e) =>
                          handlePlaylistChange(song.id, e.target.value)
                        }
                        value={playlistSelections[song.id] || ""}
                        style={{
                          backgroundColor: "#ECE6F0",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          padding: "5px",
                          color: "black",
                          fontSize: "12px",
                          flexShrink: 1,
                        }}
                      >
                        <option value="">
                          {language === "Spanish"
                            ? "Seleccionar Playlist"
                            : "Select Playlist"}
                        </option>
                        {playlists.map((playlist) => (
                          <option key={playlist.id} value={playlist.id}>
                            {playlist.nombre}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() =>
                          addToPlaylist(
                            song.titulo,
                            playlistSelections[song.id]
                          )
                        }
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src="/icons/agregar.png"
                          width="30"
                          height="30"
                          alt="Add"
                        />
                      </button>

                      {index < searchResults.length - 1 && (
                        <div
                          style={{
                            width: "100%",
                            height: "1px",
                            backgroundColor: "#ccc",
                            marginTop: "10px",
                          }}
                        />
                      )}
                    </div>
                  ))
                )}
              </div>
            </ul>
          </div>
        </nav>
      </div>

      <div className="container header-container d-none d-lg-flex">
        <img
          src="/LogoMoodify.png"
          alt={language === "Spanish" ? "Logo de la App" : "App Logo"}
          className="logo"
        />

        <nav className="nav-menu">
          <ul className="nav">
            <li className="nav-item">
              <Link href="/home" className="nav-link">
                {language === "Spanish" ? "Inicio" : "Home"}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/moods" className="nav-link">
                Moods
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/detector-moods" className="nav-link">
                {language === "Spanish" ? "Detector de Moods" : "Mood Detector"}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/moods-diary" className="nav-link">
                {language === "Spanish" ? "Diario de Moods" : "Mood Diary"}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="search-container">
          <input
            type="text"
            placeholder={
              language === "Spanish" ? "Buscar canciones..." : "Search songs..."
            }
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <img
            src="/icons/lupa.png"
            width="15"
            height="15"
            alt={language === "Spanish" ? "Icono de búsqueda" : "Search icon"}
            className="search-icon"
          />
        </div>

        <div className="user-container">
          {user ? (
            <div className="user-info">
              <img
                src="/icons/default-avatar.png"
                width="20px"
                height="20px"
                alt="User Avatar"
              />
              <Link href="/profile">
                <span className="user-name">{userName}</span>
              </Link>
            </div>
          ) : (
            <Link href="/login">
              <button className="btn-login">
                {language === "Spanish" ? "Iniciar sesión" : "Login"}
              </button>
            </Link>
          )}
        </div>
      </div>

      <div
        className="d-none d-lg-block"
        style={{
          backgroundColor: "#1B1B1B",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        {loading ? (
          <p>{language === "Spanish" ? "Cargando..." : "Loading..."}</p>
        ) : (
          searchResults.map((song, index) => (
            <div
              key={song.id}
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                width: "100%",
                backgroundColor: "#2F2F2F",
                padding: "10px",
                borderRadius: "5px",
                gap: "10px",
                marginBottom: "10px",
                position: "relative",
              }}
            >
              <img
                src={song.imagen}
                alt={song.titulo}
                width="50"
                height="50"
                style={{ flexShrink: 0 }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  minWidth: 0,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {song.titulo}
                </p>
                <p style={{ margin: 0, fontSize: "12px" }}>{song.artista}</p>
              </div>
              <button
                onClick={() => playSong(song.enlace, song)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/icons/reproductor/play.png"
                  width="30"
                  height="30"
                  alt="Play"
                />
              </button>
              <select
                onChange={(e) => handlePlaylistChange(song.id, e.target.value)}
                value={playlistSelections[song.id] || ""}
                style={{
                  backgroundColor: "#ECE6F0",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "5px",
                  color: "black",
                  fontSize: "12px",
                  flexShrink: 1,
                }}
              >
                <option value="">
                  {language === "Spanish"
                    ? "Seleccionar Playlist"
                    : "Select Playlist"}
                </option>
                {playlists.map((playlist) => (
                  <option key={playlist.id} value={playlist.id}>
                    {playlist.nombre}
                  </option>
                ))}
              </select>
              <button
                onClick={() =>
                  addToPlaylist(song.titulo, playlistSelections[song.id])
                }
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/icons/agregar.png"
                  width="30"
                  height="30"
                  alt="Add"
                />
              </button>
              {index < searchResults.length - 1 && (
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#ccc",
                    marginTop: "10px",
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </header>
  );
}

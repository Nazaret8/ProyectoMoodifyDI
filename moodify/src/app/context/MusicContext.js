'use client';
import { createContext, useContext, useState } from "react";

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([]);  
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentPlaylist, setCurrentPlaylist] = useState([]); 
  const [playingPlaylist, setPlayingPlaylist] = useState(null);  
  
  const playSong = (songUrl, songData, playlist = []) => {
    console.log("Playlist recibida: ", playlist);
    if (!songUrl || !songData) return;
  
    setCurrentSong({
      enlace: songUrl,
      imagen: songData.imagen,
      titulo: songData.titulo,
      artista: songData.artista,
    });
  
    if (playlist.length > 0) {
      setCurrentPlaylist(playlist);
      setSongs(playlist);
    } else {
      setCurrentPlaylist([]);
      setSongs([songData]);
    }
  
    setCurrentSongIndex(0);
    setIsPlaying(true);
  };
  
  const pauseSong = () => {
    setIsPlaying(false); 
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        pauseSong,
        songs,
        setCurrentSongIndex,
        setCurrentPlaylist, 
        currentPlaylist,  
        setIsPlaying,
        playingPlaylist,   
        setPlayingPlaylist 
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}

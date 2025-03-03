"use client";
import { useEffect, useRef, useState } from "react";
import { useMusic } from "@/app/context/MusicContext";
import "@/app/styles/global.css";
import { useLanguage } from "@/app/context/LanguageContext ";

export default function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    playSong,
    pauseSong,
    songs,
    setCurrentSongIndex,
    currentPlaylist,
  } = useMusic();
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    setIsClient(true);
  
    if (typeof window !== "undefined" && !audioRef.current) {
      audioRef.current = new Audio();
    }
  }, []); 
  
  useEffect(() => {
    if (!isClient || !currentSong || !audioRef.current) return;
  
    if (audioRef.current.src !== currentSong.enlace) {
      audioRef.current.src = currentSong.enlace;
      audioRef.current.load();
  
      audioRef.current.onloadedmetadata = () => setDuration(audioRef.current.duration || 0);
      audioRef.current.ontimeupdate = () => setCurrentTime(audioRef.current.currentTime);
  
      audioRef.current.onended = () => {
        const playlist = currentPlaylist.length > 0 ? currentPlaylist : songs;
        const currentSongIndex = playlist.findIndex(song => song.enlace === currentSong.enlace);
  
        if (currentSongIndex === playlist.length - 1) {
          pauseSong();
        } else {
          handleNextSong();
        }
      };
    }
  
    if (isPlaying) {
      audioRef.current
        .play()
        .catch(() => {});
    } else {
      audioRef.current.pause();
    }
  
    audioRef.current.volume = volume;
    audioRef.current.loop = isLooping;
  }, [currentSong, isPlaying, isClient, volume, isLooping, currentPlaylist, songs]);
  

  const handlePlayPause = () => {
    if (!audioRef.current) return;
  
    if (isPlaying) {
      pauseSong();
      audioRef.current.pause();
    } else {
      if (currentSong) {
        playSong(currentSong.enlace, {
          imagen: currentSong.imagen,
          titulo: currentSong.titulo,
          artista: currentSong.artista,
        });
  
        audioRef.current
          .play()
          .catch(() => {}); 
      }
    }
  };
  

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
  };

  const handleLoopToggle = () => {
    setIsLooping((prev) => !prev);
  };

  const handleNextSong = () => {
    const playlist = currentPlaylist.length > 0 ? currentPlaylist : songs; 
    const nextIndex =
      (songs.findIndex((song) => song.enlace === currentSong.enlace) + 1) % playlist.length;
    
    if (nextIndex === 0) {
      pauseSong(); 
      return;
    }
  
    setCurrentSongIndex(nextIndex);
    playSong(playlist[nextIndex].enlace, playlist[nextIndex], playlist); 
  };
  

  const handlePreviousSong = () => {
    const playlist = currentPlaylist.length > 0 ? currentPlaylist : songs;
    const prevIndex =
      (songs.findIndex((song) => song.enlace === currentSong.enlace) -
        1 +
        playlist.length) %
      playlist.length;
    setCurrentSongIndex(prevIndex); 
    playSong(playlist[prevIndex].enlace, playlist[prevIndex], playlist); 
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!isClient) return null;

  let volumeIcon;
  if (volume === 0) {
    volumeIcon = "/icons/reproductor/mudo.png";
  } else if (volume <= 0.5) {
    volumeIcon = "/icons/reproductor/volumen-bajo.png";
  } else {
    volumeIcon = "/icons/reproductor/volumen-alto.png";
  }

  const loopIcon = isLooping
    ? "/icons/reproductor/repetir2.png"
    : "/icons/reproductor/repetir1.png";

  return (
    <div className="music-player">
      <div className="song-details">
        <img
          src={currentSong?.imagen || "/icons/radio.png"}
          alt="Cover"
          className="rounded-3"
          width="55"
          height="55"
        />
        <div>
          <div className="fw-bold fs-6 song-title">
            {currentSong?.titulo ||
              (language === "Spanish" ? "No hay canción" : "There is no song")}
          </div>
          <div className="text-light" style={{ fontSize: "0.85em" }}>
            {currentSong?.artista ||
              (language === "Spanish" ? "Desconocido" : "A stranger")}
          </div>
        </div>
      </div>

      <div className="controls-container">
        <div className="playback-controls">
          <button className="btn text-white" onClick={handlePreviousSong}>
            <img
              src="/icons/reproductor/atras.png"
              alt="Prev"
              width="28"
              height="28"
            />
          </button>
          <button className="btn text-white mx-2" onClick={handlePlayPause}>
            <img
              src={
                isPlaying
                  ? "/icons/reproductor/pause.png"
                  : "/icons/reproductor/play.png"
              }
              alt="Play/Pause"
              width="40"
              height="40"
            />
          </button>
          <button className="btn text-white" onClick={handleNextSong}>
            <img
              src="/icons/reproductor/siguiente.png"
              alt="Next"
              width="28"
              height="28"
            />
          </button>
          <button className="btn text-white" onClick={handleLoopToggle}>
            <img src={loopIcon} alt="Loop" width="28" height="28" />
          </button>
        </div>

        <div className="progress-container">
          <span className="me-2 text-light" style={{ fontSize: "0.85em" }}>
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            className="flex-grow-1"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            style={{ accentColor: "white" }}
          />
          <span className="ms-2 text-light" style={{ fontSize: "0.85em" }}>
            {formatTime(duration)}
          </span>
        </div>
      </div>

      <div className="volume-container">
        <img
          src={volumeIcon}
          alt="Volumen"
          width="22"
          height="22"
          className="me-2"
        />
        <input
          type="range"
          value={volume * 100}
          onChange={handleVolumeChange}
          min="0"
          max="100"
          style={{ accentColor: "white" }}
        />
      </div>
    </div>
  );
}
